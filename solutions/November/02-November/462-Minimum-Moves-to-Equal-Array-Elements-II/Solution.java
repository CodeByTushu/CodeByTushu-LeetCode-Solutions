/**
 * Problem: LeetCode 462 - Minimum Moves to Equal Array Elements II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.*;

class Solution {
    public int minMoves2(int[] nums) {
        Arrays.sort(nums);
        int median = nums[nums.length / 2];
        long moves = 0;
        for (int x : nums) {
            moves += Math.abs((long) x - median);
        }
        return (int) moves;
    }
}
