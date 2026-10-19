/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    let ans = '';

    for (const word of words) {
        let sum = 0;
        for (let i = 0; i < word.length; i++) {
            sum += weights[word.charCodeAt(i) - 97];
        }

        const rem = sum % 26;
        // Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
        const mapped = String.fromCharCode(122 - rem);
        ans += mapped;
    }

    return ans;
};
