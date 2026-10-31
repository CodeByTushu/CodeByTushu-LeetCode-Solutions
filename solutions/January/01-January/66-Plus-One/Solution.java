/**
 * Problem: LeetCode 66 - Plus One
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;
        // Traverse digits from right to left
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        // If all digits were 9 (e.g. 99 -> 100)
        int[] result = new int[n + 1];
        result[0] = 1;
        return result;
    }
}
