/**
 * Problem: LeetCode 1345 - Jump Game IV
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int minJumps(vector<int>& arr) {
        int n = arr.size();
        if (n <= 1) {
            return 0;
        }

        // Group indices with the same value
        unordered_map<int, vector<int>> valueIndices;
        for (int i = 0; i < n; ++i) {
            valueIndices[arr[i]].push_back(i);
        }

        queue<int> q;
        vector<bool> visited(n, false);

        q.push(0);
        visited[0] = true;
        int steps = 0;

        // Standard level-order BFS for shortest unweighted path
        while (!q.empty()) {
            int sz = q.size();

            for (int k = 0; k < sz; ++k) {
                int curr = q.front();
                q.pop();

                // Target reached
                if (curr == n - 1) {
                    return steps;
                }

                // Transition 1: jump backward (curr - 1)
                if (curr - 1 >= 0 && !visited[curr - 1]) {
                    visited[curr - 1] = true;
                    q.push(curr - 1);
                }

                // Transition 2: jump forward (curr + 1)
                if (curr + 1 < n && !visited[curr + 1]) {
                    visited[curr + 1] = true;
                    q.push(curr + 1);
                }

                // Transition 3: jump to any same-value index
                auto it = valueIndices.find(arr[curr]);
                if (it != valueIndices.end()) {
                    for (int nextIdx : it->second) {
                        if (!visited[nextIdx]) {
                            visited[nextIdx] = true;
                            q.push(nextIdx);
                        }
                    }
                    // Prune same-value list to prevent quadratic traversal
                    valueIndices.erase(it);
                }
            }

            steps++;
        }

        return steps;
    }
};
