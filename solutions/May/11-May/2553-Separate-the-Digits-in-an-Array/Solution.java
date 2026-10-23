/**
 * Problem: LeetCode 2553 - Separate the Digits in an Array
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int[] separateDigits(int[] nums) {
        List<Integer> digits = new ArrayList<>();
        for (int num : nums) {
            List<Integer> temp = new ArrayList<>();
            while (num > 0) {
                temp.add(num % 10);
                num /= 10;
            }
            for (int i = temp.size() - 1; i >= 0; i--) {
                digits.add(temp.get(i));
            }
        }

        int[] ans = new int[digits.size()];
        for (int i = 0; i < digits.size(); i++) {
            ans[i] = digits.get(i);
        }
        return ans;
    }
}
