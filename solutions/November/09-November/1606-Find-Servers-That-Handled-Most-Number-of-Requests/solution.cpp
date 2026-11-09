/**
 * Problem: LeetCode 1606 - Find Servers That Handled Most Number of Requests
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <set>
#include <queue>
#include <algorithm>

class Solution {
public:
    std::vector<int> busiestServers(int k, std::vector<int>& arrival, std::vector<int>& load) {
        std::vector<int> count(k, 0);

        // Balanced BST of available server indices (supports lower_bound in O(log k))
        std::set<int> free;
        for (int i = 0; i < k; ++i) {
            free.insert(i);
        }

        // Min-heap tracking busy servers: {completionTime, serverId}
        std::priority_queue<std::pair<long long, int>, 
                            std::vector<std::pair<long long, int>>, 
                            std::greater<std::pair<long long, int>>> busy;

        for (int i = 0; i < arrival.size(); ++i) {
            long long start = arrival[i];

            // Free all servers that have finished before or at current arrival time
            while (!busy.empty() && busy.top().first <= start) {
                free.insert(busy.top().second);
                busy.pop();
            }

            if (free.empty()) continue; // All servers busy -> request dropped

            // Find smallest server index >= (i % k), wrapping to begin() if needed
            auto it = free.lower_bound(i % k);
            if (it == free.end()) {
                it = free.begin();
            }

            int server = *it;
            free.erase(it);
            count[server]++;
            busy.push({start + load[i], server});
        }

        int max_val = *std::max_element(count.begin(), count.end());
        std::vector<int> result;
        for (int i = 0; i < k; ++i) {
            if (count[i] == max_val) {
                result.push_back(i);
            }
        }
        return result;
    }
};
