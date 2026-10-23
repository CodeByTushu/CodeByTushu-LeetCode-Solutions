#include <string>
#include <vector>

using namespace std;

/**
 * Problem: LeetCode 1358 - Number of Substrings Containing All Three Characters
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int numberOfSubstrings(string s) {
        vector<int> count(3, 0);
        int left = 0;
        int ans = 0;
        int n = s.length();

        for (int right = 0; right < n; right++) {
            count[s[right] - 'a']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans += n - right;
                count[s[left] - 'a']--;
                left++;
            }
        }

        return ans;
    }
};
