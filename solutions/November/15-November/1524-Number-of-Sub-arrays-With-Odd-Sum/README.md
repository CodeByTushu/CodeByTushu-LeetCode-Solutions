# LeetCode 1524: Number of Sub-arrays With Odd Sum

- **Publication Date:** 15 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/4Qs3N9AYv7E)

---

## 💡 Problem Summary

Given an array of integers `arr`, return the number of subarrays with an **odd** sum.

Since the answer can be very large, return it modulo $10^9 + 7$.

A **subarray** is a contiguous non-empty sequence of elements within an array.

---

### 🧪 Examples

#### Example 1:
- **Input:** `arr = [1, 3, 5]`
- **Output:** `4`
- **Explanation:**
  - All subarrays are `[[1], [1, 3], [1, 3, 5], [3], [3, 5], [5]]`.
  - All subarray sums are `[1, 4, 9, 3, 8, 5]`.
  - Odd sums are `[1, 9, 3, 5]`, so the answer is `4`.

#### Example 2:
- **Input:** `arr = [2, 4, 6]`
- **Output:** `0`
- **Explanation:**
  - All subarrays are `[[2], [2, 4], [2, 4, 6], [4], [4, 6], [6]]`.
  - All subarray sums are `[2, 6, 12, 4, 10, 6]`.
  - All subarrays have even sum, so the answer is `0`.

#### Example 3:
- **Input:** `arr = [1, 2, 3, 4, 5, 6, 7]`
- **Output:** `16`

---

### 🔒 Constraints

- $1 \le \text{arr.length} \le 10^5$
- $1 \le \text{arr}[i] \le 100$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Parity & Prefix Sum Invariant
Any subarray sum from index $i$ to $j$ can be expressed as:
$$\text{Sum}(i \dots j) = \text{Prefix}[j] - \text{Prefix}[i - 1]$$

A difference between two integers is **odd** if and only if one integer is **odd** and the other is **even**:
- $\text{Odd} - \text{Even} = \text{Odd}$
- $\text{Even} - \text{Odd} = \text{Odd}$
- $\text{Odd} - \text{Odd} = \text{Even}$
- $\text{Even} - \text{Even} = \text{Even}$

### 2. Counting Parities On-The-Fly
Instead of calculating and storing prefix sums, we only need to keep track of the **parity** (modulo 2):
1. **Base Case:** Before reading any elements, the prefix sum is $0$ (which is even). Hence, we initialize `even = 1` and `odd = 0`.
2. As we iterate through each element `x` in `arr`:
   - Update current prefix parity: `prefix = (prefix + x) % 2`.
   - If `prefix == 1` (current prefix is odd):
     - Every preceding even prefix yields an odd subarray sum. We add `even` to our answer, then increment `odd++`.
   - If `prefix == 0` (current prefix is even):
     - Every preceding odd prefix yields an odd subarray sum. We add `odd` to our answer, then increment `even++`.
   - Take modulo $10^9 + 7$ after adding to prevent 32-bit integer overflow.

This provides an optimal single-pass solution running in $\mathcal{O}(N)$ time and $\mathcal{O}(1)$ auxiliary space.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | A single linear scan through the array of length $N$. Each element is processed in $\mathcal{O}(1)$ arithmetic and modular operations. For $N = 100{,}000$, executes in roughly $8\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive scalar variables (`odd`, `even`, `prefix`, `ans`, `MOD`) are maintained on the call stack without dynamic heap memory allocations. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int numOfSubarrays(int[] arr) {
        final int MOD = 1_000_000_007;

        int odd = 0;      // ab tak kitne prefix sums odd the
        int even = 1;     // empty prefix (sum 0) even hai
        int prefix = 0;   // current prefix sum ki parity (0 = even, 1 = odd)
        long ans = 0;

        for (int x : arr) {
            prefix = (prefix + x) % 2;

            if (prefix == 1) {
                // odd prefix - even prefix = odd sum
                ans += even;
                odd++;
            } else {
                // even prefix - odd prefix = odd sum
                ans += odd;
                even++;
            }

            ans %= MOD;
        }

        return (int) ans;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        MOD = 1_000_000_007

        odd = 0
        even = 1
        prefix = 0
        ans = 0

        for x in arr:
            prefix = (prefix + x) % 2

            if prefix == 1:
                ans += even
                odd += 1
            else:
                ans += odd
                even += 1

            ans %= MOD

        return ans
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

class Solution {
public:
    int numOfSubarrays(std::vector<int>& arr) {
        const int MOD = 1'000'000'007;

        int odd = 0;
        int even = 1;
        int prefix = 0;
        long long ans = 0;

        for (int x : arr) {
            prefix = (prefix + x) % 2;

            if (prefix == 1) {
                ans += even;
                odd++;
            } else {
                ans += odd;
                even++;
            }

            ans %= MOD;
        }

        return static_cast<int>(ans);
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    const MOD = 1_000_000_007;

    let odd = 0;
    let even = 1;
    let prefix = 0;
    let ans = 0;

    for (const x of arr) {
        prefix = (prefix + x) % 2;

        if (prefix === 1) {
            ans = (ans + even) % MOD;
            odd++;
        } else {
            ans = (ans + odd) % MOD;
            even++;
        }
    }

    return ans;
};
```
