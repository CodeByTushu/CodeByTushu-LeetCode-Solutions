#include <string>

using namespace std;

/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Language: C++
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class Solution {
public:
    string decodeCiphertext(string encodedText, int rows) {
        if (rows == 1 || encodedText.empty()) {
            return encodedText;
        }

        int n = encodedText.size();
        int cols = n / rows;
        string res = "";
        res.reserve(n);

        for (int c = 0; c < cols; c++) {
            for (int r = 0; r < rows && c + r < cols; r++) {
                res += encodedText[r * cols + (c + r)];
            }
        }

        while (!res.empty() && res.back() == ' ') {
            res.pop_back();
        }

        return res;
    }
};
