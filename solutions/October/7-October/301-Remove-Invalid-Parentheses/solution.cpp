#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        int leftRem = 0, rightRem = 0;

        for (char c : s) {
            if (c == '(') {
                leftRem++;
            } else if (c == ')') {
                if (leftRem > 0) leftRem--;
                else rightRem++;
            }
        }

        vector<string> result;
        dfs(s, 0, leftRem, rightRem, result);
        return result;
    }

private:
    void dfs(const string& s, int start, int leftRem, int rightRem, vector<string>& result) {
        if (leftRem == 0 && rightRem == 0) {
            if (isValid(s)) result.push_back(s);
            return;
        }

        for (int i = start; i < s.length(); i++) {
            // Skip duplicates
            if (i > start && s[i] == s[i - 1]) continue;

            char c = s[i];
            if (c != '(' && c != ')') continue;

            string next = s.substr(0, i) + s.substr(i + 1);

            if (c == '(' && leftRem > 0) {
                dfs(next, i, leftRem - 1, rightRem, result);
            } else if (c == ')' && rightRem > 0) {
                dfs(next, i, leftRem, rightRem - 1, result);
            }
        }
    }

    bool isValid(const string& s) {
        int count = 0;
        for (char c : s) {
            if (c == '(') count++;
            else if (c == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }
};
