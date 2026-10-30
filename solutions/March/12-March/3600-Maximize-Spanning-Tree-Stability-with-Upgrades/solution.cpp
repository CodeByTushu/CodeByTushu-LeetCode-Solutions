/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
    struct DSU {
        vector<int> parent;
        vector<int> rank;
        int components;

        DSU(int n) : parent(n), rank(n, 0), components(n) {
            for (int i = 0; i < n; i++) parent[i] = i;
        }

        int find(int i) {
            int root = i;
            while (root != parent[root]) root = parent[root];
            int curr = i;
            while (curr != root) {
                int next = parent[curr];
                parent[curr] = root;
                curr = next;
            }
            return root;
        }

        bool unite(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
                components--;
                return true;
            }
            return false;
        }
    };

    bool canFormTree(int n, const vector<vector<int>>& edges, int k, int target) {
        DSU dsu(n);

        // 1. Mandatory edges
        for (const auto& e : edges) {
            if (e[3] == 1) {
                if (e[2] < target) return false;
                dsu.unite(e[0], e[1]);
            }
        }

        // 2. Cost 0 optional edges (strength >= target)
        for (const auto& e : edges) {
            if (e[3] == 0 && e[2] >= target) {
                dsu.unite(e[0], e[1]);
            }
        }

        // 3. Cost 1 optional edges (strength < target and 2 * strength >= target)
        int upgradesUsed = 0;
        for (const auto& e : edges) {
            if (e[3] == 0 && e[2] < target && 2 * e[2] >= target) {
                if (dsu.find(e[0]) != dsu.find(e[1])) {
                    if (upgradesUsed < k) {
                        dsu.unite(e[0], e[1]);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components == 1;
    }

public:
    int maxStability(int n, vector<vector<int>>& edges, int k) {
        DSU mandatoryDsu(n);
        int mandatoryCount = 0;
        int minMandatory = INT_MAX;

        for (const auto& e : edges) {
            if (e[3] == 1) {
                if (!mandatoryDsu.unite(e[0], e[1])) {
                    return -1; // Cycle in mandatory edges
                }
                mandatoryCount++;
                minMandatory = min(minMandatory, e[2]);
            }
        }

        DSU totalDsu(n);
        for (const auto& e : edges) {
            totalDsu.unite(e[0], e[1]);
        }
        if (totalDsu.components > 1) return -1;

        int low = 1;
        int high = mandatoryCount > 0 ? min(200000, minMandatory) : 200000;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canFormTree(n, edges, k, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
};
