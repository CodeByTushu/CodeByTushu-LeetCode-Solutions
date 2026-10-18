class Solution {
    static final int MOD = 1_000_000_007;

    class Node {
        long val;
        int len;
        long sum;

        Node() {}

        Node(long v, int l, long s) {
            val = v;
            len = l;
            sum = s;
        }
    }

    Node[] tree;
    long[] pow10;
    char[] arr;

    public int[] sumAndMultiply(String s, int[][] queries) {
        int n = s.length();
        arr = s.toCharArray();

        pow10 = new long[n + 1];
        pow10[0] = 1;
        for (int i = 1; i <= n; i++) {
            pow10[i] = (pow10[i - 1] * 10) % MOD;
        }

        tree = new Node[4 * n];
        build(1, 0, n - 1);

        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            Node res = query(1, 0, n - 1, queries[i][0], queries[i][1]);
            ans[i] = (int) ((res.val * (res.sum % MOD)) % MOD);
        }
        return ans;
    }

    private void build(int idx, int l, int r) {
        if (l == r) {
            int d = arr[l] - '0';
            if (d == 0) {
                tree[idx] = new Node(0, 0, 0);
            } else {
                tree[idx] = new Node(d, 1, d);
            }
            return;
        }

        int mid = (l + r) >> 1;
        build(idx << 1, l, mid);
        build(idx << 1 | 1, mid + 1, r);
        tree[idx] = merge(tree[idx << 1], tree[idx << 1 | 1]);
    }

    private Node query(int idx, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[idx];

        int mid = (l + r) >> 1;
        if (qr <= mid) return query(idx << 1, l, mid, ql, qr);
        if (ql > mid) return query(idx << 1 | 1, mid + 1, r, ql, qr);

        Node left = query(idx << 1, l, mid, ql, qr);
        Node right = query(idx << 1 | 1, mid + 1, r, ql, qr);
        return merge(left, right);
    }

    private Node merge(Node a, Node b) {
        Node res = new Node();
        res.len = a.len + b.len;
        res.sum = a.sum + b.sum;
        res.val = (a.val * pow10[b.len] + b.val) % MOD;
        return res;
    }
}
