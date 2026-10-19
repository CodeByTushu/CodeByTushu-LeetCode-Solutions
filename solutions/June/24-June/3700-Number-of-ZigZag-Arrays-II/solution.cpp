#include <vector>

using namespace std;

class Solution {
private:
    static constexpr long long MOD = 1'000'000'007LL;

    struct Matrix {
        int n, m;
        vector<long long> data;

        Matrix(int n, int m) : n(n), m(m), data(n * m, 0) {}

        long long get(int i, int j) const {
            return data[i * m + j];
        }

        void set(int i, int j, long long val) {
            data[i * m + j] = val;
        }

        Matrix mul(const Matrix& b) const {
            Matrix res(n, b.m);

            for (int i = 0; i < n; i++) {
                for (int k = 0; k < m; k++) {
                    long long cur = get(i, k);

                    if (cur == 0) {
                        continue;
                    }

                    for (int j = 0; j < b.m; j++) {
                        res.set(
                            i,
                            j,
                            (res.get(i, j) + cur * b.get(k, j)) % MOD
                        );
                    }
                }
            }

            return res;
        }

        Matrix pow(long long exp, Matrix res) const {
            Matrix base = *this;

            while (exp > 0) {
                if ((exp & 1LL) == 1LL) {
                    res = res.mul(base);
                }

                base = base.mul(base);
                exp >>= 1;
            }

            return res;
        }
    };

public:
    int zigZagArrays(int n, int l, int r) {
        int m = r - l + 1;

        if (n == 1) {
            return m;
        }

        Matrix trans(2 * m, 2 * m);

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < i; j++) {
                trans.set(i, j + m, 1LL);
            }

            for (int j = i + 1; j < m; j++) {
                trans.set(i + m, j, 1LL);
            }
        }

        Matrix dp(1, 2 * m);

        for (int i = 0; i < 2 * m; i++) {
            dp.set(0, i, 1LL);
        }

        dp = trans.pow(n - 1LL, dp);

        long long ans = 0;

        for (int i = 0; i < 2 * m; i++) {
            ans = (ans + dp.get(0, i)) % MOD;
        }

        return static_cast<int>(ans);
    }
};
