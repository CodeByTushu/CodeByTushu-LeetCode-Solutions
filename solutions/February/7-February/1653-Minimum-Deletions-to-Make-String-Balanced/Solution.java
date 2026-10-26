/**
 * Problem: LeetCode 1653 - Minimum Deletions to Make String Balanced
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minimumDeletions(String s) {
        int bCount = 0;
        int deletions = 0;

        for (char c : s.toCharArray()) {
            if (c == 'b') {
                bCount++;
            } else {
                // For character 'a', we either delete this 'a' (deletions + 1)
                // or keep it by deleting all prior 'b' characters (bCount).
                deletions = Math.min(deletions + 1, bCount);
            }
        }

        return deletions;
    }
}
