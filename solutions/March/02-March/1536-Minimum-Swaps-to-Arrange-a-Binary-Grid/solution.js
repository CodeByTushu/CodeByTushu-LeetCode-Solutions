/**
 * Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps = function(grid) {
    const n = grid.length;
    const trailingZeros = new Array(n);

    // Step 1: Count trailing zeros for each row
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = n - 1; j >= 0; j--) {
            if (grid[i][j] === 0) {
                count++;
            } else {
                break;
            }
        }
        trailingZeros[i] = count;
    }

    let swaps = 0;

    // Step 2: Greedy search for first qualifying row
    for (let i = 0; i < n; i++) {
        const required = n - 1 - i;
        let foundIdx = -1;

        for (let j = i; j < n; j++) {
            if (trailingZeros[j] >= required) {
                foundIdx = j;
                break;
            }
        }

        if (foundIdx === -1) {
            return -1;
        }

        // Step 3: Bubble up qualifying row to index i
        swaps += (foundIdx - i);
        const temp = trailingZeros[foundIdx];
        for (let j = foundIdx; j > i; j--) {
            trailingZeros[j] = trailingZeros[j - 1];
        }
        trailingZeros[i] = temp;
    }

    return swaps;
};
