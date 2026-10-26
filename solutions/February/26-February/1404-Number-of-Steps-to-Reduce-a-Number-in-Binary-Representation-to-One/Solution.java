/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numSteps(String s) {
        int steps = 0;
        int carry = 0;

        for (int i = s.length() - 1; i > 0; i--) {
            int bit = (s.charAt(i) - '0') + carry;
            if (bit % 2 == 1) {
                // Odd: add 1 (1 step) making it even, then divide by 2 (1 step) -> 2 steps total
                steps += 2;
                carry = 1;
            } else {
                // Even: divide by 2 (1 step)
                steps += 1;
            }
        }

        // At index 0, value is 1 + carry. If carry is 1, it became 2, requiring 1 more step to reduce to 1.
        return steps + carry;
    }
}
