import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int minSumOfLengths(int[] arr, int target) {
        int n = arr.length;
        int[] best = new int[n];
        Arrays.fill(best, Integer.MAX_VALUE);
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0, ans = Integer.MAX_VALUE, curBest = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            sum += arr[i];
            if (map.containsKey(sum - target)) {
                int j = map.get(sum - target);
                int len = i - j;
                if (j >= 0 && best[j] != Integer.MAX_VALUE) {
                    ans = Math.min(ans, len + best[j]);
                }
                curBest = Math.min(curBest, len);
            }
            best[i] = curBest;
            map.put(sum, i);
        }
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
