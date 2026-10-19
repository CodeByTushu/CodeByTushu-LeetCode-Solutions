#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumLength(vector<int>& nums) {
        unordered_map<long long, int> freq;

        for (int x : nums) {
            freq[x]++;
        }

        int ans = 1;

        if (freq.find(1LL) != freq.end()) {
            int cnt = freq[1LL];
            ans = max(ans, cnt % 2 == 0 ? cnt - 1 : cnt);
        }

        for (const auto& [x, _] : freq) {
            if (x == 1LL) continue;

            long long cur = x;
            int len = 0;

            while (freq.count(cur) && freq[cur] >= 2) {
                len += 2;

                if (cur > 1000000000LL / cur) {
                    break;
                }

                cur *= cur;
            }

            if (freq.count(cur) && freq[cur] == 1) {
                len++;
            } else {
                len--;
            }

            ans = max(ans, len);
        }

        return ans;
    }
};
