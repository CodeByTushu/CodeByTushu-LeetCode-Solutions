#include <vector>
#include <unordered_map>
#include <algorithm>

/**
 * Problem: LeetCode 2958 - Length of Longest Subarray With at Most K Frequency
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int maxSubarrayLength(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> freq;
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
            freq[nums[right]]++;

            while (freq[nums[right]] > k) {
                freq[nums[left]]--;
                left++;
            }

            maxLen = std::max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
