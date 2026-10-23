import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Problem: LeetCode 1520 - Maximum Number of Non-Overlapping Substrings
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public List<String> maxNumOfSubstrings(String s) {
        int n = s.length();
        int[] first = new int[26];
        int[] last  = new int[26];
        Arrays.fill(first, Integer.MAX_VALUE);
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i) - 'a';
            first[c] = Math.min(first[c], i);
            last[c]  = Math.max(last[c],  i);
        }
        List<String> result = new ArrayList<>();
        int prevEnd = -1;
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i) - 'a';
            if (first[c] != i) continue;
            int l = i;
            int r = last[c];
            boolean valid = true;
            for (int j = l; j <= r; j++) {
                int ch = s.charAt(j) - 'a';
                if (first[ch] < l) {
                    valid = false;
                    break;
                }
                r = Math.max(r, last[ch]); // expand window
            }
            if (!valid) continue;
            if (l > prevEnd) {
                result.add(s.substring(l, r + 1));
                prevEnd = r;
            } else if (r < prevEnd) {
                result.set(result.size() - 1, s.substring(l, r + 1));
                prevEnd = r;
            }
        }
        
        return result;
    }
}
