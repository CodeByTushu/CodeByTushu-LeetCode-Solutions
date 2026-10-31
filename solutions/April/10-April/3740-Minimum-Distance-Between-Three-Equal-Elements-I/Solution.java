/**
 * Problem: LeetCode 3740 - Minimum Distance Between Three Equal Elements I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int minimumDistance(int[] nums) {
        Map<Integer, List<Integer>> map = new HashMap<>();
        int minDistance = Integer.MAX_VALUE;

        for (int i = 0; i < nums.length; i++) {
            int val = nums[i];
            map.putIfAbsent(val, new ArrayList<>());
            List<Integer> indices = map.get(val);
            indices.add(i);

            int size = indices.size();
            if (size >= 3) {
                int first = indices.get(size - 3);
                int third = indices.get(size - 1);
                minDistance = Math.min(minDistance, 2 * (third - first));
            }
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
