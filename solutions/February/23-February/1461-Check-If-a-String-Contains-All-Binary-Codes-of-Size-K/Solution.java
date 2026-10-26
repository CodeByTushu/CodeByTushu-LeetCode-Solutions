/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean hasAllCodes(String s, int k) {
        int target = 1 << k;
        if (s.length() - k + 1 < target) {
            return false;
        }

        boolean[] seen = new boolean[target];
        int count = 0;
        int hash = 0;
        int mask = target - 1;

        for (int i = 0; i < s.length(); i++) {
            hash = ((hash << 1) & mask) | (s.charAt(i) - '0');
            if (i >= k - 1) {
                if (!seen[hash]) {
                    seen[hash] = true;
                    count++;
                    if (count == target) {
                        return true;
                    }
                }
            }
        }

        return count == target;
    }
}
