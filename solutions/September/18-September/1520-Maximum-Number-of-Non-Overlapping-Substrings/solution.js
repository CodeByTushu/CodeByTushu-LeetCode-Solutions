/**
 * Problem: LeetCode 1520 - Maximum Number of Non-Overlapping Substrings
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const n = s.length;
    const first = new Array(26).fill(Infinity);
    const last = new Array(26).fill(-1);
    
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        first[c] = Math.min(first[c], i);
        last[c] = Math.max(last[c], i);
    }
    
    const result = [];
    let prevEnd = -1;
    
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (first[c] !== i) continue;
        
        let l = i;
        let r = last[c];
        let valid = true;
        
        for (let j = l; j <= r; j++) {
            const ch = s.charCodeAt(j) - 97;
            if (first[ch] < l) {
                valid = false;
                break;
            }
            r = Math.max(r, last[ch]);
        }
        
        if (!valid) continue;
        
        if (l > prevEnd) {
            result.push(s.slice(l, r + 1));
            prevEnd = r;
        } else if (r < prevEnd) {
            result[result.length - 1] = s.slice(l, r + 1);
            prevEnd = r;
        }
    }
    
    return result;
};
