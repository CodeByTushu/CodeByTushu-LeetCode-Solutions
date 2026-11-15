/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int numOfSubarrays(int[] arr) {
        final int MOD = 1_000_000_007;

        int odd = 0;      // ab tak kitne prefix sums odd the
        int even = 1;     // empty prefix (sum 0) even hai
        int prefix = 0;   // current prefix sum ki parity (0 = even, 1 = odd)
        long ans = 0;

        for (int x : arr) {
            prefix = (prefix + x) % 2;

            if (prefix == 1) {
                // odd prefix - even prefix = odd sum
                ans += even;
                odd++;
            } else {
                // even prefix - odd prefix = odd sum
                ans += odd;
                even++;
            }

            ans %= MOD;
        }

        return (int) ans;
    }
}
