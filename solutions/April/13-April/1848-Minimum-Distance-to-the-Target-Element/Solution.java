class Solution {
    public int getMinDistance(int[] nums, int target, int start) {
        int minDistance = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                minDistance = Math.min(minDistance, Math.abs(i - start));
                if (minDistance == 0) return 0;
            }
        }
        return minDistance;
    }
}
