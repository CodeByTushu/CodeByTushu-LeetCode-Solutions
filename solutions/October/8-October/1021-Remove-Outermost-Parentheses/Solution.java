class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        int depth = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                if (depth > 0) sb.append(c);
                depth++;
            } else {
                depth--;
                if (depth > 0) sb.append(c);
            }
        }
        return sb.toString();
    }
}
