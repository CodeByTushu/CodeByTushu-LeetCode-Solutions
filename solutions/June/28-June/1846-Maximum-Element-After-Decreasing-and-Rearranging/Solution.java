import java.util.Arrays;

/**
 * Problem: LeetCode 1846 - Maximum Element After Decreasing and Rearranging
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);

        int ans = 1;

        for (int i = 1; i < arr.length; i++) {
            ans = Math.min(arr[i], ans + 1);
        }

        return ans;
    }
}
