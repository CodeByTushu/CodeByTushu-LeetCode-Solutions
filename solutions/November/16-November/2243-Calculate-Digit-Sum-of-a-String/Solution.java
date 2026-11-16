/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public String digitSum(String s, int k) {
        while (s.length() > k) {
            StringBuilder next = new StringBuilder();

            for (int i = 0; i < s.length(); i += k) {
                int sum = 0;
                int end = Math.min(i + k, s.length());

                for (int j = i; j < end; j++) {
                    sum += s.charAt(j) - '0';
                }

                next.append(sum);
            }

            s = next.toString();
        }

        return s;
    }
}
