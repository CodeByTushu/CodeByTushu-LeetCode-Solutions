/**
 * Problem: LeetCode 67 - Add Binary
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        string res = "";
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a[i--] - '0';
            }
            if (j >= 0) {
                sum += b[j--] - '0';
            }
            res += to_string(sum % 2);
            carry = sum / 2;
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
