/**
 * Problem: LeetCode 2976 - Minimum Cost to Convert String I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm for All-Pairs Shortest Paths
 * Time Complexity: O(|Σ|^3 + |E| + N) where |Σ| = 26, N = source.length
 * Space Complexity: O(|Σ|^2) = O(1) auxiliary space
 */

/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function(source, target, original, changed, cost) {
    const NUM_CHARS = 26;
    const INF = 1e15;

    const dist = Array.from({ length: NUM_CHARS }, () => Array(NUM_CHARS).fill(INF));
    for (let i = 0; i < NUM_CHARS; i++) {
        dist[i][i] = 0;
    }

    // Populate direct edge weights taking minimum in case of duplicate operations
    for (let i = 0; i < original.length; i++) {
        const u = original[i].charCodeAt(0) - 97;
        const v = changed[i].charCodeAt(0) - 97;
        dist[u][v] = Math.min(dist[u][v], cost[i]);
    }

    // Floyd-Warshall all-pairs shortest paths
    for (let k = 0; k < NUM_CHARS; k++) {
        for (let i = 0; i < NUM_CHARS; i++) {
            for (let j = 0; j < NUM_CHARS; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    let totalCost = 0;
    const n = source.length;

    for (let i = 0; i < n; i++) {
        const s = source.charCodeAt(i) - 97;
        const t = target.charCodeAt(i) - 97;

        if (s !== t) {
            if (dist[s][t] >= INF) {
                return -1; // Transformation impossible
            }
            totalCost += dist[s][t];
        }
    }

    return totalCost;
};
