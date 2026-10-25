/**
 * Problem: LeetCode 3507 - Minimum Pair Removal to Sort Array I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 * 
 * Simulation Approach (Greedy Adjacent Pair Collapse)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */

import java.util.ArrayList;
import java.util.List;

class Solution {
    public int minimumPairRemoval(int[] nums) {
        List<Integer> list = new ArrayList<>();
        for (int x : nums) {
            list.add(x);
        }

        int ops = 0;
        while (!isNonDecreasing(list)) {
            int minSum = Integer.MAX_VALUE;
            int minIdx = -1;

            // Find the leftmost adjacent pair with the minimum sum
            for (int i = 0; i < list.size() - 1; i++) {
                int sum = list.get(i) + list.get(i + 1);
                if (sum < minSum) {
                    minSum = sum;
                    minIdx = i;
                }
            }

            // Replace the pair with their sum
            list.set(minIdx, minSum);
            list.remove(minIdx + 1);
            ops++;
        }

        return ops;
    }

    private boolean isNonDecreasing(List<Integer> list) {
        for (int i = 0; i < list.size() - 1; i++) {
            if (list.get(i) > list.get(i + 1)) {
                return false;
            }
        }
        return true;
    }
}
