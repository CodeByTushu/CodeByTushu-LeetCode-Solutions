/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let open = 0; // unmatched '('
    let ans = 0;  // insertions
    let i = 0;
    const n = s.length;

    while (i < n) {
        if (s[i] === '(') {
            open++;
            i++;
        } else {
            // Need two consecutive ')'
            if (i + 1 < n && s[i + 1] === ')') {
                i += 2;
            } else {
                ans++; // insert missing ')'
                i++;
            }

            if (open > 0) {
                open--;
            } else {
                ans++; // insert missing '('
            }
        }
    }

    return ans + open * 2;
};
