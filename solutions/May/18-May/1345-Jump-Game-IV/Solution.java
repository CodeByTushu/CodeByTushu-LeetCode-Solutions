/**
 * Problem: LeetCode 1345 - Jump Game IV
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int minJumps(int[] arr) {
        int n = arr.length;
        if (n <= 1) {
            return 0;
        }

        // Map each unique number to the list of its indices
        Map<Integer, List<Integer>> valueIndices = new HashMap<>();
        for (int i = 0; i < n; i++) {
            valueIndices.computeIfAbsent(arr[i], k -> new ArrayList<>()).add(i);
        }

        Queue<Integer> queue = new ArrayDeque<>();
        boolean[] visited = new boolean[n];

        queue.offer(0);
        visited[0] = true;
        int steps = 0;

        // Level-order BFS for shortest path
        while (!queue.isEmpty()) {
            int size = queue.size();

            for (int k = 0; k < size; k++) {
                int curr = queue.poll();

                // Target reached: last index of array
                if (curr == n - 1) {
                    return steps;
                }

                // Transition 1: jump backward (curr - 1)
                if (curr - 1 >= 0 && !visited[curr - 1]) {
                    visited[curr - 1] = true;
                    queue.offer(curr - 1);
                }

                // Transition 2: jump forward (curr + 1)
                if (curr + 1 < n && !visited[curr + 1]) {
                    visited[curr + 1] = true;
                    queue.offer(curr + 1);
                }

                // Transition 3: jump to any same-value index
                List<Integer> sameValIndices = valueIndices.get(arr[curr]);
                if (sameValIndices != null) {
                    for (int nextIdx : sameValIndices) {
                        if (!visited[nextIdx]) {
                            visited[nextIdx] = true;
                            queue.offer(nextIdx);
                        }
                    }
                    // Crucial optimization: clear the list to avoid O(N^2) redundant expansions
                    valueIndices.remove(arr[curr]);
                }
            }

            steps++;
        }

        return steps;
    }
}
