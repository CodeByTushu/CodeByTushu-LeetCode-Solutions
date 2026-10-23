/**
 * Problem: LeetCode 3876 - Construct Uniform Parity Array II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean uniformArray(int[] nums1) {
        return canMakeAll(nums1, 0) || canMakeAll(nums1, 1);
    }

    private boolean canMakeAll(int[] nums, int targetParity) {
        int[] globalMin = {Integer.MAX_VALUE, Integer.MAX_VALUE};
        for (int x : nums) {
            globalMin[x % 2] = Math.min(globalMin[x % 2], x);
        }

        for (int x : nums) {
            int curParity = x % 2;

            if (curParity == targetParity) {
                continue;
            }
            int neededJParity = (targetParity + curParity) % 2;
            if (globalMin[neededJParity] >= x) {
                return false; // no valid strictly smaller j exists
            }
        }
        return true;
    }
}
