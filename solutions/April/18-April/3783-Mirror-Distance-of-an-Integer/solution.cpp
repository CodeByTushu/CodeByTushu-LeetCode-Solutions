/**
 * Problem: LeetCode 3783 - Mirror Distance of an Integer
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <cmath>
#include <cstdlib>

using namespace std;

class Solution {
public:
    int mirrorDistance(int n) {
        int temp = n;
        long long reversed = 0;
        
        while (temp > 0) {
            reversed = reversed * 10 + (temp % 10);
            temp /= 10;
        }
        
        return static_cast<int>(abs(n - reversed));
    }
};
