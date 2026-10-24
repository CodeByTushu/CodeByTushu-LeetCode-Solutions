/**
 * Problem: LeetCode 3453 - Separate Squares I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function(squares) {
    let totalArea = 0;
    let low = 0;
    let high = 0;

    for (let i = 0; i < squares.length; i++) {
        const y = squares[i][1];
        const l = squares[i][2];
        totalArea += l * l;
        high = Math.max(high, y + l);
    }

    const targetArea = totalArea / 2;

    function getAreaBelow(yLine) {
        let area = 0;
        for (let i = 0; i < squares.length; i++) {
            const y = squares[i][1];
            const l = squares[i][2];
            if (yLine > y) {
                const h = Math.min(l, yLine - y);
                area += h * l;
            }
        }
        return area;
    }

    // 80 iterations of binary search for high precision
    for (let iter = 0; iter < 80; iter++) {
        const mid = low + (high - low) / 2;
        if (getAreaBelow(mid) >= targetArea) {
            high = mid;
        } else {
            low = mid;
        }
    }

    return low;
};
