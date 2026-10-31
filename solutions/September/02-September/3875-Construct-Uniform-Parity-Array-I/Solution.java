/**
 * Problem: LeetCode 3875 - Construct Uniform Parity Array I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean uniformArray(int[] nums1) {
        int oddCount = 0, evenCount = 0;
        for (int x : nums1) {
            if (x % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        boolean allEven = (oddCount == 0 || oddCount >= 2);
        boolean allOdd = (evenCount == 0 || oddCount >= 1);
        return allEven || allOdd;
    }
}
