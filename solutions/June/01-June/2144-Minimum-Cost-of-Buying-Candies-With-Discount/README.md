# LeetCode 2144: Minimum Cost of Buying Candies With Discount

- **Publication Date:** 01 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount/](https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/N7CyU4tE96g?si=dF31v_3u982-EJ_D)

---

## Problem Summary

A shop is selling candies at a discount. For every **two** candies sold, the shop gives a **third** candy for **free**.

The customer can choose **any** candy to take away for free as long as the cost of the chosen candy is **less than or equal to** the minimum cost of the two candies bought.

- For example, if there are $4$ candies with costs `[1, 2, 3, 4]`, and the customer buys candies with costs `2` and `3`, they can take the candy with cost `1` for free, but not the candy with cost `4`.

Given a **0-indexed** integer array `cost`, where `cost[i]` denotes the cost of the $i^{\text{th}}$ candy, return the **minimum cost** of buying all the candies.

---

### Examples

#### Example 1:
- **Input:** `cost = [1, 2, 3]`
- **Output:** `5`
- **Explanation:**
  - Buy candies with costs `2` and `3`.
  - Take candy with cost `1` for free because $\text{cost} \le \min(2, 3)$.
  - Total cost = $2 + 3 = 5$.

#### Example 2:
- **Input:** `cost = [6, 5, 7, 9, 2, 2]`
- **Output:** `23`
- **Explanation:**
  - Sort candies descending: `[9, 7, 6, 5, 2, 2]`.
  - Group 1: Buy candies with costs `9` and `7`, take candy with cost `6` for free ($9 + 7 = 16$).
  - Group 2: Buy candies with costs `5` and `2`, take candy with cost `2` for free ($5 + 2 = 7$).
  - Total minimum cost = $16 + 7 = 23$.

#### Example 3:
- **Input:** `cost = [5, 5]`
- **Output:** `10`
- **Explanation:**
  - Since there are only $2$ candies, we cannot get a free candy.
  - Buy both candies for $5 + 5 = 10$.

---

### Constraints

- $1 \le \text{cost.length} \le 100$
- $1 \le \text{cost}[i] \le 100$

---

## Algorithmic Approach

### 1. Greedy Choice Property
- To minimize the total expense, we want to maximize the discount value — meaning the candies we receive for free should have the highest possible costs.
- Since the free candy must cost less than or equal to the minimum of the two paid candies in its group, the optimal strategy is to always pair the two most expensive available candies and take the third most expensive available candy for free.

### 2. Implementation Steps
1. Sort the `cost` array in descending order (or ascending order and traverse backward).
2. Iterate through the elements:
   - Candies at indices where $(i + 1) \pmod 3 \ne 0$ (1st and 2nd of each group of 3) are paid for.
   - Candies at indices where $(i + 1) \pmod 3 == 0$ (every 3rd candy) are taken for free.
3. Return the accumulated total cost.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \log N)$ | Sorting the array takes $\mathcal{O}(N \log N)$ time, followed by a single linear scan in $\mathcal{O}(N)$. Given $N \le 100$, execution is virtually instantaneous ($0\text{ ms}$). |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive integer counters and accumulators are used during traversal. |

---

## Multi-Language Implementations

### Java
```java
import java.util.Arrays;

class Solution {
    public int minimumCost(int[] cost) {
        Arrays.sort(cost);
        int total = 0;
        int count = 0;
        for (int i = cost.length - 1; i >= 0; i--) {
            count++;
            if (count == 3) {
                count = 0; // Every 3rd candy is free
                continue;
            }
            total += cost[i];
        }
        return total;
    }
}
```

### Python
```python
from typing import List


class Solution:
    def minimumCost(self, cost: List[int]) -> int:
        cost.sort(reverse=True)
        total = 0
        for i, c in enumerate(cost):
            if (i + 1) % 3 != 0:
                total += c
        return total
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumCost(vector<int>& cost) {
        sort(cost.rbegin(), cost.rend());
        int total = 0;
        for (int i = 0; i < cost.size(); i++) {
            if ((i + 1) % 3 != 0) {
                total += cost[i];
            }
        }
        return total;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function(cost) {
    cost.sort((a, b) => b - a);
    let total = 0;
    for (let i = 0; i < cost.length; i++) {
        if ((i + 1) % 3 !== 0) {
            total += cost[i];
        }
    }
    return total;
};
```
