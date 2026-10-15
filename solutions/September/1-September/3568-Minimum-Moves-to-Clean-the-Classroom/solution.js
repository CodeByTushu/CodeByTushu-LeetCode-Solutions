/**
 * Problem: LeetCode 3568 - Minimum Moves to Clean the Classroom
 * Language: JavaScript (Node.js)
 * Approach: Breadth-First Search (BFS) with Bitmask State Tracking
 * Time Complexity: O(M * N * Energy * 2^L)
 * Space Complexity: O(M * N * Energy * 2^L)
 * 
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;

    let startR = -1, startC = -1;
    const litters = [];
    const isReset = Array.from({ length: m }, () => Array(n).fill(false));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const c = classroom[i][j];
            if (c === 'S') {
                startR = i;
                startC = j;
            } else if (c === 'L') {
                litters.push([i, j]);
            } else if (c === 'R') {
                isReset[i][j] = true;
            }
        }
    }

    const totalLitter = litters.length;
    const fullMask = (1 << totalLitter) - 1;

    const litterIndex = new Map();
    for (let k = 0; k < totalLitter; k++) {
        litterIndex.set(litters[k][0] * n + litters[k][1], k);
    }

    let initMask = 0;
    const startCoord = startR * n + startC;
    if (litterIndex.has(startCoord)) {
        initMask |= (1 << litterIndex.get(startCoord));
    }

    // Pack 4-dimensional state into single key
    const stateKey = (r, c, e, mask) => (r << 20) | (c << 14) | (e << 7) | mask;

    const visited = new Set();
    visited.add(stateKey(startR, startC, energy, initMask));

    const queue = [[startR, startC, energy, initMask, 0]];
    let head = 0;

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (head < queue.length) {
        const [r, c, e, mask, moves] = queue[head++];

        if (mask === fullMask) {
            return moves;
        }

        if (e === 0) {
            continue;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (classroom[nr][nc] === 'X') continue;

            const ne = isReset[nr][nc] ? energy : e - 1;
            let newMask = mask;
            const nCoord = nr * n + nc;
            if (litterIndex.has(nCoord)) {
                newMask |= (1 << litterIndex.get(nCoord));
            }

            const key = stateKey(nr, nc, ne, newMask);
            if (!visited.has(key)) {
                visited.add(key);
                queue.push([nr, nc, ne, newMask, moves + 1]);
            }
        }
    }

    return -1;
};
