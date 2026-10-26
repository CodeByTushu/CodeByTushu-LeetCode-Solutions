/**
 * Problem: LeetCode 2977 - Minimum Cost to Convert String II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm + Dynamic Programming
 * Time Complexity: O(V^3 + N * |lengths| * L_max)
 * Space Complexity: O(V^2 + N)
 */

#include <vector>
#include <string>
#include <unordered_map>
#include <set>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long minimumCost(string source, string target, vector<string>& original, vector<string>& changed, vector<int>& cost) {
        int n = source.length();
        unordered_map<string, int> strToId;
        int idCounter = 0;

        for (size_t i = 0; i < original.size(); ++i) {
            if (strToId.find(original[i]) == strToId.end()) {
                strToId[original[i]] = idCounter++;
            }
            if (strToId.find(changed[i]) == strToId.end()) {
                strToId[changed[i]] = idCounter++;
            }
        }

        int V = idCounter;
        const long long INF = 1e16;
        vector<vector<long long>> dist(V, vector<long long>(V, INF));
        for (int i = 0; i < V; ++i) {
            dist[i][i] = 0;
        }

        for (size_t i = 0; i < original.size(); ++i) {
            int u = strToId[original[i]];
            int v = strToId[changed[i]];
            dist[u][v] = min(dist[u][v], (long long)cost[i]);
        }

        // Floyd-Warshall
        for (int k = 0; k < V; ++k) {
            for (int i = 0; i < V; ++i) {
                if (dist[i][k] >= INF) continue;
                for (int j = 0; j < V; ++j) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        set<int> lengthSet;
        for (const string& s : original) {
            lengthSet.insert(s.length());
        }

        vector<long long> dp(n + 1, INF);
        dp[0] = 0;

        for (int i = 1; i <= n; ++i) {
            if (source[i - 1] == target[i - 1] && dp[i - 1] < INF) {
                dp[i] = min(dp[i], dp[i - 1]);
            }

            for (int L : lengthSet) {
                int j = i - L;
                if (j < 0) continue;
                if (dp[j] >= INF) continue;

                string subS = source.substr(j, L);
                string subT = target.substr(j, L);

                auto itS = strToId.find(subS);
                auto itT = strToId.find(subT);

                if (itS != strToId.end() && itT != strToId.end()) {
                    int u = itS->second;
                    int v = itT->second;
                    if (dist[u][v] < INF) {
                        dp[i] = min(dp[i], dp[j] + dist[u][v]);
                    }
                }
            }
        }

        return dp[n] >= INF ? -1 : dp[n];
    }
};
