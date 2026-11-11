# LeetCode 3789: Minimum Cost to Acquire Required Items

- **Publication Date:** 11 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-to-acquire-required-items/](https://leetcode.com/problems/minimum-cost-to-acquire-required-items/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/RNq00dZ0sA0)

---

## 💡 Problem Summary

You are given five integers: `cost1`, `cost2`, `costBoth`, `need1`, and `need2`.

There are three types of items available:
- An item of **type 1** costs `cost1` and contributes `1` unit to the type 1 requirement only.
- An item of **type 2** costs `cost2` and contributes `1` unit to the type 2 requirement only.
- An item of **type 3** costs `costBoth` and contributes `1` unit to **both** type 1 and type 2 requirements.

You must collect enough items so that the total contribution toward type 1 is **at least** `need1` and the total contribution toward type 2 is **at least** `need2`.

Return an integer representing the **minimum** possible total cost to achieve these requirements.

---

### 🧪 Examples

#### Example 1:
- **Input:** `cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2`
- **Output:** `3`
- **Explanation:**
  - After buying three type 3 items, which cost $3 \times 1 = 3$, the total contribution to type 1 is $3$ ($\ge \text{need1} = 3$) and to type 2 is $3$ ($\ge \text{need2} = 2$).
  - Even though we get $1$ surplus unit of type 2, buying only type 3 items is cheaper than any individual mix.

#### Example 2:
- **Input:** `cost1 = 5, cost2 = 4, costBoth = 15, need1 = 2, need2 = 3`
- **Output:** `22`
- **Explanation:**
  - Buy `need1 = 2` items of type 1 and `need2 = 3` items of type 2:
    $$2 \times 5 + 3 \times 4 = 10 + 12 = 22$$
  - Any combination involving type 3 items costs strictly more.

#### Example 3:
- **Input:** `cost1 = 5, cost2 = 4, costBoth = 15, need1 = 0, need2 = 0`
- **Output:** `0`
- **Explanation:**
  - Since no items are required ($\text{need1} = \text{need2} = 0$), we purchase nothing and pay `0`.

---

### 🔒 Constraints

- $1 \le \text{cost1}, \text{cost2}, \text{costBoth} \le 10^6$
- $0 \le \text{need1}, \text{need2} \le 10^9$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Eliminating Overflow with 64-Bit Arithmetic
Since $\text{need1}, \text{need2} \le 10^9$ and costs reach $10^6$, the maximum possible answer reaches $2 \times 10^{15}$, which exceeds 32-bit signed integer limits ($2^{31} - 1 \approx 2.14 \times 10^9$). We cast all inputs immediately to 64-bit signed integers (`long` in Java, `long long` in C++).

### 2. Greedy Decomposition & Over-Coverage Edge Case
Notice that buying type 3 items (`costBoth`) contributes to **both** requirements simultaneously. Even if one requirement is already satisfied, if $\text{costBoth} < \text{cost1}$ (or $\text{costBoth} < \text{cost2}$), it is strictly optimal to buy a type 3 item to satisfy the remaining single requirement and discard the extra unit ("over-coverage").

We decompose the demand into:
- **Common Demand:** $\text{common} = \min(\text{need1}, \text{need2})$ units needed of both types.
- **Remaining Demand:** $\text{rem1} = \text{need1} - \text{common}$ and $\text{rem2} = \text{need2} - \text{common}$ (at least one of these is $0$).

### 3. The 3-Candidate Greedy Formula
Any optimal purchasing plan is guaranteed to be captured by taking the minimum of three direct candidates:
1. **Option 1 (Buy Independently):** Purchase `need1` of type 1 and `need2` of type 2:
   $$\text{option1} = \text{need1} \cdot \text{cost1} + \text{need2} \cdot \text{cost2}$$
2. **Option 2 (Pure Type 3 Over-Coverage):** Purchase $\max(\text{need1}, \text{need2})$ units of type 3:
   $$\text{option2} = \max(\text{need1}, \text{need2}) \cdot \text{costBoth}$$
3. **Option 3 (Optimal Hybrid Pairing):** For each common unit pair, choose the cheaper between `cost1 + cost2` and `costBoth`. For the remaining unmatched units of type 1 or type 2, choose the cheaper between the individual item cost and `costBoth`:
   $$\text{option3} = \text{common} \cdot \min(\text{cost1} + \text{cost2}, \text{costBoth}) + \text{rem1} \cdot \min(\text{cost1}, \text{costBoth}) + \text{rem2} \cdot \min(\text{cost2}, \text{costBoth})$$

Taking $\min(\text{option1}, \text{option2}, \text{option3})$ yields the exact global optimum in closed form.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(1)$ | Strictly constant-time elementary 64-bit arithmetic operations (`min`, `max`, multiplication, addition, subtraction) with zero loops or recursion. Achieves `2 ms` on LeetCode across all 1,002 testcases. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Uses only scalar 64-bit primitive variables allocated on the stack (`~96` bytes total), with zero heap allocations. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public long minimumCost(int cost1, int cost2, int costBoth, int need1, int need2) {
        long c1 = cost1, c2 = cost2, cb = costBoth;
        long n1 = need1, n2 = need2;

        long common = Math.min(n1, n2);
        long rem1 = n1 - common;
        long rem2 = n2 - common;

        // Option 1: Buy only Type 1 and Type 2 items separately
        long option1 = n1 * c1 + n2 * c2;

        // Option 2: Buy max(n1, n2) Type 3 items to cover both needs
        long option2 = Math.max(n1, n2) * cb;

        // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        long pairCost = Math.min(c1 + c2, cb);
        long option3 = common * pairCost + rem1 * Math.min(c1, cb) + rem2 * Math.min(c2, cb);

        return Math.min(option1, Math.min(option2, option3));
    }
}
```

### 🐍 Python (Python 3)
```python
class Solution:
    def minimumCost(self, cost1: int, cost2: int, costBoth: int, need1: int, need2: int) -> int:
        common = min(need1, need2)
        rem1 = need1 - common
        rem2 = need2 - common

        # Option 1: Buy only Type 1 and Type 2 items separately
        option1 = need1 * cost1 + need2 * cost2

        # Option 2: Buy max(need1, need2) Type 3 items to cover both needs
        option2 = max(need1, need2) * costBoth

        # Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        pair_cost = min(cost1 + cost2, costBoth)
        option3 = common * pair_cost + rem1 * min(cost1, costBoth) + rem2 * min(cost2, costBoth)

        return min(option1, option2, option3)
