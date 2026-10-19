#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumCost(vector<int>& cost) {
        sort(cost.rbegin(), cost.rend());
        int total = 0;
        for (int i = 0; i < cost.size(); i++) {
            if ((i + 1) % 3 != 0) {
                total += cost[i];
            }
        }
        return total;
    }
};
