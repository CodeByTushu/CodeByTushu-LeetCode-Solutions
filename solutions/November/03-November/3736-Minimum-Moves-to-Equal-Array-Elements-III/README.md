# LeetCode 3736: Minimum Moves to Equal Array Elements III

- **Publication Date:** 03 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/iTmgmYI0wLo?si=x8m1KIcczRBlfKzv)

---

## 💡 Problem Summary

You are given an integer array `nums`.

In one move, you may **increase the value of any single element `nums[i]` by `1`**.

Return the *minimum total number of moves required so that all elements in `nums` become equal*.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [2,1,3]`
- **Output:** `3`
- **Explanation:** To make all elements equal:
  - Increase `nums[0] = 2` by 1 to make it 3.
  - Increase `nums[1] = 1` by 1 to make it 2.
  - Increase `nums[1] = 2` by 1 to make it 3.
  - Now, all elements of `nums` are equal to 3. The minimum total moves is 3.

#### Example 2:
- **Input:** `nums = [4,4,5]`
- **Output:** `2`
- **Explanation:**
  - Increase `nums[0] = 4` by 1 to make it 5.
  - Increase `nums[1] = 4` by 1 to make it 5.
  - Now, all elements of `nums` are equal to 5. The minimum total moves is 2.

---

### 🔒 Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## 🧠 Algorithmic Approach & Key Observation

### 1. The Minimum Moves Trilogy
This problem concludes the classic LeetCode "Minimum Moves" trilogy with an elegant, foundational concept:
- **LeetCode 453 (Part I):** Increment $n - 1$ elements $\implies$ Target is the **minimum** element.
- **LeetCode 462 (Part II):** Increment or decrement any element $\implies$ Target is the **median** element ($L_1$ norm minimization).
- **LeetCode 3736 (Part III):** Increment single element only $\implies$ Target is the **maximum** element.

### 2. Monotonic Increment Invariant
Because the allowed operation can **only increase** an element's value:
- No element can ever be decreased below its initial value.
- To make all elements equal to a single common value $T$, we must choose $T \ge nums[i]$ for every index $i$.
- Therefore, $T \ge \max(\text{nums})$.
- If we choose any target $T > \max(\text{nums})$, each element would require additional moves, strictly increasing the total cost by $n \cdot (T - \max(\text{nums}))$.
- Consequently, the unique optimal baseline that minimizes total moves is the **global maximum**:
  $$M = \max_{0 \le i < n}(nums[i])$$

### 3. Closed-Form Formulation
The total moves required is the sum of differences between the global maximum and each array element:
$$\text{moves} = \sum_{i=0}^{n-1} (M - nums[i]) = n \cdot M - \sum_{i=0}^{n-1} nums[i]$$

### 4. Optimal Two-Pass Linear Algorithm
1. **Pass 1:** Scan `nums` to determine the maximum element $M$.
2. **Pass 2:** Iterate through `nums` and accumulate $(M - nums[i])$ into a counter `moves`.
3. **Return:** Return `moves`. Given $n \le 100$ and $nums[i] \le 100$, maximum possible moves is $100 \times 100 = 10^4$, fitting well within a standard 32-bit integer.

---

## ⏱️ Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$ Linear Time  
  - Pass 1 scans $n$ elements to find the global maximum: $\mathcal{O}(n)$.
  - Pass 2 scans $n$ elements to sum the deviations from the maximum: $\mathcal{O}(n)$.
  - Overall Time: $\mathcal{O}(n + n) = \mathcal{O}(n)$. For $n \le 100$, this executes in $\le 1\text{ ms}$ on LeetCode (Beats 98.02%).

- **Space Complexity:** $\mathcal{O}(1)$ Strictly Constant Auxiliary Space  
  - Only two scalar primitive variables (`max` and `moves`) are allocated.
  - Zero extra heap allocations, data structures, or recursion frames.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int minMoves(int[] nums) {
        int max = 0;
        for (int x : nums) {
            max = Math.max(max, x);
        }

        int moves = 0;
        for (int x : nums) {
            moves += max - x;
        }

        return moves;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List

class Solution:
    def minMoves(self, nums: List[int]) -> int:
        max_val = max(nums)
        return sum(max_val - x for x in nums)
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minMoves(vector<int>& nums) {
        int maxVal = *max_element(nums.begin(), nums.end());
        int moves = 0;
        for (int x : nums) {
            moves += maxVal - x;
        }
        return moves;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }

    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        moves += max - nums[i];
    }

    return moves;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
