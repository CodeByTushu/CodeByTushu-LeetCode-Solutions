/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const freq = new Array(26).fill(0);
    const codeA = 'a'.charCodeAt(0);

    for (let i = 0; i < word.length; i++) {
        freq[word.charCodeAt(i) - codeA]++;
    }

    freq.sort((a, b) => b - a);

    let totalPushes = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;
        const pushCount = Math.floor(i / 8) + 1;
        totalPushes += pushCount * freq[i];
    }

    return totalPushes;
};
