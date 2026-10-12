class Solution {
    public int longestValidParentheses(String s) {
        int n = s.length();
        int[] stack = new int[n + 1];
        int top = -1;
        int max = 0;
        stack[++top] = -1;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '(') {
                stack[++top] = i;
            } else {
                top--;
                if (top < 0) {
                    stack[++top] = i;
                } else {
                    max = Math.max(max, i - stack[top]);
                }
            }
        }
        return max;
    }
}
