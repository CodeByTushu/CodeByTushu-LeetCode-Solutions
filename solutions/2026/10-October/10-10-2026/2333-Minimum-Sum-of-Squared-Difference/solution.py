class Solution:
    def minSumSquareDiff(self, nums1, nums2, k1, k2):
        max_diff = 100000
        cnt = [0] * (max_diff + 2)

        for a, b in zip(nums1, nums2):
            cnt[abs(a - b)] += 1

        k = k1 + k2

        for d in range(max_diff, 0, -1):
            if k == 0:
                break

            if cnt[d] <= k:
                k -= cnt[d]
                cnt[d - 1] += cnt[d]
                cnt[d] = 0
            else:
                cnt[d - 1] += k
                cnt[d] -= k
                k = 0

        ans = 0
        for d in range(1, max_diff + 1):
            ans += d * d * cnt[d]

        return ans
