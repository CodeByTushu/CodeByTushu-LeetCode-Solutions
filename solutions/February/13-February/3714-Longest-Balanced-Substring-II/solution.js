/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    const n = s.length;
    let maxLen = 1;

    // Case 1: Exactly 1 distinct character
    let curRun = 1;
    for (let i = 1; i < n; i++) {
        if (s[i] === s[i - 1]) {
            curRun++;
        } else {
            curRun = 1;
        }
        if (curRun > maxLen) {
            maxLen = curRun;
        }
    }

    // Case 2: Exactly 2 distinct characters
    const pairs = [
        ['a', 'b', 'c'],
        ['b', 'c', 'a'],
        ['a', 'c', 'b']
    ];

    for (const [c1, c2, avoid] of pairs) {
        let start = 0;
        while (start < n) {
            while (start < n && s[start] === avoid) {
                start++;
            }
            if (start >= n) {
                break;
            }
            let end = start;
            while (end < n && s[end] !== avoid) {
                end++;
            }

            const map = new Map();
            map.set(0, start - 1);
            let diff = 0;
            for (let i = start; i < end; i++) {
                if (s[i] === c1) {
                    diff++;
                } else if (s[i] === c2) {
                    diff--;
                }

                if (map.has(diff)) {
                    const len = i - map.get(diff);
                    if (len > maxLen) {
                        maxLen = len;
                    }
                } else {
                    map.set(diff, i);
                }
            }
            start = end;
        }
    }

    // Case 3: Exactly 3 distinct characters
    const stateMap = new Map();
    stateMap.set('0,0', -1);
    let ca = 0, cb = 0, cc = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] === 'a') {
            ca++;
        } else if (s[i] === 'b') {
            cb++;
        } else if (s[i] === 'c') {
            cc++;
        }

        const key = `${ca - cb},${cb - cc}`;
        if (stateMap.has(key)) {
            const len = i - stateMap.get(key);
            if (len > maxLen) {
                maxLen = len;
            }
        } else {
            stateMap.set(key, i);
        }
    }

    return maxLen;
};
