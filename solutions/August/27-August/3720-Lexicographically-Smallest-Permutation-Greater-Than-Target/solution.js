/**
 * Problem: LeetCode 3720 - Lexicographically Smallest Permutation Greater Than Target
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {
    const n = s.length;
    const cnt = new Array(26).fill(0);
    const codeA = 97; // 'a'.charCodeAt(0)

    for (let i = 0; i < n; i++) {
        cnt[s.charCodeAt(i) - codeA]++;
    }

    let breakIndex = -1;
    let breakCnt = null;

    for (let i = 0; i < n; i++) {
        const tc = target.charCodeAt(i) - codeA;

        // check if a character greater than target[i] is available right now
        let found = false;
        for (let c = tc + 1; c < 26; c++) {
            if (cnt[c] > 0) {
                found = true;
                break;
            }
        }
        if (found) {
            breakIndex = i;         // candidate breakpoint (keep the rightmost one)
            breakCnt = cnt.slice(); // save state at this point
        }

        // try to continue matching target as prefix
        if (cnt[tc] > 0) {
            cnt[tc]--;
        } else {
            break; // can't match prefix any further, no later breakpoints possible
        }
    }

    if (breakIndex === -1) {
        return ""; // no valid permutation strictly greater than target
    }

    let res = target.substring(0, breakIndex); // matched prefix
    const tc = target.charCodeAt(breakIndex) - codeA;

    let chosen = -1;
    for (let c = tc + 1; c < 26; c++) {
        if (breakCnt[c] > 0) {
            chosen = c;
            break;
        }
    }
    breakCnt[chosen]--;
    res += String.fromCharCode(codeA + chosen); // smallest char strictly greater than target[breakIndex]

    // fill the rest with remaining letters in ascending order (smallest arrangement)
    for (let c = 0; c < 26; c++) {
        if (breakCnt[c] > 0) {
            res += String.fromCharCode(codeA + c).repeat(breakCnt[c]);
        }
    }

    return res;
};
