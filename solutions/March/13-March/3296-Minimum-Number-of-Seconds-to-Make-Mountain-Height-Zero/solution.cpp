/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
    bool canReduce(long long time, int mountainHeight, const vector<int>& workerTimes) {
        long long totalHeight = 0;
        for (int w : workerTimes) {
            long long m = time / w;
            if (m > 0) {
                // Solve x * (x + 1) / 2 <= m
                long long x = (sqrt(1.0 + 8.0 * m) - 1.0) / 2.0;
                while (x * (x + 1) / 2 > m) {
                    x--;
                }
                while ((x + 1) * (x + 2) / 2 <= m) {
                    x++;
                }
                totalHeight += x;
                if (totalHeight >= mountainHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= mountainHeight;
    }

public:
    long long minNumberOfSeconds(int mountainHeight, vector<int>& workerTimes) {
        int minW = *min_element(workerTimes.begin(), workerTimes.end());

        long long low = 1;
        // Upper bound: fastest worker alone reduces the entire mountain
        long long high = (long long)minW * mountainHeight * (mountainHeight + 1LL) / 2LL;
        long long ans = high;

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            if (canReduce(mid, mountainHeight, workerTimes)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
};
