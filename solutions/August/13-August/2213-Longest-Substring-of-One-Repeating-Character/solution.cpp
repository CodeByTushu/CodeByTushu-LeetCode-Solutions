#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
private:
    vector<char> leftCh, rightCh;
    vector<int> pre, suf, best;

    void pull(int node, int l, int mid, int r) {
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

        best[node] = max(best[leftNode], best[rightNode]);
        if (rightCh[leftNode] == leftCh[rightNode]) {
            best[node] = max(best[node], suf[leftNode] + pre[rightNode]);
        }
    }

    void build(int node, int l, int r, const string& s) {
        if (l == r) {
            leftCh[node] = rightCh[node] = s[l];
            pre[node] = suf[node] = best[node] = 1;
            return;
        }
        int mid = (l + r) / 2;
        build(2 * node, l, mid, s);
        build(2 * node + 1, mid + 1, r, s);
        pull(node, l, mid, r);
    }

    void update(int node, int l, int r, int idx, char c) {
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

public:
    vector<int> longestRepeating(string s, string queryCharacters, vector<int>& queryIndices) {
        int n = s.length();
        leftCh.resize(4 * n);
        rightCh.resize(4 * n);
        pre.resize(4 * n);
        suf.resize(4 * n);
        best.resize(4 * n);

        build(1, 0, n - 1, s);

        int k = queryCharacters.length();
        vector<int> ans(k);
        for (int i = 0; i < k; i++) {
            update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
            ans[i] = best[1];
        }

        return ans;
    }
};
