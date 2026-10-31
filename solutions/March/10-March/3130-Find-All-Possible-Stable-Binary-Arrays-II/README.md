# LeetCode 3130: Find All Possible Stable Binary Arrays II

- **Publication Date:** 10 March 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii/](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/COkWa38TB30?si=6nDRdcKOALTAz_oo)

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

- `1 <= zero, one, limit <= 1000`

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming
- **Secondary Tags:** Prefix Sum

---

## Detailed Algorithm Walkthrough

### 1. Scaling from Part I to Part II

In LeetCode 3129 (Part I), the constraints were small ($\text{zero}, \text{one} \le 200$), allowing even $\mathcal{O}(\text{zero} \times \text{one} \times \text{limit})$ solutions to pass.
Here in LeetCode 3130 (Part II), $\text{zero}, \text{one}, \text{limit} \le 1000$, demanding a strictly optimal $\mathcal{O}(\text{zero} \times \text{one})$ time complexity with $\mathcal{O}(1)$ transitions per state.

### 2. State Formulation

Let:
- $\text{dp0}[i][j]$: Number of valid stable arrays using $i$ zeros and $j$ ones that end with a `'0'`.
- $\text{dp1}[i][j]$: Number of valid stable arrays using $i$ zeros and $j$ ones that end with a `'1'`.

### 3. Base Cases

- Pure zero sequences are valid as long as length $\le \text{limit}$:
  $$\text{dp0}[i][0] = 1 \quad \text{for } 1 \le i \le \min(\text{zero}, \text{limit})$$
- Pure one sequences are valid as long as length $\le \text{limit}$:
  $$\text{dp1}[0][j] = 1 \quad \text{for } 1 \le j \le \min(\text{one}, \text{limit})$$

### 4. Constant-Time Transition Logic

To compute $\text{dp0}[i][j]$:
1. Append `'0'` to any valid stable array with $i - 1$ zeros and $j$ ones:
   $$\text{dp0}[i][j] = \text{dp0}[i - 1][j] + \text{dp1}[i - 1][j]$$
2. If $i > \text{limit}$, appending `'0'` could create an invalid sequence ending in $\text{limit} + 1$ consecutive zeros.
   The invalid configurations are precisely those where the last $\text{limit} + 1$ characters are `'0'`, preceded by a `'1'` at state $(i - 1 - \text{limit}, j)$:
   $$\text{dp0}[i][j] = (\text{dp0}[i][j] - \text{dp1}[i - 1 - \text{limit}][j] + \text{MOD}) \pmod{\text{MOD}}$$

By symmetry, for ending in `'1'`:
1. Append `'1'` to any valid stable array with $i$ zeros and $j - 1$ ones:
   $$\text{dp1}[i][j] = \text{dp0}[i][j - 1] + \text{dp1}[i][j - 1]$$
2. If $j > \text{limit}$, subtract sequences ending in $\text{limit} + 1$ consecutive ones:
   $$\text{dp1}[i][j] = (\text{dp1}[i][j] - \text{dp0}[i][j - 1 - \text{limit}] + \text{MOD}) \pmod{\text{MOD}}$$

The final result is:
$$(\text{dp0}[\text{zero}][\text{one}] + \text{dp1}[\text{zero}][\text{one}]) \pmod{\text{MOD}}$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\text{zero} \times \text{one})$. Each of the $1000 \times 1000 = 10^6$ DP states is computed in $\mathcal{O}(1)$ time, executing in under $20$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(\text{zero} \times \text{one})$ to store the 2D arrays, consuming $\approx 8$ MB of memory, well below memory limits.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numberOfStableArrays(int zero, int one, int limit) {
        final int MOD = 1_000_000_007;

        // dp0[i][j]: valid stable arrays with i zeros and j ones ending in 0
        // dp1[i][j]: valid stable arrays with i zeros and j ones ending in 1
        int[][] dp0 = new int[zero + 1][one + 1];
        int[][] dp1 = new int[zero + 1][one + 1];

        // Base cases: purely zeros or purely ones within limit
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
                    // Subtract configurations exceeding consecutive 'limit' zeros
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
                }

                // Ending in 1: append '1' to any valid prefix (i, j-1)
                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
                if (j > limit) {
                    // Subtract configurations exceeding consecutive 'limit' ones
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
                }
            }
        }

        return (dp0[zero][one] + dp1[zero][one]) % MOD;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        MOD = 1_000_000_007

        # dp0[i][j]: valid stable arrays with i zeros and j ones ending in 0
        # dp1[i][j]: valid stable arrays with i zeros and j ones ending in 1
        dp0 = [[0] * (one + 1) for _ in range(zero + 1)]
        dp1 = [[0] * (one + 1) for _ in range(zero + 1)]

        # Base cases
        for i in range(1, min(zero, limit) + 1):
            dp0[i][0] = 1
        for j in range(1, min(one, limit) + 1):
            dp1[0][j] = 1

        # DP state transitions
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
 * Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
 * Difficulty: Hard
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

        // DP state transitions
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
 * Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
 * Difficulty: Hard
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
    const MOD = 1000000007;

    // dp0[i][j]: valid stable arrays with i zeros and j ones ending with 0
    // dp1[i][j]: valid stable arrays with i zeros and j ones ending with 1
    const dp0 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));
    const dp1 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));

    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[i][0] = 1;
    }
    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[0][j] = 1;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            let val0 = dp0[i - 1][j] + dp1[i - 1][j];
            if (i > limit) {
                val0 -= dp1[i - 1 - limit][j];
            }
            dp0[i][j] = (val0 % MOD + MOD) % MOD;

            let val1 = dp0[i][j - 1] + dp1[i][j - 1];
            if (j > limit) {
                val1 -= dp0[i][j - 1 - limit];
            }
            dp1[i][j] = (val1 % MOD + MOD) % MOD;
        }
    }

    return (dp0[zero][one] + dp1[zero][one]) % MOD;
};
```
