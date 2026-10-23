/**
 * Problem: LeetCode 1096 - Brace Expansion II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    const s = expression;
    let i = 0;

    function parse() {
        let result = new Set(['']);

        while (i < s.length && s[i] !== '}') {
            if (s[i] === ',') {
                break;
            }

            const nextSet = parseSingle();
            const newResult = new Set();
            for (const a of result) {
                for (const b of nextSet) {
                    newResult.add(a + b);
                }
            }
            result = newResult;
        }

        return result;
    }

    function parseSingle() {
        if (s[i] === '{') {
            i++; // skip '{'
            const result = new Set();

            while (true) {
                for (const word of parse()) {
                    result.add(word);
                }

                if (i < s.length && s[i] === ',') {
                    i++; // skip ','
                } else {
                    break;
                }
            }

            i++; // skip '}'
            return result;
        }

        const ch = s[i];
        i++;
        return new Set([ch]);
    }

    const resultSet = parse();
    return Array.from(resultSet).sort();
};
