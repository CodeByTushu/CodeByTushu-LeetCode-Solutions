/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public List<Integer> survivedRobotsHealths(int[] positions, int[] healths, String directions) {
        int n = positions.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }

        // Sort indices based on robot positions in ascending order
        Arrays.sort(indices, (a, b) -> Integer.compare(positions[a], positions[b]));

        Deque<Integer> stack = new ArrayDeque<>(); // stores indices of 'R' moving robots

        for (int curr : indices) {
            if (directions.charAt(curr) == 'R') {
                stack.push(curr);
            } else {
                // Robot moving 'L' collides with any 'R' robots encountered so far
                while (!stack.isEmpty() && healths[curr] > 0) {
                    int top = stack.peek();
                    if (healths[top] < healths[curr]) {
                        healths[top] = 0;
                        stack.pop();
                        healths[curr] -= 1;
                    } else if (healths[top] > healths[curr]) {
                        healths[curr] = 0;
                        healths[top] -= 1;
                    } else {
                        // Equal health: both robots eliminated
                        healths[top] = 0;
                        healths[curr] = 0;
                        stack.pop();
                    }
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (healths[i] > 0) {
                result.add(healths[i]);
            }
        }
        return result;
    }
}
