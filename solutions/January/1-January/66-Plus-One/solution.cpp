#include <vector>

using namespace std;

/**
 * Problem: LeetCode 66 - Plus One
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        // Traverse digits from right to left
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        // If all digits were 9 (e.g. 99 -> 100)
        vector<int> result(n + 1, 0);
        result[0] = 1;
        return result;
    }
};
