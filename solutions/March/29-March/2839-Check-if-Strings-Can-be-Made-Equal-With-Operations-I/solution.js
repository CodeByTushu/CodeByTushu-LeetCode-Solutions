/**
 * Problem: LeetCode 2839 - Check if Strings Can be Made Equal With Operations I
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
var canBeEqual = function(s1, s2) {
    const evenMatch = (s1[0] === s2[0] && s1[2] === s2[2]) ||
                      (s1[0] === s2[2] && s1[2] === s2[0]);

    const oddMatch = (s1[1] === s2[1] && s1[3] === s2[3]) ||
                     (s1[1] === s2[3] && s1[3] === s2[1]);

    return evenMatch && oddMatch;
};
