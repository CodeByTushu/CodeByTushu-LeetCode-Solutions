/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int minimizeSum(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;

        // Low score can always be made 0 by duplicating an element.
        // Therefore, we only need to minimize the high score (max - min) after changing 2 elements.
        int opt1 = nums[n - 1] - nums[2];     // Change 2 smallest elements
        int opt2 = nums[n - 2] - nums[1];     // Change 1 smallest + 1 largest element
        int opt3 = nums[n - 3] - nums[0];     // Change 2 largest elements

        return Math.min(opt1, Math.min(opt2, opt3));
    }
}
