/**
 * Problem: LeetCode 3751 - Total Waviness of Numbers in Range I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int totalWaviness(int num1, int num2) {

        int ans = 0;

        for (int num = num1; num <= num2; num++) {
            ans += getWaviness(num);
        }

        return ans;
    }

    private int getWaviness(int num) {

        char[] digits = String.valueOf(num).toCharArray();

        if (digits.length < 3) {
            return 0;
        }

        int waviness = 0;

        for (int i = 1; i < digits.length - 1; i++) {

            if ((digits[i] > digits[i - 1] && digits[i] > digits[i + 1]) ||
                (digits[i] < digits[i - 1] && digits[i] < digits[i + 1])) {
                waviness++;
            }
        }

        return waviness;
    }
}
