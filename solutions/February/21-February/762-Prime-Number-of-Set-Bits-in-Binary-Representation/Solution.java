/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countPrimeSetBits(int left, int right) {
        // Bitmask representing prime bit counts up to 19:
        // Primes <= 19 are 2, 3, 5, 7, 11, 13, 17, 19
        // mask = (1<<2)|(1<<3)|(1<<5)|(1<<7)|(1<<11)|(1<<13)|(1<<17)|(1<<19) = 665772
        int primeMask = 665772;
        int count = 0;

        for (int i = left; i <= right; i++) {
            int setBits = Integer.bitCount(i);
            if (((primeMask >> setBits) & 1) != 0) {
                count++;
            }
        }

        return count;
    }
}
