#include <vector>
#include <unordered_set>

/**
 * Problem: LeetCode 3483 - Unique 3-Digit Even Numbers
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int totalNumbers(std::vector<int>& digits) {
        std::unordered_set<int> result;
        int n = digits.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    if (i == j || j == k || i == k) continue;
                    if (digits[i] == 0) continue;
                    if (digits[k] % 2 != 0) continue;
                    int num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    result.insert(num);
                }
            }
        }
        return result.size();
    }
};
