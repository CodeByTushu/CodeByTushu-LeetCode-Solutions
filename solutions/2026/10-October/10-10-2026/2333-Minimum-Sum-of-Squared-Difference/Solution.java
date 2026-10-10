class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        int maxDiff = 100000;
        long[] cnt = new long[maxDiff + 2];
        for (int i = 0; i < n; i++) {
            cnt[Math.abs(nums1[i] - nums2[i])]++;
        }
        long k = (long) k1 + k2;
        for (int d = maxDiff; d >= 1 && k > 0; d--) {
            if (cnt[d] == 0) continue;
            if (cnt[d] <= k) {
                k -= cnt[d];
                cnt[d - 1] += cnt[d];
                cnt[d] = 0;
            } else {
                cnt[d - 1] += k;
                cnt[d] -= k;
                k = 0;
            }
        }
        long ans = 0;
        for (int d = 1; d <= maxDiff; d++) {
            ans += (long) d * d * cnt[d];
        }
        return ans;
    }
}
