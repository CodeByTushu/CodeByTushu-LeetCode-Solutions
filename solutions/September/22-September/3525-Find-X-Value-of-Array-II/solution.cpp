#include <vector>
#include <algorithm>

/**
 * Problem: LeetCode 3525 - Find X Value of Array II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
    struct Node {
        long long prod;
        std::vector<int> remain;

        Node(int k = 1) : prod(1), remain(k, 0) {}
    };

    int n;
    int K;
    std::vector<Node> tree;

    Node merge(const Node& left, const Node& right) {
        Node parent(K);
        parent.prod = (left.prod * right.prod) % K;

        // 1. Prefixes that stay completely in the left child
        for (int r = 0; r < K; r++) {
            parent.remain[r] = left.remain[r];
        }

        // 2. Prefixes that span through the left child and extend into the right child
        for (int r = 0; r < K; r++) {
            int combined = (int)((left.prod * r) % K);
            parent.remain[combined] += right.remain[r];
        }

        return parent;
    }

    void build(const std::vector<int>& nums, int cur, int left, int right) {
        tree[cur] = Node(K);
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

    void update(int cur, int lo, int hi, int idx, int val) {
        if (lo == hi) {
            std::fill(tree[cur].remain.begin(), tree[cur].remain.end(), 0);
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

    Node query(int cur, int lo, int hi, int ql, int qr) {
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

public:
    std::vector<int> resultArray(std::vector<int>& nums, int k, std::vector<std::vector<int>>& queries) {
        this->n = nums.size();
        this->K = k;
        this->tree.resize(4 * n);

        build(nums, 0, 0, n - 1);

        std::vector<int> ans(queries.size());
        for (size_t i = 0; i < queries.size(); i++) {
            int index = queries[i][0];
            int value = queries[i][1] % K;
            int start = queries[i][2];
            int x = queries[i][3];

            update(0, 0, n - 1, index, value);
            Node resNode = query(0, 0, n - 1, start, n - 1);
            ans[i] = resNode.remain[x];
        }

        return ans;
    }
};
