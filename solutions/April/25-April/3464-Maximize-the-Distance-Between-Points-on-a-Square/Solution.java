/**
 * Problem: LeetCode 3464 - Maximize the Distance Between Points on a Square
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maxDistance(int side, int[][] points, int k) {
        // Step 1: Convert boundary points into 1D perimeter distance
        int n = points.length;
        long[] arr = new long[n];
        
        for (int i = 0; i < n; i++) {
            int x = points[i][0];
            int y = points[i][1];
            
            if (x == 0) {
                arr[i] = y;
            } else if (y == side) {
                arr[i] = (long) side + x;
            } else if (x == side) {
                arr[i] = 3L * side - y;
            } else {
                arr[i] = 4L * side - x;
            }
        }
        
        Arrays.sort(arr);
        
        long perimeter = 4L * side;
        long[] arrExt = new long[2 * n];
        for (int i = 0; i < n; i++) {
            arrExt[i] = arr[i];
            arrExt[i + n] = arr[i] + perimeter;
        }
        
        // Binary search answer in [1, side]
        long left = 1, right = side, ans = 0;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (canPlace(arr, arrExt, n, k, mid, perimeter)) {
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return (int) ans;
    }
    
    private boolean canPlace(long[] arr, long[] arrExt, int n, int k, long d, long perimeter) {
        for (int i = 0; i < n; i++) {
            long curr = arr[i];
            int count = 1;
            int idx = i;
            
            for (int step = 1; step < k; step++) {
                long target = curr + d;
                int l = idx + 1, r = i + n - 1;
                int found = -1;
                
                while (l <= r) {
                    int mid = l + (r - l) / 2;
                    if (arrExt[mid] >= target) {
                        found = mid;
                        r = mid - 1;
                    } else {
                        l = mid + 1;
                    }
                }
                
                if (found == -1) break;
                curr = arrExt[found];
                idx = found;
                count++;
            }
            
            if (count == k && (arr[i] + perimeter - curr) >= d) {
                return true;
            }
        }
        return false;
    }
}
