#include <string>

using namespace std;

/**
 * Problem: LeetCode 657 - Robot Return to Origin
 * Language: C++
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
class Solution {
public:
    bool judgeCircle(string moves) {
        int x = 0;
        int y = 0;

        for (char move : moves) {
            if (move == 'U') y++;
            else if (move == 'D') y--;
            else if (move == 'R') x++;
            else if (move == 'L') x--;
        }

        return x == 0 && y == 0;
    }
};
