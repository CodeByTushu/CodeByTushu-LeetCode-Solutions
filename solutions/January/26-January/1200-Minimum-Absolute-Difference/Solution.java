/**
 * Problem: LeetCode 1200 - Minimum Absolute Difference
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 * 
 * Sorting + Single-Pass / Two-Pass Scanning Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (excluding output list, O(log n) for sorting recursion stack)
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<List<Integer>> minimumAbsDifference(int[] arr) {
        Arrays.sort(arr);

        int minDiff = Integer.MAX_VALUE;
        for (int i = 1; i < arr.length; i++) {
            minDiff = Math.min(minDiff, arr[i] - arr[i - 1]);
        }

        List<List<Integer>> result = new ArrayList<>();
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] - arr[i - 1] == minDiff) {
                result.add(Arrays.asList(arr[i - 1], arr[i]));
            }
        }

        return result;
    }
}
