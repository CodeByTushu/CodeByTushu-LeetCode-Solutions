/**
 * Problem: LeetCode 2975 - Maximum Square Area by Removing Fences From a Field
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int maximizeSquareArea(int m, int n, vector<int>& hFences, vector<int>& vFences) {
        const long long MOD = 1000000007LL;

        // Add boundary fences
        vector<int> h = hFences;
        h.push_back(1);
        h.push_back(m);
        sort(h.begin(), h.end());

        vector<int> v = vFences;
        v.push_back(1);
        v.push_back(n);
        sort(v.begin(), v.end());

        // Collect all horizontal differences in a hash set
        unordered_set<int> hDiffs;
        hDiffs.reserve(h.size() * (h.size() - 1) / 2);
        for (size_t i = 0; i < h.size(); i++) {
            for (size_t j = i + 1; j < h.size(); j++) {
                hDiffs.insert(h[j] - h[i]);
            }
        }

        // Find the maximum side length common to both
        long long maxSide = -1;
        for (size_t i = 0; i < v.size(); i++) {
            for (size_t j = i + 1; j < v.size(); j++) {
                int diff = v[j] - v[i];
                if (hDiffs.count(diff)) {
                    maxSide = max(maxSide, static_cast<long long>(diff));
                }
            }
        }

        if (maxSide == -1) {
            return -1;
        }

        return static_cast<int>((maxSide * maxSide) % MOD);
    }
};
