#include <string>

class Solution {
public:
    int minimumPushes(std::string word) {
        int n = word.length();
        int totalCost = 0;
        for (int i = 0; i < n; i++) {
            totalCost += (i / 8) + 1;
        }
        return totalCost;
    }
};
