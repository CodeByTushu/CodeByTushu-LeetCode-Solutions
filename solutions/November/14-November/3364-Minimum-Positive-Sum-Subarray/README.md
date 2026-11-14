# LeetCode 3364: Minimum Positive Sum Subarray

- **Publication Date:** 14 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-positive-sum-subarray/](https://leetcode.com/problems/minimum-positive-sum-subarray/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/Oru2W6lMvJU)

---

## 💡 Problem Summary

You are given an integer array `nums` and two integers `l` and `r`. Your task is to find the **minimum sum** of a subarray whose size is between `l` and `r` (inclusive) and whose sum is strictly **greater than 0**.

Return the **minimum positive sum** of such a subarray. If no such subarray exists, return `-1`.

A **subarray** is a contiguous non-empty sequence of elements within an array.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [3, -2, 1, 4]`, `l = 2`, `r = 3`
- **Output:** `1`
- **Explanation:**
  - The subarrays of length between $l = 2$ and $r = 3$ where the sum is greater than 0 are:
    - `[3, -2]` with a sum of $1$
    - `[1, 4]` with a sum of $5$
    - `[3, -2, 1]` with a sum of $2$
    - `[-2, 1, 4]` with a sum of $3$
  - Out of these, the subarray `[3, -2]` has a sum of $1$, which is the smallest positive sum. Hence, the answer is `1`.

#### Example 2:
- **Input:** `nums = [-2, 2, -3, 1]`, `l = 2`, `r = 3`
- **Output:** `-1`
- **Explanation:**
  - There is no subarray of length between $l$ and $r$ that has a sum greater than 0. So, the answer is `-1`.

#### Example 3:
- **Input:** `nums = [1, 2, 3, 4]`, `l = 2`, `r = 4`
- **Output:** `3`
- **Explanation:**
  - The subarray `[1, 2]` has a length of 2 and the minimum sum greater than 0. So, the answer is `3`.

---

### 🔒 Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le l \le r \le \text{nums.length}$
- $-1000 \le \text{nums}[i] \le 1000$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Problem Constraints and Search Space
The input length $n$ is very small ($n \le 100$), and $l \le r \le n$. This means the total number of contiguous subarrays of valid lengths is at most:
$$\sum_{k=l}^r (n - k + 1) \le 100 \times 100 = 10{,}000$$
A direct subarray evaluation running in $\mathcal{O}(n \cdot r)$ or $\mathcal{O}(n^2)$ time with $\mathcal{O}(1)$ space executes virtually instantaneously (in less than $5\text{ ms}$).

### 2. Contiguous Expansion with Early Exit Pruning
1. Fix the starting index `i` from `0` to `n - 1`.
2. Expand the ending index `j` from `i` to `n - 1`, maintaining running sum: `sum += nums[j]`.
3. Compute the current window length: `len = j - i + 1`.
4. **Early Exit Condition:** If `len > r`, any further expansion will only exceed the upper bound $r$, so we immediately `break` the inner loop.
5. **Validity Check:** If `len >= l` and `sum > 0`, compare and minimize `ans = Math.min(ans, sum)`.
6. After checking all starting indices, return `ans == Integer.MAX_VALUE ? -1 : ans`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \cdot r)$ | The outer loop runs $n$ times. The inner loop runs at most $r$ times before breaking when subarray length exceeds $r$. Since $n \le 100$, operations remain $\le 10^4$, executing in under $5\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few scalar variables (`sum`, `len`, `ans`) are maintained in memory without any auxiliary heap allocations. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3364 - Minimum Positive Sum Subarray
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.List;

class Solution {
    public int minimumSumSubarray(List<Integer> nums, int l, int r) {
        int n = nums.size();
        int ans = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums.get(j);
                int len = j - i + 1;

                if (len > r) break;
                if (len >= l && sum > 0) {
                    ans = Math.min(ans, sum);
                }
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3364 - Minimum Positive Sum Subarray
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimumSumSubarray(self, nums: List[int], l: int, r: int) -> int:
        n = len(nums)
        ans = float("inf")

        for i in range(n):
            cur_sum = 0
            for j in range(i, n):
                cur_sum += nums[j]
                length = j - i + 1

                if length > r:
                    break
                if length >= l and cur_sum > 0:
                    ans = min(ans, cur_sum)

        return -1 if ans == float("inf") else int(ans)
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3364 - Minimum Positive Sum Subarray
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int minimumSumSubarray(std::vector<int>& nums, int l, int r) {
        int n = static_cast<int>(nums.size());
        int ans = INT_MAX;

        for (int i = 0; i < n; ++i) {
            int sum = 0;
            for (int j = i; j < n; ++j) {
                sum += nums[j];
                int len = j - i + 1;

                if (len > r) break;
                if (len >= l && sum > 0) {
                    ans = std::min(ans, sum);
                }
            }
        }

        return ans == INT_MAX ? -1 : ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3364 - Minimum Positive Sum Subarray
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function(nums, l, r) {
    const n = nums.length;
    let ans = Infinity;

    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += nums[j];
            const len = j - i + 1;

            if (len > r) break;
            if (len >= l && sum > 0) {
                ans = Math.min(ans, sum);
            }
        }
    }

    return ans === Infinity ? -1 : ans;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
