import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public String reverseParentheses(String s) {
        Deque<StringBuilder> stack = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(current);
                current = new StringBuilder();
            } else if (c == ')') {
                current.reverse();
                current = stack.pop().append(current);
            } else {
                current.append(c);
            }
        }

        return current.toString();
    }
}
