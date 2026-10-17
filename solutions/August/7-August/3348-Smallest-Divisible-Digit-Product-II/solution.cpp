#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
    struct FactorCounts {
        int c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0, c8 = 0, c9 = 0;

        int total() const {
            return c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9;
        }

        string construct() const {
            string res = "";
            res.append(c2, '2');
            res.append(c3, '3');
            res.append(c4, '4');
            res.append(c5, '5');
            res.append(c6, '6');
            res.append(c7, '7');
            res.append(c8, '8');
            res.append(c9, '9');
            return res;
        }
    };

    FactorCounts getFactorCount(int c2, int c3, int c5, int c7) {
        c2 = max(0, c2);
        c3 = max(0, c3);
        c5 = max(0, c5);
        c7 = max(0, c7);

        int count8 = c2 / 3;
        int rem2 = c2 % 3;
        int count9 = c3 / 2;
        int count3 = c3 % 2;
        int count4 = rem2 / 2;
        int count2 = rem2 % 2;
        int count6 = 0;

        if (count2 == 1 && count3 == 1) {
            count2 = 0;
            count3 = 0;
            count6 = 1;
        }
        if (count3 == 1 && count4 == 1) {
            count2 = 1;
            count6 = 1;
            count3 = 0;
            count4 = 0;
        }

        return {count2, count3, count4, c5, count6, c7, count8, count9};
    }

public:
    string smallestNumber(string num, long long t) {
        const int FACTOR_2[10] = {0, 0, 1, 0, 2, 0, 1, 0, 3, 0};
        const int FACTOR_3[10] = {0, 0, 0, 1, 0, 0, 1, 0, 0, 2};
        const int FACTOR_5[10] = {0, 0, 0, 0, 0, 1, 0, 0, 0, 0};
        const int FACTOR_7[10] = {0, 0, 0, 0, 0, 0, 0, 1, 0, 0};

        int req2 = 0, req3 = 0, req5 = 0, req7 = 0;
        while (t % 2 == 0) { req2++; t /= 2; }
        while (t % 3 == 0) { req3++; t /= 3; }
        while (t % 5 == 0) { req5++; t /= 5; }
        while (t % 7 == 0) { req7++; t /= 7; }
        if (t > 1) return "-1";

        FactorCounts fc = getFactorCount(req2, req3, req5, req7);
        if (fc.total() > (int)num.length()) {
            return fc.construct();
        }

        int cur2 = 0, cur3 = 0, cur5 = 0, cur7 = 0;
        int firstZeroIndex = -1;
        for (int i = 0; i < (int)num.length(); i++) {
            int d = num[i] - '0';
            if (d == 0 && firstZeroIndex == -1) {
                firstZeroIndex = i;
            }
            cur2 += FACTOR_2[d];
            cur3 += FACTOR_3[d];
            cur5 += FACTOR_5[d];
            cur7 += FACTOR_7[d];
        }

        if (firstZeroIndex == -1) {
            firstZeroIndex = num.length();
            if (cur2 >= req2 && cur3 >= req3 && cur5 >= req5 && cur7 >= req7) {
                return num;
            }
        }

        int n = num.length();
        for (int i = n - 1; i >= 0; --i) {
            int d = num[i] - '0';
            cur2 -= FACTOR_2[d];
            cur3 -= FACTOR_3[d];
            cur5 -= FACTOR_5[d];
            cur7 -= FACTOR_7[d];

            if (i > firstZeroIndex) continue;

            int spaceAfter = n - 1 - i;
            for (int bigger = d + 1; bigger <= 9; ++bigger) {
                int rem2 = req2 - cur2 - FACTOR_2[bigger];
                int rem3 = req3 - cur3 - FACTOR_3[bigger];
                int rem5 = req5 - cur5 - FACTOR_5[bigger];
                int rem7 = req7 - cur7 - FACTOR_7[bigger];

                FactorCounts needed = getFactorCount(rem2, rem3, rem5, rem7);
                if (needed.total() <= spaceAfter) {
                    int fillOnes = spaceAfter - needed.total();
                    string res = num.substr(0, i);
                    res += to_string(bigger);
                    res.append(fillOnes, '1');
                    res += needed.construct();
                    return res;
                }
            }
        }

        FactorCounts ext = getFactorCount(req2, req3, req5, req7);
        int fillOnes = n + 1 - ext.total();
        string res = "";
        res.append(fillOnes, '1');
        res += ext.construct();
        return res;
    }
};
