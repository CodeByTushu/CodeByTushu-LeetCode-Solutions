/**
 * Problem: LeetCode 3161 - Block Placement Queries
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.List;

class Solution {
    private int[] treeMax;
    private boolean[] treeHas;

    private void update(int node, int l, int r, int idx, int val, boolean has) {
        if (l == r) {
            treeMax[node] = val;
            treeHas[node] = has;
            return;
        }
        int mid = (l + r) >> 1;
        if (idx <= mid) {
            update(node << 1, l, mid, idx, val, has);
        } else {
            update((node << 1) | 1, mid + 1, r, idx, val, has);
        }
        treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        treeHas[node] = treeHas[node << 1] || treeHas[(node << 1) | 1];
    }

    private int queryMax(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return treeMax[node];
        int mid = (l + r) >> 1;
        return Math.max(queryMax(node << 1, l, mid, ql, qr), queryMax((node << 1) | 1, mid + 1, r, ql, qr));
    }

    private int findPrev(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l == r) return l;
        int mid = (l + r) >> 1;
        int res = findPrev((node << 1) | 1, mid + 1, r, ql, qr);
        if (res != -1) return res;
        return findPrev(node << 1, l, mid, ql, qr);
    }

    private int findNext(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l == r) return l;
        int mid = (l + r) >> 1;
        int res = findNext(node << 1, l, mid, ql, qr);
        if (res != -1) return res;
        return findNext((node << 1) | 1, mid + 1, r, ql, qr);
    }

    public List<Boolean> getResults(int[][] queries) {
        int maxCoord = 0;
        for (int[] q : queries) {
            if (q[1] > maxCoord) {
                maxCoord = q[1];
            }
        }
        int M = maxCoord + 1;
        treeMax = new int[4 * M];
        treeHas = new boolean[4 * M];

        // Origin at 0 is an obstacle
        update(1, 0, M - 1, 0, 0, true);

        List<Boolean> ans = new ArrayList<>();
        for (int[] q : queries) {
            if (q[0] == 1) {
                int x = q[1];
                int prev = findPrev(1, 0, M - 1, 0, x - 1);
                int next = findNext(1, 0, M - 1, x + 1, M - 1);
                update(1, 0, M - 1, x, x - prev, true);
                if (next != -1) {
                    update(1, 0, M - 1, next, next - x, true);
                }
            } else {
                int x = q[1];
                int sz = q[2];
                int prev = findPrev(1, 0, M - 1, 0, x);
                int maxGap = Math.max(queryMax(1, 0, M - 1, 0, x), x - prev);
                ans.add(maxGap >= sz);
            }
        }

        return ans;
    }
}
