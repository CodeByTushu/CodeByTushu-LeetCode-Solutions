/**
 * Problem: LeetCode 3734 - Lexicographically Smallest Palindromic Permutation Greater Than Target
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String lexPalindromicPermutation(String s, String target) {
        int n = s.length();
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;

        // Palindrome possible only if at most 1 odd frequency
        int oddCount = 0;
        for (int f : freq) if (f % 2 != 0) oddCount++;
        if (oddCount > 1) return "";

        // Middle character for odd length
        char mid = 0;
        for (int i = 0; i < 26; i++)
            if (freq[i] % 2 != 0) { mid = (char) ('a' + i); break; }

        int halfLen = n / 2;

        // Build smallest left half
        char[] smallestHalf = buildSmallestHalf(freq, halfLen);
        String smallest = buildPalindrome(smallestHalf, mid, n);
        if (smallest.compareTo(target) > 0) return smallest;

        // target's left half (first halfLen chars)
        char[] tHalf = target.substring(0, halfLen).toCharArray();

        // Strategy: go position by position, try to match tHalf greedily
        // At each pos, either:
        //   - place same char as tHalf[pos] and continue (greedy match)
        //   - place char > tHalf[pos] and fill rest with smallest -> candidate
        // Also check: if we matched entire tHalf, check mid character case

        int[] avail = new int[26];
        for (int i = 0; i < 26; i++) avail[i] = freq[i] / 2;

        char[] builtHalf = new char[halfLen];
        String bestCandidate = null;

        for (int pos = 0; pos < halfLen; pos++) {
            int tChar = tHalf[pos] - 'a';

            // Option A: place char > tHalf[pos] at this pos, fill rest smallest
            for (int c = tChar + 1; c < 26; c++) {
                if (avail[c] > 0) {
                    // Use char c at pos
                    avail[c]--;
                    builtHalf[pos] = (char) ('a' + c);

                    // Fill rest with smallest
                    int[] tempAvail = avail.clone();
                    char[] tempHalf = builtHalf.clone();
                    int fill = pos + 1;
                    for (int cc = 0; cc < 26; cc++)
                        for (int j = 0; j < tempAvail[cc]; j++)
                            if (fill < halfLen) tempHalf[fill++] = (char) ('a' + cc);

                    String candidate = buildPalindrome(tempHalf, mid, n);
                    if (bestCandidate == null || candidate.compareTo(bestCandidate) < 0)
                        bestCandidate = candidate;

                    // Restore
                    avail[c]++;
                    break; // smallest such c is best, no need to try larger
                }
            }

            // Option B: place exact tHalf[pos] char and continue matching
            if (avail[tChar] > 0) {
                avail[tChar]--;
                builtHalf[pos] = (char) ('a' + tChar);
                // Continue to next position
            } else {
                // Can't match prefix anymore, stop
                break;
            }

            // If we've matched entire tHalf
            if (pos == halfLen - 1) {
                // leftHalf == tHalf, palindrome > target only if:
                // n is odd AND mid > target[halfLen]
                if (n % 2 != 0 && mid > target.charAt(halfLen)) {
                    String candidate = buildPalindrome(builtHalf, mid, n);
                    if (bestCandidate == null || candidate.compareTo(bestCandidate) < 0)
                        bestCandidate = candidate;
                }
                // Also: leftHalf == tHalf but palindrome's right half is mirror
                // Palindrome = leftHalf + [mid] + reverse(leftHalf)
                // Compare full palindrome with target
                String candidate = buildPalindrome(builtHalf, mid, n);
                if (candidate.compareTo(target) > 0) {
                    if (bestCandidate == null || candidate.compareTo(bestCandidate) < 0)
                        bestCandidate = candidate;
                }
            }
        }

        return bestCandidate != null ? bestCandidate : "";
    }

    private char[] buildSmallestHalf(int[] freq, int halfLen) {
        char[] half = new char[halfLen];
        int idx = 0;
        for (int i = 0; i < 26; i++)
            for (int j = 0; j < freq[i] / 2; j++)
                half[idx++] = (char) ('a' + i);
        return half;
    }

    private String buildPalindrome(char[] half, char mid, int n) {
        StringBuilder sb = new StringBuilder();
        for (char c : half) sb.append(c);
        if (n % 2 != 0) sb.append(mid);
        for (int i = half.length - 1; i >= 0; i--) sb.append(half[i]);
        return sb.toString();
    }
}
