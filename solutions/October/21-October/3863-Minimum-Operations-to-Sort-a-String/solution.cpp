#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minOperations(string s) {
        int n = s.length();
        bool sorted = true;
        for (int i = 1; i < n; i++) {
            if (s[i - 1] > s[i]) {
                sorted = false;
                break;
            }
        }
        if (sorted) return 0;
        if (n == 2) return -1;

        char mn = 'z', mx = 'a';
        for (char c : s) {
            if (c < mn) mn = c;
            if (c > mx) mx = c;
        }

        if (s[0] == mn || s[n - 1] == mx) return 1;

        char minPrefix = 'z', maxSuffix = 'a';
        for (int i = 0; i < n - 1; i++) {
            minPrefix = min(minPrefix, s[i]);
        }
        for (int i = 1; i < n; i++) {
            maxSuffix = max(maxSuffix, s[i]);
        }

        bool lastStrictMin = s[n - 1] < minPrefix;
        bool firstStrictMax = s[0] > maxSuffix;

        if (lastStrictMin && firstStrictMax) return 3;
        return 2;
    }
};
