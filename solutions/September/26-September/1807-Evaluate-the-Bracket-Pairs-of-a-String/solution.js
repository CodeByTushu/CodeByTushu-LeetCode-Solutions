/**
 * Problem: LeetCode 1807 - Evaluate the Bracket Pairs of a String
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    const map = new Map();
    for (const [k, v] of knowledge) {
        map.set(k, v);
    }

    const result = [];
    let i = 0;
    const n = s.length;

    while (i < n) {
        if (s[i] === '(') {
            let j = i + 1;
            while (s[j] !== ')') {
                j++;
            }
            const key = s.slice(i + 1, j);
            result.push(map.has(key) ? map.get(key) : '?');
            i = j + 1;
        } else {
            result.push(s[i]);
            i++;
        }
    }

    return result.join('');
};
