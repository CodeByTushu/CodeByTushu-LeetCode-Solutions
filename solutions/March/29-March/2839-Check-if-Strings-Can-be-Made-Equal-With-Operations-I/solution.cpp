/**
 * Problem: 2839. Check if Strings Can be Made Equal With Operations I
 * Difficulty: Easy
 * Language: C++
 * 
 * Approach:
 * Swap operations with distance 2 partition the string into independent even (0, 2)
 * and odd (1, 3) positions. We check whether both character sets match.
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

#include <string>

using namespace std;

class Solution {
public:
    bool canBeEqual(string s1, string s2) {
        bool evenMatch = (s1[0] == s2[0] && s1[2] == s2[2]) ||
                         (s1[0] == s2[2] && s1[2] == s2[0]);

        bool oddMatch = (s1[1] == s2[1] && s1[3] == s2[3]) ||
                        (s1[1] == s2[3] && s1[3] == s2[1]);

        return evenMatch && oddMatch;
    }
};
