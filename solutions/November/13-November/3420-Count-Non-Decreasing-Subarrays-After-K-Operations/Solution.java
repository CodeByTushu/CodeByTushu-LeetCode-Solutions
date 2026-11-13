import java.util.ArrayDeque;

class Solution {
    public long countNonDecreasingSubarrays(int[] nums, int k) {
        int n = nums.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];

        // Deque maintains indices of prefix max steps (front = left side)
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        long total = 0; // window [l..r] sum of prefixMax
        int r = n - 1;
        long ans = 0;

        for (int l = n - 1; l >= 0; l--) {
            // Add nums[l] to the left, remove smaller/equal records
            while (!dq.isEmpty() && nums[dq.peekFirst()] <= nums[l]) {
                int f = dq.pollFirst();
                int end = dq.isEmpty() ? r + 1 : dq.peekFirst();
                total -= (long) nums[f] * (end - f);
            }
            int end = dq.isEmpty() ? r + 1 : dq.peekFirst();
            total += (long) nums[l] * (end - l);
            dq.offerFirst(l);

            // cost = sum(prefixMax) - sum(nums) in window [l..r]
            long cost = total - (pre[r + 1] - pre[l]);

            // If cost > k, shrink window from right side
            while (cost > k) {
                int last = dq.peekLast();
                total -= nums[last];
                if (last == r) dq.pollLast();
                r--;
                cost = total - (pre[r + 1] - pre[l]);
            }

            ans += (long) (r - l + 1);
        }

        return ans;
    }
}
