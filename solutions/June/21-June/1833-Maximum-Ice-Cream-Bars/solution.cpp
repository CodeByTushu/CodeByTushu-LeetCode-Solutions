#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxIceCream(vector<int>& costs, int coins) {
        // Maximum possible cost is 100000
        vector<int> freq(100001, 0);

        // Count frequencies
        for (int cost : costs) {
            freq[cost]++;
        }

        int ans = 0;

        // Buy cheapest ice creams first
        for (int cost = 1; cost <= 100000; cost++) {
            if (freq[cost] == 0) continue;

            int canBuy = min(freq[cost], coins / cost);

            ans += canBuy;
            coins -= canBuy * cost;

            if (coins < cost) {
                // Can't afford any more at this cost or higher
                continue;
            }
        }

        return ans;
    }
};
