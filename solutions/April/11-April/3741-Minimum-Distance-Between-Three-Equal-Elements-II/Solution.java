import java.util.*;

class Solution {
    public int minimumDistance(int[] nums) {
        int n = nums.length;
        int[] prev1 = new int[n + 1];
        int[] prev2 = new int[n + 1];
        Arrays.fill(prev1, -1);
        Arrays.fill(prev2, -1);

        int minDistance = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            int val = nums[i];
            if (prev2[val] != -1) {
                minDistance = Math.min(minDistance, 2 * (i - prev2[val]));
            }
            prev2[val] = prev1[val];
            prev1[val] = i;
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
