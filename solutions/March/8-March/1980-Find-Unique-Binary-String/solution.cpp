/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        string res = "";
        int n = nums.size();

        // Cantor's Diagonalization:
        // Flip the diagonal bit nums[i][i] so res differs from every nums[i]
        for (int i = 0; i < n; i++) {
            res += (nums[i][i] == '0' ? '1' : '0');
        }

        return res;
    }
};
