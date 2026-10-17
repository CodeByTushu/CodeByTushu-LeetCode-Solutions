#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> validSequence(string word1, string word2) {
        int n = word1.length();
        int m = word2.length();
        vector<int> ans(m);
        vector<int> last(m, -1);

        // last[j] stores the latest index i in word1 matching word2[j]
        // such that the suffix word2[j...m-1] can be matched in word1[i...]
        int i = n - 1;
        int j = m - 1;
        while (i >= 0 && j >= 0) {
            if (word1[i] == word2[j]) {
                last[j--] = i;
            }
            --i;
        }

        bool canSkip = true;
        j = 0;
        for (i = 0; i < n; ++i) {
            if (j == m) break;
            if (word1[i] == word2[j]) {
                ans[j++] = i;
            } else if (canSkip && (j == m - 1 || i < last[j + 1])) {
                canSkip = false;
                ans[j++] = i;
            }
        }

        return j == m ? ans : vector<int>();
    }
};
