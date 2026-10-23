/**
 * Problem: LeetCode 2463 - Minimum Total Distance Traveled
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
var minimumTotalDistance = function(robot, factory) {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const n = robot.length;
    const m = factory.length;
    const INF = 1e16;

    let dp = new Float64Array(n + 1).fill(INF);
    dp[0] = 0;

    for (let j = 0; j < m; j++) {
        const [pos, limit] = factory[j];
        const nextDp = new Float64Array(dp);

        for (let i = 1; i <= n; i++) {
            let cost = 0;
            for (let k = 1; k <= Math.min(i, limit); k++) {
                cost += Math.abs(robot[i - k] - pos);
                if (dp[i - k] !== INF) {
                    nextDp[i] = Math.min(nextDp[i], dp[i - k] + cost);
                }
            }
        }
        dp = nextDp;
    }

    return dp[n];
};
