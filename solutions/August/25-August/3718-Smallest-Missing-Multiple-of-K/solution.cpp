#include <vector>
#include <unordered_set>

using namespace std;

/**
 * Problem: LeetCode 3718 - Smallest Missing Multiple of K
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int missingMultiple(vector<int>& nums, int k) {
        unordered_set<int> set(nums.begin(), nums.end());

        int multiple = k;
        while (set.count(multiple)) {
            multiple += k;
        }

        return multiple;
    }
};
