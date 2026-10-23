/**
 * Problem: LeetCode 1927 - Sum Game
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean sumGame(String num) {
        int n = num.length();
        int half = n / 2;

        int sum1 = 0, sum2 = 0;
        int q1 = 0, q2 = 0;

        for (int i = 0; i < half; i++) {
            char c = num.charAt(i);
            if (c == '?') {
                q1++;
            } else {
                sum1 += c - '0';
            }
        }

        for (int i = half; i < n; i++) {
            char c = num.charAt(i);
            if (c == '?') {
                q2++;
            } else {
                sum2 += c - '0';
            }
        }

        int totalQ = q1 + q2;
        if (totalQ % 2 == 1) {
            return true; // Alice always wins with the last move
        }

        int diff = sum1 - sum2;
        int finalDiff = diff + 9 * (q1 - q2) / 2;

        return finalDiff != 0;
    }
}
