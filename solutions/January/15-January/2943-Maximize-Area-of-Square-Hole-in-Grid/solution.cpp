/**
 * Problem: LeetCode 2943 - Maximize Area of Square Hole in Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximizeSquareHoleArea(int n, int m, vector<int>& hBars, vector<int>& vBars) {
        auto getMaxGap = [](vector<int>& bars) -> int {
            sort(bars.begin(), bars.end());
            int maxConsecutive = 1;
            int currentConsecutive = 1;

            for (size_t i = 1; i < bars.size(); i++) {
                if (bars[i] == bars[i - 1] + 1) {
                    currentConsecutive++;
                } else {
                    currentConsecutive = 1;
                }
                maxConsecutive = max(maxConsecutive, currentConsecutive);
            }

            return maxConsecutive + 1;
        };

        int maxHGap = getMaxGap(hBars);
        int maxVGap = getMaxGap(vBars);
        int side = min(maxHGap, maxVGap);
        return side * side;
    }
};
