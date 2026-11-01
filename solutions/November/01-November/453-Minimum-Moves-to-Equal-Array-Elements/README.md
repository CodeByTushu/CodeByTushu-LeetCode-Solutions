# LeetCode 453: Minimum Moves to Equal Array Elements

- **Publication Date:** 01 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements/](https://leetcode.com/problems/minimum-moves-to-equal-array-elements/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/kqPfhqadLBs?si=Nfuc_Ph1h2Or5tA6)

---

## 💡 Problem Summary

Given an integer array `nums` of size `n`, return the *minimum number of moves required to make all array elements equal*.

In one move, you can **increment `n - 1` elements of the array by `1`**.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [1,2,3]`
- **Output:** `3`
- **Explanation:** Only three moves are needed (remember each move increments two elements):
  - `[1,2,3]` $\to$ `[2,3,3]`
  - `[2,3,3]` $\to$ `[3,4,3]`
  - `[3,4,3]` $\to$ `[4,4,4]`

#### Example 2:
- **Input:** `nums = [1,1,1]`
- **Output:** `0`
- **Explanation:** All elements are already equal.

---

### 🔒 Constraints

- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- The answer is guaranteed to fit in a **32-bit integer**.

---

## 🧠 Algorithmic Approach & Key Observation

### 1. Relative Difference Invariant
At first glance, choosing which $n - 1$ elements to increment at each step feels like a complex simulation. However, we can reframe the problem by observing the **relative difference** between elements:

> **Key Breakthrough:**  
> Incrementing $n - 1$ elements by $1$ is mathematically equivalent to **decrementing $1$ element by $1$** relative to all other elements.

Adding $1$ to all numbers except the maximum creates the exact same relative gap as subtracting $1$ from the maximum number while keeping the rest constant.

### 2. Targeting the Global Minimum
To equalize all elements with the minimum number of decrements, every number must be reduced to the **global minimum element** $m = \min(\text{nums})$:
$$\text{moves} = \sum_{i=0}^{n-1} (nums[i] - m)$$

Alternatively, expanding the sum:
$$\text{moves} = \sum_{i=0}^{n-1} nums[i] - n \cdot m$$

### 3. Linear Algorithm
1. **Pass 1:** Scan `nums` to determine the minimum element $m$.
2. **Pass 2:** Iterate through `nums` and accumulate $(nums[i] - m)$ using a 64-bit integer (`long`) to safely prevent potential integer overflow during accumulation before casting to 32-bit `int`.

---

## ⏱️ Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$  
  - Pass 1 scans $n$ elements to find the global minimum: $\mathcal{O}(n)$.
  - Pass 2 scans $n$ elements to sum the deviations from the minimum: $\mathcal{O}(n)$.
  - Total Time: $\mathcal{O}(n + n) = \mathcal{O}(n)$ linear time. For $n \le 10^5$, this executes in $\approx 1\text{–}2\text{ ms}$ on standard competitive platforms.

- **Space Complexity:** $\mathcal{O}(1)$ Auxiliary Space  
  - Only two scalar primitive variables (`min` and `moves`) are maintained.
  - Zero extra array, hash table, or recursion stack allocations.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int minMoves(int[] nums) {
        int min = Integer.MAX_VALUE;
        for (int x : nums) {
            min = Math.min(min, x);
        }

        long moves = 0;
        for (int x : nums) {
            moves += (long) x - min;
        }

        return (int) moves;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List

class Solution:
    def minMoves(self, nums: List[int]) -> int:
        min_val = min(nums)
        return sum(x - min_val for x in nums)
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minMoves(vector<int>& nums) {
        int minVal = *min_element(nums.begin(), nums.end());
        long long moves = 0;
        for (int x : nums) {
            moves += (long long)x - minVal;
        }
        return (int)moves;
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
    let min = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
    }

    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        moves += nums[i] - min;
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
