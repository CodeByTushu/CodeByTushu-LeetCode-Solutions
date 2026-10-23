/**
 * Problem: LeetCode 3783 - Mirror Distance of an Integer
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int mirrorDistance(int n) {
        int temp = n;
        long reversed = 0;
        
        while (temp > 0) {
            reversed = reversed * 10 + (temp % 10);
            temp /= 10;
        }
        
        return (int) Math.abs(n - reversed);
    }
}
