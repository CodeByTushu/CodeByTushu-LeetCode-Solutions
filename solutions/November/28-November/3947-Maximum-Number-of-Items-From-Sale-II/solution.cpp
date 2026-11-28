/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int maximumSaleItems(vector<vector<int>>& items, int budget) {
        int n = items.size();

        vector<int> cnt(n + 1, 0);
        for (const auto& it : items) {
            cnt[it[0]]++;
        }

        // m[d] = kitne items ka factor d ka multiple hai (Harmonic sum, O(n log n))
        vector<int> m(n + 1, 0);
        for (int d = 1; d <= n; d++) {
            for (int x = d; x <= n; x += d) {
                m[d] += cnt[x];
            }
        }

        long long minPrice = LLONG_MAX;
        vector<pair<long long, long long>> candidates;
        candidates.reserve(n);

        for (int i = 0; i < n; i++) {
            long long price = items[i][1];
            long long f = m[items[i][0]] - 1;
            minPrice = min(minPrice, price);
            candidates.push_back({price, f});
        }

        sort(candidates.begin(), candidates.end());

        long long rem = budget;
        long long ans = 0;

        for (const auto& [price, f] : candidates) {
            // Value-2 copy tabhi beneficial hai jab price < 2 * minPrice
            if (price >= 2 * minPrice) break;
            if (f == 0) continue;

            long long take = min(f, rem / price);
            rem -= take * price;
            ans += 2 * take;

            if (take < f) break;
        }

        // Bacha hua budget sabse sasta item ki copies pe
        ans += rem / minPrice;

        return (int)ans;
    }
};
