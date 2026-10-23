#include <string>

using namespace std;

/**
 * Problem: LeetCode 3751 - Total Waviness of Numbers in Range I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int totalWaviness(int num1, int num2) {
        int ans = 0;
        for (int num = num1; num <= num2; ++num) {
            ans += getWaviness(num);
        }
        return ans;
    }

private:
    int getWaviness(int num) {
        string s = to_string(num);
        if (s.length() < 3) {
            return 0;
        }

        int waviness = 0;
        for (size_t i = 1; i < s.length() - 1; ++i) {
            if ((s[i] > s[i - 1] && s[i] > s[i + 1]) ||
                (s[i] < s[i - 1] && s[i] < s[i + 1])) {
                waviness++;
            }
        }
        return waviness;
    }
};
