/**
 * Problem: LeetCode 3501 - Maximize Active Section with Trade II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxActiveSectionsAfterTrade = function(s, queries) {
    const n = s.length;

    // 1. Run-length encode s
    const runs = [];
    let i = 0;
    while (i < n) {
        let j = i;
        while (j < n && s[j] === s[i]) j++;
        runs.push([i, j - 1, s.charCodeAt(i) - 48]);
        i = j;
    }

    let totalOnes = 0;
    for (let k = 0; k < n; k++) {
        if (s[k] === '1') totalOnes++;
    }

    const m = runs.length;

    // 2. Collect candidate interior 1-runs
    const candStart = [];
    const candEnd = [];
    const fullZL = [];
    const fullZR = [];
    const fullG = [];

    for (let idx = 1; idx < m - 1; idx++) {
        if (runs[idx][2] === 1) {
            const zl = runs[idx][0] - runs[idx - 1][0];
            const zr = runs[idx + 1][1] - runs[idx][1];
            candStart.push(runs[idx][0]);
            candEnd.push(runs[idx][1]);
            fullZL.push(zl);
            fullZR.push(zr);
            fullG.push(zl + zr);
        }
    }

    const cnt = candStart.length;

    // 3. Sparse table over fullG for O(1) range-max queries
    const log2 = new Int32Array(cnt + 1);
    for (let k = 2; k <= cnt; k++) log2[k] = log2[Math.floor(k / 2)] + 1;

    const LOG = cnt > 0 ? log2[cnt] : 0;
    const sparse = [];
    if (cnt > 0) {
        sparse.push(new Int32Array(fullG));
        for (let k = 1; k <= LOG; k++) {
            const half = 1 << (k - 1);
            const row = new Int32Array(cnt);
            const prevRow = sparse[k - 1];
            for (let idx = 0; idx + (1 << k) <= cnt; idx++) {
                row[idx] = Math.max(prevRow[idx], prevRow[idx + half]);
            }
            sparse.push(row);
        }
    }

    const upperBound = (arr, val) => {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (arr[mid] <= val) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    const lowerBound = (arr, val) => {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (arr[mid] < val) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // 4. Answer queries
    const ans = new Array(queries.length);
    for (let qIdx = 0; qIdx < queries.length; qIdx++) {
        const l = queries[qIdx][0];
        const r = queries[qIdx][1];
        let result = totalOnes;

        if (cnt > 0) {
            const iLo = upperBound(candStart, l);
            const iHi = lowerBound(candEnd, r) - 1;

            if (iLo <= iHi && iLo < cnt && iHi >= 0) {
                let gain = 0;

                if (iHi - iLo >= 2) {
                    const lo = iLo + 1;
                    const hi = iHi - 1;
                    const len = hi - lo + 1;
                    const kk = log2[len];
                    gain = Math.max(gain, Math.max(sparse[kk][lo], sparse[kk][hi - (1 << kk) + 1]));
                }

                const clipLo = Math.min(candStart[iLo] - l, fullZL[iLo])
                             + Math.min(r - candEnd[iLo], fullZR[iLo]);
                const clipHi = Math.min(candStart[iHi] - l, fullZL[iHi])
                             + Math.min(r - candEnd[iHi], fullZR[iHi]);

                gain = Math.max(gain, clipLo, clipHi);
                result += gain;
            }
        }

        ans[qIdx] = result;
    }

    return ans;
};
