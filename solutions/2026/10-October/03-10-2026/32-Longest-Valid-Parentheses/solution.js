/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    const n = s.length;
    const stack = [-1];
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLen;
};
