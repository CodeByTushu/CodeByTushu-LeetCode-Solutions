import java.util.*;

/**
 * Problem: LeetCode 3414 - Maximum Score of Non-overlapping Intervals
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[] maximumWeight(List<List<Integer>> intervals) {
        int n = intervals.size();
        
        // arr: [l, r, weight, originalIndex]
        int[][] arr = new int[n][4];
        for (int i = 0; i < n; i++) {
            arr[i][0] = intervals.get(i).get(0);
            arr[i][1] = intervals.get(i).get(1);
            arr[i][2] = intervals.get(i).get(2);
            arr[i][3] = i;
        }
        
        Arrays.sort(arr, (a, b) -> a[1] != b[1] ? Integer.compare(a[1], b[1]) : 
                                   a[0] != b[0] ? Integer.compare(a[0], b[0]) : 
                                   a[2] != b[2] ? Integer.compare(a[2], b[2]) : 
                                   Integer.compare(a[3], b[3]));
        
        // posScore[i + 1][k]: best total weight using k non-overlapping intervals from first i intervals
        // posIdx[i + 1][k]: lexicographically smallest sorted indices achieving posScore
        long[][] posScore = new long[n + 1][5];
        int[][][] posIdx  = new int[n + 1][5][];
        for (long[] row : posScore) {
            Arrays.fill(row, -1);
        }
        
        for (int i = 0; i < n; i++) {
            // Binary search: rightmost j < i where arr[j][1] < arr[i][0]
            int lo = 0, hi = i - 1, prev = -1;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (arr[mid][1] < arr[i][0]) {
                    prev = mid;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            int p = prev + 1; // 1-based prefix index
            
            for (int k = 1; k <= 4; k++) {
                // Option 1: Do not pick interval i
                posScore[i + 1][k] = posScore[i][k];
                posIdx[i + 1][k]   = posIdx[i][k];
                
                // Option 2: Pick interval i with best (k-1) from prefix p
                long prevS = (k == 1) ? 0 : posScore[p][k - 1];
                int[] prevI = (k == 1) ? new int[0] : posIdx[p][k - 1];
                
                if (k == 1 || prevS >= 0) {
                    long newScore = prevS + arr[i][2];
                    int[] newIdx = append(prevI, arr[i][3]);
                    Arrays.sort(newIdx);
                    
                    if (posScore[i + 1][k] < newScore || 
                       (posScore[i + 1][k] == newScore && isLess(newIdx, posIdx[i + 1][k]))) {
                        posScore[i + 1][k] = newScore;
                        posIdx[i + 1][k]   = newIdx;
                    }
                }
            }
        }
        
        long best = -1;
        int[] ans = null;
        for (int k = 1; k <= 4; k++) {
            long s = posScore[n][k];
            int[] idx = posIdx[n][k];
            if (s < 0) continue;
            if (s > best || (s == best && isLess(idx, ans))) {
                best = s;
                ans  = idx;
            }
        }
        
        return ans == null ? new int[0] : ans;
    }
    
    private int[] append(int[] arr, int val) {
        int[] res = new int[arr.length + 1];
        System.arraycopy(arr, 0, res, 0, arr.length);
        res[arr.length] = val;
        return res;
    }
    
    private boolean isLess(int[] a, int[] b) {
        if (b == null) return true;
        if (a == null) return false;
        for (int i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] != b[i]) return a[i] < b[i];
        }
        return a.length < b.length;
    }
}
