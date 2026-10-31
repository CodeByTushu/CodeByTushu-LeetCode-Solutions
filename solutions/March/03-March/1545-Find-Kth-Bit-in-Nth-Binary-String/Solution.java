/**
 * Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public char findKthBit(int n, int k) {
        int invertCount = 0;

        while (n > 1) {
            int mid = 1 << (n - 1); // 2^(n-1) is the center index of S_n

            if (k == mid) {
                // The center bit of S_n is always '1' (inverted invertCount times)
                return (invertCount % 2 == 0) ? '1' : '0';
            } else if (k > mid) {
                // In the right half: reverse(invert(S_{n-1}))
                // Symmetrical index in S_{n-1} from right is 2^n - k
                k = (1 << n) - k;
                invertCount++;
            }
            // If k < mid, k remains the same in the left half S_{n-1}
            n--;
        }

        // S_1 is "0"
        return (invertCount % 2 == 0) ? '0' : '1';
    }
}
