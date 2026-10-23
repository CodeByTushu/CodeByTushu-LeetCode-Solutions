import java.util.Arrays;

/**
 * Problem: LeetCode 3635 - Earliest Finish Time for Land and Water Rides II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {

    public int earliestFinishTime(int[] landStartTime, int[] landDuration,
                                  int[] waterStartTime, int[] waterDuration) {

        int ans1 = solve(landStartTime, landDuration,
                         waterStartTime, waterDuration);

        int ans2 = solve(waterStartTime, waterDuration,
                         landStartTime, landDuration);

        return Math.min(ans1, ans2);
    }

    private int solve(int[] firstStart, int[] firstDur,
                      int[] secondStart, int[] secondDur) {

        int m = secondStart.length;

        int[][] rides = new int[m][2];
        for (int i = 0; i < m; i++) {
            rides[i][0] = secondStart[i];
            rides[i][1] = secondDur[i];
        }

        Arrays.sort(rides, (a, b) -> Integer.compare(a[0], b[0]));

        int[] starts = new int[m];
        int[] prefixMinDur = new int[m];
        int[] suffixMinOpenFinish = new int[m];

        for (int i = 0; i < m; i++) {
            starts[i] = rides[i][0];
        }

        prefixMinDur[0] = rides[0][1];
        for (int i = 1; i < m; i++) {
            prefixMinDur[i] = Math.min(prefixMinDur[i - 1], rides[i][1]);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1];
        for (int i = m - 2; i >= 0; i--) {
            suffixMinOpenFinish[i] = Math.min(
                suffixMinOpenFinish[i + 1],
                rides[i][0] + rides[i][1]
            );
        }

        int ans = Integer.MAX_VALUE;

        for (int i = 0; i < firstStart.length; i++) {

            int t = firstStart[i] + firstDur[i];

            int idx = lowerBound(starts, t);

            int best = Integer.MAX_VALUE;

            // rides with start >= t
            if (idx < m) {
                best = Math.min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = Math.min(best, t + prefixMinDur[idx - 1]);
            }

            ans = Math.min(ans, best);
        }

        return ans;
    }

    private int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;

        while (l < r) {
            int mid = l + (r - l) / 2;

            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l;
    }
}
