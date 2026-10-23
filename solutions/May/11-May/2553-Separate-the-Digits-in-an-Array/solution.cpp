/**
 * Problem: LeetCode 2553 - Separate the Digits in an Array
 * Difficulty: Easy
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> separateDigits(vector<int>& nums) {
        vector<int> ans;
        for (int num : nums) {
            vector<int> temp;
            while (num > 0) {
                temp.push_back(num % 10);
                num /= 10;
            }
            ans.insert(ans.end(), temp.rbegin(), temp.rend());
        }
        return ans;
    }
};
