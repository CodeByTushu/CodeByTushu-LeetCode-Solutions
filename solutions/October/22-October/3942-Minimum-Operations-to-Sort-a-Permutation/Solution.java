class Solution {
    public int minOperations(int[] nums) {
        int n = nums.length;
        int best = Integer.MAX_VALUE;
        int s = nums[0];
        boolean asc = true;
        for (int i = 0; i < n; i++) {
            if (nums[i] != (i + s) % n) {
                asc = false;
                break;
            }
        }
        if (asc) {
            if (s == 0) return 0;
            best = Math.min(best, Math.min(n - s, s + 2));
        }
        int c = nums[0];
        boolean desc = true;
        for (int i = 0; i < n; i++) {
            if (nums[i] != ((c - i) % n + n) % n) {
                desc = false;
                break;
            }
        }
        if (desc) {
            int t = (c + 1) % n;
            best = Math.min(best, Math.min(t, n - t) + 1);
        }
        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
