/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function(board) {
    const MOD = 1_000_000_007;
    const n = board.length;

    const score = Array.from({ length: n }, () => new Int32Array(n).fill(-1));
    const ways = Array.from({ length: n }, () => new Int32Array(n).fill(0));

    score[n - 1][n - 1] = 0;
    ways[n - 1][n - 1] = 1;

    const dirs = [[1, 0], [0, 1], [1, 1]];

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (board[i][j] === 'X') continue;
            if (i === n - 1 && j === n - 1) continue;

            let best = -1;
            let count = 0;

            for (const [di, dj] of dirs) {
                const ni = i + di;
                const nj = j + dj;

                if (ni >= n || nj >= n) continue;
                if (score[ni][nj] === -1) continue;

                if (score[ni][nj] > best) {
                    best = score[ni][nj];
                    count = ways[ni][nj];
                } else if (score[ni][nj] === best) {
                    count = (count + ways[ni][nj]) % MOD;
                }
            }

            if (best === -1) continue;

            const ch = board[i][j];
            if (ch !== 'E' && ch !== 'S') {
                best += ch.charCodeAt(0) - 48;
            }

            score[i][j] = best;
            ways[i][j] = count;
        }
    }

    if (ways[0][0] === 0) return [0, 0];

    return [score[0][0], ways[0][0]];
};
