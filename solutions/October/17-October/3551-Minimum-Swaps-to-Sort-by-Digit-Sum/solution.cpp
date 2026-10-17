#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3551 - Minimum Swaps to Sort by Digit Sum
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
private:
    int getDigitSum(int x) {
        int s = 0;
        while (x > 0) {
            s += x % 10;
            x /= 10;
        }
        return s;
    }

public:
    int minSwaps(vector<int>& nums) {
        int n = nums.size();
        vector<int> ds(n);
        for (int i = 0; i < n; i++) {
            ds[i] = getDigitSum(nums[i]);
        }

        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        sort(idx.begin(), idx.end(), [&](int a, int b) {
            if (ds[a] != ds[b]) return ds[a] < ds[b];
            return nums[a] < nums[b];
        });

        vector<bool> visited(n, false);
        int swaps = 0;

        for (int i = 0; i < n; i++) {
            if (visited[i] || idx[i] == i) continue;
            int cycleLen = 0;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
                j = idx[j];
                cycleLen++;
            }
            swaps += cycleLen - 1;
        }

        return swaps;
    }
};
