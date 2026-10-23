/**
 * Problem: LeetCode 3754 - Concatenate Non-Zero Digits and Multiply by Sum I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long sumAndMultiply(int n) {
        long x = 0;
        long sum = 0;

        if (n == 0) return 0;

        String s = String.valueOf(n);

        for (char ch : s.toCharArray()) {
            if (ch != '0') {
                int digit = ch - '0';
                x = x * 10 + digit;
                sum += digit;
            }
        }

        return x * sum;
    }
}
