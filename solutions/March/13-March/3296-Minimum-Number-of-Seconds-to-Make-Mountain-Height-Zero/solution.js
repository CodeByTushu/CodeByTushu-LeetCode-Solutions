/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function(mountainHeight, workerTimes) {
    let minW = workerTimes[0];
    for (let i = 1; i < workerTimes.length; i++) {
        if (workerTimes[i] < minW) {
            minW = workerTimes[i];
        }
    }

    let low = 1n;
    // Upper bound: fastest worker alone reduces the entire mountain
    let high = (BigInt(minW) * BigInt(mountainHeight) * (BigInt(mountainHeight) + 1n)) / 2n;
    let ans = high;

    function sqrt(val) {
        if (val < 0n) return 0n;
        if (val < 2n) return val;
        let x0 = val / 2n;
        let x1 = (x0 + val / x0) / 2n;
        while (x1 < x0) {
            x0 = x1;
            x1 = (x0 + val / x0) / 2n;
        }
        return x0;
    }

    function canReduce(time) {
        let totalHeight = 0n;
        const targetHeight = BigInt(mountainHeight);

        for (let i = 0; i < workerTimes.length; i++) {
            const w = BigInt(workerTimes[i]);
            const m = time / w;
            if (m > 0n) {
                // Solve x * (x + 1) / 2 <= m  =>  x = (sqrt(1 + 8*m) - 1) / 2
                const s = sqrt(1n + 8n * m);
                const x = (s - 1n) / 2n;
                totalHeight += x;
                if (totalHeight >= targetHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= targetHeight;
    }

    while (low <= high) {
        const mid = (low + high) / 2n;
        if (canReduce(mid)) {
            ans = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    return Number(ans);
};
