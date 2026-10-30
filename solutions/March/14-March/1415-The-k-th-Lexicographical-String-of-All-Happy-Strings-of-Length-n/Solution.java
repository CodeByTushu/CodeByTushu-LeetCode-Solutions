/**
 * Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String getHappyString(int n, int k) {
        // Total happy strings of length n is 3 * 2^(n - 1)
        int total = 3 * (1 << (n - 1));
        if (k > total) {
            return "";
        }

        // Convert to 0-indexed
        k--;

        StringBuilder sb = new StringBuilder();
        char[] chars = {'a', 'b', 'c'};

        // Determine the first character
        int blockSize = 1 << (n - 1);
        int firstIdx = k / blockSize;
        sb.append(chars[firstIdx]);
        k %= blockSize;

        // Determine each subsequent character
        for (int step = n - 2; step >= 0; step--) {
            blockSize = 1 << step;
            int idx = k / blockSize;
            char prev = sb.charAt(sb.length() - 1);

            // Select the idx-th character from available characters != prev
            int count = 0;
            for (char c : chars) {
                if (c != prev) {
                    if (count == idx) {
                        sb.append(c);
                        break;
                    }
                    count++;
                }
            }

            k %= blockSize;
        }

        return sb.toString();
    }
}
