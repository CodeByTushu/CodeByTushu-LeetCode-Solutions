/**
 * Problem: LeetCode 1855 - Maximum Distance Between a Pair of Values
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxDistance(vector<int>& nums1, vector<int>& nums2) {
        int maxDist = 0;
        int i = 0;
        int j = 0;
        const int m = nums1.size();
        const int n = nums2.size();
        
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) {
                maxDist = max(maxDist, j - i);
                j++;
            } else {
                i++;
            }
        }
        
        return maxDist;
    }
};
