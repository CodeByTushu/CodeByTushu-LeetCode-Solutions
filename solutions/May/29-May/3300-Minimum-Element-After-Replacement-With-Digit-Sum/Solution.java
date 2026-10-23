/**
 * Problem: LeetCode 3300 - Minimum Element After Replacement With Digit Sum
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minElement(int[] nums) {
        int minVal = Integer.MAX_VALUE;

        for (int num : nums) {
            int sum = 0;
            int temp = num;
            while (temp > 0) {
                sum += temp % 10;
                temp /= 10;
            }
            if (sum < minVal) {
                minVal = sum;
            }
        }

        return minVal;
    }
}
