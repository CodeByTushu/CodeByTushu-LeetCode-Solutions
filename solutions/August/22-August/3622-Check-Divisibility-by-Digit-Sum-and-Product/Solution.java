/**
 * Problem: LeetCode 3622 - Check Divisibility by Digit Sum and Product
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkDivisibility(int n) {
        int sum = 0, product = 1;
        int temp = n;
        while (temp > 0) {
            int digit = temp % 10;
            sum += digit;
            product *= digit;
            temp /= 10;
        }
        return n % (sum + product) == 0;
    }
}
