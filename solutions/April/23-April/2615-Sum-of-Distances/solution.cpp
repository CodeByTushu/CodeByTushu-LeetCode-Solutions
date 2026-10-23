/**
 * Problem: LeetCode 2615 - Sum of Distances
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<long long> distance(vector<int>& nums) {
        int n = nums.size();
        vector<long long> result(n, 0);
        
        unordered_map<int, vector<int>> posMap;
        for (int i = 0; i < n; ++i) {
            posMap[nums[i]].push_back(i);
        }
        
        for (const auto& [val, indices] : posMap) {
            int m = indices.size();
            if (m <= 1) continue;
            
            long long totalSum = 0;
            for (int idx : indices) {
                totalSum += idx;
            }
            
            long long leftSum = 0;
            for (int k = 0; k < m; ++k) {
                long long currentIdx = indices[k];
                long long rightSum = totalSum - leftSum - currentIdx;
                
                long long leftContrib = (long long) k * currentIdx - leftSum;
                long long rightContrib = rightSum - (long long) (m - 1 - k) * currentIdx;
                
                result[currentIdx] = leftContrib + rightContrib;
                leftSum += currentIdx;
            }
        }
        
        return result;
    }
};
