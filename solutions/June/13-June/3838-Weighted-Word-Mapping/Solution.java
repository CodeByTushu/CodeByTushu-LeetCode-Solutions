class Solution {
    public String mapWordWeights(String[] words, int[] weights) {

        StringBuilder ans = new StringBuilder();

        for (String word : words) {

            long sum = 0;

            for (char ch : word.toCharArray()) {
                sum += weights[ch - 'a'];
            }

            int rem = (int) (sum % 26);

            // Reverse alphabetical mapping:
            // 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            char mapped = (char) ('z' - rem);

            ans.append(mapped);
        }

        return ans.toString();
    }
}
