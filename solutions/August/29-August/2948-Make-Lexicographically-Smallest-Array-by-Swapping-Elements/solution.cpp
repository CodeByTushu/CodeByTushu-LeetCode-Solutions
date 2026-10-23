#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 2948 - Make Lexicographically Smallest Array by Swapping Elements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> lexicographicallySmallestArray(vector<int>& nums, int limit) {
        int n = nums.size();
        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        sort(idx.begin(), idx.end(), [&](int a, int b) {
            return nums[a] < nums[b];
        });

        vector<int> result(n);
        int i = 0;
        while (i < n) {
            int j = i + 1;
            while (j < n && nums[idx[j]] - nums[idx[j - 1]] <= limit) {
                j++;
            }

            // Extract and sort indices within this connected component
            vector<int> groupIndices(idx.begin() + i, idx.begin() + j);
            sort(groupIndices.begin(), groupIndices.end());

            // Assign sorted values to sorted index positions
            for (int k = 0; k < (int)groupIndices.size(); k++) {
                result[groupIndices[k]] = nums[idx[i + k]];
            }

            i = j;
        }

        return result;
    }
};
