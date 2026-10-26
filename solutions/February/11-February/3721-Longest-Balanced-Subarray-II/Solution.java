/**
 * Problem: LeetCode 3721 - Longest Balanced Subarray II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    static class SegmentTree {
        int n;
        int[] treeMin;
        int[] treeMax;
        int[] lazy;

        SegmentTree(int n) {
            this.n = n;
            treeMin = new int[4 * n];
            treeMax = new int[4 * n];
            lazy = new int[4 * n];
            build(1, 0, n - 1);
        }

        private void build(int node, int start, int end) {
            if (start == end) {
                // Initialize unactivated positions to infinity so they won't match 0
                treeMin[node] = 1_000_000;
                treeMax[node] = 1_000_000;
                return;
            }
            int mid = (start + end) >> 1;
            build(node << 1, start, mid);
            build((node << 1) | 1, mid + 1, end);
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        private void push(int node) {
            if (lazy[node] != 0) {
                int val = lazy[node];
                int left = node << 1;
                int right = (node << 1) | 1;

                treeMin[left] += val;
                treeMax[left] += val;
                lazy[left] += val;

                treeMin[right] += val;
                treeMax[right] += val;
                lazy[right] += val;

                lazy[node] = 0;
            }
        }

        public void activate(int node, int start, int end, int idx) {
            if (start == end) {
                treeMin[node] = 0;
                treeMax[node] = 0;
                return;
            }
            push(node);
            int mid = (start + end) >> 1;
            if (idx <= mid) {
                activate(node << 1, start, mid, idx);
            } else {
                activate((node << 1) | 1, mid + 1, end, idx);
            }
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        public void update(int node, int start, int end, int l, int r, int val) {
            if (l <= start && end <= r) {
                treeMin[node] += val;
                treeMax[node] += val;
                lazy[node] += val;
                return;
            }
            push(node);
            int mid = (start + end) >> 1;
            if (l <= mid) {
                update(node << 1, start, mid, l, r, val);
            }
            if (r > mid) {
                update((node << 1) | 1, mid + 1, end, l, r, val);
            }
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        public int findFirstZero(int node, int start, int end, int maxR) {
            // By discrete intermediate value theorem for unit step-size sequences:
            // a 0 exists in this subtree if and only if min <= 0 && max >= 0.
            if (start > maxR || treeMin[node] > 0 || treeMax[node] < 0) {
                return -1;
            }
            if (start == end) {
                return start;
            }
            push(node);
            int mid = (start + end) >> 1;
            int res = findFirstZero(node << 1, start, mid, maxR);
            if (res != -1) {
                return res;
            }
            return findFirstZero((node << 1) | 1, mid + 1, end, maxR);
        }
    }

    public int longestBalanced(int[] nums) {
        int n = nums.length;
        SegmentTree seg = new SegmentTree(n);
        int[] lastPos = new int[100001];
        Arrays.fill(lastPos, -1);

        int maxLen = 0;

        for (int r = 0; r < n; r++) {
            int v = nums[r];
            int w = (v % 2 == 0) ? 1 : -1;
            int prev = lastPos[v];
            lastPos[v] = r;

            seg.activate(1, 0, n - 1, r);
            seg.update(1, 0, n - 1, prev + 1, r, w);

            int firstZero = seg.findFirstZero(1, 0, n - 1, r);
            if (firstZero != -1) {
                maxLen = Math.max(maxLen, r - firstZero + 1);
            }
        }

        return maxLen;
    }
}
