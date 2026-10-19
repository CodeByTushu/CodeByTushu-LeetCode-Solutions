/**
 * @param {string} s
 * @return {string}
 */
var processStr = function(s) {
    let result = [];

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (ch >= 'a' && ch <= 'z') {
            result.push(ch);
        } else if (ch === '*') {
            if (result.length > 0) {
                result.pop();
            }
        } else if (ch === '#') {
            result = result.concat(result);
        } else if (ch === '%') {
            result.reverse();
        }
    }

    return result.join('');
};
