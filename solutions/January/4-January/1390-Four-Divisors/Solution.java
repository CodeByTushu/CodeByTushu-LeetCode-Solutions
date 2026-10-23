/**
 * Problem: LeetCode 1390 - Four Divisors
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int sumFourDivisors(int[] nums) {
        int totalSum = 0;

        for (int num : nums) {
            int count = 0;
            int sum = 0;

            for (int d = 1; d * d <= num; d++) {
                if (num % d == 0) {
                    if (d * d == num) {
                        count += 1;
                        sum += d;
                    } else {
                        count += 2;
                        sum += d + (num / d);
                    }
                    if (count > 4) {
                        break;
                    }
                }
            }

            if (count == 4) {
                totalSum += sum;
            }
        }

        return totalSum;
    }
}
