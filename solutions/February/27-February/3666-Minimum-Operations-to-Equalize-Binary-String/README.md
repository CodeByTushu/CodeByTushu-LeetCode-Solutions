# LeetCode 3666: Minimum Operations to Equalize Binary String

- **Publication Date:** 27 February 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-equalize-binary-string/](https://leetcode.com/problems/minimum-operations-to-equalize-binary-string/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given a binary string `s` and an integer `k`.

In one operation, you must choose **exactly $k$ different indices** and flip each `'0'` to `'1'` and each `'1'` to `'0'`.

Return the **minimum number of operations** required to make all characters in the string equal to `'1'`. If it is not possible, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `s = "110", k = 1`
- **Output:** `1`
- **Explanation:**
  - There is one `'0'` in `s`.
  - Since $k = 1$, we can flip it directly in one operation.

#### Example 2:
- **Input:** `s = "0101", k = 3`
- **Output:** `2`
- **Explanation:**
  - Operation 1: Flip indices $[0, 1, 3]$. `s` changes from `"0101"` to `"1000"`.
  - Operation 2: Flip indices $[1, 2, 3]$. `s` changes from `"1000"` to `"1111"`.
  - Minimum operations = $2$.

#### Example 3:
- **Input:** `s = "101", k = 2`
- **Output:** `-1`
- **Explanation:**
  - Since $k = 2$ and `s` has only one `'0'`, it is impossible to flip exactly $k$ indices to make all `'1'`. Hence, return `-1`.

---

### Constraints

- $1 \le s.\text{length} \le 10^5$
- `s[i]` is either `'0'` or `'1'`.
- $1 \le k \le s.\text{length}$

---

## Topics and Tags

- **Primary Tags:** Math, String
- **Secondary Tags:** Greedy

---

## Detailed Algorithm Walkthrough

### 1. Parity and Flip Count Conditions

Let $n = s.\text{length}$, and let $c_0$ be the initial number of `'0'`s, and $c_1 = n - c_0$ be the number of `'1'`s.
If $c_0 = 0$, the string is already all `'1'`s, so $0$ operations are needed.

Suppose we perform $m$ operations. In total, exactly $m \cdot k$ bit flips are distributed across the $n$ positions:
- Each index originally containing `'0'` must be flipped an **odd** number of times (at least 1 time, at most $m$ times).
- Each index originally containing `'1'` must be flipped an **even** number of times (at least 0 times, at most $m$ times).

Since the sum of $c_0$ odd numbers and $c_1$ even numbers has parity $c_0 \pmod 2$, the total number of flips $m \cdot k$ must satisfy the fundamental parity invariant:
$$m \cdot k \equiv c_0 \pmod 2$$

### 2. Lower and Upper Bounds via Gale-Ryser / Degree Constraints

Can any sequence of valid flip counts $\{f_i\}_{i=1}^n$ be realized across $m$ subsets of size $k$?
By the Gale-Ryser theorem (or uniform row-sum $0$-$1$ matrix realizability), such subsets exist if and only if:
1. $0 \le f_i \le m$ for all $i$.
2. $\sum_{i=1}^n f_i = m \cdot k$.

The minimum achievable sum of flips is simply choosing the minimal valid flip for each index:
$$\text{minSum} = c_0 \cdot 1 + c_1 \cdot 0 = c_0 \implies m \cdot k \ge c_0 \iff m \ge \lceil c_0 / k \rceil$$

The maximum achievable sum of flips depends on the parity of $m$:
- **Case 1: $m$ is odd.**
  - Max odd flip $\le m$ is $m$.
  - Max even flip $\le m$ is $m - 1$.
  - $\text{maxSum} = c_0 \cdot m + c_1 \cdot (m - 1) = n \cdot m - c_1$.
  - Requiring $m \cdot k \le n \cdot m - c_1 \iff c_1 \le m \cdot (n - k) \iff m \ge \lceil c_1 / (n - k) \rceil$ (if $n > k$). If $n == k$, we must have $c_1 == 0$.
  - Parity requirement: $m \cdot k \equiv k \pmod 2 \equiv c_0 \pmod 2 \implies k \pmod 2 == c_0 \pmod 2$.

- **Case 2: $m$ is even.**
  - Max odd flip $\le m$ is $m - 1$.
  - Max even flip $\le m$ is $m$.
  - $\text{maxSum} = c_0 \cdot (m - 1) + c_1 \cdot m = n \cdot m - c_0$.
  - Requiring $m \cdot k \le n \cdot m - c_0 \iff c_0 \le m \cdot (n - k) \iff m \ge \lceil c_0 / (n - k) \rceil$ (for $n > k$).
  - Parity requirement: $m \cdot k$ is even $\implies c_0 \pmod 2 == 0$.
  - Note that $m \ge 2$ since $m$ is a positive even integer.

### 3. Constant Time Optimization

We evaluate the minimum valid odd $m$ and the minimum valid even $m$ in $\mathcal{O}(1)$ math operations, then take $\min(\text{odd } m, \text{even } m)$. If neither is valid, no solution exists and we return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n = s.\text{length} \le 10^5$. We count the number of `'0'`s in a single pass over $s$, followed by $\mathcal{O}(1)$ closed-form arithmetic.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Solved completely in-place with no extra data structures.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(String s, int k) {
        int n = s.length();
        int c0 = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '0') {
                c0++;
            }
        }

        if (c0 == 0) {
            return 0;
        }

        int c1 = n - c0;
        int best = Integer.MAX_VALUE;

        // Case 1: Odd number of operations m
        // For odd m, m * k has the same parity as k, so k % 2 must equal c0 % 2.
        if (k % 2 == c0 % 2) {
            int minM = (c0 + k - 1) / k;
            if (n == k) {
                if (c1 == 0) {
                    if (minM % 2 == 0) minM++;
                    best = Math.min(best, minM);
                }
            } else {
                minM = Math.max(minM, (c1 + (n - k) - 1) / (n - k));
                if (minM % 2 == 0) minM++;
                best = Math.min(best, minM);
            }
        }

        // Case 2: Even number of operations m
        // For even m, m * k is always even, so c0 must be even.
        if (c0 % 2 == 0) {
            int minM = Math.max(2, (c0 + k - 1) / k);
            if (n > k) {
                minM = Math.max(minM, (c0 + (n - k) - 1) / (n - k));
                if (minM % 2 != 0) minM++;
                best = Math.min(best, minM);
            }
        }

        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

