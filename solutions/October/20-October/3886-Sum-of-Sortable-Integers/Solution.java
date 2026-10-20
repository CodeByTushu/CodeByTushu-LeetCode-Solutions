class Solution {
    public int sortableIntegers(int[] nums) {
        int n = nums.length;
        int ans = 0;
        for (int k = 1; k <= n; k++) {
            if (n % k != 0) continue;
            if (isSortable(nums, n, k)) ans += k;
        }
        return ans;
    }

    private boolean isSortable(int[] nums, int n, int k) {
        int prevMax = 0;
        for (int start = 0; start < n; start += k) {
            int mn = Integer.MAX_VALUE, mx = Integer.MIN_VALUE;
            int desc = 0;
            int end = start + k;
            for (int i = start; i < end; i++) {
                mn = Math.min(mn, nums[i]);
                mx = Math.max(mx, nums[i]);
                int next = (i + 1 < end) ? i + 1 : start;
                if (nums[i] > nums[next]) desc++;
            }
            if (desc > 1) return false;
            if (mn < prevMax) return false;

            prevMax = mx;
        }
        return true;
    }
}
