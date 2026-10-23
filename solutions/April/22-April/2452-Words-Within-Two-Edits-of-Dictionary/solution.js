/**
 * Problem: LeetCode 2452 - Words Within Two Edits of Dictionary
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
var twoEditWords = function(queries, dictionary) {
    const result = [];
    const wordLen = queries[0].length;

    for (let q = 0; q < queries.length; q++) {
        const query = queries[q];

        for (let d = 0; d < dictionary.length; d++) {
            const word = dictionary[d];
            let diff = 0;

            for (let i = 0; i < wordLen; i++) {
                if (query.charCodeAt(i) !== word.charCodeAt(i)) {
                    diff++;
                    if (diff > 2) break;
                }
            }

            if (diff <= 2) {
                result.push(query);
                break;
            }
        }
    }

    return result;
};
