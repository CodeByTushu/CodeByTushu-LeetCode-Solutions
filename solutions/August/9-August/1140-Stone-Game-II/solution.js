/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
  const n = piles.length;
  const suffixSum = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    suffixSum[i] = suffixSum[i + 1] + piles[i];
  }

  const memo = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  function solve(i, m) {
    // Current player can grab everything remaining
    if (i + 2 * m >= n) {
      return suffixSum[i];
    }

    if (memo[i][m] !== -1) {
      return memo[i][m];
    }

    let best = 0;
    for (let x = 1; x <= 2 * m; x++) {
      const opponentGets = solve(i + x, Math.max(m, x));
      best = Math.max(best, suffixSum[i] - opponentGets);
    }

    return (memo[i][m] = best);
  }

  return solve(0, 1);
};
