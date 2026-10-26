/**
 * Problem: LeetCode 2977 - Minimum Cost to Convert String II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm + Dynamic Programming
 * Time Complexity: O(V^3 + N * |lengths| * L_max)
 * Space Complexity: O(V^2 + N)
 */

/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function(source, target, original, changed, cost) {
    const n = source.length;
    const strToId = new Map();
    let idCounter = 0;

    function getId(s) {
        if (!strToId.has(s)) {
            strToId.set(s, idCounter++);
        }
        return strToId.get(s);
    }

    const m = original.length;
    for (let i = 0; i < m; i++) {
        getId(original[i]);
        getId(changed[i]);
    }

    const V = idCounter;
    const INF = 1e16;
    const dist = Array.from({ length: V }, () => Array(V).fill(INF));
    for (let i = 0; i < V; i++) {
        dist[i][i] = 0;
    }

    for (let i = 0; i < m; i++) {
        const u = getId(original[i]);
        const v = getId(changed[i]);
        dist[u][v] = Math.min(dist[u][v], cost[i]);
    }

    // Floyd-Warshall
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            if (dist[i][k] >= INF) continue;
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    const lengths = Array.from(new Set(original.map(s => s.length)));

    const dp = Array(n + 1).fill(INF);
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        if (source[i - 1] === target[i - 1] && dp[i - 1] < INF) {
            dp[i] = Math.min(dp[i], dp[i - 1]);
        }
        for (const L of lengths) {
            const j = i - L;
            if (j >= 0 && dp[j] < INF) {
                const subS = source.substring(j, i);
                const subT = target.substring(j, i);
                const u = strToId.get(subS);
                const v = strToId.get(subT);
                if (u !== undefined && v !== undefined && dist[u][v] < INF) {
                    dp[i] = Math.min(dp[i], dp[j] + dist[u][v]);
                }
            }
        }
    }

    return dp[n] >= INF ? -1 : dp[n];
};
