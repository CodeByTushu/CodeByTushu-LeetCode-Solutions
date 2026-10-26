/**
 * Problem: LeetCode 744 - Find Smallest Letter Greater Than Target
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Binary Search (Upper Bound)
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    let left = 0;
    let right = letters.length;

    while (left < right) {
        const mid = (left + right) >> 1;
        if (letters[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return letters[left % letters.length];
};
