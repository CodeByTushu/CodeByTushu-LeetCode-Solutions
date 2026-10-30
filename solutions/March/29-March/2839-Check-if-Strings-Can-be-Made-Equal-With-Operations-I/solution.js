/**
 * Problem: 2839. Check if Strings Can be Made Equal With Operations I
 * Difficulty: Easy
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Check if the multiset of even-indexed characters (0, 2) in s1 matches that of s2,
 * and odd-indexed characters (1, 3) in s1 matches that of s2.
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * 
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var canBeEqual = function(s1, s2) {
    const evenMatch = (s1[0] === s2[0] && s1[2] === s2[2]) ||
                      (s1[0] === s2[2] && s1[2] === s2[0]);

    const oddMatch = (s1[1] === s2[1] && s1[3] === s2[3]) ||
                     (s1[1] === s2[3] && s1[3] === s2[1]);

    return evenMatch && oddMatch;
};
