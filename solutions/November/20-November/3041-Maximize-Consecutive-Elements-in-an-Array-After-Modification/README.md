# LeetCode 3041: Maximize Consecutive Elements in an Array After Modification

- **Publication Date:** 20 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification/](https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/WYB-zUEH38c)

---

## 💡 Problem Summary

You are given a 0-indexed array `nums` consisting of positive integers.

Initially, you can increase the value of **any element** in the array by **at most 1** (each element can either stay as `nums[i]` or become `nums[i] + 1`).

After applying these modifications, you need to select one or more elements from the final array such that those selected elements are **consecutive** when sorted in increasing order (e.g., `[3, 4, 5]` are consecutive, but `[3, 4, 6]` and `[1, 1, 2, 3]` are not).

Return the **maximum number of elements** that you can select.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [2, 1, 5, 1, 1]`
- **Output:** `3`
- **Explanation:**
  - Increase `nums[0]` (from $2$ to $3$) and `nums[3]` (from $1$ to $2$).
  - The resulting array becomes `[3, 1, 5, 2, 1]`.
  - We select the elements `[3, 1, 2]`. When sorted, they become `[1, 2, 3]`, which are consecutive.
  - It can be shown that we cannot select more than $3$ consecutive elements.

#### Example 2:
- **Input:** `nums = [1, 4, 7, 10]`
- **Output:** `1`
- **Explanation:**
  - The maximum consecutive elements that we can select is $1$.

---

### 🔒 Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^6$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Sorting the Elements
- The relative positions of elements in `nums` do not matter since we can select any subset of elements and sort them.
- Sorting `nums` in ascending order allows us to process numbers from smallest to largest and build the longest consecutive sequence incrementally.

### 2. Dynamic Programming Formulation
Let `dp[v]` denote the maximum length of a valid consecutive sequence whose last (largest) element is `v`.

For each number $x \in \text{nums}$:
Since we can increment $x$ by at most $1$, $x$ can contribute in two ways:
1. **As value $x + 1$:**
   If we choose to increment $x$ to $x + 1$, it can extend any consecutive sequence that ends at value $x$.
   $$\text{dp}[x + 1] = \text{dp}[x] + 1$$
2. **As value $x$:**
   If we keep $x$ as $x$, it can extend any consecutive sequence that ends at value $x - 1$.
   $$\text{dp}[x] = \text{dp}[x - 1] + 1$$

### 3. Crucial Detail: Reverse Transition Order
Each element in `nums` can be used **at most once**.
- If we update $\text{dp}[x]$ first, the newly updated value of $\text{dp}[x]$ could immediately be used to compute $\text{dp}[x + 1]$ within the same iteration, effectively allowing the same element $x$ to contribute twice (once as $x$ and once as $x + 1$).
- To prevent this duplication, we **must update $\text{dp}[x + 1]$ before updating $\text{dp}[x]$**:
  1. `dp[x + 1] = dp[x] + 1` (uses the old `dp[x]` from previous elements)
  2. `dp[x] = dp[x - 1] + 1` (uses the old `dp[x - 1]`)

### 4. Space Efficiency
Given $\text{nums}[i] \le 10^6$, an element can reach at most $10^6 + 1$. Thus, a flat 1D array of size $1\,000\,003$ provides $\mathcal{O}(1)$ random access without hash collisions in Java, C++, and JavaScript. In Python, a dynamic dictionary `dict[int, int]` is used for optimal memory allocation.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \log n + M)$ | Sorting `nums` takes $\mathcal{O}(n \log n)$ time. Initializing the static DP array takes $\mathcal{O}(M)$ time, and iterating through `nums` performs $\mathcal{O}(1)$ updates per number. |
| **Auxiliary Space** | $\mathcal{O}(M) \text{ / } \mathcal{O}(n)$ | Static DP array of size $10^6 + 3$ ($\approx 4\text{ MB}$) in Java/C++/JavaScript. Python uses $\mathcal{O}(n)$ auxiliary space via hash map. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maxSelectedElements(int[] nums) {
        Arrays.sort(nums);

        // dp[v] = value v pe end hone wali longest consecutive chain
        int[] dp = new int[1_000_003];
        int ans = 1;

        for (int x : nums) {
            // Pehle x+1 update karo, phir x (descending order zaroori hai)
            // taaki ek hi element dono jagah use na ho
            dp[x + 1] = dp[x] + 1;
            dp[x] = dp[x - 1] + 1;

            ans = Math.max(ans, Math.max(dp[x], dp[x + 1]));
        }

        return ans;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def maxSelectedElements(self, nums: List[int]) -> int:
        nums.sort()
        dp: dict[int, int] = {}
        ans = 1

        for x in nums:
            # Update x + 1 before x so that current x does not overwrite dp[x]
            # used by dp[x + 1] in the same iteration
            dp[x + 1] = dp.get(x, 0) + 1
            dp[x] = dp.get(x - 1, 0) + 1
            ans = max(ans, dp[x], dp[x + 1])

        return ans
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxSelectedElements(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        // dp[v] = length of longest consecutive chain ending at value v
        vector<int> dp(1000003, 0);
        int ans = 1;

        for (int x : nums) {
            // Update x + 1 before x to prevent using current element twice
            dp[x + 1] = dp[x] + 1;
            dp[x] = dp[x - 1] + 1;

            ans = max(ans, max(dp[x], dp[x + 1]));
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSelectedElements = function(nums) {
    nums.sort((a, b) => a - b);

    // dp[v] = length of longest consecutive chain ending at value v
    const dp = new Int32Array(1000003);
    let ans = 1;

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        // Update x + 1 before x to prevent duplicate usage of current element
        dp[x + 1] = dp[x] + 1;
        dp[x] = dp[x - 1] + 1;

        if (dp[x + 1] > ans) ans = dp[x + 1];
        if (dp[x] > ans) ans = dp[x];
    }

    return ans;
};
```

---

## 🔗 Quick Navigation

- ⬅️ [Back to November 2026 Archive](../../README.md)
- 🏠 [Main Repository](../../../../README.md)
- 🌐 [Official Live Platform — CodeByTushu](https://codebytushu.com/Leetcode/)
