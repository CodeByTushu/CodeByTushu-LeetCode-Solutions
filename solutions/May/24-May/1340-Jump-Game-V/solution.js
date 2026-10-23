/**
 * Problem: LeetCode 1340 - Jump Game V
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
var maxJumps = function(arr, d) {
    const n = arr.length;
    const memo = new Int32Array(n);

    const dfs = (i) => {
        if (memo[i] !== 0) {
            return memo[i];
        }

        let res = 1;

        // Jump rightwards: i + 1, ..., i + d
        for (let j = i + 1; j <= Math.min(i + d, n - 1); j++) {
            if (arr[j] >= arr[i]) {
                break;
            }
            res = Math.max(res, 1 + dfs(j));
        }

        // Jump leftwards: i - 1, ..., i - d
        for (let j = i - 1; j >= Math.max(i - d, 0); j--) {
            if (arr[j] >= arr[i]) {
                break;
            }
            res = Math.max(res, 1 + dfs(j));
        }

        memo[i] = res;
        return res;
    };

    let maxVisited = 0;
    for (let i = 0; i < n; i++) {
        maxVisited = Math.max(maxVisited, dfs(i));
    }

    return maxVisited;
};
