import java.util.ArrayList;
import java.util.List;

/**
 * Problem: LeetCode 2089 - Find Target Indices After Sorting Array
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public List<Integer> targetIndices(int[] nums, int target) {
        int less = 0, equal = 0;
        for (int x : nums) {
            if (x < target) less++;
            else if (x == target) equal++;
        }
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < equal; i++) {
            result.add(less + i);
        }
        return result;
    }
}
