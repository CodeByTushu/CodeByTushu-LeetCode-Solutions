/**
 * Problem: LeetCode 3510 - Minimum Pair Removal to Sort Array II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 * 
 * Optimized Doubly Linked List + PriorityQueue (Min-Heap) Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

#include <vector>
#include <queue>

using namespace std;

class Solution {
    struct Pair {
        long long sum;
        int id;
        int ver;

        bool operator>(const Pair& other) const {
            if (sum != other.sum) {
                return sum > other.sum;
            }
            return id > other.id;
        }
    };

public:
    int minimumPairRemoval(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return 0;

        vector<long long> val(n);
        vector<int> prev(n);
        vector<int> next(n);
        vector<bool> deleted(n, false);
        vector<int> version(n, 0);

        for (int i = 0; i < n; i++) {
            val[i] = nums[i];
            prev[i] = i - 1;
            next[i] = (i + 1 < n) ? i + 1 : -1;
        }

        int descents = 0;
        for (int i = 0; i < n - 1; i++) {
            if (val[i] > val[i + 1]) {
                descents++;
            }
        }

        if (descents == 0) return 0;

        priority_queue<Pair, vector<Pair>, greater<Pair>> pq;
        for (int i = 0; i < n - 1; i++) {
            pq.push({val[i] + val[i + 1], i, 0});
        }

        int ops = 0;
        while (descents > 0 && !pq.empty()) {
            Pair top = pq.top();
            pq.pop();
            int u = top.id;

            if (deleted[u] || top.ver != version[u]) continue;
            int v = next[u];
            if (v == -1 || deleted[v]) continue;
            if (top.sum != val[u] + val[v]) continue;

            int p = prev[u];
            int w = next[v];

            // Remove old inversion contributions
            if (p != -1 && val[p] > val[u]) descents--;
            if (val[u] > val[v]) descents--;
            if (w != -1 && val[v] > val[w]) descents--;

            // Merge u and v
            val[u] += val[v];
            deleted[v] = true;
            next[u] = w;
            if (w != -1) {
                prev[w] = u;
            }

            // Add new inversion contributions
            if (p != -1 && val[p] > val[u]) descents++;
            if (w != -1 && val[u] > val[w]) descents++;

            version[u]++;
            ops++;

            if (descents == 0) break;

            // Push updated adjacent pairs
            if (p != -1) {
                version[p]++;
                pq.push({val[p] + val[u], p, version[p]});
            }
            if (w != -1) {
                pq.push({val[u] + val[w], u, version[u]});
            }
        }

        return ops;
    }
};
