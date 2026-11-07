/**
 * Problem: LeetCode 1882 - Process Tasks Using Servers
 * Difficulty: Medium
 * Language: C++ (C++20)
 * Author: CodeByTushu
 */
#include <vector>
#include <queue>
#include <tuple>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();

        // free: (weight, index)
        using FreeServer = pair<int, int>;
        priority_queue<FreeServer, vector<FreeServer>, greater<FreeServer>> free;

        // busy: (freeTime, weight, index)
        using BusyServer = tuple<long long, int, int>;
        priority_queue<BusyServer, vector<BusyServer>, greater<BusyServer>> busy;

        for (int i = 0; i < n; i++) {
            free.emplace(servers[i], i);
        }

        vector<int> ans(m);
        long long t = 0;

        for (int j = 0; j < m; j++) {
            t = max(t, (long long)j);

            // Release servers that are free by time t
            while (!busy.empty() && get<0>(busy.top()) <= t) {
                auto [freeTime, weight, idx] = busy.top();
                busy.pop();
                free.emplace(weight, idx);
            }

            // No free server: jump to the earliest free time
            if (free.empty()) {
                t = get<0>(busy.top());
                while (!busy.empty() && get<0>(busy.top()) <= t) {
                    auto [freeTime, weight, idx] = busy.top();
                    busy.pop();
                    free.emplace(weight, idx);
                }
            }

            auto [bestWeight, bestIdx] = free.top();
            free.pop();
            ans[j] = bestIdx;
            busy.emplace(t + tasks[j], bestWeight, bestIdx);
        }

        return ans;
    }
};
