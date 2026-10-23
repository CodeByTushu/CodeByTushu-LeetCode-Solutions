#include <vector>
#include <unordered_map>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 1477 - Find Two Non-overlapping Sub-arrays Each With Target Sum
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int minSumOfLengths(vector<int>& arr, int target) {
        int n = arr.size();
        vector<int> best(n, INT_MAX);
        unordered_map<int, int> prefixMap;
        prefixMap[0] = -1;
        
        int sum = 0;
        int ans = INT_MAX;
        int curBest = INT_MAX;
        
        for (int i = 0; i < n; i++) {
            sum += arr[i];
            if (prefixMap.count(sum - target)) {
                int j = prefixMap[sum - target];
                int len = i - j;
                if (j >= 0 && best[j] != INT_MAX) {
                    ans = min(ans, len + best[j]);
                }
                curBest = min(curBest, len);
            }
            best[i] = curBest;
            prefixMap[sum] = i;
        }
        
        return ans == INT_MAX ? -1 : ans;
    }
};
