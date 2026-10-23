/**
 * Problem: LeetCode 2833 - Furthest Point From Origin
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function(moves) {
    let countL = 0;
    let countR = 0;
    let countBlank = 0;

    for (let i = 0; i < moves.length; i++) {
        const c = moves.charCodeAt(i);
        if (c === 76) {        // 'L'
            countL++;
        } else if (c === 82) { // 'R'
            countR++;
        } else {               // '_'
            countBlank++;
        }
    }

    return Math.abs(countL - countR) + countBlank;
};
