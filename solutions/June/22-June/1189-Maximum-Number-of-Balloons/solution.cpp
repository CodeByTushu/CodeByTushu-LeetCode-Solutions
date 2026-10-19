#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxNumberOfBalloons(string text) {
        vector<int> freq(26, 0);

        // Count frequency of each character
        for (char ch : text) {
            freq[ch - 'a']++;
        }

        // "balloon" -> b=1, a=1, l=2, o=2, n=1
        return min({
            freq['b' - 'a'],
            freq['a' - 'a'],
            freq['l' - 'a'] / 2,
            freq['o' - 'a'] / 2,
            freq['n' - 'a']
        });
    }
};
