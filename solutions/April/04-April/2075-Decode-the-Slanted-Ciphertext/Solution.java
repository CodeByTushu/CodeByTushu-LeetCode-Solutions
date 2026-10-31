/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Language: Java
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class Solution {
    public String decodeCiphertext(String encodedText, int rows) {
        if (rows == 1 || encodedText == null || encodedText.isEmpty()) {
            return encodedText;
        }

        int n = encodedText.length();
        int cols = n / rows;
        StringBuilder sb = new StringBuilder(n);

        for (int c = 0; c < cols; c++) {
            for (int r = 0; r < rows && c + r < cols; r++) {
                sb.append(encodedText.charAt(r * cols + (c + r)));
            }
        }

        int len = sb.length();
        while (len > 0 && sb.charAt(len - 1) == ' ') {
            len--;
        }
        sb.setLength(len);

        return sb.toString();
    }
}
