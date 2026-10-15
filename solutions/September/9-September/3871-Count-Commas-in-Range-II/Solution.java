class Solution {
    public long countCommas(long n) {
        long result = 0;
        long threshold = 1000L;

        while (threshold <= n) {
            result += (n - threshold + 1);
            threshold *= 1000L;
        }

        return result;
    }
}
