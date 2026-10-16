#include <vector>
#include <string>
#include <unordered_set>
#include <algorithm>

using namespace std;

class Solution {
private:
    string s;
    int i;

    unordered_set<string> parse() {
        unordered_set<string> result = {""};

        while (i < s.length() && s[i] != '}') {
            if (s[i] == ',') {
                break;
            }

            unordered_set<string> nextSet = parseSingle();
            unordered_set<string> newResult;
            for (const string& a : result) {
                for (const string& b : nextSet) {
                    newResult.insert(a + b);
                }
            }
            result = move(newResult);
        }

        return result;
    }

    unordered_set<string> parseSingle() {
        if (s[i] == '{') {
            i++; // skip '{'
            unordered_set<string> result;

            while (true) {
                unordered_set<string> sub = parse();
                result.insert(sub.begin(), sub.end());

                if (i < s.length() && s[i] == ',') {
                    i++; // skip ','
                } else {
                    break;
                }
            }

            i++; // skip '}'
            return result;
        }

        char ch = s[i++];
        return {string(1, ch)};
    }

public:
    vector<string> braceExpansionII(string expression) {
        s = expression;
        i = 0;

        unordered_set<string> resultSet = parse();
        vector<string> sortedList(resultSet.begin(), resultSet.end());
        sort(sortedList.begin(), sortedList.end());
        return sortedList;
    }
};
