# LeetCode 1833: Maximum Ice Cream Bars

- **Publication Date:** 21 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-ice-cream-bars/](https://leetcode.com/problems/maximum-ice-cream-bars/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/mK7FyiIyorc?si=TTU5VOqfpzDGI5pI)

---

## Problem Summary

It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are $n$ ice cream bars. You are given an array `costs` of length $n$, where `costs[i]` is the price of the $i^{\text{th}}$ ice cream bar in coins. The boy initially has `coins` coins to spend, and he wants to buy as many ice cream bars as possible.

**Note:** The boy can buy the ice cream bars in any order.

Return *the **maximum number of ice cream bars** the boy can buy with `coins` coins*.

You must solve the problem by counting sort.

---

### Examples

#### Example 1:
- **Input:** `costs = [1,3,2,4,1], coins = 7`
- **Output:** `4`
- **Explanation:** The boy can buy ice cream bars at indices $0, 1, 2, 4$ for a total price of $1 + 3 + 2 + 1 = 7$.

#### Example 2:
- **Input:** `costs = [10,6,8,7,7,8], coins = 5`
- **Output:** `0`
- **Explanation:** The boy cannot afford any of the ice cream bars.

#### Example 3:
- **Input:** `costs = [1,6,3,1,2,5], coins = 20`
- **Output:** `6`
- **Explanation:** The boy can buy all the ice cream bars for a total price of $1 + 6 + 3 + 1 + 2 + 5 = 18 \le 20$.

---

### Constraints

- $costs.\text{length} == n$
- $1 \le n \le 10^5$
- $1 \le costs[i] \le 10^5$
- $1 \le coins \le 10^8$

---

## Algorithmic Approach

### Greedy Selection with Counting Sort (Bucket Frequency)

1. **Greedy Strategy:**
   - To maximize the count of purchased items given a budget constraint, we must prioritize the cheapest available items first.
   - Any dollar saved by taking a cheaper bar rather than an expensive bar allows us to buy at least as many, if not more, additional bars.

2. **Linear-Time Counting Sort Optimization:**
   - Standard comparison sorting takes $\mathcal{O}(N \log N)$ time.
   - Since $costs[i] \le 10^5$, we can achieve true $\mathcal{O}(N + M)$ linear time by maintaining a frequency array `freq` of size $100001$.
   - Iterate through `costs` and populate `freq[cost]++`.

3. **Greedy Iteration:**
   - Loop through costs from $1$ up to $100000$:
     - If `freq[cost] == 0`, skip.
     - Calculate how many bars of this price we can afford:
       $$\text{canBuy} = \min(\text{freq}[cost], \lfloor coins / cost \rfloor)$$
     - Add `canBuy` to the total answer `ans`.
     - Deduct $\text{canBuy} \times cost$ from `coins`.
     - If remaining `coins < cost`, we cannot afford any more ice cream bars of this cost or higher, so we proceed or break.

4. **Result:**
   - Return `ans`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N + M)$ | Populating frequencies takes $\mathcal{O}(N)$ where $N$ is the number of ice cream bars. Traversing the frequency array of upper bound $M = 10^5$ takes $\mathcal{O}(M)$ iterations. |
| **Auxiliary Space** | $\mathcal{O}(M)$ | A fixed-size frequency array of length $M + 1 = 100001$ requires constant space relative to $N$. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int maxIceCream(int[] costs, int coins) {

        // Maximum possible cost is 100000
        int[] freq = new int[100001];

        // Count frequencies
        for (int cost : costs) {
            freq[cost]++;
        }

        int ans = 0;

        // Buy cheapest ice creams first
        for (int cost = 1; cost <= 100000; cost++) {
            if (freq[cost] == 0) continue;

            int canBuy = Math.min(freq[cost], coins / cost);

            ans += canBuy;
            coins -= canBuy * cost;

            if (coins < cost) {
                // Can't afford any more at this cost or higher
                continue;
            }
        }

        return ans;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        # Maximum possible cost is 100000
        freq = [0] * 100001

        # Count frequencies
        for cost in costs:
            freq[cost] += 1

        ans = 0

        # Buy cheapest ice creams first
        for cost in range(1, 100001):
            if freq[cost] == 0:
                continue

            can_buy = min(freq[cost], coins // cost)

            ans += can_buy
            coins -= can_buy * cost

            if coins < cost:
                # Can't afford any more at this cost or higher
                continue

        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxIceCream(vector<int>& costs, int coins) {
        // Maximum possible cost is 100000
        vector<int> freq(100001, 0);

        // Count frequencies
        for (int cost : costs) {
            freq[cost]++;
        }

        int ans = 0;

        // Buy cheapest ice creams first
        for (int cost = 1; cost <= 100000; cost++) {
            if (freq[cost] == 0) continue;

            int canBuy = min(freq[cost], coins / cost);

            ans += canBuy;
            coins -= canBuy * cost;

            if (coins < cost) {
                // Can't afford any more at this cost or higher
                continue;
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function(costs, coins) {
    // Maximum possible cost is 100000
    const freq = new Int32Array(100001);

    // Count frequencies
    for (const cost of costs) {
        freq[cost]++;
    }

    let ans = 0;

    // Buy cheapest ice creams first
    for (let cost = 1; cost <= 100000; cost++) {
        if (freq[cost] === 0) continue;

        const canBuy = Math.min(freq[cost], Math.floor(coins / cost));

        ans += canBuy;
        coins -= canBuy * cost;

        if (coins < cost) {
            // Can't afford any more at this cost or higher
            continue;
        }
    }

    return ans;
};
```

---

<p align="center">
  <a href="../20-June/1840-Maximum-Building-Height/"><strong>⬅️ Previous Problem (20 June: #1840)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
