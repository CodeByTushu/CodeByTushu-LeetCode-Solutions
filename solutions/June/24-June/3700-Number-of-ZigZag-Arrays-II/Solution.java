/**
 * Problem: LeetCode 3700 - Number of ZigZag Arrays II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {

    private static final long MOD = 1_000_000_007L;

    static class Matrix {

        int n, m;
        long[] data;

        Matrix(int n, int m) {
            this.n = n;
            this.m = m;
            this.data = new long[n * m];
        }

        long get(int i, int j) {
            return data[i * m + j];
        }

        void set(int i, int j, long val) {
            data[i * m + j] = val;
        }

        Matrix mul(Matrix b) {
            Matrix res = new Matrix(n, b.m);

            for (int i = 0; i < n; i++) {
                for (int k = 0; k < m; k++) {
                    long cur = get(i, k);

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

        Matrix pow(long exp, Matrix res) {
            Matrix base = new Matrix(n, m);
            System.arraycopy(data, 0, base.data, 0, data.length);

            while (exp > 0) {
                if ((exp & 1L) == 1L) {
                    res = res.mul(base);
                }

                base = base.mul(base);
                exp >>= 1;
            }

            return res;
        }
    }

    public int zigZagArrays(int n, int l, int r) {

        int m = r - l + 1;

        if (n == 1) {
            return m;
        }

        Matrix trans = new Matrix(2 * m, 2 * m);

        for (int i = 0; i < m; i++) {

            for (int j = 0; j < i; j++) {
                trans.set(i, j + m, 1L);
            }

            for (int j = i + 1; j < m; j++) {
                trans.set(i + m, j, 1L);
            }
        }

        Matrix dp = new Matrix(1, 2 * m);

        for (int i = 0; i < 2 * m; i++) {
            dp.set(0, i, 1L);
        }

        dp = trans.pow(n - 1L, dp);

        long ans = 0;

        for (int i = 0; i < 2 * m; i++) {
            ans = (ans + dp.get(0, i)) % MOD;
        }

        return (int) ans;
    }
}
