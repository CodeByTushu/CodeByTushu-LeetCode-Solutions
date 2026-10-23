import java.util.*;

/**
 * Problem: LeetCode 1081 - Smallest Subsequence of Distinct Characters
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String smallestSubsequence(String s) {
        int[] last = new int[26];
        boolean[] used = new boolean[26];
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }

        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (used[c - 'a']) continue;

            while (!stack.isEmpty()
                    && stack.peekLast() > c
                    && last[stack.peekLast() - 'a'] > i) {
                used[stack.pollLast() - 'a'] = false;
            }
            stack.offerLast(c);
            used[c - 'a'] = true;
        }

        StringBuilder ans = new StringBuilder();
        while (!stack.isEmpty()) {
            ans.append(stack.pollFirst());
        }
        return ans.toString();
    }
}
