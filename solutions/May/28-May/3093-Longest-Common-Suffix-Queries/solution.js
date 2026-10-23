/**
 * Problem: LeetCode 3093 - Longest Common Suffix Queries
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function(wordsContainer, wordsQuery) {
    function isBetter(newIdx, oldIdx) {
        if (oldIdx === -1) return true;
        const lenNew = wordsContainer[newIdx].length;
        const lenOld = wordsContainer[oldIdx].length;
        if (lenNew !== lenOld) {
            return lenNew < lenOld;
        }
        return newIdx < oldIdx;
    }

    class TrieNode {
        constructor() {
            this.children = new Map();
            this.bestIdx = -1;
        }
    }

    const root = new TrieNode();

    for (let i = 0; i < wordsContainer.length; i++) {
        const word = wordsContainer[i];
        if (isBetter(i, root.bestIdx)) {
            root.bestIdx = i;
        }

        let curr = root;
        for (let j = word.length - 1; j >= 0; j--) {
            const code = word.charCodeAt(j);
            let nextNode = curr.children.get(code);
            if (!nextNode) {
                nextNode = new TrieNode();
                curr.children.set(code, nextNode);
            }
            curr = nextNode;
            if (isBetter(i, curr.bestIdx)) {
                curr.bestIdx = i;
            }
        }
    }

    const ans = new Int32Array(wordsQuery.length);
    for (let i = 0; i < wordsQuery.length; i++) {
        const query = wordsQuery[i];
        let curr = root;
        let best = root.bestIdx;

        for (let j = query.length - 1; j >= 0; j--) {
            const code = query.charCodeAt(j);
            const nextNode = curr.children.get(code);
            if (!nextNode) {
                break;
            }
            curr = nextNode;
            best = curr.bestIdx;
        }

        ans[i] = best;
    }

    return Array.from(ans);
};
