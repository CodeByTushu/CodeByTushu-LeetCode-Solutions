#include <string>
#include <vector>
#include <algorithm>

class Solution {
private:
    static constexpr long long CAP = 2000000LL;

    long long combCapped(long long n, long long k) {
        if (k < 0 || k > n) return 0;
        k = std::min(k, n - k);
        long long result = 1;
        for (long long i = 1; i <= k; i++) {
            result = result * (n - k + i) / i;
            if (result > CAP) return CAP + 1;
        }
        return result;
    }

    long long countArrangements(const std::vector<int>& cnt) {
        long long total = 0;
        long long m = 1;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == 0) continue;
            long long c = combCapped(total + cnt[i], cnt[i]);
            m *= c;
            if (m > CAP) m = CAP + 1;
            total += cnt[i];
        }
        return m;
    }

public:
    std::string smallestPalindrome(std::string s, int k) {
        int n = s.length();
        std::vector<int> count(26, 0);
        for (char ch : s) {
            count[ch - 'a']++;
        }

        char midChar = 0;
        bool hasMid = false;
        std::vector<int> half(26, 0);
        int halfLen = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] % 2 == 1) {
                midChar = static_cast<char>('a' + i);
                hasMid = true;
            }
            half[i] = count[i] / 2;
            halfLen += half[i];
        }

        long long kk = k;
        long long total = countArrangements(half);
        if (total < kk) return "";

        std::string half1 = "";
        half1.reserve(halfLen);
        std::vector<int> cur = half;

        for (int pos = 0; pos < halfLen; pos++) {
            for (int c = 0; c < 26; c++) {
                if (cur[c] == 0) continue;
                cur[c]--;
                long long cnt = countArrangements(cur);
                if (cnt >= kk) {
                    half1 += static_cast<char>('a' + c);
                    break;
                } else {
                    kk -= cnt;
                    cur[c]++;
                }
            }
        }

        std::string result = half1;
        if (hasMid) result += midChar;
        std::string revHalf = half1;
        std::reverse(revHalf.begin(), revHalf.end());
        result += revHalf;
        return result;
    }
};
