class Solution {
    public String lexGreaterPermutation(String s, String target) {
        int n = s.length();
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) {
            cnt[c - 'a']++;
        }

        int breakIndex = -1;
        int[] breakCnt = null;

        for (int i = 0; i < n; i++) {
            int tc = target.charAt(i) - 'a';

            // check if a character greater than target[i] is available right now
            boolean found = false;
            for (int c = tc + 1; c < 26; c++) {
                if (cnt[c] > 0) {
                    found = true;
                    break;
                }
            }
            if (found) {
                breakIndex = i;          // candidate breakpoint (keep the rightmost one)
                breakCnt = cnt.clone();  // save state at this point
            }

            // try to continue matching target as prefix
            if (cnt[tc] > 0) {
                cnt[tc]--;
            } else {
                break; // can't match prefix any further, no later breakpoints possible
            }
        }

        if (breakIndex == -1) {
            return ""; // no valid permutation strictly greater than target
        }

        StringBuilder sb = new StringBuilder();
        sb.append(target, 0, breakIndex); // matched prefix

        int tc = target.charAt(breakIndex) - 'a';
        int chosen = -1;
        for (int c = tc + 1; c < 26; c++) {
            if (breakCnt[c] > 0) {
                chosen = c;
                break;
            }
        }
        breakCnt[chosen]--;
        sb.append((char) ('a' + chosen)); // smallest char strictly greater than target[breakIndex]

        // fill the rest with remaining letters in ascending order (smallest arrangement)
        for (int c = 0; c < 26; c++) {
            for (int k = 0; k < breakCnt[c]; k++) {
                sb.append((char) ('a' + c));
            }
        }

        return sb.toString();
    }
}
