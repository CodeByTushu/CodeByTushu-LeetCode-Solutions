/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function(s) {
    let result = '';
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(') {
            if (depth > 0) result += c;
            depth++;
        } else {
            depth--;
            if (depth > 0) result += c;
        }
    }
    return result;
};
