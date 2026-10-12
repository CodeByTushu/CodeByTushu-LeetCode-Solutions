class Solution {
    minSumSquareDiff(nums1, nums2, k1, k2) {
        const maxDiff = 100000;
        const cnt = new Array(maxDiff + 2).fill(0);

        for (let i = 0; i < nums1.length; i++) {
            cnt[Math.abs(nums1[i] - nums2[i])]++;
        }

        let k = k1 + k2;

        for (let d = maxDiff; d >= 1 && k > 0; d--) {
            if (cnt[d] === 0) continue;

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

        let ans = 0;

        for (let d = 1; d <= maxDiff; d++) {
            ans += d * d * cnt[d];
        }

        return ans;
    }
}
