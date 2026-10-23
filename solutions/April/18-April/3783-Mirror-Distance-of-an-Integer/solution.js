/**
 * Problem: LeetCode 3783 - Mirror Distance of an Integer
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var mirrorDistance = function(n) {
    let temp = n;
    let reversed = 0;
    
    while (temp > 0) {
        reversed = reversed * 10 + (temp % 10);
        temp = Math.floor(temp / 10);
    }
    
    return Math.abs(n - reversed);
};
