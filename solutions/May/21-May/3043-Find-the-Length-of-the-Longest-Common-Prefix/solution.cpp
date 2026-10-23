/**
 * Problem: LeetCode 3043 - Find the Length of the Longest Common Prefix
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <unordered_set>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestCommonPrefix(vector<int>& arr1, vector<int>& arr2) {
        unordered_set<int> prefixes;

        // Collect all numerical prefixes of arr1
        for (int val : arr1) {
            while (val > 0) {
                prefixes.insert(val);
                val /= 10;
            }
        }

        int maxLength = 0;

        // Match prefixes of numbers in arr2 against the set
        for (int val : arr2) {
            while (val > 0) {
                if (prefixes.count(val)) {
                    maxLength = max(maxLength, static_cast<int>(to_string(val).length()));
                    break;
                }
                val /= 10;
            }
        }

        return maxLength;
    }
};
