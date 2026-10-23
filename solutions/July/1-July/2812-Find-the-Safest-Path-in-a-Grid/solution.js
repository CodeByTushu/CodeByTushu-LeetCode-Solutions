/**
 * Problem: LeetCode 2812 - Find the Safest Path in a Grid
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function(grid) {
    const n = grid.length;
    const dist = Array.from({ length: n }, () => new Int32Array(n).fill(-1));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const q = [];
    let qHead = 0;

    // Multi-source BFS from all thieves
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                dist[i][j] = 0;
                q.push((i << 16) | j);
            }
        }
    }

    while (qHead < q.length) {
        const cur = q[qHead++];
        const r = cur >> 16;
        const c = cur & 0xFFFF;

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push((nr << 16) | nc);
            }
        }
    }

    function canReach(limit) {
        if (dist[0][0] < limit) return false;

        const vis = Array.from({ length: n }, () => new Uint8Array(n));
        const bq = [(0 << 16) | 0];
        let bqHead = 0;
        vis[0][0] = 1;

        while (bqHead < bq.length) {
            const cur = bq[bqHead++];
            const r = cur >> 16;
            const c = cur & 0xFFFF;

            if (r === n - 1 && c === n - 1) return true;

            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < n && nc >= 0 && nc < n &&
                    !vis[nr][nc] && dist[nr][nc] >= limit) {
                    vis[nr][nc] = 1;
                    bq.push((nr << 16) | nc);
                }
            }
        }

        return false;
    }

    let low = 0, high = 2 * n;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (canReach(mid)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return high;
};
