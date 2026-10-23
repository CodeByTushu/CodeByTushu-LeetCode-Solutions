import java.util.*;

/**
 * Problem: LeetCode 3016 - Minimum Number of Pushes to Type Word II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minimumPushes(String word) {
        int[] freq = new int[26];
        for (char c : word.toCharArray()) {
            freq[c - 'a']++;
        }
        
        Integer[] idx = new Integer[26];
        for (int i = 0; i < 26; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> freq[b] - freq[a]);
        
        int totalPushes = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[idx[i]] == 0) break;
            int pushCount = (i / 8) + 1;
            totalPushes += pushCount * freq[idx[i]];
        }
        
        return totalPushes;
    }
}
