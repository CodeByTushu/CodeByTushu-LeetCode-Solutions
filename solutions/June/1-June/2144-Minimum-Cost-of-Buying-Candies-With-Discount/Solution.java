import java.util.Arrays;

class Solution {
    public int minimumCost(int[] cost) {
        Arrays.sort(cost);
        int total = 0;
        int count = 0;
        for (int i = cost.length - 1; i >= 0; i--) {
            count++;
            if (count == 3) {
                count = 0; // Every 3rd candy is free
                continue;
            }
            total += cost[i];
        }
        return total;
    }
}
