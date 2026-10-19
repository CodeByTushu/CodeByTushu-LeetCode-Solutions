import java.util.Arrays;

class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);

        int ans = 1;

        for (int i = 1; i < arr.length; i++) {
            ans = Math.min(arr[i], ans + 1);
        }

        return ans;
    }
}
