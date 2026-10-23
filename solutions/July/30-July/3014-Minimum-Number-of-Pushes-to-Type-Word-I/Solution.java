/**
 * Problem: LeetCode 3014 - Minimum Number of Pushes to Type Word I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minimumPushes(String word) {
        int n = word.length();
        int totalCost = 0;
        for (int i = 0; i < n; i++) {
            totalCost += (i / 8) + 1;
        }
        return totalCost;
    }
}
