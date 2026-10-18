#include <string>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int maxActiveSectionsAfterTrade(string s) {
        int n = s.length();
        int ones = 0;
        int maxMerge = 0;
        int prevZeroBlock = INT_MIN / 2;
        int i = 0;

        while (i < n) {
            int j = i;
            while (j < n && s[j] == s[i]) {
                j++;
            }
            int len = j - i;
            if (s[i] == '1') {
                ones += len;
            } else {
                maxMerge = max(maxMerge, prevZeroBlock + len);
                prevZeroBlock = len;
            }
            i = j;
        }

        return ones + maxMerge;
    }
};
