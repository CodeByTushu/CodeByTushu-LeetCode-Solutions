#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::string smallestPalindrome(std::string s) {
        std::vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }

        std::string left = "";
        left.reserve(s.length() / 2);
        std::string middle = "";

        for (int i = 0; i < 26; i++) {
            while (freq[i] >= 2) {
                left += static_cast<char>('a' + i);
                freq[i] -= 2;
            }
            if (freq[i] == 1) {
                middle = static_cast<char>('a' + i);
            }
        }

        std::string right = left;
        std::reverse(right.begin(), right.end());
        return left + middle + right;
    }
};
