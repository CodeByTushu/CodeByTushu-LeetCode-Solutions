/**
 * Problem: LeetCode 761 - Special Binary String
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    string makeLargestSpecial(string s) {
        if (s.length() <= 2) {
            return s;
        }

        vector<string> parts;
        int count = 0;
        int start = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            if (s[i] == '1') {
                count++;
            } else {
                count--;
            }

            if (count == 0) {
                string inner = makeLargestSpecial(s.substr(start + 1, i - start - 1));
                parts.push_back("1" + inner + "0");
                start = i + 1;
            }
        }

        sort(parts.begin(), parts.end(), greater<string>());

        string result = "";
        for (const string& part : parts) {
            result += part;
        }

        return result;
    }
};
