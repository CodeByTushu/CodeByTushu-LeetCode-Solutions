class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] freq = new int[26];

        // Count frequency of each character
        for (char ch : text.toCharArray()) {
            freq[ch - 'a']++;
        }

        // "balloon" -> b=1, a=1, l=2, o=2, n=1
        return Math.min(
                Math.min(freq['b' - 'a'], freq['a' - 'a']),
                Math.min(
                        Math.min(freq['l' - 'a'] / 2, freq['o' - 'a'] / 2),
                        freq['n' - 'a']
                )
        );
    }
}
