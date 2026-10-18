#include <vector>
#include <string>

using namespace std;

class Solution {
    static constexpr int MOD = 1'000'000'007;

    struct Node {
        long long val;
        int len;
        long long sum;

        Node(long long v = 0, int l = 0, long long s = 0) : val(v), len(l), sum(s) {}
    };

    vector<Node> tree;
    vector<long long> pow10;
    string str;

    Node merge(const Node& a, const Node& b) {
        Node res;
        res.len = a.len + b.len;
        res.sum = a.sum + b.sum;
        res.val = (a.val * pow10[b.len] + b.val) % MOD;
        return res;
    }

    void build(int idx, int l, int r) {
        if (l == r) {
            int d = str[l] - '0';
            if (d == 0) {
                tree[idx] = Node(0, 0, 0);
            } else {
                tree[idx] = Node(d, 1, d);
            }
            return;
        }

        int mid = (l + r) >> 1;
        build(idx << 1, l, mid);
        build(idx << 1 | 1, mid + 1, r);
        tree[idx] = merge(tree[idx << 1], tree[idx << 1 | 1]);
    }

    Node query(int idx, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[idx];

        int mid = (l + r) >> 1;
        if (qr <= mid) return query(idx << 1, l, mid, ql, qr);
        if (ql > mid) return query(idx << 1 | 1, mid + 1, r, ql, qr);

        Node left = query(idx << 1, l, mid, ql, qr);
        Node right = query(idx << 1 | 1, mid + 1, r, ql, qr);
        return merge(left, right);
    }

public:
    vector<int> sumAndMultiply(string s, vector<vector<int>>& queries) {
        int n = s.length();
        str = s;

        pow10.assign(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            pow10[i] = (pow10[i - 1] * 10) % MOD;
        }

        tree.resize(4 * n);
        build(1, 0, n - 1);

        vector<int> ans(queries.size());
        for (size_t i = 0; i < queries.size(); i++) {
            Node res = query(1, 0, n - 1, queries[i][0], queries[i][1]);
            ans[i] = static_cast<int>((res.val * (res.sum % MOD)) % MOD);
        }
        return ans;
    }
};
