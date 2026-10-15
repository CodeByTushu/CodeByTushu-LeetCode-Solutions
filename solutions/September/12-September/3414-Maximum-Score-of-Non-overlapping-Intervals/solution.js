/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    const n = intervals.length;
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = [intervals[i][0], intervals[i][1], intervals[i][2], i];
    }

    arr.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[2] !== b[2]) return a[2] - b[2];
        return a[3] - b[3];
    });

    const posScore = Array.from({ length: n + 1 }, () => new Array(5).fill(-1n));
    const posIdx = Array.from({ length: n + 1 }, () => new Array(5).fill(null));

    function isLess(a, b) {
        if (!b) return true;
        if (!a) return false;
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) return a[i] < b[i];
        }
        return a.length < b.length;
    }

    for (let i = 0; i < n; i++) {
        let lo = 0, hi = i - 1, prev = -1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid][1] < arr[i][0]) {
                prev = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        const p = prev + 1;

        for (let k = 1; k <= 4; k++) {
            posScore[i + 1][k] = posScore[i][k];
            posIdx[i + 1][k] = posIdx[i][k];

            const prevS = (k === 1) ? 0n : posScore[p][k - 1];
            const prevI = (k === 1) ? [] : posIdx[p][k - 1];

            if (k === 1 || prevS >= 0n) {
                const newScore = prevS + BigInt(arr[i][2]);
                const newIdx = (prevI ? [...prevI] : []);
                newIdx.push(arr[i][3]);
                newIdx.sort((a, b) => a - b);

                if (posScore[i + 1][k] < newScore ||
                   (posScore[i + 1][k] === newScore && isLess(newIdx, posIdx[i + 1][k]))) {
                    posScore[i + 1][k] = newScore;
                    posIdx[i + 1][k] = newIdx;
                }
            }
        }
    }

    let best = -1n;
    let ans = [];
    for (let k = 1; k <= 4; k++) {
        const s = posScore[n][k];
        const idx = posIdx[n][k];
        if (s < 0n) continue;
        if (s > best || (s === best && isLess(idx, ans))) {
            best = s;
            ans = idx;
        }
    }

    return ans || [];
};
