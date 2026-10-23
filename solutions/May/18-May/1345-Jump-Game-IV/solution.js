/**
 * Problem: LeetCode 1345 - Jump Game IV
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function(arr) {
    const n = arr.length;
    if (n <= 1) return 0;

    // Map each value to a list of its indices
    const valueIndices = new Map();
    for (let i = 0; i < n; i++) {
        if (!valueIndices.has(arr[i])) {
            valueIndices.set(arr[i], []);
        }
        valueIndices.get(arr[i]).push(i);
    }

    const queue = [0];
    let head = 0;
    const visited = new Uint8Array(n);
    visited[0] = 1;
    let steps = 0;

    // Breadth-First Search level by level
    while (head < queue.length) {
        const levelSize = queue.length - head;

        for (let k = 0; k < levelSize; k++) {
            const curr = queue[head++];

            // Target reached
            if (curr === n - 1) {
                return steps;
            }

            // Transition 1: jump backward (curr - 1)
            if (curr - 1 >= 0 && !visited[curr - 1]) {
                visited[curr - 1] = 1;
                queue.push(curr - 1);
            }

            // Transition 2: jump forward (curr + 1)
            if (curr + 1 < n && !visited[curr + 1]) {
                visited[curr + 1] = 1;
                queue.push(curr + 1);
            }

            // Transition 3: jump to same-value indices
            if (valueIndices.has(arr[curr])) {
                const sameValIndices = valueIndices.get(arr[curr]);
                for (let i = 0; i < sameValIndices.length; i++) {
                    const nextIdx = sameValIndices[i];
                    if (!visited[nextIdx]) {
                        visited[nextIdx] = 1;
                        queue.push(nextIdx);
                    }
                }
                // Crucial optimization: delete to prevent redundant O(N^2) edge visits
                valueIndices.delete(arr[curr]);
            }
        }

        steps++;
    }

    return steps;
};
