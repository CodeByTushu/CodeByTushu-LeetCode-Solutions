/**
 * Problem: LeetCode 3753 - Total Waviness of Numbers in Range II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    function solve(x) {
        if (x <= 0n) return 0n;

        const num = x.toString();
        const n = num.length;

        const memoCnt = new Map();
        const memoSum = new Map();

        function dfs(pos, prev1, prev2, waviness, tight) {
            if (pos === n) {
                return [1n, BigInt(waviness)];
            }

            const key = (pos << 15) | (prev1 << 10) | (prev2 << 5) | waviness;
            if (!tight && memoCnt.has(key)) {
                return [memoCnt.get(key), memoSum.get(key)];
            }

            const limit = tight ? Number(num[pos]) : 9;
            let count = 0n;
            let sum = 0n;

            for (let digit = 0; digit <= limit; digit++) {
                const nextTight = tight && (digit === limit);
                let nextWaviness = waviness;

                if (prev2 !== 10 && prev1 !== 10) {
                    if ((prev1 > prev2 && prev1 > digit) ||
                        (prev1 < prev2 && prev1 < digit)) {
                        nextWaviness++;
                    }
                }

                let nextPrev2 = prev1;
                let nextPrev1 = digit;

                if (prev1 === 10 && digit === 0) {
                    nextPrev1 = 10;
                    nextPrev2 = 10;
                }

                const [resCnt, resSum] = dfs(pos + 1, nextPrev1, nextPrev2, nextWaviness, nextTight);
                count += resCnt;
                sum += resSum;
            }

            if (!tight) {
                memoCnt.set(key, count);
                memoSum.set(key, sum);
            }

            return [count, sum];
        }

        return dfs(0, 10, 10, 0, true)[1];
    }

    const n1 = BigInt(num1);
    const n2 = BigInt(num2);
    return Number(solve(n2) - solve(n1 - 1n));
};
