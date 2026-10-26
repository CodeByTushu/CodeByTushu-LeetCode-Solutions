/**
 * Problem: LeetCode 3719 - Longest Balanced Subarray I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int longestBalanced(int[] nums) {
        int n = nums.length;
        int maxLen = 0;

        // Use a visited timestamp array to track distinct values in O(1) without reallocations
        int[] lastSeen = new int[100001];

        for (int i = 0; i < n; i++) {
            // Prune search if remaining elements cannot exceed maxLen
            if (n - i <= maxLen) {
                break;
            }

            int distinctEven = 0;
            int distinctOdd = 0;
            int currentIteration = i + 1;

            for (int j = i; j < n; j++) {
                int val = nums[j];
                if (lastSeen[val] != currentIteration) {
                    lastSeen[val] = currentIteration;
                    if ((val & 1) == 0) {
                        distinctEven++;
                    } else {
                        distinctOdd++;
                    }
                }

                if (distinctEven == distinctOdd) {
                    maxLen = Math.max(maxLen, j - i + 1);
                }
            }
        }

        return maxLen;
    }
}
