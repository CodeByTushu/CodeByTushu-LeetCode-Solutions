#include <vector>
#include <string>
#include <algorithm>
#include <climits>

class Solution {
public:
    std::vector<std::string> maxNumOfSubstrings(std::string s) {
        int n = s.length();
        std::vector<int> first(26, INT_MAX);
        std::vector<int> last(26, -1);
        
        for (int i = 0; i < n; i++) {
            int c = s[i] - 'a';
            first[c] = std::min(first[c], i);
            last[c] = std::max(last[c], i);
        }
        
        std::vector<std::string> result;
        int prevEnd = -1;
        
        for (int i = 0; i < n; i++) {
            int c = s[i] - 'a';
            if (first[c] != i) continue;
            
            int l = i;
            int r = last[c];
            bool valid = true;
            
            for (int j = l; j <= r; j++) {
                int ch = s[j] - 'a';
                if (first[ch] < l) {
                    valid = false;
                    break;
                }
                r = std::max(r, last[ch]);
            }
            
            if (!valid) continue;
            
            if (l > prevEnd) {
                result.push_back(s.substr(l, r - l + 1));
                prevEnd = r;
            } else if (r < prevEnd) {
                result.back() = s.substr(l, r - l + 1);
                prevEnd = r;
            }
        }
        
        return result;
    }
};
