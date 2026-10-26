/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> sortByBits(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int a, int b) {
            int countA = __builtin_popcount(a);
            int countB = __builtin_popcount(b);
            if (countA != countB) {
                return countA < countB;
            }
            return a < b;
        });
        return arr;
    }
};
