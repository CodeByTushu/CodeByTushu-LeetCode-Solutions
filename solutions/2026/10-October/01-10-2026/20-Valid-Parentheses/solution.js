/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if ((s.length & 1) === 1) return false;
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            if (stack.length === 0 || stack.pop() !== map[c]) {
                return false;
            }
        }
    }
    return stack.length === 0;
};
