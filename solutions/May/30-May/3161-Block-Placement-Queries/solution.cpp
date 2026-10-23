/**
 * Problem: LeetCode 3161 - Block Placement Queries
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
    vector<int> treeMax;
    vector<bool> treeHas;

    void update(int node, int l, int r, int idx, int val, bool has) {
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
        treeMax[node] = max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        treeHas[node] = treeHas[node << 1] || treeHas[(node << 1) | 1];
    }

    int queryMax(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return treeMax[node];
        int mid = (l + r) >> 1;
        return max(queryMax(node << 1, l, mid, ql, qr), queryMax((node << 1) | 1, mid + 1, r, ql, qr));
    }

    int findPrev(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l == r) return l;
        int mid = (l + r) >> 1;
        int res = findPrev((node << 1) | 1, mid + 1, r, ql, qr);
        if (res != -1) return res;
        return findPrev(node << 1, l, mid, ql, qr);
    }

    int findNext(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l || !treeHas[node]) return -1;
        if (l == r) return l;
        int mid = (l + r) >> 1;
        int res = findNext(node << 1, l, mid, ql, qr);
        if (res != -1) return res;
        return findNext((node << 1) | 1, mid + 1, r, ql, qr);
    }

public:
    vector<bool> getResults(vector<vector<int>>& queries) {
        int maxCoord = 0;
        for (const auto& q : queries) {
            if (q[1] > maxCoord) {
                maxCoord = q[1];
            }
        }
        int M = maxCoord + 1;
        treeMax.assign(4 * M, 0);
        treeHas.assign(4 * M, false);

        // Origin at 0 is an obstacle
        update(1, 0, M - 1, 0, 0, true);

        vector<bool> ans;
        for (const auto& q : queries) {
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
                int maxGap = max(queryMax(1, 0, M - 1, 0, x), x - prev);
                ans.push_back(maxGap >= sz);
            }
        }

        return ans;
    }
};
