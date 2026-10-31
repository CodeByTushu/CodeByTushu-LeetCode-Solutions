/**
 * Problem: LeetCode 3635 - Earliest Finish Time for Land and Water Rides II
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    function solve(firstStart, firstDur, secondStart, secondDur) {
        const m = secondStart.length;
        const rides = [];
        for (let i = 0; i < m; i++) {
            rides.push([secondStart[i], secondDur[i]]);
        }

        rides.sort((a, b) => a[0] - b[0]);

        const starts = new Int32Array(m);
        const prefixMinDur = new Int32Array(m);
        const suffixMinOpenFinish = new Int32Array(m);

        for (let i = 0; i < m; i++) {
            starts[i] = rides[i][0];
        }

        prefixMinDur[0] = rides[0][1];
        for (let i = 1; i < m; i++) {
            prefixMinDur[i] = Math.min(prefixMinDur[i - 1], rides[i][1]);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1];
        for (let i = m - 2; i >= 0; i--) {
            suffixMinOpenFinish[i] = Math.min(
                suffixMinOpenFinish[i + 1],
                rides[i][0] + rides[i][1]
            );
        }

        function lowerBound(arr, target) {
            let l = 0, r = arr.length;
            while (l < r) {
                const mid = (l + r) >> 1;
                if (arr[mid] < target) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            return l;
        }

        let ans = Infinity;

        for (let i = 0; i < firstStart.length; i++) {
            const t = firstStart[i] + firstDur[i];
            const idx = lowerBound(starts, t);

            let best = Infinity;

            // rides with start >= t
            if (idx < m) {
                best = Math.min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = Math.min(best, t + prefixMinDur[idx - 1]);
            }

            ans = Math.min(ans, best);
        }

        return ans;
    }

    const ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration);
    const ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration);

    return Math.min(ans1, ans2);
};
