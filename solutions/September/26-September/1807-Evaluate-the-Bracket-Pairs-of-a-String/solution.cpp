#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

/**
 * Problem: LeetCode 1807 - Evaluate the Bracket Pairs of a String
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    string evaluate(string s, vector<vector<string>>& knowledge) {
        unordered_map<string, string> dict;
        for (const auto& pair : knowledge) {
            dict[pair[0]] = pair[1];
        }

        string result = "";
        result.reserve(s.size());

        int i = 0;
        int n = s.size();

        while (i < n) {
            if (s[i] == '(') {
                int j = i + 1;
                while (s[j] != ')') {
                    j++;
                }
                string key = s.substr(i + 1, j - i - 1);
                auto it = dict.find(key);
                if (it != dict.end()) {
                    result += it->second;
                } else {
                    result += '?';
                }
                i = j + 1;
            } else {
                result += s[i];
                i++;
            }
        }

        return result;
    }
};
