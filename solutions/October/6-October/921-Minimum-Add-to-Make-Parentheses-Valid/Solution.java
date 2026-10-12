class Solution {
    public int minAddToMakeValid(String s) {
        int open = 0; // unmatched '('
        int add = 0;  // unmatched ')'
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                open++;
            } else {
                if (open > 0) {
                    open--;
                } else {
                    add++;
                }
            }
        }
        return add + open;
    }
}
