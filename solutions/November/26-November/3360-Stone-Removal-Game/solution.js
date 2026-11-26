/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function(n) {
    let remove = 10;
    let aliceTurn = true;

    while (n >= remove) {
        n -= remove;
        remove--;
        aliceTurn = !aliceTurn;
    }

    // Agar Bob ki baari me stones kam pad gaye, toh Alice jeet gayi
    return !aliceTurn;
};
