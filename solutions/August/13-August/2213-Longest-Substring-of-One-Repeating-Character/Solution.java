class Solution {
    private char[] leftCh, rightCh;
    private int[] pre, suf, best;

    public int[] longestRepeating(String s, String queryCharacters, int[] queryIndices) {
        int n = s.length();
        leftCh = new char[4 * n];
        rightCh = new char[4 * n];
        pre = new int[4 * n];
        suf = new int[4 * n];
        best = new int[4 * n];

        build(1, 0, n - 1, s);

        int k = queryCharacters.length();
        int[] ans = new int[k];
        for (int i = 0; i < k; i++) {
            update(1, 0, n - 1, queryIndices[i], queryCharacters.charAt(i));
            ans[i] = best[1];
        }

        return ans;
    }

    private void build(int node, int l, int r, String s) {
        if (l == r) {
            leftCh[node] = rightCh[node] = s.charAt(l);
            pre[node] = suf[node] = best[node] = 1;
            return;
        }
        int mid = (l + r) / 2;
        build(2 * node, l, mid, s);
        build(2 * node + 1, mid + 1, r, s);
        pull(node, l, mid, r);
    }

    private void update(int node, int l, int r, int idx, char c) {
        if (l == r) {
            leftCh[node] = rightCh[node] = c;
            pre[node] = suf[node] = best[node] = 1;
            return;
        }
        int mid = (l + r) / 2;
        if (idx <= mid) {
            update(2 * node, l, mid, idx, c);
        } else {
            update(2 * node + 1, mid + 1, r, idx, c);
        }
        pull(node, l, mid, r);
    }

    private void pull(int node, int l, int mid, int r) {
        int leftNode = 2 * node, rightNode = 2 * node + 1;
        int leftLen = mid - l + 1;
        int rightLen = r - mid;

        leftCh[node] = leftCh[leftNode];
        rightCh[node] = rightCh[rightNode];

        pre[node] = pre[leftNode];
        if (pre[leftNode] == leftLen && rightCh[leftNode] == leftCh[rightNode]) {
            pre[node] += pre[rightNode];
        }

        suf[node] = suf[rightNode];
        if (suf[rightNode] == rightLen && rightCh[leftNode] == leftCh[rightNode]) {
            suf[node] += suf[leftNode];
        }

        best[node] = Math.max(best[leftNode], best[rightNode]);
        if (rightCh[leftNode] == leftCh[rightNode]) {
            best[node] = Math.max(best[node], suf[leftNode] + pre[rightNode]);
        }
    }
}
