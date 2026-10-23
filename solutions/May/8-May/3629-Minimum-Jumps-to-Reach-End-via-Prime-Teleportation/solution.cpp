/**
 * Problem: LeetCode 3629 - Minimum Jumps to Reach End via Prime Teleportation
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <queue>

using namespace std;

class Solution {
public:
    int minJumps(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return 0;

        int maxVal = 0;
        for (int x : nums) {
            maxVal = max(maxVal, x);
        }

        // Smallest Prime Factor (SPF)
        vector<int> spf(maxVal + 1);
        for (int i = 0; i <= maxVal; ++i) spf[i] = i;
        for (int i = 2; i * 1LL * i <= maxVal; ++i) {
            if (spf[i] == i) {
                for (int j = i * i; j <= maxVal; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }

        // Map each prime to indices where nums[j] is divisible by that prime
        unordered_map<int, vector<int>> primeToIndices;
        for (int i = 0; i < n; ++i) {
            int x = nums[i];
            while (x > 1) {
                int p = spf[x];
                primeToIndices[p].push_back(i);
                while (x % p == 0) x /= p;
            }
        }

        // BFS for shortest path (minimum jumps)
        vector<int> dist(n, -1);
        dist[0] = 0;
        queue<int> q;
        q.push(0);

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            int d = dist[u];

            if (u == n - 1) return d;

            // 1. Adjacent steps
            if (u - 1 >= 0 && dist[u - 1] == -1) {
                dist[u - 1] = d + 1;
                if (u - 1 == n - 1) return d + 1;
                q.push(u - 1);
            }
            if (u + 1 < n && dist[u + 1] == -1) {
                dist[u + 1] = d + 1;
                if (u + 1 == n - 1) return d + 1;
                q.push(u + 1);
            }

            // 2. Prime Teleportation
            int val = nums[u];
            if (val >= 2 && spf[val] == val) {
                auto it = primeToIndices.find(val);
                if (it != primeToIndices.end()) {
                    for (int v : it->second) {
                        if (dist[v] == -1) {
                            dist[v] = d + 1;
                            if (v == n - 1) return d + 1;
                            q.push(v);
                        }
                    }
                    primeToIndices.erase(it);
                }
            }
        }

        return dist[n - 1];
    }
};
