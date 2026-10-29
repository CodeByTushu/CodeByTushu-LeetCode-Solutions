# LeetCode 3129: Find All Possible Stable Binary Arrays I

- **Publication Date:** 09 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i/](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given three positive integers: `zero`, `one`, and `limit`.

A binary array `arr` is called **stable** if:
1. The number of occurrences of `0` in `arr` is exactly `zero`.
2. The number of occurrences of `1` in `arr` is exactly `one`.
3. Each subarray of `arr` with a size greater than `limit` must contain at least one occurrence of both `0` and `1`.

Return an integer denoting the **total number of stable binary arrays**. Since the answer may be very large, return it modulo $10^9 + 7$.

---

### Examples

#### Example 1:
- **Input:** `zero = 1, one = 1, limit = 2`
- **Output:** `2`
- **Explanation:** The two possible stable binary arrays are `[1, 0]` and `[0, 1]`.

#### Example 2:
- **Input:** `zero = 1, one = 2, limit = 1`
- **Output:** `1`
- **Explanation:** The only possible stable binary array is `[1, 0, 1]`. Note that arrays like `[1, 1, 0]` and `[0, 1, 1]` contain consecutive ones of length $2 > 1$, which makes them invalid.

#### Example 3:
- **Input:** `zero = 3, one = 3, limit = 2`
- **Output:** `14`

---

### Constraints

- `1 <= zero, one, limit <= 200`

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming
- **Secondary Tags:** Prefix Sum

---

## Detailed Algorithm Walkthrough

### 1. Problem Reformulation

The constraint that *"each subarray with a size greater than `limit` must contain both `0` and `1`"* simply translates to:
- No contiguous run of `'0'`s can exceed length `limit`.
- No contiguous run of `'1'`s can exceed length `limit`.

Thus, we are counting binary sequences of length $\text{zero} + \text{one}$ containing exactly `zero` zeros and `one` ones where no consecutive run of identical elements exceeds `limit`.

### 2. State Definition

Let:
- $\text{dp0}[i][j]$: Number of valid stable arrays formed using $i$ zeros and $j$ ones, ending with a `'0'`.
- $\text{dp1}[i][j]$: Number of valid stable arrays formed using $i$ zeros and $j$ ones, ending with a `'1'`.

### 3. Base Cases

- If $j = 0$ (no ones used), we can only create a single pure sequence of zeros as long as $i \le \text{limit}$:
  $$\text{dp0}[i][0] = 1 \quad \text{for } 1 \le i \le \min(\text{zero}, \text{limit})$$
- If $i = 0$ (no zeros used), we can only create a single pure sequence of ones as long as $j \le \text{limit}$:
  $$\text{dp1}[0][j] = 1 \quad \text{for } 1 \le j \le \min(\text{one}, \text{limit})$$

### 4. Transitions with Sliding Window Subtraction

When constructing a sequence ending with `'0'` with $i$ zeros and $j$ ones:
1. We can append `'0'` to any valid sequence of $(i - 1)$ zeros and $j$ ones that ended in either `'0'` or `'1'`:
   $$\text{dp0}[i][j] = \text{dp0}[i - 1][j] + \text{dp1}[i - 1][j]$$
2. However, if $i > \text{limit}$, we must subtract sequences where appending `'0'` creates a run of exactly $\text{limit} + 1$ zeros.
   Such invalid sequences end with $\text{limit} + 1$ zeros preceded by a `'1'` at state $(i - 1 - \text{limit}, j)$:
   $$\text{dp0}[i][j] = \text{dp0}[i][j] - \text{dp1}[i - 1 - \text{limit}][j]$$

By symmetry, for ending with `'1'`:
$$\text{dp1}[i][j] = \text{dp0}[i][j - 1] + \text{dp1}[i][j - 1]$$
And if $j > \text{limit}$, subtract:
$$\text{dp1}[i][j] = \text{dp1}[i][j] - \text{dp0}[i][j - 1 - \text{limit}]$$

All operations are computed modulo $10^9 + 7$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\text{zero} \times \text{one})$. Each of the $\text{zero} \times \text{one}$ states is updated in constant $\mathcal{O}(1)$ time. With $\text{zero}, \text{one} \le 200$, the algorithm computes around $4 \times 10^4$ operations, taking $< 2$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(\text{zero} \times \text{one})$ to store the 2D DP matrices.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numberOfStableArrays(int zero, int one, int limit) {
        final int MOD = 1_000_000_007;

        // dp0[i][j] = valid arrays with i zeros and j ones ending in 0
        // dp1[i][j] = valid arrays with i zeros and j ones ending in 1
        long[][] dp0 = new long[zero + 1][one + 1];
        long[][] dp1 = new long[zero + 1][one + 1];

        // Base cases: purely zeros or purely ones
        for (int i = 1; i <= Math.min(zero, limit); i++) {
            dp0[i][0] = 1;
        }
        for (int j = 1; j <= Math.min(one, limit); j++) {
            dp1[0][j] = 1;
        }

        // DP state transitions
        for (int i = 1; i <= zero; i++) {
            for (int j = 1; j <= one; j++) {
                // Ending in 0: append '0' to any valid prefix (i-1, j)
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
                if (i > limit) {
                    // Subtract invalid configurations exceeding 'limit' consecutive zeros
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
                }

                // Ending in 1: append '1' to any valid prefix (i, j-1)
                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
                if (j > limit) {
                    // Subtract invalid configurations exceeding 'limit' consecutive ones
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
                }
            }
        }

        return (int) ((dp0[zero][one] + dp1[zero][one]) % MOD);
    }
}
```

### Python
```python
"""
Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        MOD = 1_000_000_007

        # dp0[i][j] = valid stable arrays with i zeros and j ones ending with 0
        # dp1[i][j] = valid stable arrays with i zeros and j ones ending with 1
        dp0 = [[0] * (one + 1) for _ in range(zero + 1)]
        dp1 = [[0] * (one + 1) for _ in range(zero + 1)]

        # Base cases
        for i in range(1, min(zero, limit) + 1):
            dp0[i][0] = 1
        for j in range(1, min(one, limit) + 1):
            dp1[0][j] = 1

        # DP transitions
        for i in range(1, zero + 1):
            for j in range(1, one + 1):
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD
                if i > limit:
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD

                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD
                if j > limit:
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD

        return (dp0[zero][one] + dp1[zero][one]) % MOD
```

### C++
```cpp
/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int numberOfStableArrays(int zero, int one, int limit) {
        const int MOD = 1'000'000'007;

        // dp0[i][j]: valid stable arrays with i zeros and j ones ending in 0
        // dp1[i][j]: valid stable arrays with i zeros and j ones ending in 1
        vector<vector<int>> dp0(zero + 1, vector<int>(one + 1, 0));
        vector<vector<int>> dp1(zero + 1, vector<int>(one + 1, 0));

        // Base cases
        for (int i = 1; i <= min(zero, limit); i++) {
            dp0[i][0] = 1;
        }
        for (int j = 1; j <= min(one, limit); j++) {
            dp1[0][j] = 1;
        }

        // State transitions
        for (int i = 1; i <= zero; i++) {
            for (int j = 1; j <= one; j++) {
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
                if (i > limit) {
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
                }

                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
                if (j > limit) {
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
                }
            }
        }

        return (dp0[zero][one] + dp1[zero][one]) % MOD;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1000000007n;

    // dp0[i][j]: valid stable arrays with i zeros and j ones ending with 0
    // dp1[i][j]: valid stable arrays with i zeros and j ones ending with 1
    const dp0 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));
    const dp1 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));

    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[i][0] = 1n;
    }
    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[0][j] = 1n;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
            if (i > limit) {
                dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
            }

            dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
            if (j > limit) {
                dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
            }
        }
    }

    return Number((dp0[zero][one] + dp1[zero][one]) % MOD);
};
```
