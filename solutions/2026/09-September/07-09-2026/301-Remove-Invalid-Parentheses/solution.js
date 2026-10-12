/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    let leftRem = 0;
    let rightRem = 0;

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(') {
            leftRem++;
        } else if (c === ')') {
            if (leftRem > 0) leftRem--;
            else rightRem++;
        }
    }

    const result = [];

    const isValid = (str) => {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (c === '(') count++;
            else if (c === ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count === 0;
    };

    const dfs = (str, start, left, right) => {
        if (left === 0 && right === 0) {
            if (isValid(str)) result.push(str);
            return;
        }

        for (let i = start; i < str.length; i++) {
            // Skip duplicates
            if (i > start && str[i] === str[i - 1]) continue;

            const c = str[i];
            if (c !== '(' && c !== ')') continue;

            const next = str.slice(0, i) + str.slice(i + 1);

            if (c === '(' && left > 0) {
                dfs(next, i, left - 1, right);
            } else if (c === ')' && right > 0) {
                dfs(next, i, left, right - 1);
            }
        }
    };

    dfs(s, 0, leftRem, rightRem);
    return result;
};
