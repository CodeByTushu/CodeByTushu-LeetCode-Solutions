/**
 * Problem: LeetCode 3518 - Smallest Palindromic Rearrangement II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var smallestPalindrome = function(s, k) {
    const CAP = 2000000n;

    function combCapped(n, k) {
        if (k < 0n || k > n) return 0n;
        if (k > n - k) k = n - k;
        let res = 1n;
        for (let i = 1n; i <= k; i++) {
            res = (res * (n - k + i)) / i;
            if (res > CAP) return CAP + 1n;
        }
        return res;
    }

    function countArrangements(cnt) {
        let total = 0n;
        let m = 1n;
        for (let i = 0; i < 26; i++) {
            if (cnt[i] === 0) continue;
            const ci = BigInt(cnt[i]);
            const c = combCapped(total + ci, ci);
            m *= c;
            if (m > CAP) m = CAP + 1n;
            total += ci;
        }
        return m;
    }

    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
    }

    let midChar = '';
    let hasMid = false;
    const half = new Array(26).fill(0);
    let halfLen = 0;

    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 === 1) {
            midChar = String.fromCharCode(97 + i);
            hasMid = true;
        }
        half[i] = Math.floor(count[i] / 2);
        halfLen += half[i];
    }

    let kk = BigInt(k);
    if (countArrangements(half) < kk) return '';

    const cur = [...half];
    const sb = [];

    for (let pos = 0; pos < halfLen; pos++) {
        for (let c = 0; c < 26; c++) {
            if (cur[c] === 0) continue;
            cur[c]--;
            const cnt = countArrangements(cur);
            if (cnt >= kk) {
                sb.push(String.fromCharCode(97 + c));
                break;
            } else {
                kk -= cnt;
                cur[c]++;
            }
        }
    }

    const half1 = sb.join('');
    const right = sb.slice().reverse().join('');
    return half1 + (hasMid ? midChar : '') + right;
};
