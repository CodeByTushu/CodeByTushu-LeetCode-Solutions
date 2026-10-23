import java.util.Arrays;

/**
 * Problem: LeetCode 3525 - Find X Value of Array II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    // Segment Tree Node definition
    static class Node {
        long prod;
        long[] remain;

        Node(int k) {
            this.prod = 1;
            this.remain = new long[k];
        }
    }

    private int n;
    private int K;
    private Node[] tree;

    public int[] resultArray(int[] nums, int k, int[][] queries) {
        this.n = nums.length;
        this.K = k;
        this.tree = new Node[4 * n];
        
        // Build the initial segment tree
        build(nums, 0, 0, n - 1);

        int[] ans = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {
            int index = queries[i][0];
            int value = queries[i][1] % K;
            int start = queries[i][2];
            int x = queries[i][3];

            // Perform persistent point update
            update(0, 0, n - 1, index, value);

            // Query the suffix range from 'start' to the end of the array
            Node resNode = query(0, 0, n - 1, start, n - 1);
            ans[i] = (int) resNode.remain[x];
        }

        return ans;
    }

    private Node merge(Node left, Node right) {
        Node parent = new Node(K);
        parent.prod = (left.prod * right.prod) % K;

        // 1. Prefixes that stay completely in the left child
        for (int r = 0; r < K; r++) {
            parent.remain[r] = left.remain[r];
        }

        // 2. Prefixes that span through the left child and extend into the right child
        for (int r = 0; r < K; r++) {
            int combinedRemainder = (int) ((left.prod * r) % K);
            parent.remain[combinedRemainder] += right.remain[r];
        }

        return parent;
    }

    private void build(int[] nums, int cur, int left, int right) {
        tree[cur] = new Node(K);
        if (left == right) {
            int val = nums[left] % K;
            tree[cur].prod = val;
            tree[cur].remain[val] = 1;
            return;
        }
        int mid = left + (right - left) / 2;
        build(nums, 2 * cur + 1, left, mid);
        build(nums, 2 * cur + 2, mid + 1, right);
        tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2]);
    }

    private void update(int cur, int lo, int hi, int idx, int val) {
        if (lo == hi) {
            Arrays.fill(tree[cur].remain, 0);
            tree[cur].prod = val;
            tree[cur].remain[val] = 1;
            return;
        }
        int mid = lo + (hi - lo) / 2;
        if (idx <= mid) {
            update(2 * cur + 1, lo, mid, idx, val);
        } else {
            update(2 * cur + 2, mid + 1, hi, idx, val);
        }
        tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2]);
    }

    private Node query(int cur, int lo, int hi, int ql, int qr) {
        if (ql <= lo && hi <= qr) {
            return tree[cur];
        }
        int mid = lo + (hi - lo) / 2;
        if (qr <= mid) {
            return query(2 * cur + 1, lo, mid, ql, qr);
        }
        if (ql > mid) {
            return query(2 * cur + 2, mid + 1, hi, ql, qr);
        }
        Node leftNode = query(2 * cur + 1, lo, mid, ql, qr);
        Node rightNode = query(2 * cur + 2, mid + 1, hi, ql, qr);
        return merge(leftNode, rightNode);
    }
}
