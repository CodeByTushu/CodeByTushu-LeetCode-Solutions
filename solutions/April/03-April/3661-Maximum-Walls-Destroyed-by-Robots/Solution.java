import java.util.Arrays;
import java.util.Comparator;

/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Language: Java
 * Time Complexity: O(N log N + M log M + N log M)
 * Space Complexity: O(N)
 */
class Solution {
    public int maxWalls(int[] robots, int[] distance, int[] walls) {
        int n = robots.length;
        int[][] r = new int[n][2];
        for (int i = 0; i < n; i++) {
            r[i][0] = robots[i];
            r[i][1] = distance[i];
        }
        Arrays.sort(r, Comparator.comparingInt(a -> a[0]));
        Arrays.sort(walls);

        int[] leftBound = new int[n];
        int[] rightBound = new int[n];
        int[] wLeft = new int[n];
        int[] wRight = new int[n];

        for (int i = 0; i < n; i++) {
            int lLimit = (i > 0) ? r[i - 1][0] + 1 : Integer.MIN_VALUE;
            leftBound[i] = Math.max(r[i][0] - r[i][1], lLimit);
            wLeft[i] = countWalls(walls, leftBound[i], r[i][0]);

            int rLimit = (i < n - 1) ? r[i + 1][0] - 1 : Integer.MAX_VALUE;
            rightBound[i] = Math.min(r[i][0] + r[i][1], rLimit);
            wRight[i] = countWalls(walls, r[i][0], rightBound[i]);
        }

        // dp0: robot i fires Left
        // dp1: robot i fires Right
        int dp0 = wLeft[0];
        int dp1 = wRight[0];

        for (int i = 1; i < n; i++) {
            int wBoth;
            if (rightBound[i - 1] >= leftBound[i]) {
                wBoth = countWalls(walls, r[i - 1][0], r[i][0]);
            } else {
                wBoth = wRight[i - 1] + wLeft[i];
            }

            int nextDp0 = Math.max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
            int nextDp1 = Math.max(dp0, dp1) + wRight[i];

            dp0 = nextDp0;
            dp1 = nextDp1;
        }

        return Math.max(dp0, dp1);
    }

    private int countWalls(int[] walls, int low, int high) {
        if (low > high) {
            return 0;
        }
        int start = lowerBound(walls, low);
        int end = upperBound(walls, high);
        return Math.max(0, end - start);
    }

    private int lowerBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] >= target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    private int upperBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] > target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
