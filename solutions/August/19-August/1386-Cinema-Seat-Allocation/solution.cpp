#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int maxNumberOfFamilies(int n, vector<vector<int>>& reservedSeats) {
        unordered_map<int, int> rowMask;

        for (const auto& rs : reservedSeats) {
            int row = rs[0];
            int seat = rs[1];
            rowMask[row] |= (1 << seat);
        }

        int leftBlock = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);  // seats 2,3,4,5
        int midBlock = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);   // seats 4,5,6,7
        int rightBlock = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9); // seats 6,7,8,9

        int total = 0;

        for (const auto& [row, mask] : rowMask) {
            if ((mask & leftBlock) == 0 && (mask & rightBlock) == 0) {
                total += 2;
            } else if ((mask & leftBlock) == 0 || (mask & midBlock) == 0 || (mask & rightBlock) == 0) {
                total += 1;
            }
        }

        long long emptyRows = (long long)n - (long long)rowMask.size();
        total += emptyRows * 2;

        return total;
    }
};
