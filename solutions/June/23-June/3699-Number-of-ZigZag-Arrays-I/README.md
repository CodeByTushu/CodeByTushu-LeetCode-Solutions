# LeetCode 3699: Number of ZigZag Arrays I

- **Publication Date:** 23 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-zigzag-arrays-i/](https://leetcode.com/problems/number-of-zigzag-arrays-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/UH8fnw74zOM?si=byz9K09Mzx3g8L8F)

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

- $3 \le n \le 2000$
- $1 \le l < r \le 2000$

---

## Algorithmic Approach

### Dynamic Programming with Prefix/Suffix Sum Optimizations

1. **State Definition:**
   - Let $m = r - l + 1$ denote the number of allowable distinct values. We normalize values to the $0$-indexed interval $[0, m - 1]$ where index $i$ corresponds to the value $l + i$.
   - A valid ZigZag sequence must strictly alternate its directional steps between increasing ($<$) and decreasing ($>$):
     - `up[i]`: The number of valid zigzag prefixes of the current length ending at value index $i$, where the last step was **increasing** ($a[k-1] < a[k]$).
     - `down[i]`: The number of valid zigzag prefixes of the current length ending at value index $i$, where the last step was **decreasing** ($a[k-1] > a[k]$).

2. **Transition Relations:**
   - To append value $i$ such that the final step is **increasing** ($j < i$), the previous step ending at $j$ must have been **decreasing**:
     $$\text{newUp}[i] = \sum_{j=0}^{i-1} \text{down}[j]$$
   - To append value $i$ such that the final step is **decreasing** ($j > i$), the previous step ending at $j$ must have been **increasing**:
     $$\text{newDown}[i] = \sum_{j=i+1}^{m-1} \text{up}[j]$$

3. **Prefix and Suffix Sum Optimization:**
   - Evaluating these sums naively for each state would cost $\mathcal{O}(m)$ per value, leading to $\mathcal{O}(n \cdot m^2)$ total time (which would TLE for $n, m \le 2000$).
   - We maintain running prefix and suffix sums:
     - As we sweep $i$ from $0$ to $m - 1$, `prefix` accumulates $\sum_{j=0}^{i-1} \text{down}[j]$, yielding $\text{newUp}[i]$ in $\mathcal{O}(1)$.
     - As we sweep $i$ backwards from $m - 1$ down to $0$, `suffix` accumulates $\sum_{j=i+1}^{m-1} \text{up}[j]$, yielding $\text{newDown}[i]$ in $\mathcal{O}(1)$.
   - This reduces the transition cost per array length to $\mathcal{O}(m)$.

4. **Base Case and Answer:**
   - At length $1$, any single element can initiate an alternating sequence in either direction, so $\text{up}[i] = 1$ and $\text{down}[i] = 1$ for all $0 \le i < m$.
   - After iterating from length $2$ up to $n$, the total number of valid ZigZag arrays is:
     $$\text{ans} = \sum_{i=0}^{m-1} (\text{up}[i] + \text{down}[i]) \pmod{10^9 + 7}$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \cdot m)$ | There are $n - 1$ length iterations. In each iteration, we make one forward pass and one backward pass over the value range of size $m = r - l + 1 \le 2000$. Total operations $\le 2000 \times 2000 = 4 \times 10^6$. |
| **Auxiliary Space** | $\mathcal{O}(m)$ | Space-optimized rolling 1D arrays of size $m$ store the current and next DP states. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    private static final int MOD = 1_000_000_007;

    public int zigZagArrays(int n, int l, int r) {
        int m = r - l + 1;

        long[] up = new long[m];
        long[] down = new long[m];

        for (int i = 0; i < m; i++) {
            up[i] = 1;
            down[i] = 1;
        }

        for (int len = 2; len <= n; len++) {
            long[] newUp = new long[m];
            long[] newDown = new long[m];

            long prefix = 0;
            for (int i = 0; i < m; i++) {
                newUp[i] = prefix;
                prefix = (prefix + down[i]) % MOD;
            }

            long suffix = 0;
            for (int i = m - 1; i >= 0; i--) {
                newDown[i] = suffix;
                suffix = (suffix + up[i]) % MOD;
            }

            up = newUp;
            down = newDown;
        }

        long ans = 0;
        for (int i = 0; i < m; i++) {
            ans = (ans + up[i] + down[i]) % MOD;
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

        up = [1] * m
        down = [1] * m

        for _ in range(2, n + 1):
            new_up = [0] * m
            new_down = [0] * m

            prefix = 0
            for i in range(m):
                new_up[i] = prefix
                prefix = (prefix + down[i]) % MOD

            suffix = 0
            for i in range(m - 1, -1, -1):
                new_down[i] = suffix
                suffix = (suffix + up[i]) % MOD

            up = new_up
            down = new_down

        ans = 0
        for i in range(m):
            ans = (ans + up[i] + down[i]) % MOD

        return ans
```

### C++
```cpp
#include <vector>
#include <utility>

using namespace std;

class Solution {
private:
    static constexpr int MOD = 1'000'000'007;

public:
    int zigZagArrays(int n, int l, int r) {
        int m = r - l + 1;

        vector<long long> up(m, 1);
        vector<long long> down(m, 1);

        for (int len = 2; len <= n; len++) {
            vector<long long> newUp(m, 0);
            vector<long long> newDown(m, 0);

            long long prefix = 0;
            for (int i = 0; i < m; i++) {
                newUp[i] = prefix;
                prefix = (prefix + down[i]) % MOD;
            }

            long long suffix = 0;
            for (int i = m - 1; i >= 0; i--) {
                newDown[i] = suffix;
                suffix = (suffix + up[i]) % MOD;
            }

            up = move(newUp);
            down = move(newDown);
        }

        long long ans = 0;
        for (int i = 0; i < m; i++) {
            ans = (ans + up[i] + down[i]) % MOD;
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
    const MOD = 1000000007;
    const m = r - l + 1;

    let up = new Float64Array(m);
    let down = new Float64Array(m);
    up.fill(1);
    down.fill(1);

    for (let len = 2; len <= n; len++) {
        const newUp = new Float64Array(m);
        const newDown = new Float64Array(m);

        let prefix = 0;
        for (let i = 0; i < m; i++) {
            newUp[i] = prefix;
            prefix = (prefix + down[i]) % MOD;
        }

        let suffix = 0;
        for (let i = m - 1; i >= 0; i--) {
            newDown[i] = suffix;
            suffix = (suffix + up[i]) % MOD;
        }

        up = newUp;
        down = newDown;
    }

    let ans = 0;
    for (let i = 0; i < m; i++) {
        ans = (ans + up[i] + down[i]) % MOD;
    }

    return ans;
};
```

---

<p align="center">
  <a href="../22-June/1189-Maximum-Number-of-Balloons/"><strong>⬅️ Previous Problem (22 June: #1189)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
