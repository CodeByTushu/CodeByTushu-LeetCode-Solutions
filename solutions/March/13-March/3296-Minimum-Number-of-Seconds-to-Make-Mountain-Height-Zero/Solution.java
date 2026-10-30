/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long minNumberOfSeconds(int mountainHeight, int[] workerTimes) {
        int minW = workerTimes[0];
        for (int w : workerTimes) {
            minW = Math.min(minW, w);
        }

        long low = 1L;
        // Upper bound: fastest worker alone reduces the entire mountain
        long high = (long) minW * mountainHeight * (mountainHeight + 1L) / 2L;
        long ans = high;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (canReduce(mid, mountainHeight, workerTimes)) {
                ans = mid;
                high = mid - 1; // Try smaller time
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private boolean canReduce(long time, int mountainHeight, int[] workerTimes) {
        long totalHeight = 0;
        for (int w : workerTimes) {
            long m = time / w;
            if (m > 0) {
                // Solve x * (x + 1) / 2 <= m for x
                long x = (long) ((Math.sqrt(1.0 + 8.0 * m) - 1.0) / 2.0);
                while (x * (x + 1) / 2 > m) {
                    x--;
                }
                while ((x + 1) * (x + 2) / 2 <= m) {
                    x++;
                }
                totalHeight += x;
                if (totalHeight >= mountainHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= mountainHeight;
    }
}
