#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumLengthSubstring(string s) {
        int n = s.length();
        vector<int> freq(26, 0);
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < n; right++) {
            int c = s[right] - 'a';
            freq[c]++;

            while (freq[c] > 2) {
                freq[s[left] - 'a']--;
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
