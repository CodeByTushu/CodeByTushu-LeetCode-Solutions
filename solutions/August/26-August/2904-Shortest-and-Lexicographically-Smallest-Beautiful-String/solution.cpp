#include <string>
#include <climits>

using namespace std;

class Solution {
public:
    string shortestBeautifulSubstring(string s, int k) {
        int n = s.length();
        string result = "";
        int minLen = INT_MAX;

        int left = 0, ones = 0;
        for (int right = 0; right < n; ++right) {
            if (s[right] == '1') {
                ones++;
            }

            // shrink from left while window has more than k ones,
            // or while shrinking still keeps exactly k ones
            while (ones > k || (left <= right && s[left] == '0' && ones == k)) {
                if (s[left] == '1') {
                    ones--;
                }
                left++;
            }

            if (ones == k) {
                int len = right - left + 1;
                string candidate = s.substr(left, len);
                if (len < minLen || (len == minLen && candidate < result)) {
                    minLen = len;
                    result = candidate;
                }
            }
        }

        return result;
    }
};
