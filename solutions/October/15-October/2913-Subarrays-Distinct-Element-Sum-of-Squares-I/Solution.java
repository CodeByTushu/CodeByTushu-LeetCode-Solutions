import java.util.List;
import java.util.HashSet;
import java.util.Set;

/**
 * Problem: LeetCode 2913 - Subarrays Distinct Element Sum of Squares I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int sumCounts(List<Integer> nums) {
        int n = nums.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            Set<Integer> distinct = new HashSet<>();
            for (int j = i; j < n; j++) {
                distinct.add(nums.get(j));
                int count = distinct.size();
                total += count * count;
            }
        }
        return total;
    }
}
