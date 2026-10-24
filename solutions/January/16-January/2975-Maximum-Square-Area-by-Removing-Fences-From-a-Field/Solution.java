/**
 * Problem: LeetCode 2975 - Maximum Square Area by Removing Fences From a Field
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int maximizeSquareArea(int m, int n, int[] hFences, int[] vFences) {
        final long MOD = 1_000_000_007L;

        // Include fixed boundary fences 1 and m for horizontal, 1 and n for vertical
        int[] h = new int[hFences.length + 2];
        h[0] = 1;
        h[1] = m;
        System.arraycopy(hFences, 0, h, 2, hFences.length);
        Arrays.sort(h);

        int[] v = new int[vFences.length + 2];
        v[0] = 1;
        v[1] = n;
        System.arraycopy(vFences, 0, v, 2, vFences.length);
        Arrays.sort(v);

        // Store all possible gap sizes between any pair of horizontal fences
        Set<Integer> hDiffs = new HashSet<>();
        for (int i = 0; i < h.length; i++) {
            for (int j = i + 1; j < h.length; j++) {
                hDiffs.add(h[j] - h[i]);
            }
        }

        // Find the maximum gap size that exists in both horizontal and vertical differences
        long maxSide = -1;
        for (int i = 0; i < v.length; i++) {
            for (int j = i + 1; j < v.length; j++) {
                int diff = v[j] - v[i];
                if (hDiffs.contains(diff)) {
                    maxSide = Math.max(maxSide, diff);
                }
            }
        }

        if (maxSide == -1) {
            return -1;
        }

        return (int) ((maxSide * maxSide) % MOD);
    }
}
