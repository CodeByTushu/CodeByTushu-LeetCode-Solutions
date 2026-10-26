/**
 * Problem: LeetCode 761 - Special Binary String
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public String makeLargestSpecial(String s) {
        if (s.length() <= 2) {
            return s;
        }

        List<String> list = new ArrayList<>();
        int count = 0;
        int start = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                count++;
            } else {
                count--;
            }

            if (count == 0) {
                // Primitive special substring found: s[start ... i]
                // The inner substring is s[start + 1 ... i - 1]
                String inner = makeLargestSpecial(s.substring(start + 1, i));
                list.add("1" + inner + "0");
                start = i + 1;
            }
        }

        Collections.sort(list, Collections.reverseOrder());

        StringBuilder sb = new StringBuilder();
        for (String sub : list) {
            sb.append(sub);
        }

        return sb.toString();
    }
}
