#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string mapWordWeights(vector<string>& words, vector<int>& weights) {
        string ans = "";
        ans.reserve(words.size());

        for (const string& word : words) {
            long long sum = 0;
            for (char ch : word) {
                sum += weights[ch - 'a'];
            }

            int rem = sum % 26;
            // Reverse alphabetical mapping:
            // 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            char mapped = 'z' - rem;
            ans += mapped;
        }

        return ans;
    }
};
