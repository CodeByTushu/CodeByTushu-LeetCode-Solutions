/**
 * Problem: 2840. Check if Strings Can be Made Equal With Operations II
 * Difficulty: Medium
 * Language: C++
 * 
 * Approach:
 * Any two indices with even difference (j - i % 2 == 0) can be swapped.
 * This partitions characters into independent even-index and odd-index multisets.
 * We count frequencies across both parities in a single pass.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary space
 */

#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    bool checkStrings(string s1, string s2) {
        int n = s1.length();
        vector<int> countEven(26, 0);
        vector<int> countOdd(26, 0);

        for (int i = 0; i < n; ++i) {
            if (i % 2 == 0) {
                countEven[s1[i] - 'a']++;
                countEven[s2[i] - 'a']--;
            } else {
                countOdd[s1[i] - 'a']++;
                countOdd[s2[i] - 'a']--;
            }
        }

        for (int i = 0; i < 26; ++i) {
            if (countEven[i] != 0 || countOdd[i] != 0) {
                return false;
            }
        }

        return true;
    }
};
