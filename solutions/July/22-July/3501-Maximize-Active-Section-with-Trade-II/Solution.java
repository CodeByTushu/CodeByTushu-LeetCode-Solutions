import java.util.*;

/**
 * Problem: LeetCode 3501 - Maximize Active Section with Trade II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public List<Integer> maxActiveSectionsAfterTrade(String s, int[][] queries) {
        int n = s.length();

        // 1. Run-length encode s: each run = {start, end, char(0/1)}
        List<int[]> runs = new ArrayList<>();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) j++;
            runs.add(new int[]{i, j - 1, s.charAt(i) - '0'});
            i = j;
        }

        int totalOnes = 0;
        for (int k = 0; k < n; k++) if (s.charAt(k) == '1') totalOnes++;

        int m = runs.size();

        // 2. Collect candidate interior 1-runs (must have a real run before AND after)
        List<int[]> cand = new ArrayList<>(); // start, end, fullZleft, fullZright
        for (int idx = 0; idx < m; idx++) {
            int[] run = runs.get(idx);
            if (run[2] != 1) continue;
            if (idx == 0 || idx == m - 1) continue; // touches global boundary -> never usable
            int[] prev = runs.get(idx - 1); // guaranteed a 0-run
            int[] next = runs.get(idx + 1); // guaranteed a 0-run
            int fullZleft = run[0] - prev[0];   // full length of preceding zero run
            int fullZright = next[1] - run[1];  // full length of following zero run
            cand.add(new int[]{run[0], run[1], fullZleft, fullZright});
        }

        int cnt = cand.size();
        int[] candStart = new int[cnt];
        int[] candEnd = new int[cnt];
        int[] fullZL = new int[cnt];
        int[] fullZR = new int[cnt];
        int[] fullG = new int[cnt];
        for (int k = 0; k < cnt; k++) {
            int[] c = cand.get(k);
            candStart[k] = c[0];
            candEnd[k] = c[1];
            fullZL[k] = c[2];
            fullZR[k] = c[3];
            fullG[k] = c[2] + c[3];
        }

        // 3. Sparse table over fullG for O(1) range-max queries
        int LOG = cnt > 0 ? (31 - Integer.numberOfLeadingZeros(cnt)) : 0;
        int[][] sparse = new int[LOG + 1][Math.max(cnt, 1)];
        if (cnt > 0) {
            sparse[0] = fullG.clone();
            for (int k = 1; k <= LOG; k++) {
                int half = 1 << (k - 1);
                for (int idx = 0; idx + (1 << k) <= cnt; idx++) {
                    sparse[k][idx] = Math.max(sparse[k - 1][idx], sparse[k - 1][idx + half]);
                }
            }
        }
        int[] log2 = new int[cnt + 1];
        for (int k = 2; k <= cnt; k++) log2[k] = log2[k / 2] + 1;

        // 4. Answer queries
        List<Integer> ans = new ArrayList<>();
        for (int[] q : queries) {
            int l = q[0], r = q[1];
            int result = totalOnes;

            if (cnt > 0) {
                int iLo = upperBound(candStart, l);       // first idx with start > l
                int iHi = lowerBound(candEnd, r) - 1;      // last idx with end < r

                if (iLo <= iHi && iLo < cnt && iHi >= 0) {
                    int gain = 0;

                    if (iHi - iLo >= 2) {
                        int lo = iLo + 1, hi = iHi - 1;
                        int len = hi - lo + 1;
                        int kk = log2[len];
                        gain = Math.max(gain, Math.max(sparse[kk][lo], sparse[kk][hi - (1 << kk) + 1]));
                    }

                    int clipLo = Math.min(candStart[iLo] - l, fullZL[iLo])
                               + Math.min(r - candEnd[iLo], fullZR[iLo]);
                    int clipHi = Math.min(candStart[iHi] - l, fullZL[iHi])
                               + Math.min(r - candEnd[iHi], fullZR[iHi]);

                    gain = Math.max(gain, Math.max(clipLo, clipHi));
                    result += gain;
                }
            }

            ans.add(result);
        }
        return ans;
    }

    // first index with arr[idx] > val
    private int upperBound(int[] arr, int val) {
        int lo = 0, hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= val) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    // first index with arr[idx] >= val
    private int lowerBound(int[] arr, int val) {
        int lo = 0, hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < val) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
