import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> removeInvalidParentheses(String s) {
        int leftRem = 0, rightRem = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                leftRem++;
            } else if (c == ')') {
                if (leftRem > 0) leftRem--;
                else rightRem++;
            }
        }

        List<String> result = new ArrayList<>();
        dfs(s, 0, leftRem, rightRem, result);
        return result;
    }

    private void dfs(String s, int start, int leftRem, int rightRem, List<String> result) {
        if (leftRem == 0 && rightRem == 0) {
            if (isValid(s)) result.add(s);
            return;
        }

        for (int i = start; i < s.length(); i++) {
            // Skip duplicates
            if (i > start && s.charAt(i) == s.charAt(i - 1)) continue;

            char c = s.charAt(i);
            if (c != '(' && c != ')') continue;

            String next = s.substring(0, i) + s.substring(i + 1);

            if (c == '(' && leftRem > 0) {
                dfs(next, i, leftRem - 1, rightRem, result);
            } else if (c == ')' && rightRem > 0) {
                dfs(next, i, leftRem, rightRem - 1, result);
            }
        }
    }

    private boolean isValid(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') count++;
            else if (c == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }
}
