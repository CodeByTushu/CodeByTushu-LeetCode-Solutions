/**
 * Problem: LeetCode 2452 - Words Within Two Edits of Dictionary
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> twoEditWords(String[] queries, String[] dictionary) {
        List<String> result = new ArrayList<>();
        
        for (String query : queries) {
            for (String dictWord : dictionary) {
                if (canMatchWithTwoEdits(query, dictWord)) {
                    result.add(query);
                    break;
                }
            }
        }
        
        return result;
    }
    
    private boolean canMatchWithTwoEdits(String s1, String s2) {
        int diff = 0;
        int len = s1.length();
        for (int i = 0; i < len; i++) {
            if (s1.charAt(i) != s2.charAt(i)) {
                diff++;
                if (diff > 2) return false;
            }
        }
        return true;
    }
}
