/**
 * Problem: LeetCode 1306 - Jump Game III
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayDeque;
import java.util.Queue;

class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        Queue<Integer> queue = new ArrayDeque<>();
        boolean[] visited = new boolean[n];

        queue.offer(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int curr = queue.poll();

            // Target reached: current index has value 0
            if (arr[curr] == 0) {
                return true;
            }

            // Jump forward: curr + arr[curr]
            int forward = curr + arr[curr];
            if (forward < n && !visited[forward]) {
                visited[forward] = true;
                queue.offer(forward);
            }

            // Jump backward: curr - arr[curr]
            int backward = curr - arr[curr];
            if (backward >= 0 && !visited[backward]) {
                visited[backward] = true;
                queue.offer(backward);
            }
        }

        return false;
    }
}
