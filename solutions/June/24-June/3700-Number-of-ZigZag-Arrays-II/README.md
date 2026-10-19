# LeetCode 3700: Number of ZigZag Arrays II

- **Publication Date:** 24 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-zigzag-arrays-ii/](https://leetcode.com/problems/number-of-zigzag-arrays-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/snHC-fwsqoU?si=AAkqoXiSH-2H5sXc)

---

## Problem Summary

You are given three integers `n`, `l`, and `r`.

A **ZigZag array** of length `n` is defined as follows:
- Each element lies in the range `[l, r]`.
- No two adjacent elements are equal.
- No three consecutive elements form a strictly increasing or strictly decreasing sequence.

Return the total number of valid ZigZag arrays. Since the answer may be large, return it **modulo** $10^9 + 7$.

- A sequence is said to be **strictly increasing** if each element is strictly greater than its previous one (if exists).
- A sequence is said to be **strictly decreasing** if each element is strictly smaller than its previous one (if exists).

---

### Examples

#### Example 1:
- **Input:** `n = 3, l = 4, r = 5`
- **Output:** `2`
- **Explanation:** There are only 2 valid ZigZag arrays of length $n = 3$ using values in the range $[4, 5]$:
  - `[4, 5, 4]`
  - `[5, 4, 5]`

#### Example 2:
- **Input:** `n = 3, l = 1, r = 3`
- **Output:** `10`
- **Explanation:** There are 10 valid ZigZag arrays of length $n = 3$ using values in the range $[1, 3]$:
  - Starting with an increasing step: `[1, 2, 1]`, `[1, 3, 1]`, `[1, 3, 2]`, `[2, 3, 1]`, `[2, 3, 2]`
  - Starting with a decreasing step: `[2, 1, 2]`, `[2, 1, 3]`, `[3, 1, 2]`, `[3, 1, 3]`, `[3, 2, 3]`

---

### Constraints

- $3 \le n \le 10^9$
- $1 \le l < r \le 75$

---

## Algorithmic Approach

### Matrix Exponentiation Optimization for Linear Recurrences

1. **From Dynamic Programming to Linear Transitions:**
   - In Part I (LeetCode #3699), $n \le 2000$, which allowed an $\mathcal{O}(n \cdot m)$ dynamic programming approach.
   - In Part II, $n$ reaches up to $10^9$, making linear iteration in $n$ infeasible. However, $r - l + 1 \le 75$, meaning the alphabet/range size $m = r - l + 1$ is quite small ($m \le 75$).
   - The DP states at length $k$ can be represented as a row vector of length $2m$:
     - Indices $0 \dots m - 1$: $\text{up}[i]$, the number of valid sequences of current length ending at value index $i$ where the last step was **increasing** ($a[k-1] < a[k]$).
     - Indices $m \dots 2m - 1$: $\text{down}[i]$, the number of valid sequences of current length ending at value index $i$ where the last step was **decreasing** ($a[k-1] > a[k]$).

2. **Transition Matrix Formulation:**
   - The transitions between length $k$ and length $k + 1$ are fixed linear combinations of previous states:
     $$\text{newUp}[j] = \sum_{i < j} \text{down}[i]$$
     $$\text{newDown}[j] = \sum_{i > j} \text{up}[i]$$
   - We can construct a $(2m \times 2m)$ transition matrix $\mathbf{T}$:
     - For each $0 \le i < m$ and $0 \le j < i$, setting $\mathbf{T}[i, j + m] = 1$ contributes $\text{up}[i]$ to $\text{newDown}[j]$ since $i > j$.
     - For each $0 \le i < m$ and $i < j < m$, setting $\mathbf{T}[i + m, j] = 1$ contributes $\text{down}[i]$ to $\text{newUp}[j]$ since $i < j$.
   - When multiplying a row state vector $\mathbf{v}_{k}$ by $\mathbf{T}$, we get the subsequent state:
     $$\mathbf{v}_{k+1} = \mathbf{v}_k \cdot \mathbf{T}$$

3. **Binary Exponentiation:**
   - Starting from the initial base state at length $1$, where $\mathbf{v}_1 = [1, 1, \dots, 1]_{1 \times 2m}$, after $n - 1$ steps we have:
     $$\mathbf{v}_n = \mathbf{v}_1 \cdot \mathbf{T}^{n-1}$$
   - Using binary matrix exponentiation, we compute $\mathbf{T}^{n-1}$ in $\mathcal{O}((2m)^3 \log n)$ time.

4. **Base Case and Final Sum:**
   - If $n = 1$, any single element in $[l, r]$ is a valid sequence of length 1, so the answer is simply $m = r - l + 1$.
   - For $n \ge 2$, the total number of valid ZigZag arrays is the sum of all components in $\mathbf{v}_n$:
     $$\text{ans} = \sum_{c=0}^{2m-1} \mathbf{v}_n[c] \pmod{10^9 + 7}$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((2m)^3 \log n)$ | Matrix dimensions are $K \times K$ with $K = 2m \le 150$. Each matrix multiplication takes $\mathcal{O}(K^3)$ operations. Matrix exponentiation requires $\mathcal{O}(\log n)$ multiplications. For $m \le 75$ and $n \le 10^9$, $(150)^3 \times 30 \approx 1.01 \times 10^8$ operations, executing comfortably within time limits. |
| **Auxiliary Space** | $\mathcal{O}(m^2)$ | A flat 1D array of size $(2m \times 2m) \le 150 \times 150 = 22,500$ elements is allocated to store the transition matrix and intermediate matrix products. |

---

## Multi-Language Implementations

### Java
```java
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
```

### Python
```python
class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1_000_000_007
        m = r - l + 1

        if n == 1:
            return m

        class Matrix:
            def __init__(self, n: int, m: int):
                self.n = n
                self.m = m
                self.data = [0] * (n * m)

            def get(self, i: int, j: int) -> int:
                return self.data[i * self.m + j]

            def set(self, i: int, j: int, val: int) -> None:
                self.data[i * self.m + j] = val

            def mul(self, b: 'Matrix') -> 'Matrix':
                res = Matrix(self.n, b.m)
                for i in range(self.n):
                    for k in range(self.m):
                        cur = self.get(i, k)
                        if cur == 0:
                            continue
                        for j in range(b.m):
                            res.set(
                                i,
                                j,
                                (res.get(i, j) + cur * b.get(k, j)) % MOD
                            )
                return res

            def pow(self, exp: int, res: 'Matrix') -> 'Matrix':
                base = Matrix(self.n, self.m)
                base.data = list(self.data)

                while exp > 0:
                    if exp & 1:
                        res = res.mul(base)
                    base = base.mul(base)
                    exp >>= 1

                return res

        trans = Matrix(2 * m, 2 * m)

        for i in range(m):
            for j in range(i):
                trans.set(i, j + m, 1)

            for j in range(i + 1, m):
                trans.set(i + m, j, 1)

        dp = Matrix(1, 2 * m)

        for i in range(2 * m):
            dp.set(0, i, 1)

        dp = trans.pow(n - 1, dp)

        ans = 0
        for i in range(2 * m):
            ans = (ans + dp.get(0, i)) % MOD

        return ans
```

### C++
```cpp
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
```

### JavaScript
```javascript
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
```

---

<p align="center">
  <a href="../23-June/3699-Number-of-ZigZag-Arrays-I/"><strong>⬅️ Previous Problem (23 June: #3699)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
