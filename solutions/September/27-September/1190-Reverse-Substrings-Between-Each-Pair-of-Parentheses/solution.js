/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const stack = [];
    let current = [];

    for (const c of s) {
        if (c === '(') {
            stack.push(current);
            current = [];
        } else if (c === ')') {
            current.reverse();
            current = stack.pop().concat(current);
        } else {
            current.push(c);
        }
    }

    return current.join('');
};
