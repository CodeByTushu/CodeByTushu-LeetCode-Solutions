class Solution {
    public int countCommas(int n) {
        int result = 0;
        long threshold = 1000;
        while (threshold <= n) {
            result += (n - threshold + 1);
            threshold *= 1000;
        }
        return result;
    }
}
