/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
    const last = new Int32Array(26);
    const n = s.length;

    for (let i = 0; i < n; i++) {
        last[s.charCodeAt(i) - 97] = i;
    }

    const used = new Uint8Array(26);
    const stack = [];

    for (let i = 0; i < n; i++) {
        const charCode = s.charCodeAt(i) - 97;
        const char = s[i];

        if (used[charCode]) continue;

        while (
            stack.length > 0 &&
            stack[stack.length - 1] > char &&
            last[stack[stack.length - 1].charCodeAt(0) - 97] > i
        ) {
            used[stack.pop().charCodeAt(0) - 97] = 0;
        }

        stack.push(char);
        used[charCode] = 1;
    }

    return stack.join('');
};
