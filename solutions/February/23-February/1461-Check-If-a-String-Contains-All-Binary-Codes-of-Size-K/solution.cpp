/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int target = 1 << k;
        if ((int)s.length() - k + 1 < target) {
            return false;
        }

        vector<bool> seen(target, false);
        int count = 0;
        int hashVal = 0;
        int mask = target - 1;

        for (int i = 0; i < (int)s.length(); i++) {
            hashVal = ((hashVal << 1) & mask) | (s[i] - '0');
            if (i >= k - 1) {
                if (!seen[hashVal]) {
                    seen[hashVal] = true;
                    count++;
                    if (count == target) {
                        return true;
                    }
                }
            }
        }

        return count == target;
    }
};
