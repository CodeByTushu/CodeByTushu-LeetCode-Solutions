/**
 * Problem: 3474. Lexicographically Smallest Generated String
 * Difficulty: Hard
 * Language: Java
 * 
 * Approach:
 * We need to construct the lexicographically smallest string of length n + m - 1
 * that matches str2 at all indices i where str1[i] == 'T', and does not match str2
 * at all indices i where str1[i] == 'F'.
 * 
 * 1. Enforce 'T' Constraints:
 *    - For each i where str1[i] == 'T', write str2[j] to word[i + j].
 *    - If any cell is assigned two conflicting characters, return "" immediately.
 *    - Mark all indices covered by 'T' constraints as non-modifiable.
 * 
 * 2. Fill Unconstrained Positions with 'a':
 *    - To make the string lexicographically minimal, fill all remaining unassigned
 *      positions with 'a'.
 * 
 * 3. Satisfy 'F' Constraints:
 *    - For each i where str1[i] == 'F', check if word[i .. i + m - 1] equals str2.
 *    - If an accidental match occurs, break it by changing the rightmost modifiable
 *      index in [i, i + m - 1] to 'b'.
 *    - If no modifiable index exists in that window, return "" immediately.
 *    - Lock that modified index so it is not altered later.
 * 
 * 4. Final Verification:
 *    - Verify all 'T' and 'F' conditions across the completed string.
 * 
 * Time Complexity: O(n * m)
 * Space Complexity: O(n + m) auxiliary space
 */

class Solution {
    public String generateString(String str1, String str2) {
        int n = str1.length();
        int m = str2.length();
        int sz = n + m - 1;

        char[] ans = new char[sz];
        boolean[] modifiable = new boolean[sz];
        for (int i = 0; i < sz; i++) {
            modifiable[i] = true;
        }

        // 1. Enforce 'T' constraints
        for (int i = 0; i < n; i++) {
            if (str1.charAt(i) == 'T') {
                for (int j = 0; j < m; j++) {
                    int pos = i + j;
                    char ch = str2.charAt(j);
                    if (ans[pos] != 0 && ans[pos] != ch) {
                        return "";
                    }
                    ans[pos] = ch;
                    modifiable[pos] = false;
                }
            }
        }

        // 2. Fill unassigned positions with 'a'
        for (int i = 0; i < sz; i++) {
            if (ans[i] == 0) {
                ans[i] = 'a';
            }
        }

        // 3. Resolve 'F' constraints
        for (int i = 0; i < n; i++) {
            if (str1.charAt(i) == 'F') {
                boolean match = true;
                for (int j = 0; j < m; j++) {
                    if (ans[i + j] != str2.charAt(j)) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    int modifiablePos = -1;
                    for (int j = m - 1; j >= 0; j--) {
                        if (modifiable[i + j]) {
                            modifiablePos = i + j;
                            break;
                        }
                    }

                    if (modifiablePos == -1) {
                        return "";
                    }

                    ans[modifiablePos] = 'b';
                    modifiable[modifiablePos] = false;
                }
            }
        }

        // 4. Final verification
        for (int i = 0; i < n; i++) {
            boolean match = true;
            for (int j = 0; j < m; j++) {
                if (ans[i + j] != str2.charAt(j)) {
                    match = false;
                    break;
                }
            }
            if (str1.charAt(i) == 'T' && !match) return "";
            if (str1.charAt(i) == 'F' && match) return "";
        }

        return new String(ans);
    }
}
