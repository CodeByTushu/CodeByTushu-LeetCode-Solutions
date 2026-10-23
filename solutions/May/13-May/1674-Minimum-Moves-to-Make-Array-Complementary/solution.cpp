/**
 * Problem: LeetCode 1674 - Minimum Moves to Make Array Complementary
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minMoves(vector<int>& nums, int limit) {
        int n = nums.size();
        // diff array covering range [2, 2 * limit + 1]
        vector<int> diff(2 * limit + 2, 0);

        // Process each complementary pair
        for (int i = 0; i < n / 2; i++) {
            int a = nums[i];
            int b = nums[n - 1 - i];
            int minVal = min(a, b);
            int maxVal = max(a, b);

            // By default, achieving any target sum requires 2 moves per pair.
            // 1 move is sufficient for target sum in [minVal + 1, maxVal + limit]:
            diff[minVal + 1] -= 1;
            diff[maxVal + limit + 1] += 1;

            // 0 moves are sufficient for target sum exactly equal to a + b:
            diff[a + b] -= 1;
            diff[a + b + 1] += 1;
        }

        // Prefix sum sweep to determine minimum moves across all target sums x in [2, 2 * limit]
        int currentMoves = n; // initially 2 moves per pair for n / 2 pairs = n moves
        int minMoves = n;

        for (int targetSum = 2; targetSum <= 2 * limit; targetSum++) {
            currentMoves += diff[targetSum];
            if (currentMoves < minMoves) {
                minMoves = currentMoves;
            }
        }

        return minMoves;
    }
};
