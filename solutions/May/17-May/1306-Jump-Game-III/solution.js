/**
 * Problem: LeetCode 1306 - Jump Game III
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    const n = arr.length;
    const queue = [start];
    const visited = new Uint8Array(n);
    visited[start] = 1;

    let head = 0;
    while (head < queue.length) {
        const curr = queue[head++];

        // Target reached: current index has value 0
        if (arr[curr] === 0) {
            return true;
        }

        // Jump forward: curr + arr[curr]
        const forward = curr + arr[curr];
        if (forward < n && !visited[forward]) {
            visited[forward] = 1;
            queue.push(forward);
        }

        // Jump backward: curr - arr[curr]
        const backward = curr - arr[curr];
        if (backward >= 0 && !visited[backward]) {
            visited[backward] = 1;
            queue.push(backward);
        }
    }

    return false;
};