```

### ⚡ C++ (C++20)
```cpp
#include <algorithm>

class Solution {
public:
    long long minimumCost(int cost1, int cost2, int costBoth, int need1, int need2) {
        long long c1 = cost1, c2 = cost2, cb = costBoth;
        long long n1 = need1, n2 = need2;

        long long common = std::min(n1, n2);
        long long rem1 = n1 - common;
        long long rem2 = n2 - common;

        // Option 1: Buy only Type 1 and Type 2 items separately
        long long option1 = n1 * c1 + n2 * c2;

        // Option 2: Buy max(n1, n2) Type 3 items to cover both needs
        long long option2 = std::max(n1, n2) * cb;

        // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        long long pairCost = std::min(c1 + c2, cb);
        long long option3 = common * pairCost + rem1 * std::min(c1, cb) + rem2 * std::min(c2, cb);

        return std::min({option1, option2, option3});
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    const common = Math.min(need1, need2);
    const rem1 = need1 - common;
    const rem2 = need2 - common;

    // Option 1: Buy only Type 1 and Type 2 items separately
    const option1 = need1 * cost1 + need2 * cost2;

    // Option 2: Buy max(need1, need2) Type 3 items to cover both needs
    const option2 = Math.max(need1, need2) * costBoth;

    // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
    const pairCost = Math.min(cost1 + cost2, costBoth);
    const option3 = common * pairCost + rem1 * Math.min(cost1, costBoth) + rem2 * Math.min(cost2, costBoth);

    return Math.min(option1, option2, option3);
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
