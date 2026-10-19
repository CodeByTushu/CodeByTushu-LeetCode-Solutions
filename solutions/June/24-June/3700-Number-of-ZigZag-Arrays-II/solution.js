/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function(n, l, r) {
    const MOD = 1000000007n;
    const m = r - l + 1;

    if (n === 1) {
        return m;
    }

    class Matrix {
        constructor(n, m) {
            this.n = n;
            this.m = m;
            this.data = new BigInt64Array(n * m);
        }

        get(i, j) {
            return this.data[i * this.m + j];
        }

        set(i, j, val) {
            this.data[i * this.m + j] = val;
        }

        mul(b) {
            const res = new Matrix(this.n, b.m);

            for (let i = 0; i < this.n; i++) {
                for (let k = 0; k < this.m; k++) {
                    const cur = this.get(i, k);

                    if (cur === 0n) {
                        continue;
                    }

                    for (let j = 0; j < b.m; j++) {
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

        pow(exp, res) {
            let base = new Matrix(this.n, this.m);
            base.data.set(this.data);

            let e = BigInt(exp);
            while (e > 0n) {
                if ((e & 1n) === 1n) {
                    res = res.mul(base);
                }

                base = base.mul(base);
                e >>= 1n;
            }

            return res;
        }
    }

    const trans = new Matrix(2 * m, 2 * m);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < i; j++) {
            trans.set(i, j + m, 1n);
        }

        for (let j = i + 1; j < m; j++) {
            trans.set(i + m, j, 1n);
        }
    }

    let dp = new Matrix(1, 2 * m);

    for (let i = 0; i < 2 * m; i++) {
        dp.set(0, i, 1n);
    }

    dp = trans.pow(n - 1, dp);

    let ans = 0n;

    for (let i = 0; i < 2 * m; i++) {
        ans = (ans + dp.get(0, i)) % MOD;
    }

    return Number(ans);
};
