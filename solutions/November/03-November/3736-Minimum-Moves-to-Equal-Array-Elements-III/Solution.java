/**
 * Problem: LeetCode 3736 - Minimum Moves to Equal Array Elements III
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minMoves(int[] nums) {
        int max = 0;
        for (int x : nums) {
            max = Math.max(max, x);
        }

        int moves = 0;
        for (int x : nums) {
            moves += max - x;
        }

        return moves;
    }
}
