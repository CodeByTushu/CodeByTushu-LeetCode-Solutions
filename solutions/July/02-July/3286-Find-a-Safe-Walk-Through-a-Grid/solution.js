/**
 * Problem: LeetCode 3286 - Find a Safe Walk Through a Grid
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 */

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._up(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._down(0);
        }
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _up(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.heap[i][2] > this.heap[p][2]) {
                [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                i = p;
            } else {
                break;
            }
        }
    }

    _down(i) {
        const len = this.heap.length;
        while ((i << 1) + 1 < len) {
            let left = (i << 1) + 1;
            let right = left + 1;
            let best = i;

            if (this.heap[left][2] > this.heap[best][2]) best = left;
            if (right < len && this.heap[right][2] > this.heap[best][2]) best = right;

            if (best !== i) {
                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            } else {
                break;
            }
        }
    }
}

/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function(grid, health) {
    const m = grid.length;
    const n = grid[0].length;

    const best = Array.from({ length: m }, () => new Int32Array(n).fill(-1));
    const pq = new MaxHeap();

    const startHealth = health - grid[0][0];
    if (startHealth <= 0) return false;

    best[0][0] = startHealth;
    pq.push([0, 0, startHealth]);

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (!pq.isEmpty()) {
        const [x, y, h] = pq.pop();

        if (h !== best[x][y]) continue;

        if (x === m - 1 && y === n - 1) return true;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;

            const nh = h - grid[nx][ny];

            if (nh > 0 && nh > best[nx][ny]) {
                best[nx][ny] = nh;
                pq.push([nx, ny, nh]);
            }
        }
    }

    return false;
};
