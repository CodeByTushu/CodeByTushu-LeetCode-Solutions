/**
 * Problem: LeetCode 3518 - Smallest Palindromic Rearrangement II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static final long CAP = 2_000_000L;

    public String smallestPalindrome(String s, int k) {
        int n = s.length();
        int[] count = new int[26];
        for (char ch : s.toCharArray()) count[ch - 'a']++;

        char midChar = 0;
        boolean hasMid = false;
        int[] half = new int[26];
        int halfLen = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] % 2 == 1) {
                midChar = (char) ('a' + i);
                hasMid = true;
            }
            half[i] = count[i] / 2;
            halfLen += half[i];
        }

        long kk = k;
        long total = countArrangements(half);
        if (total < kk) return "";

        StringBuilder sb = new StringBuilder();
        int[] cur = half.clone();
        for (int pos = 0; pos < halfLen; pos++) {
            for (int c = 0; c < 26; c++) {
                if (cur[c] == 0) continue;
                cur[c]--;
                long cnt = countArrangements(cur);
                if (cnt >= kk) {
                    sb.append((char) ('a' + c));
                    break;
                } else {
                    kk -= cnt;
                    cur[c]++;
                }
            }
        }

        String half1 = sb.toString();
        StringBuilder result = new StringBuilder();
        result.append(half1);
        if (hasMid) result.append(midChar);
        result.append(new StringBuilder(half1).reverse());
        return result.toString();
    }

    private long countArrangements(int[] cnt) {
        long total = 0;
        long m = 1;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == 0) continue;
            long c = combCapped(total + cnt[i], cnt[i]);
            m *= c;
            if (m > CAP) m = CAP + 1;
            total += cnt[i];
        }
        return m;
    }

    private long combCapped(long n, long k) {
        if (k < 0 || k > n) return 0;
        k = Math.min(k, n - k);
        long result = 1;
        for (long i = 1; i <= k; i++) {
            result = result * (n - k + i) / i;
            if (result > CAP) return CAP + 1;
        }
        return result;
    }
}
