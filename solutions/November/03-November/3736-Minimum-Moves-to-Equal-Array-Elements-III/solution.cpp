/**
 * Problem: LeetCode 3736 - Minimum Moves to Equal Array Elements III
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minMoves(vector<int>& nums) {
        int maxVal = *max_element(nums.begin(), nums.end());
        int moves = 0;
        for (int x : nums) {
            moves += maxVal - x;
        }
        return moves;
    }
};
