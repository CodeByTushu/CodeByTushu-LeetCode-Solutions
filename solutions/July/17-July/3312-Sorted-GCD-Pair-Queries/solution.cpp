#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

/**
 * Problem: LeetCode 3312 - Sorted GCD Pair Queries
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> gcdValues(vector<int>& nums, vector<long long>& queries) {
        int max_val = *max_element(nums.begin(), nums.end());
        vector<int> freq(max_val + 1, 0);
        for (int x : nums) {
            freq[x]++;
        }

        vector<long long> cnt(max_val + 1, 0);
        for (int g = 1; g <= max_val; ++g) {
            long long c = 0;
            for (int j = g; j <= max_val; j += g) {
                c += freq[j];
            }
            cnt[g] = c * (c - 1) / 2;
        }

        vector<long long> exact = cnt;
        for (int g = max_val; g >= 1; --g) {
            for (int j = g * 2; j <= max_val; j += g) {
                exact[g] -= exact[j];
            }
        }

        vector<long long> prefix(max_val + 1, 0);
        for (int g = 1; g <= max_val; ++g) {
            prefix[g] = prefix[g - 1] + exact[g];
        }

        vector<int> ans;
        ans.reserve(queries.size());
        for (long long q : queries) {
            long long k = q + 1;
            auto it = lower_bound(prefix.begin() + 1, prefix.end(), k);
            ans.push_back(static_cast<int>(distance(prefix.begin(), it)));
        }

        return ans;
    }
};
