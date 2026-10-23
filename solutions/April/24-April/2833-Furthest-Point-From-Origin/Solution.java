/**
 * Problem: LeetCode 2833 - Furthest Point From Origin
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int furthestDistanceFromOrigin(String moves) {
        int countL = 0;
        int countR = 0;
        int countBlank = 0;
        
        int n = moves.length();
        for (int i = 0; i < n; i++) {
            char c = moves.charAt(i);
            if (c == 'L') {
                countL++;
            } else if (c == 'R') {
                countR++;
            } else {
                countBlank++;
            }
        }
        
        return Math.abs(countL - countR) + countBlank;
    }
}
