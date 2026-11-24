# LeetCode 3411: Maximum Subarray With Equal Products

- **Publication Date:** 24 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-subarray-with-equal-products/](https://leetcode.com/problems/maximum-subarray-with-equal-products/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/oAEHQ75KOz4)

---

## 💡 Problem Summary

You are given an array of positive integers `nums`.

An array `arr` is called **product equivalent** if:
$$\text{prod}(\text{arr}) = \text{lcm}(\text{arr}) \times \text{gcd}(\text{arr})$$

Where:
- $\text{prod}(\text{arr})$ is the product of all elements of `arr`.
- $\text{gcd}(\text{arr})$ is the Greatest Common Divisor (GCD) of all elements of `arr`.
- $\text{lcm}(\text{arr})$ is the Least Common Multiple (LCM) of all elements of `arr`.

Return the length of the **longest product equivalent subarray** of `nums`.

---

### 🧪 Example Walkthrough

#### Example 1:
- **Input:** `nums = [1, 2, 1, 2, 1, 1, 1]`
- **Output:** `5`
- **Explanation:**  
  The longest product equivalent subarray is `[1, 2, 1, 1, 1]`:
  - $\text{prod}([1, 2, 1, 1, 1]) = 2$
  - $\text{gcd}([1, 2, 1, 1, 1]) = 1$
  - $\text{lcm}([1, 2, 1, 1, 1]) = 2$
  - Since $2 = 2 \times 1$, this subarray is valid and has length $5$.

#### Example 2:
- **Input:** `nums = [2, 3, 4, 5, 6]`
- **Output:** `3`
- **Explanation:**  
  The longest product equivalent subarray is `[3, 4, 5]`:
  - $\text{prod}([3, 4, 5]) = 60$
  - $\text{gcd}([3, 4, 5]) = 1$
  - $\text{lcm}([3, 4, 5]) = 60$
  - Since $60 = 60 \times 1$, it is valid and has length $3$.

#### Example 3:
- **Input:** `nums = [1, 2, 3, 1, 4, 5, 1]`
- **Output:** `5`

---

### 🔒 Constraints

- $2 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 10$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Mathematical Condition
For any pair of integers $(a, b)$, the identity $a \times b = \text{gcd}(a, b) \times \text{lcm}(a, b)$ always holds. However, for three or more integers, this equality generally does not hold unless the elements are pairwise coprime or satisfy specific divisibility patterns.

We are asked to find the longest contiguous subarray where:
$$\text{prod}(arr) = \text{lcm}(arr) \times \text{gcd}(arr)$$

### 2. Constraint Analysis
- $N = \text{nums.length} \le 100$
- Elements are very small: $1 \le \text{nums}[i] \le 10$
- Because $N \le 100$, the total number of contiguous subarrays is at most $\frac{N(N+1)}{2} = \frac{100 \times 101}{2} = 5,050$.
- This small constraint directly permits an optimal $\mathcal{O}(N^2)$ brute-force check over all subarray ranges $[i, j]$.

### 3. Incremental State Updates
Instead of recomputing the product, GCD, and LCM from scratch for every subarray in $\mathcal{O}(K)$ time, we can fix the starting index $i$ and extend the ending index $j$ from $i$ to $n - 1$:
- $\text{prod}_{new} = \text{prod}_{prev} \times \text{nums}[j]$
- $\text{gcd}_{new} = \gcd(\text{gcd}_{prev}, \text{nums}[j])$
- $\text{lcm}_{new} = \text{lcm}(\text{lcm}_{prev}, \text{nums}[j]) = \frac{\text{lcm}_{prev}}{\gcd(\text{lcm}_{prev}, \text{nums}[j])} \times \text{nums}[j]$

At each step $j$, if $\text{prod} = \text{lcm} \times \text{gcd}$, we record $\text{ans} = \max(\text{ans}, j - i + 1)$.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N^2)$ | There are $\mathcal{O}(N^2)$ pairs $(i, j)$. For each step, GCD and LCM of small numbers take $\mathcal{O}(\log(\min)) = \mathcal{O}(1)$ time. Total operations $\le 5,050$, running in $\sim 5\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only scalar primitive variables (`prod`, `g`, `l`, `ans`) are maintained in memory. No heap allocations or dynamic arrays are created. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3411 - Maximum Subarray With Equal Products
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxLength(int[] nums) {
        int n = nums.length;
        int ans = 0;

        for (int i = 0; i < n; i++) {
            long prod = 1;
            long g = 0;
            long l = 1;

            for (int j = i; j < n; j++) {
                prod *= nums[j];
                g = gcd(g, nums[j]);
                l = lcm(l, nums[j]);

                if (prod == l * g) {
                    ans = Math.max(ans, j - i + 1);
                }
            }
        }

        return ans;
    }

    private long gcd(long a, long b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    private long lcm(long a, long b) {
        return a / gcd(a, b) * b;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3411 - Maximum Subarray With Equal Products
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""
import math

class Solution:
    def maxLength(self, nums: list[int]) -> int:
        n = len(nums)
        ans = 0

        for i in range(n):
            prod = 1
            g = 0
            l = 1

            for j in range(i, n):
                prod *= nums[j]
                g = math.gcd(g, nums[j])
                l = math.lcm(l, nums[j])

                if prod == l * g:
                    ans = max(ans, j - i + 1)

        return ans
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3411 - Maximum Subarray With Equal Products
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxLength(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;

        for (int i = 0; i < n; i++) {
            long long prod = 1;
            long long g = 0;
            long long l = 1;

            for (int j = i; j < n; j++) {
                prod *= nums[j];
                g = std::gcd(g, (long long)nums[j]);
                l = std::lcm(l, (long long)nums[j]);

                if (prod == l * g) {
                    ans = max(ans, j - i + 1);
                }
            }
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3411 - Maximum Subarray With Equal Products
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function(nums) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => (a / gcd(a, b)) * b;

    const n = nums.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        let prod = 1;
        let g = 0;
        let l = 1;

        for (let j = i; j < n; j++) {
            prod *= nums[j];
            g = gcd(g, nums[j]);
            l = lcm(l, nums[j]);

            if (prod === l * g) {
                ans = Math.max(ans, j - i + 1);
            }
        }
    }

    return ans;
};
```

---

## 🔗 Connected Solutions

- [☕ Java Solution](./Solution.java)
- [🐍 Python Solution](./solution.py)
- [⚡ C++ Solution](./solution.cpp)
- [🌐 JavaScript Solution](./solution.js)
- [🍁 November Daily Challenge Archive](../../)
- [📂 Root Repository Solutions](../../../)
