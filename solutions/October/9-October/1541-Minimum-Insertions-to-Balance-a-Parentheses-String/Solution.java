class Solution {
    public int minInsertions(String s) {
        int open = 0; // unmatched '('
        int ans = 0;  // insertions
        int i = 0, n = s.length();

        while (i < n) {
            if (s.charAt(i) == '(') {
                open++;
                i++;
            } else {
                // Need two consecutive ')'
                if (i + 1 < n && s.charAt(i + 1) == ')') {
                    i += 2;
                } else {
                    ans++; // insert missing ')'
                    i++;
                }

                if (open > 0) {
                    open--;
                } else {
                    ans++; // insert missing '('
                }
            }
        }

        return ans + open * 2;
    }
}
