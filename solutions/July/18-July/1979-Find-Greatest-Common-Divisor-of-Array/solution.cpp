#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

/**
 * Problem: LeetCode 1979 - Find Greatest Common Divisor of Array
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int findGCD(vector<int>& nums) {
        auto [min_it, max_it] = minmax_element(nums.begin(), nums.end());
        return std::gcd(*min_it, *max_it);
    }
};
