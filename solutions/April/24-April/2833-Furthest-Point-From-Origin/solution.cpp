/**
 * Problem: LeetCode 2833 - Furthest Point From Origin
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>
#include <cmath>

using namespace std;

class Solution {
public:
    int furthestDistanceFromOrigin(string moves) {
        int countL = 0;
        int countR = 0;
        int countBlank = 0;
        
        for (char c : moves) {
            if (c == 'L') {
                countL++;
            } else if (c == 'R') {
                countR++;
            } else {
                countBlank++;
            }
        }
        
        return abs(countL - countR) + countBlank;
    }
};