import math

class Solution:
    def minOperations(self, s: str, k: int) -> int:
        n = len(s)
        c0 = s.count('0')
        if c0 == 0:
            return 0

        c1 = n - c0
        best = float('inf')

        # Case 1: Odd m (requires k % 2 == c0 % 2)
        if k % 2 == c0 % 2:
            min_m = math.ceil(c0 / k)
            if n == k:
                if c1 == 0:
                    if min_m % 2 == 0:
                        min_m += 1
                    best = min(best, min_m)
            else:
                min_m = max(min_m, math.ceil(c1 / (n - k)))
                if min_m % 2 == 0:
                    min_m += 1
                best = min(best, min_m)

        # Case 2: Even m (requires c0 % 2 == 0)
        if c0 % 2 == 0:
            min_m = max(2, math.ceil(c0 / k))
            if n > k:
                min_m = max(min_m, math.ceil(c0 / (n - k)))
                if min_m % 2 != 0:
                    min_m += 1
                best = min(best, min_m)

        return -1 if best == float('inf') else best
```

### C++
```cpp
/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minOperations(string s, int k) {
        int n = s.length();
        int c0 = 0;
        for (char ch : s) {
            if (ch == '0') {
                c0++;
            }
        }

        if (c0 == 0) {
            return 0;
        }

        int c1 = n - c0;
        int best = -1;

        // Case 1: Odd m
        if (k % 2 == c0 % 2) {
            int minM = (c0 + k - 1) / k;
            if (n == k) {
                if (c1 == 0) {
                    if (minM % 2 == 0) minM++;
                    best = (best == -1) ? minM : min(best, minM);
                }
            } else {
                minM = max(minM, (c1 + (n - k) - 1) / (n - k));
                if (minM % 2 == 0) minM++;
                best = (best == -1) ? minM : min(best, minM);
            }
        }

        // Case 2: Even m
        if (c0 % 2 == 0) {
            int minM = max(2, (c0 + k - 1) / k);
            if (n > k) {
                minM = max(minM, (c0 + (n - k) - 1) / (n - k));
                if (minM % 2 != 0) minM++;
                best = (best == -1) ? minM : min(best, minM);
            }
        }

        return best;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minOperations = function(s, k) {
    const n = s.length;
    let c0 = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === '0') {
            c0++;
        }
    }

    if (c0 === 0) {
        return 0;
    }

    const c1 = n - c0;
    let best = Infinity;

    // Case 1: Odd m
    if (k % 2 === c0 % 2) {
        let minM = Math.ceil(c0 / k);
        if (n === k) {
            if (c1 === 0) {
                if (minM % 2 === 0) minM++;
                best = Math.min(best, minM);
            }
        } else {
            minM = Math.max(minM, Math.ceil(c1 / (n - k)));
            if (minM % 2 === 0) minM++;
            best = Math.min(best, minM);
        }
    }

    // Case 2: Even m
    if (c0 % 2 === 0) {
        let minM = Math.max(2, Math.ceil(c0 / k));
        if (n > k) {
            minM = Math.max(minM, Math.ceil(c0 / (n - k)));
            if (minM % 2 !== 0) minM++;
            best = Math.min(best, minM);
        }
    }

    return best === Infinity ? -1 : best;
};
```
