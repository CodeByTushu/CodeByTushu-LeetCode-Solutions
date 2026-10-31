/**
 * Problem: LeetCode 3013 - Divide an Array Into Subarrays With Minimum Cost II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <set>
#include <algorithm>

using namespace std;

class Solution {
    set<pair<long long, int>> left;
    set<pair<long long, int>> right;
    long long sumL = 0;
    int m = 0;

    void add(pair<long long, int> p) {
        if (left.size() < (size_t)m) {
            left.insert(p);
            sumL += p.first;
        } else {
            if (p < *left.rbegin()) {
                auto maxIt = prev(left.end());
                pair<long long, int> maxL = *maxIt;
                left.erase(maxIt);
                sumL -= maxL.first;
                right.insert(maxL);

                left.insert(p);
                sumL += p.first;
            } else {
                right.insert(p);
            }
        }
    }

    void remove(pair<long long, int> p) {
        auto it = left.find(p);
        if (it != left.end()) {
            left.erase(it);
            sumL -= p.first;
            if (!right.empty()) {
                auto minIt = right.begin();
                pair<long long, int> minR = *minIt;
                right.erase(minIt);
                left.insert(minR);
                sumL += minR.first;
            }
        } else {
            right.erase(p);
        }
    }

public:
    long long minimumCost(vector<int>& nums, int k, int dist) {
        int n = nums.size();
        m = k - 1;
        left.clear();
        right.clear();
        sumL = 0;

        for (int i = 1; i <= min(n - 1, 1 + dist); ++i) {
            add({nums[i], i});
        }

        long long minSum = sumL;

        for (int i = 2 + dist; i < n; ++i) {
            add({nums[i], i});
            remove({nums[i - dist - 1], i - dist - 1});
            minSum = min(minSum, sumL);
        }

        return (long long)nums[0] + minSum;
    }
};
