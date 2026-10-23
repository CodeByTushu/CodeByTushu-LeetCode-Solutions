import java.util.*;

/**
 * Problem: LeetCode 1291 - Sequential Digits
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> ans = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= 9; i++) {
            queue.offer(i);
        }
        while (!queue.isEmpty()) {
            int num = queue.poll();
            if (num >= low && num <= high) {
                ans.add(num);
            }
            if (num > high) {
                continue;
            }
            int lastDigit = num % 10;
            if (lastDigit < 9) {
                queue.offer(num * 10 + lastDigit + 1);
            }
        }
        Collections.sort(ans);
        return ans;
    }
}
