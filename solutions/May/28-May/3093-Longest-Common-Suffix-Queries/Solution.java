/**
 * Problem: LeetCode 3093 - Longest Common Suffix Queries
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        int bestIdx = -1;
    }

    private boolean isBetter(int newIdx, int oldIdx, String[] wordsContainer) {
        if (oldIdx == -1) return true;
        int lenNew = wordsContainer[newIdx].length();
        int lenOld = wordsContainer[oldIdx].length();
        if (lenNew != lenOld) {
            return lenNew < lenOld;
        }
        return newIdx < oldIdx;
    }

    public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {
        TrieNode root = new TrieNode();

        for (int i = 0; i < wordsContainer.length; i++) {
            String word = wordsContainer[i];
            if (isBetter(i, root.bestIdx, wordsContainer)) {
                root.bestIdx = i;
            }

            TrieNode curr = root;
            for (int j = word.length() - 1; j >= 0; j--) {
                int c = word.charAt(j) - 'a';
                if (curr.children[c] == null) {
                    curr.children[c] = new TrieNode();
                }
                curr = curr.children[c];
                if (isBetter(i, curr.bestIdx, wordsContainer)) {
                    curr.bestIdx = i;
                }
            }
        }

        int[] ans = new int[wordsQuery.length];
        for (int i = 0; i < wordsQuery.length; i++) {
            String query = wordsQuery[i];
            TrieNode curr = root;
            int best = root.bestIdx;

            for (int j = query.length() - 1; j >= 0; j--) {
                int c = query.charAt(j) - 'a';
                if (curr.children[c] == null) {
                    break;
                }
                curr = curr.children[c];
                best = curr.bestIdx;
            }

            ans[i] = best;
        }

        return ans;
    }
}
