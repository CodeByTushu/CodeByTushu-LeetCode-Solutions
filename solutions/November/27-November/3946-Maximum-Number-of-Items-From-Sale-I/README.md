# LeetCode 3946: Maximum Number of Items From Sale I

- **Publication Date:** 27 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-items-from-sale-i/](https://leetcode.com/problems/maximum-number-of-items-from-sale-i/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/HmBehaLdruM)

---

## 💡 Problem Summary

You are given a 2D integer array `items`, where `items[i] = [factor_i, price_i]` represents the $i^{\text{th}}$ item. You are also given an integer `budget`.

There are unlimited copies of each item available for purchase. You may buy any number of copies of any items such that the total cost of the purchased copies is at most `budget`.

After buying items, you may receive free copies according to the following rules:
- For each item $i$ that you bought **at least one copy** of, you receive **one free copy** of every item $j$ such that $j \neq i$ and $\text{factor}_i$ divides $\text{factor}_j$.
- Buying multiple copies of the same item $i$ does **not** give additional free copies through item $i$.
- The same item $j$ can be received multiple times for free if it is received from purchases of different item types.

Return the **maximum total number of item copies** you can obtain, including both purchased copies and free copies, while spending at most `budget` on purchased items.

---

### 🧪 Example Walkthrough

#### Example 1:
- **Input:** `items = [[6, 2], [2, 6], [3, 4]]`, `budget = 9`
- **Output:** `4`
- **Explanation:**  
  1. We can buy 2 copies of item 0 (cost: $2 \times 2 = 4$) and 1 copy of item 2 (cost: $4$). Total cost = $8 \le 9$.
  2. Because we bought at least one copy of item 2, whose factor is $3$, and $3$ divides $\text{factor}_0 = 6$, we receive 1 free copy of item 0.
  3. Total copies = 3 purchased copies + 1 free copy = 4 item copies.

#### Example 2:
- **Input:** `items = [[2, 4], [3, 2], [4, 1], [6, 4], [12, 4]]`, `budget = 8`
- **Output:** `10`
- **Explanation:**  
  1. We buy 1 copy of item 0 (cost $4$), 1 copy of item 1 (cost $2$), and 2 copies of item 2 (cost $2 \times 1 = 2$). Total cost = $8 \le 8$.
  2. Free copies received:
     - Item 0 ($\text{factor} = 2$) divides $4, 6, 12 \implies$ 3 free copies (items 2, 3, 4).
     - Item 1 ($\text{factor} = 3$) divides $6, 12 \implies$ 2 free copies (items 3, 4).
     - Item 2 ($\text{factor} = 4$) divides $12 \implies$ 1 free copy (item 4).
     - Total free copies = $3 + 2 + 1 = 6$.
  3. Total item copies = 4 purchased + 6 free = 10 copies.

---

### 🔒 Constraints

- $1 \le \text{items.length} \le 1000$
- $\text{items}[i] = [\text{factor}_i, \text{price}_i]$
- $1 \le \text{factor}_i, \text{price}_i \le 1500$
- $1 \le \text{budget} \le 1500$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Separation of First Purchase and Subsequent Purchases
Let's analyze the benefit of buying copies of an item:
- **First copy of item $i$:**
  - Cost: $\text{price}_i$
  - Gain: $1$ (the purchased copy) $+ f[i]$ (all free items $j$ where $\text{factor}_i \mid \text{factor}_j$).
  - Total value from first copy $= 1 + f[i]$.
- **Additional copies of any item:**
  - Because buying a second or subsequent copy of item $i$ **never** triggers extra free bonus copies, each extra copy gives exactly $1$ copy for its price $\text{price}_i$.
  - To maximize the number of extra copies for any remaining budget, we should **always buy the cheapest available item**!
  - Let $\text{minPrice} = \min_{i} (\text{price}_i)$. Each extra copy costs $\text{minPrice}$ and yields $+1$ item.

### 2. Two-Phase Knapsack Dynamic Programming
This directly transforms the problem into a combined **0/1 Knapsack** followed by an **Unbounded Knapsack**:

1. **Precomputation of Bonus Counts $f[i]$:**
   - Iterate over all pairs $(i, j)$ with $i \neq j$.
   - If $\text{items}[j][0] \pmod{\text{items}[i][0]} == 0$, increment $f[i]$.
   - This takes $\mathcal{O}(N^2)$ time ($N \le 1000 \implies \le 10^6$ operations).
   - Simultaneously, track $\text{minPrice} = \min_i (\text{price}_i)$.

2. **Phase 1: 0/1 Knapsack (First Purchase):**
   - For each item $i$, we can choose to buy its first copy at cost $\text{price}_i$ with value $1 + f[i]$ at most once.
   - Using a 1D DP array of size $\text{budget} + 1$, iterate $b$ from $\text{budget}$ down to $\text{price}_i$:
     $$\text{dp}[b] = \max(\text{dp}[b], \text{dp}[b - \text{price}_i] + (1 + f[i]))$$

3. **Phase 2: Unbounded Knapsack (Cheapest Extra Copies):**
   - After the first purchases are evaluated, any leftover budget can be spent on repeatedly buying copies of the cheapest item of price $\text{minPrice}$ for a value of $+1$ per purchase.
   - Iterate $b$ from $\text{minPrice}$ up to $\text{budget}$:
     $$\text{dp}[b] = \max(\text{dp}[b], \text{dp}[b - \text{minPrice}] + 1)$$

4. **Result:**
   - The answer is $\text{dp}[\text{budget}]$.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N^2 + N \times B)$ | Precomputing $f[i]$ takes $\mathcal{O}(N^2)$ checks ($\le 10^6$). The 0/1 Knapsack takes $\mathcal{O}(N \times B)$ ($\le 1.5 \times 10^6$), and unbounded knapsack takes $\mathcal{O}(B)$ ($\le 1500$). Total operations $\approx 2.5 \times 10^6$, running in $\sim 47\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(N + B)$ | The array $f$ of size $N$ requires $\sim 4\text{ KB}$, and the 1D DP array of size $B + 1$ requires $\sim 6\text{ KB}$. Highly cache-friendly with zero heap allocations. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;

        // f[i] = kitne items j (j != i) ke factor ko factor_i divide karta hai
        // (item i ek baar kharidne par itni free copies milengi)
        int[] f = new int[n];
        int minPrice = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            minPrice = Math.min(minPrice, items[i][1]);
            for (int j = 0; j < n; j++) {
                if (i != j && items[j][0] % items[i][0] == 0) {
                    f[i]++;
                }
            }
        }

        // dp[b] = max copies jo cost <= b mein mil sakti hain
        int[] dp = new int[budget + 1];

        // Step 1: har item ki pehli copy (0/1 knapsack), value = 1 (khud) + f[i] (free copies)
        for (int i = 0; i < n; i++) {
            int price = items[i][1];
            int value = 1 + f[i];
            for (int b = budget; b >= price; b--) {
                dp[b] = Math.max(dp[b], dp[b - price] + value);
            }
        }

        // Step 2: extra copies sabse sasta item kharid ke (unbounded), har copy ki value = 1
        for (int b = minPrice; b <= budget; b++) {
            dp[b] = Math.max(dp[b], dp[b - minPrice] + 1);
        }

        return dp[budget];
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3946 - Maximum Number of Items From Sale I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maximumSaleItems(self, items: list[list[int]], budget: int) -> int:
        n = len(items)
        f = [0] * n
        min_price = float('inf')

        for i in range(n):
            min_price = min(min_price, items[i][1])
            for j in range(n):
                if i != j and items[j][0] % items[i][0] == 0:
                    f[i] += 1

        dp = [0] * (budget + 1)

        # Step 1: 0/1 Knapsack for first copy of each item (value = 1 + f[i])
        for i in range(n):
            price = items[i][1]
            value = 1 + f[i]
            for b in range(budget, price - 1, -1):
                dp[b] = max(dp[b], dp[b - price] + value)

        # Step 2: Unbounded Knapsack for extra copies using cheapest item
        for b in range(min_price, budget + 1):
            dp[b] = max(dp[b], dp[b - min_price] + 1)

        return dp[budget]
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int maximumSaleItems(vector<vector<int>>& items, int budget) {
        int n = items.size();
        vector<int> f(n, 0);
        int minPrice = INT_MAX;

        for (int i = 0; i < n; i++) {
            minPrice = min(minPrice, items[i][1]);
            for (int j = 0; j < n; j++) {
                if (i != j && items[j][0] % items[i][0] == 0) {
                    f[i]++;
                }
            }
        }

        vector<int> dp(budget + 1, 0);

        // Step 1: 0/1 Knapsack for first purchase of each item
        for (int i = 0; i < n; i++) {
            int price = items[i][1];
            int value = 1 + f[i];
            for (int b = budget; b >= price; b--) {
                dp[b] = max(dp[b], dp[b - price] + value);
            }
        }

        // Step 2: Unbounded Knapsack buying extra copies of cheapest item
        for (int b = minPrice; b <= budget; b++) {
            dp[b] = max(dp[b], dp[b - minPrice] + 1);
        }

        return dp[budget];
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const f = new Int32Array(n);
    let minPrice = Infinity;

    for (let i = 0; i < n; i++) {
        minPrice = Math.min(minPrice, items[i][1]);
        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % items[i][0] === 0) {
                f[i]++;
            }
        }
    }

    const dp = new Int32Array(budget + 1);

    // Step 1: 0/1 Knapsack for first copy of each item
    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const value = 1 + f[i];
        for (let b = budget; b >= price; b--) {
            if (dp[b - price] + value > dp[b]) {
                dp[b] = dp[b - price] + value;
            }
        }
    }

    // Step 2: Unbounded Knapsack for extra copies using cheapest item
    for (let b = minPrice; b <= budget; b++) {
        if (dp[b - minPrice] + 1 > dp[b]) {
            dp[b] = dp[b - minPrice] + 1;
        }
    }

    return dp[budget];
};
```

---

<p align="center">
  <strong>CodeByTushu</strong> — <em>Learn. Build. Share. Grow.</em>
</p>
