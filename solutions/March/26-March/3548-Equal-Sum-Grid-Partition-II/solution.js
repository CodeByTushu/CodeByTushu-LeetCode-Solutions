/**
 * Problem: 3548. Equal Sum Grid Partition II
 * Difficulty: Hard
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Evaluate horizontal cuts across four transformations of the grid:
 * 1. Original (horizontal cut, discount top)
 * 2. Reversed rows (horizontal cut, discount bottom)
 * 3. Transposed (vertical cut, discount left)
 * 4. Reversed transposed (vertical cut, discount right)
 * 
 * A discounted section remains connected if:
 * - Dimensions >= 2 x 2: any cell can be discounted.
 * - Single row (1 x C, C > 1): only endpoints grid[0][0] and grid[0][C - 1] can be discounted.
 * - Single column (R x 1, R > 1): only endpoints grid[0][0] and grid[R - 1][0] can be discounted.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 * 
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let totalSum = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            totalSum += grid[i][j];
        }
    }

    function canPartition(g) {
        const R = g.length;
        const C = g[0].length;
        let topSum = 0;
        const seen = new Set();

        for (let i = 0; i < R - 1; i++) {
            for (let j = 0; j < C; j++) {
                seen.add(g[i][j]);
                topSum += g[i][j];
            }

            const botSum = totalSum - topSum;
            const diff = topSum - botSum;

            if (diff === 0) {
                return true;
            }

            if (diff > 0) {
                if (i === 0) {
                    if (C > 1 && (diff === g[0][0] || diff === g[0][C - 1])) {
                        return true;
                    }
                } else if (C === 1) {
                    if (diff === g[0][0] || diff === g[i][0]) {
                        return true;
                    }
                } else {
                    if (seen.has(diff)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function reverseRows(g) {
        const R = g.length;
        const rev = new Array(R);
        for (let i = 0; i < R; i++) {
            rev[i] = g[R - 1 - i];
        }
        return rev;
    }

    function transpose(g) {
        const R = g.length;
        const C = g[0].length;
        const trans = Array.from({ length: C }, () => new Array(R));
        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                trans[j][i] = g[i][j];
            }
        }
        return trans;
    }

    if (canPartition(grid)) return true;
    if (canPartition(reverseRows(grid))) return true;
    const trans = transpose(grid);
    if (canPartition(trans)) return true;
    if (canPartition(reverseRows(trans))) return true;

    return false;
};
