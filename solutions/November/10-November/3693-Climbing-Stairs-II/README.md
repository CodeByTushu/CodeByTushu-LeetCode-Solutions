# LeetCode 3693: Climbing Stairs II

- **Publication Date:** 10 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/climbing-stairs-ii/](https://leetcode.com/problems/climbing-stairs-ii/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/GfK6WJYlhhs?si=giD2EyQg0ZrmPaa9)

---

## 💡 Problem Summary

You are climbing a staircase with `n + 1` steps, numbered from `0` to `n`. You are also given a **1-indexed** integer array `costs` of length `n`, where `costs[i]` is the cost of step `i`.

From step `i`, you can jump only to step `i + 1`, `i + 2`, or `i + 3`. The cost of jumping from step `i` to step `j` is defined as:
$$\text{costs}[j] + (j - i)^2$$

You start from step `0` with `cost = 0`. Return the **minimum total cost** to reach step `n`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `n = 4, costs = [1,2,3,4]`
- **Output:** `13`
- **Explanation:**
  - One optimal path is $0 \to 1 \to 2 \to 4$:
    - Jump $0 \to 1$: $\text{costs}[1] + (1 - 0)^2 = 1 + 1 = 2$
    - Jump $1 \to 2$: $\text{costs}[2] + (2 - 1)^2 = 2 + 1 = 3$
    - Jump $2 \to 4$: $\text{costs}[4] + (4 - 2)^2 = 4 + 4 = 8$
    - Total cost: $2 + 3 + 8 = 13$

#### Example 2:
- **Input:** `n = 4, costs = [5,1,6,2]`
- **Output:** `11`
- **Explanation:**
  - One optimal path is $0 \to 2 \to 4$:
    - Jump $0 \to 2$: $\text{costs}[2] + (2 - 0)^2 = 1 + 4 = 5$
    - Jump $2 \to 4$: $\text{costs}[4] + (4 - 2)^2 = 2 + 4 = 6$
    - Total cost: $5 + 6 = 11$

#### Example 3:
- **Input:** `n = 3, costs = [9,8,3]`
- **Output:** `12`
- **Explanation:**
  - The optimal path is $0 \to 3$:
    - Total cost: $\text{costs}[3] + (3 - 0)^2 = 3 + 9 = 12$

---

### 🔒 Constraints

- $1 \le n == \text{costs.length} \le 10^5$
- $1 \le \text{costs}[i] \le 10^4$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Dynamic Programming State Definition
Let $dp[j]$ represent the **minimum total cost to reach step $j$** starting from step $0$.
- **Base Case:**
  $$dp[0] = 0$$
  You begin at step 0 with zero accumulated cost.

### 2. State Transition with Quadratic Jump Penalty
From any prior step $i$, jumping to step $j$ is permitted if and only if $d = j - i \in \{1, 2, 3\}$.
The transition equation to step $j$ (1-indexed in problem description, so step $j$ corresponds to `costs[j - 1]` in 0-indexed code) is:
$$dp[j] = \min_{\substack{d \in \{1, 2, 3\} \\ j - d \ge 0}} \left( dp[j - d] + \text{costs}[j - 1] + d^2 \right)$$

Evaluating all $d \in \{1, 2, 3\}$:
- Jump size $d = 1$: $dp[j - 1] + \text{costs}[j - 1] + 1$
- Jump size $d = 2$: $dp[j - 2] + \text{costs}[j - 1] + 4$
- Jump size $d = 3$: $dp[j - 3] + \text{costs}[j - 1] + 9$

### 3. Space Optimization: Rolling Lookback
Because computing $dp[j]$ depends strictly on the previous 3 computed states ($dp[j-1]$, $dp[j-2]$, and $dp[j-3]$), we can either use an array of size $n + 1$ or optimize down to $\mathcal{O}(1)$ auxiliary space using three rolling variables.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | The outer loop runs $n$ iterations (from $j = 1$ to $n$). In each iteration, at most 3 constant-time backward steps ($d \in \{1, 2, 3\}$) are evaluated in $\mathcal{O}(1)$ time. Total operations $\le 3n$ ($\approx 3 \times 10^5$ instructions), executing in $\approx 8$ ms. |
| **Auxiliary Space** | $\mathcal{O}(n)$ / $\mathcal{O}(1)$ | The DP table requires an array of size $n + 1$ ($\approx 400$ KB for $n = 100{,}000$). Can be further optimized to strictly $\mathcal{O}(1)$ auxiliary space using 3 rolling variables. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int climbStairs(int n, int[] costs) {
        int[] dp = new int[n + 1];
        dp[0] = 0; // Base case: start at step 0 with cost 0

        for (int j = 1; j <= n; j++) {
            int best = Integer.MAX_VALUE;

            // Jump from j-1, j-2, or j-3 (only if valid step >= 0)
            for (int d = 1; d <= 3 && j - d >= 0; d++) {
                best = Math.min(best, dp[j - d] + costs[j - 1] + d * d);
            }

            dp[j] = best;
        }

        return dp[n];
    }
}
```

### 🐍 Python (Python 3)
```python
class Solution:
    def climbStairs(self, n: int, costs: list[int]) -> int:
        dp = [0] * (n + 1)  # dp[j] = minimum cost to reach step j

        for j in range(1, n + 1):
            best = float("inf")
            # Evaluate backward jumps of size 1, 2, or 3
            for d in range(1, 4):
                if j - d >= 0:
                    cand = dp[j - d] + costs[j - 1] + d * d
                    if cand < best:
                        best = cand
            dp[j] = best

        return dp[n]
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int climbStairs(int n, std::vector<int>& costs) {
        std::vector<int> dp(n + 1, 0);

        for (int j = 1; j <= n; ++j) {
            int best = INT_MAX;
            // Jump from j-1, j-2, or j-3 (only if valid step >= 0)
            for (int d = 1; d <= 3 && j - d >= 0; ++d) {
                best = std::min(best, dp[j - d] + costs[j - 1] + d * d);
            }
            dp[j] = best;
        }

        return dp[n];
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function(n, costs) {
    const dp = new Array(n + 1).fill(0);

    for (let j = 1; j <= n; j++) {
        let best = Infinity;
        // Jump from j-1, j-2, or j-3 (where valid step >= 0)
        for (let d = 1; d <= 3 && j - d >= 0; d++) {
            const cand = dp[j - d] + costs[j - 1] + d * d;
            if (cand < best) best = cand;
        }
        dp[j] = best;
    }

    return dp[n];
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
