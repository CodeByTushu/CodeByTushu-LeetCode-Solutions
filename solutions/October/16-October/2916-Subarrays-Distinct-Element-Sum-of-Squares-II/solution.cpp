#include <vector>

using namespace std;

/**
 * Problem: LeetCode 2916 - Subarrays Distinct Element Sum of Squares II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
private:
    static constexpr long long MOD = 1000000007LL;
    vector<long long> tree_sum;
    vector<long long> tree_sq;
    vector<long long> lazy;

    void apply(int node, int len, long long v) {
        tree_sq[node] = (tree_sq[node] + 2LL * v % MOD * tree_sum[node] % MOD + v * v % MOD * len) % MOD;
        tree_sum[node] = (tree_sum[node] + v * len) % MOD;
        lazy[node] = (lazy[node] + v) % MOD;
    }

    void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = (l + r) / 2;
            apply(node * 2, mid - l + 1, lazy[node]);
            apply(node * 2 + 1, r - mid, lazy[node]);
            lazy[node] = 0;
        }
    }

    void update(int node, int l, int r, int ql, int qr, long long v) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) {
            apply(node, r - l + 1, v);
            return;
        }
        push(node, l, r);
        int mid = (l + r) / 2;
        update(node * 2, l, mid, ql, qr, v);
        update(node * 2 + 1, mid + 1, r, ql, qr, v);
        tree_sum[node] = (tree_sum[node * 2] + tree_sum[node * 2 + 1]) % MOD;
        tree_sq[node] = (tree_sq[node * 2] + tree_sq[node * 2 + 1]) % MOD;
    }

public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        tree_sum.assign(4 * n, 0);
        tree_sq.assign(4 * n, 0);
        lazy.assign(4 * n, 0);

        int max_val = 0;
        for (int x : nums) {
            if (x > max_val) max_val = x;
        }
        vector<int> last(max_val + 1, -1);

        long long ans = 0;
        for (int j = 0; j < n; j++) {
            int x = nums[j];
            update(1, 0, n - 1, last[x] + 1, j, 1);
            last[x] = j;
            ans = (ans + tree_sq[1]) % MOD;
        }

        return ans;
    }
};
