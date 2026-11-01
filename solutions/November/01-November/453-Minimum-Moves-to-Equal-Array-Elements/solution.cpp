/**
 * Problem: LeetCode 453 - Minimum Moves to Equal Array Elements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minMoves(vector<int>& nums) {
        int minVal = *min_element(nums.begin(), nums.end());
        long long moves = 0;
        for (int x : nums) {
            moves += (long long)x - minVal;
        }
        return (int)moves;
    }
};
