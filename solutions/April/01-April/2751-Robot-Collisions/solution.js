/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function(positions, healths, directions) {
    const n = positions.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    indices.sort((a, b) => positions[a] - positions[b]);

    const stack = []; // stores indices of robots moving 'R'

    for (const curr of indices) {
        if (directions[curr] === 'R') {
            stack.push(curr);
        } else {
            // Robot moving 'L' collides with 'R' robots in stack
            while (stack.length > 0 && healths[curr] > 0) {
                const top = stack[stack.length - 1];
                if (healths[top] < healths[curr]) {
                    healths[top] = 0;
                    stack.pop();
                    healths[curr] -= 1;
                } else if (healths[top] > healths[curr]) {
                    healths[curr] = 0;
                    healths[top] -= 1;
                } else {
                    healths[top] = 0;
                    healths[curr] = 0;
                    stack.pop();
                }
            }
        }
    }

    const result = [];
    for (let i = 0; i < n; i++) {
        if (healths[i] > 0) {
            result.push(healths[i]);
        }
    }
    return result;
};
