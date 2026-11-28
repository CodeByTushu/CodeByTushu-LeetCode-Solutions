# LeetCode 3947: Maximum Number of Items From Sale II

- **Publication Date:** 28 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-items-from-sale-ii/](https://leetcode.com/problems/maximum-number-of-items-from-sale-ii/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/uhBSMI9ZJ0A)

---

## 💡 Problem Summary

You are given a 2D integer array `items`, where `items[i] = [factor_i, price_i]` represents the $i^{\text{th}}$ item. You are also given an integer `budget`.

There are unlimited copies of each item available for purchase. You may buy any number of copies of any items such that the total cost of the purchased copies is at most `budget`.

After buying items, you may receive free copies according to the following rules:
- Each purchased copy of item $i$ can give you **at most one free copy** of another item $j$.
- The free item must satisfy $j \neq i$ and $\text{factor}_i$ divides $\text{factor}_j$.
- For each ordered pair $(i, j)$, you can receive a free copy of item $j$ from purchases of item $i$ **at most once**, regardless of how many copies of item $i$ you buy.
- The same item $j$ can be received multiple times for free if it is received from purchases of different item types.

Return the **maximum total number of item copies** you can obtain, including both purchased copies and free copies, while spending at most `budget` on purchased items.

---

### 🧪 Example Walkthrough

#### Example 1:
- **Input:** `items = [[1, 6], [2, 4], [3, 5]]`, `budget = 19`
- **Output:** `5`
- **Explanation:**  
  1. We can buy 2 copies of item 0 and 1 copy of item 1 for a total cost of $2 \times 6 + 4 = 16 \le 19$.
  2. One purchased copy of item 0 gives 1 free copy of item 1, because $\text{factor}_0 = 1$ divides $\text{factor}_1 = 2$.
  3. The other purchased copy of item 0 gives 1 free copy of item 2, because $\text{factor}_0 = 1$ divides $\text{factor}_2 = 3$.
  4. Total copies = 3 purchased copies + 2 free copies = 5 item copies.

#### Example 2:
- **Input:** `items = [[2, 8], [1, 10], [6, 6], [4, 12], [5, 20], [5, 17]]`, `budget = 35`
- **Output:** `7`
- **Explanation:**  
  1. We can buy 2 copies of item 0, 1 copy of item 1, and 1 copy of item 2 for a total cost of $2 \times 8 + 10 + 6 = 32 \le 35$.
  2. Free copies received:
     - 1st copy of item 0 ($\text{factor} = 2$) gives 1 free copy of item 2 ($\text{factor} = 6$).
     - 2nd copy of item 0 gives 1 free copy of item 3 ($\text{factor} = 4$).
     - 1st copy of item 1 ($\text{factor} = 1$) gives 1 free copy of item 2 ($\text{factor} = 6$).
     - Item 2 gives no free copies.
  3. Total item copies = 4 purchased + 3 free = 7 copies.

---

### 🔒 Constraints

- $1 \le \text{items.length} \le 10^5$
- $\text{items}[i] = [\text{factor}_i, \text{price}_i]$
- $1 \le \text{factor}_i \le \text{items.length}$
- $1 \le \text{price}_i \le 10^9$
- $1 \le \text{budget} \le 10^9$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Key Difference From Part I
In Part I ($N, B \le 1500$), buying a single copy of item $i$ unlocked all of its divisible item bonuses at once.  
In Part II ($N \le 10^5, B \le 10^9$), each purchased copy of item $i$ unlocks **at most one** free copy of an eligible item $j$ ($\text{factor}_i \mid \text{factor}_j$), and each pair $(i, j)$ can award a bonus at most once:
- If item $i$ has $f_i$ items whose factor is a multiple of $\text{factor}_i$ ($j \neq i$), we can gain at most $f_i$ free copies from item $i$.
- To get these $f_i$ free copies, we must purchase **$f_i$ distinct copies** of item $i$.
- Each of these first $f_i$ copies costs $\text{price}_i$ and yields **$2$ copies** (1 purchased + 1 free).
- Any copies beyond $f_i$ yield only **$1$ copy** (0 free) for $\text{price}_i$.

### 2. When Is a "Value-2" Copy Worth It?
Let $\text{minPrice} = \min_{k} (\text{price}_k)$ be the cost of the single cheapest item in the catalog.
- Spending money on the cheapest item gives $1$ copy per $\text{minPrice}$.
- Buying 1 "value-2" copy of item $i$ costs $\text{price}_i$ and gives $2$ copies.
- If $\text{price}_i \ge 2 \times \text{minPrice}$, spending $\text{price}_i$ on the cheapest item gives at least $\lfloor \text{price}_i / \text{minPrice} \rfloor \ge 2$ copies!
- Therefore, buying a value-2 copy is **strictly beneficial only when $\text{price}_i < 2 \times \text{minPrice}$**.

### 3. Greedy Selection
For all items where $\text{price}_i < 2 \times \text{minPrice}$:
- Every unit taken yields 2 items for cost $\text{price}_i$ (effective cost: $\text{price}_i / 2$).
- To maximize copies, we should greedily buy the items with the lowest price first!
- Sort candidates by price in ascending order.
- For each item $i$:
  - If $\text{price}_i \ge 2 \times \text{minPrice}$, break immediately.
  - Take $\text{take} = \min(f_i, \lfloor \text{rem} / \text{price}_i \rfloor)$ copies.
  - Decrement budget by $\text{take} \times \text{price}_i$ and increment total copies by $2 \times \text{take}$.
  - If $\text{take} < f_i$, the remaining budget cannot afford even one more copy of this item (or any subsequent more expensive item), so break!
- Finally, spend all leftover budget on the cheapest item: $\text{ans} += \lfloor \text{rem} / \text{minPrice} \rfloor$.

### 4. Harmonic Sieve for Divisibility Precomputation
Since $1 \le \text{factor}_i \le N$, we can count how many items have each factor in $\mathcal{O}(N)$.
Using a Harmonic Sieve:
$$\sum_{d=1}^N \frac{N}{d} = \mathcal{O}(N \log N)$$
For $N = 10^5$, total iterations are only $\approx 1.16 \times 10^6$, which finishes in just a few milliseconds!

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \log N)$ | Harmonic sieve takes $\mathcal{O}(N \log N)$ iterations ($\sim 1.16 \times 10^6$). Sorting items by price takes $\mathcal{O}(N \log N)$. Greedy scan takes $\mathcal{O}(N)$. Overall operations $\approx 2.8 \times 10^6$, executing in $\sim 36\text{ ms}$ on LeetCode. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | Frequency array `cnt[]` and multiple count array `m[]` take $\mathcal{O}(N)$ memory ($\sim 800\text{ KB}$). Packing keys into primitive 64-bit integers avoids object allocation overhead entirely. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;

        // cnt[v] = kitne items ka factor v hai
        int[] cnt = new int[n + 1];
        for (int[] it : items) cnt[it[0]]++;

        // m[d] = kitne items ka factor d ka multiple hai (Harmonic sum, O(n log n))
        int[] m = new int[n + 1];
        for (int d = 1; d <= n; d++) {
            for (int x = d; x <= n; x += d) m[d] += cnt[x];
        }

        long minPrice = Long.MAX_VALUE;
        long[] keys = new long[n];
        for (int i = 0; i < n; i++) {
            int f = m[items[i][0]] - 1;               // khud ko chhodke
            long price = items[i][1];
            minPrice = Math.min(minPrice, price);
            keys[i] = price * 131072L + f;            // price ke hisaab se sort, f saath mein
        }
        Arrays.sort(keys);

        long rem = budget;
        long ans = 0;

        for (long key : keys) {
            long price = key / 131072L;
            long f = key % 131072L;

            // Value-2 copy tabhi faydemand hai jab price < 2 * minPrice
            if (price >= 2 * minPrice) break;
            if (f == 0) continue;

            long take = Math.min(f, rem / price);
            rem -= take * price;
            ans += 2 * take;

            if (take < f) break; // ab is price ya usse upar ka kuch afford nahi hoga
        }

        // Bacha hua budget sabse sasta item ki copies pe (value 1 each)
        ans += rem / minPrice;

        return (int) ans;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3947 - Maximum Number of Items From Sale II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maximumSaleItems(self, items: list[list[int]], budget: int) -> int:
        n = len(items)
        cnt = [0] * (n + 1)
        for it in items:
            cnt[it[0]] += 1

        # m[d] = count of items whose factor is a multiple of d
        m = [0] * (n + 1)
        for d in range(1, n + 1):
            for x in range(d, n + 1, d):
                m[d] += cnt[x]

        min_price = float('inf')
        candidates = []
        for it in items:
            factor, price = it[0], it[1]
            min_price = min(min_price, price)
            f = m[factor] - 1
            candidates.append((price, f))

        candidates.sort(key=lambda x: x[0])

        rem = budget
        ans = 0

        for price, f in candidates:
            # Value-2 copy is strictly beneficial only when price < 2 * min_price
            if price >= 2 * min_price:
                break
            if f == 0:
                continue

            take = min(f, rem // price)
            rem -= take * price
            ans += 2 * take

            if take < f:
                break

        # Remaining budget spent on cheapest item (value 1 each)
        ans += rem // min_price
        return ans
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
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

        vector<int> cnt(n + 1, 0);
        for (const auto& it : items) {
            cnt[it[0]]++;
        }

        // m[d] = kitne items ka factor d ka multiple hai (Harmonic sum, O(n log n))
        vector<int> m(n + 1, 0);
        for (int d = 1; d <= n; d++) {
            for (int x = d; x <= n; x += d) {
                m[d] += cnt[x];
            }
        }

        long long minPrice = LLONG_MAX;
        vector<pair<long long, long long>> candidates;
        candidates.reserve(n);

        for (int i = 0; i < n; i++) {
            long long price = items[i][1];
            long long f = m[items[i][0]] - 1;
            minPrice = min(minPrice, price);
            candidates.push_back({price, f});
        }

        sort(candidates.begin(), candidates.end());

        long long rem = budget;
        long long ans = 0;

        for (const auto& [price, f] : candidates) {
            // Value-2 copy tabhi beneficial hai jab price < 2 * minPrice
            if (price >= 2 * minPrice) break;
            if (f == 0) continue;

            long long take = min(f, rem / price);
            rem -= take * price;
            ans += 2 * take;

            if (take < f) break;
        }

        // Bacha hua budget sabse sasta item ki copies pe
        ans += rem / minPrice;

        return (int)ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
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
    const cnt = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        cnt[items[i][0]]++;
    }

    const m = new Int32Array(n + 1);
    for (let d = 1; d <= n; d++) {
        for (let x = d; x <= n; x += d) {
            m[d] += cnt[x];
        }
    }

    let minPrice = Infinity;
    const candidates = new Array(n);
    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const f = m[items[i][0]] - 1;
        if (price < minPrice) minPrice = price;
        candidates[i] = [price, f];
    }

    candidates.sort((a, b) => a[0] - b[0]);

    let rem = BigInt(budget);
    let ans = 0n;
    const minP = BigInt(minPrice);
    const limit = 2n * minP;

    for (let i = 0; i < n; i++) {
        const p = BigInt(candidates[i][0]);
        const f = BigInt(candidates[i][1]);

        if (p >= limit) break;
        if (f === 0n) continue;

        const maxAfford = rem / p;
        const take = f < maxAfford ? f : maxAfford;
        rem -= take * p;
        ans += 2n * take;

        if (take < f) break;
    }

    ans += rem / minP;

    return Number(ans);
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to Main Repository</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../README.md"><strong>📅 View November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
