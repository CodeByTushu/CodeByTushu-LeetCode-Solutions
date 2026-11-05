/**
 * Problem: LeetCode 1385 - Find the Distance Value Between Two Arrays
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <cmath>

using namespace std;

class Solution {
public:
    int findTheDistanceValue(vector<int>& arr1, vector<int>& arr2, int d) {
        int count = 0;

        for (int a : arr1) {
            boolean ok = true;
            for (int b : arr2) {
                if (abs(a - b) <= d) {
                    ok = false;
                    break;
                }
            }
            if (ok) count++;
        }

        return count;
    }
};
