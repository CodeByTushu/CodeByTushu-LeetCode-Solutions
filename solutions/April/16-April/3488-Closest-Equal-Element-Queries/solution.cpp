/**
 * Problem: LeetCode 3488 - Closest Equal Element Queries
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> solveQueries(vector<int>& nums, vector<int>& queries) {
        const int n = nums.size();
        vector<int> ans;
        ans.reserve(queries.size());
        
        // minDist[i] stores the minimum circular distance to an identical element
        vector<int> minDist(n, n);
        unordered_map<int, int> lastSeen;
        
        // Traverse the circular array twice to capture all adjacent pairs & wrap-around
        for (int i = 0; i < n * 2; ++i) {
            const int index = i % n;
            const int val = nums[index];
            
            auto it = lastSeen.find(val);
            if (it != lastSeen.end()) {
                const int prevIndex = it->second % n;
                const int d = i - it->second;
                minDist[index] = min(minDist[index], d);
                minDist[prevIndex] = min(minDist[prevIndex], d);
            }
            lastSeen[val] = i;
        }
        
        // Answer each query in O(1) time
        for (const int query : queries) {
            ans.push_back(minDist[query] == n ? -1 : minDist[query]);
        }
        
        return ans;
    }
};
