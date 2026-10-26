/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int[] sortByBits(int[] arr) {
        // Since arr[i] <= 10000, we can encode the bit count into the number:
        // encoded = bitCount * 10001 + originalValue
        for (int i = 0; i < arr.length; i++) {
            arr[i] += Integer.bitCount(arr[i]) * 10001;
        }

        // Sort the primitive array directly in-place
        Arrays.sort(arr);

        // Decode the original value
        for (int i = 0; i < arr.length; i++) {
            arr[i] %= 10001;
        }

        return arr;
    }
}
