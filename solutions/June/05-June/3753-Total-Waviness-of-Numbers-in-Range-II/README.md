# LeetCode 3753: Total Waviness of Numbers in Range II

- **Publication Date:** 05 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/total-waviness-of-numbers-in-range-ii/](https://leetcode.com/problems/total-waviness-of-numbers-in-range-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/vvz487n8tqo?si=wOGmhlM-zyUvZrHB)

---

## Problem Summary

You are given two integers `num1` and `num2` representing an inclusive range `[num1, num2]`.

The **waviness** of a number is defined as the total count of its **peaks** and **valleys**:
- A digit is a **peak** if it is strictly greater than both of its immediate neighbors ($d_{i-1} < d_i > d_{i+1}$).
- A digit is a **valley** if it is strictly less than both of its immediate neighbors ($d_{i-1} > d_i < d_{i+1}$).
- The first and last digits of a number **cannot** be peaks or valleys.
- Any number with fewer than 3 digits has a waviness of `0`.

Return the **total sum of waviness** for all numbers in the range `[num1, num2]` where inputs can be as large as $10^{15}$.

---

### Examples

#### Example 1:
- **Input:** `num1 = 120`, `num2 = 130`
- **Output:** `3`
- **Explanation:**
  - In the range `[120, 130]`:
    - `120`: middle digit `2` is a peak ($1 < 2 > 0$), waviness = `1`.
    - `121`: middle digit `2` is a peak ($1 < 2 > 1$), waviness = `1`.
    - `130`: middle digit `3` is a peak ($1 < 3 > 0$), waviness = `1`.
    - All other numbers in the range have a waviness of `0`.
  - Total waviness = $1 + 1 + 1 = 3$.

#### Example 2:
- **Input:** `num1 = 1`, `num2 = 100`
- **Output:** `0`
- **Explanation:**
  - Numbers up to `99` have fewer than 3 digits.
  - Number `100` has middle digit `0` flanked by `1` and `0` (not strictly less than both).
  - Total waviness = `0`.

---

### Constraints

- $1 \le \text{num1} \le \text{num2} \le 10^{15}$

---

## Algorithmic Approach

### 1. Range Decomposition
Using prefix subtraction, the total waviness in $[num1, num2]$ is:
$$\text{Total Waviness}([num1, num2]) = \text{solve}(num2) - \text{solve}(num1 - 1)$$
where $\text{solve}(X)$ computes the cumulative waviness of all integers in $[1, X]$.

### 2. Digit Dynamic Programming (Digit DP)
Because $X \le 10^{15}$, iterating through each number directly is impossible ($\mathcal{O}(N)$ will time out). We construct valid numbers digit-by-digit from left to right using **Digit DP**:

#### State Representation:
`dfs(pos, prev1, prev2, waviness, tight)`
- `pos`: Current digit index from the left ($0$-indexed).
- `prev1`: The immediate previous digit (uses sentinel `10` if leading zeros have not finished).
- `prev2`: The digit preceding `prev1` (uses sentinel `10` if not yet placed).
- `waviness`: The running count of identified peaks and valleys so far.
- `tight`: Boolean flag indicating if the constructed prefix matches the prefix of $X$.

#### Transition:
For each valid choice of `digit` $\in [0, \text{limit}]$:
1. **Peak / Valley Detection:** When both `prev1` and `prev2` exist ($\ne 10$), `prev1` is flanked on the left by `prev2` and on the right by `digit`. If $(prev1 > prev2 \land prev1 > digit)$ or $(prev1 < prev2 \land prev1 < digit)$, `prev1` is a peak/valley, so we increment `waviness`.
2. **Leading Zeros:** If `prev1 == 10 && digit == 0`, we remain in the leading zero state (`nextPrev1 = 10`, `nextPrev2 = 10`).
3. Each subproblem returns a pair `{count, sum}` of valid numbers and their accumulated waviness sum.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(L \times 11 \times 11 \times 20 \times 10)$ | $L$ is the number of digits in $X$ ($L \le 16$). The number of states is bounded by $16 \times 11 \times 11 \times 20 \approx 38,720$. For each state, we transition over at most $10$ digits. This evaluates in $< 15\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(L \times 11 \times 11 \times 20)$ | The DP memoization tables store counts and sums for all unique states. |

---

## Multi-Language Implementations

### Java
```java
import java.util.Arrays;

class Solution {

    private String num;
    private long[][][][] memoCnt;
    private long[][][][] memoSum;

    public long totalWaviness(long num1, long num2) {
        return solve(num2) - solve(num1 - 1);
    }

    private long solve(long x) {
        if (x <= 0) return 0;

        num = String.valueOf(x);
        int n = num.length();

        memoCnt = new long[n + 1][11][11][20];
        memoSum = new long[n + 1][11][11][20];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < 11; j++) {
                for (int k = 0; k < 11; k++) {
                    Arrays.fill(memoCnt[i][j][k], -1);
                    Arrays.fill(memoSum[i][j][k], -1);
                }
            }
        }

        return dfs(0, 10, 10, 0, true)[1];
    }

    private long[] dfs(int pos, int prev1, int prev2,
                       int waviness, boolean tight) {

        if (pos == num.length()) {
            return new long[]{1, waviness};
        }

        if (!tight &&
            memoCnt[pos][prev1][prev2][waviness] != -1) {

            return new long[]{
                memoCnt[pos][prev1][prev2][waviness],
                memoSum[pos][prev1][prev2][waviness]
            };
        }

        int limit = tight ? num.charAt(pos) - '0' : 9;

        long count = 0;
        long sum = 0;

        for (int digit = 0; digit <= limit; digit++) {

            boolean nextTight = tight && (digit == limit);

            int nextWaviness = waviness;

            if (prev2 != 10 && prev1 != 10) {

                if ((prev1 > prev2 && prev1 > digit) ||
                    (prev1 < prev2 && prev1 < digit)) {
                    nextWaviness++;
                }
            }

            int nextPrev2 = prev1;
            int nextPrev1 = digit;

            if (prev1 == 10 && digit == 0) {
                nextPrev1 = 10;
                nextPrev2 = 10;
            }

            long[] res = dfs(
                pos + 1,
                nextPrev1,
                nextPrev2,
                nextWaviness,
                nextTight
            );

            count += res[0];
            sum += res[1];
        }

        if (!tight) {
            memoCnt[pos][prev1][prev2][waviness] = count;
            memoSum[pos][prev1][prev2][waviness] = sum;
        }

        return new long[]{count, sum};
    }
}
```

### Python
```python
class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def solve(x: int) -> int:
            if x <= 0:
                return 0

            s = str(x)
            n = len(s)
            memo_cnt = {}
            memo_sum = {}

            def dfs(
                pos: int, prev1: int, prev2: int, waviness: int, tight: bool
            ) -> tuple[int, int]:
                if pos == n:
                    return 1, waviness

                state = (pos, prev1, prev2, waviness)
                if not tight and state in memo_cnt:
                    return memo_cnt[state], memo_sum[state]

                limit = int(s[pos]) if tight else 9
                total_cnt = 0
                total_sum = 0

                for digit in range(limit + 1):
                    next_tight = tight and (digit == limit)
                    next_waviness = waviness

                    if prev2 != 10 and prev1 != 10:
                        if (prev1 > prev2 and prev1 > digit) or (
                            prev1 < prev2 and prev1 < digit
                        ):
                            next_waviness += 1

                    next_prev2 = prev1
                    next_prev1 = digit

                    if prev1 == 10 and digit == 0:
                        next_prev1 = 10
                        next_prev2 = 10

                    cnt, sm = dfs(
                        pos + 1, next_prev1, next_prev2, next_waviness, next_tight
                    )
                    total_cnt += cnt
                    total_sum += sm

                if not tight:
                    memo_cnt[state] = total_cnt
                    memo_sum[state] = total_sum

                return total_cnt, total_sum

            return dfs(0, 10, 10, 0, True)[1]

        return solve(num2) - solve(num1 - 1)
```

### C++
```cpp
#include <string>
#include <vector>
#include <cstring>
#include <utility>

using namespace std;

class Solution {
    string num;
    long long memoCnt[20][11][11][20];
    long long memoSum[20][11][11][20];

public:
    long long totalWaviness(long long num1, long long num2) {
        return solve(num2) - solve(num1 - 1);
    }

private:
    long long solve(long long x) {
        if (x <= 0) return 0;

        num = to_string(x);
        memset(memoCnt, -1, sizeof(memoCnt));
        memset(memoSum, -1, sizeof(memoSum));

        return dfs(0, 10, 10, 0, true).second;
    }

    pair<long long, long long> dfs(int pos, int prev1, int prev2, int waviness, bool tight) {
        if (pos == (int)num.length()) {
            return {1LL, (long long)waviness};
        }

        if (!tight && memoCnt[pos][prev1][prev2][waviness] != -1) {
            return {memoCnt[pos][prev1][prev2][waviness], memoSum[pos][prev1][prev2][waviness]};
        }

        int limit = tight ? (num[pos] - '0') : 9;
        long long count = 0;
        long long sum = 0;

        for (int digit = 0; digit <= limit; ++digit) {
            bool nextTight = tight && (digit == limit);
            int nextWaviness = waviness;

            if (prev2 != 10 && prev1 != 10) {
                if ((prev1 > prev2 && prev1 > digit) ||
                    (prev1 < prev2 && prev1 < digit)) {
                    nextWaviness++;
                }
            }

            int nextPrev2 = prev1;
            int nextPrev1 = digit;

            if (prev1 == 10 && digit == 0) {
                nextPrev1 = 10;
                nextPrev2 = 10;
            }

            auto res = dfs(pos + 1, nextPrev1, nextPrev2, nextWaviness, nextTight);
            count += res.first;
            sum += res.second;
        }

        if (!tight) {
            memoCnt[pos][prev1][prev2][waviness] = count;
            memoSum[pos][prev1][prev2][waviness] = sum;
        }

        return {count, sum};
    }
};
```

### JavaScript
```javascript
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    function solve(x) {
        if (x <= 0n) return 0n;

        const num = x.toString();
        const n = num.length;

        const memoCnt = new Map();
        const memoSum = new Map();

        function dfs(pos, prev1, prev2, waviness, tight) {
            if (pos === n) {
                return [1n, BigInt(waviness)];
            }

            const key = (pos << 15) | (prev1 << 10) | (prev2 << 5) | waviness;
            if (!tight && memoCnt.has(key)) {
                return [memoCnt.get(key), memoSum.get(key)];
            }

            const limit = tight ? Number(num[pos]) : 9;
            let count = 0n;
            let sum = 0n;

            for (let digit = 0; digit <= limit; digit++) {
                const nextTight = tight && (digit === limit);
                let nextWaviness = waviness;

                if (prev2 !== 10 && prev1 !== 10) {
                    if ((prev1 > prev2 && prev1 > digit) ||
                        (prev1 < prev2 && prev1 < digit)) {
                        nextWaviness++;
                    }
                }

                let nextPrev2 = prev1;
                let nextPrev1 = digit;

                if (prev1 === 10 && digit === 0) {
                    nextPrev1 = 10;
                    nextPrev2 = 10;
                }

                const [resCnt, resSum] = dfs(pos + 1, nextPrev1, nextPrev2, nextWaviness, nextTight);
                count += resCnt;
                sum += resSum;
            }

            if (!tight) {
                memoCnt.set(key, count);
                memoSum.set(key, sum);
            }

            return [count, sum];
        }

        return dfs(0, 10, 10, 0, true)[1];
    }

    const n1 = BigInt(num1);
    const n2 = BigInt(num2);
    return Number(solve(n2) - solve(n1 - 1n));
};
```
