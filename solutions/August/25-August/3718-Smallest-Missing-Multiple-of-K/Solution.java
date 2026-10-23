import java.util.HashSet;
import java.util.Set;

/**
 * Problem: LeetCode 3718 - Smallest Missing Multiple of K
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int missingMultiple(int[] nums, int k) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        int multiple = k;
        while (set.contains(multiple)) {
            multiple += k;
        }

        return multiple;
    }
}
