#include <string>

class Solution {
public:
    int reverseDegree(std::string s) {
        int result = 0;
        for (int i = 0; i < (int)s.length(); i++) {
            int reversedAlphabetPos = 26 - (s[i] - 'a');
            int stringPos = i + 1;
            result += reversedAlphabetPos * stringPos;
        }
        return result;
    }
};
