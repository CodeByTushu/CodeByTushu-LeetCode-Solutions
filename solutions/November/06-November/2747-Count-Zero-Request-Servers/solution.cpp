/**
 * Problem: LeetCode 2747 - Count Zero Request Servers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

class Solution {
public:
    vector<int> countServers(int n, vector<vector<int>>& logs, int x, vector<int>& queries) {
        // Sort logs by timestamp
        sort(logs.begin(), logs.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int qn = queries.size();
        vector<int> order(qn);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) {
            return queries[a] < queries[b];
        });

        vector<int> cnt(n + 1, 0);
        vector<int> ans(qn, 0);
        int active = 0;
        int l = 0, r = 0;
        int m = logs.size();

        for (int idx : order) {
            int q = queries[idx];

            // Add logs with time <= q
            while (r < m && logs[r][1] <= q) {
                int server = logs[r][0];
                if (cnt[server]++ == 0) active++;
                r++;
            }

            // Remove logs with time < q - x
            while (l < r && logs[l][1] < q - x) {
                int server = logs[l][0];
                if (--cnt[server] == 0) active--;
                l++;
            }

            ans[idx] = n - active;
        }

        return ans;
    }
};
