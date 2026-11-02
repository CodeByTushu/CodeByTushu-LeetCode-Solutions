# LeetCode 462: Minimum Moves to Equal Array Elements II

- **Publication Date:** 02 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/6MTGLJ7kADs?si=KrbtCBh6TseWnAv5)

---

## 💡 Problem Summary

Given an integer array `nums` of size `n`, return the *minimum number of moves required to make all array elements equal*.

In one move, you can **increment or decrement an element of the array by `1`**.

Test cases are designed so that the answer will fit in a **32-bit integer**.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [1,2,3]`
- **Output:** `2`
- **Explanation:** Only two moves are needed (remember each move increments or decrements one element):
  - `[1,2,3]` $\to$ `[2,2,3]`
  - `[2,2,3]` $\to$ `[2,2,2]`

#### Example 2:
- **Input:** `nums = [1,10,2,9]`
- **Output:** `16`

---

### 🔒 Constraints

- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 🧠 Algorithmic Approach & Key Observation

### 1. Mathematical Formulation ($L_1$ Norm Minimization)
We want to choose a target integer $k$ that minimizes the total cost of moving each element $nums[i]$ to $k$:
$$f(k) = \sum_{i=0}^{n-1} |nums[i] - k|$$

This is the standard 1D geometric median / $L_1$ distance minimization problem. While the average (mean) minimizes squared Euclidean distance ($\sum (x_i - k)^2$), the **median** minimizes the absolute deviation ($\sum |x_i - k|$).

### 2. Pairwise Distance Invariant
Consider any sorted pair of numbers $(a, b)$ with $a \le b$. For any target value $k$:
- If $k < a$: $|a - k| + |b - k| = (a - k) + (b - k) > b - a$
- If $k > b$: $|a - k| + |b - k| = (k - a) + (k - b) > b - a$
- If $a \le k \le b$: $|a - k| + |b - k| = (k - a) + (b - k) = b - a$ (constant minimum!)

Thus, for any pair $(nums[i], nums[n - 1 - i])$, the sum of moves is minimized to exactly $nums[n - 1 - i] - nums[i]$ if and only if $k \in [nums[i], nums[n - 1 - i]]$.

To simultaneously satisfy this condition for all symmetric pairs from outer bounds to inner bounds:
$$[nums[0], nums[n-1]] \supseteq [nums[1], nums[n-2]] \supseteq \dots \supseteq [nums[\lfloor n/2 \rfloor], nums[\lceil n/2 \rceil]]$$

The intersection of all these intervals is non-empty and contains the **median element** $nums[\lfloor n / 2 \rfloor]$.

### 3. Algorithm Steps
1. **Sort:** Sort `nums` in ascending order.
2. **Find Median:** Identify the median element at index `nums[n / 2]`.
3. **Accumulate Moves:** Iterate through each number in `nums`, accumulating $|nums[i] - \text{median}|$ using a 64-bit integer (`long`) to prevent overflow during intermediate calculations.
4. **Return:** Cast the total accumulated moves to a 32-bit `int` and return.

---

## ⏱️ Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$ Overall Time  
  - Sorting the array using Dual-Pivot Quicksort takes $\mathcal{O}(n \log n)$ operations.
  - Accessing the median element `nums[n / 2]` takes $\mathcal{O}(1)$ constant time.
  - Accumulating the absolute distances $|nums[i] - \text{median}|$ takes a single $\mathcal{O}(n)$ linear pass.
  - Overall Time: $\mathcal{O}(n \log n + n) = \mathcal{O}(n \log n)$.

- **Space Complexity:** $\mathcal{O}(1)$ to $\mathcal{O}(\log n)$ Auxiliary Space  
  - In-place algorithm: only scalar variables `median` and `moves` are maintained.
  - The recursion stack for in-place sorting takes $\mathcal{O}(\log n)$ depth.
  - Zero extra heap allocation: strictly minimal memory footprint.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    public int minMoves2(int[] nums) {
        Arrays.sort(nums);
        int median = nums[nums.length / 2];
        long moves = 0;
        for (int x : nums) {
            moves += Math.abs((long) x - median);
        }
        return (int) moves;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List

class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        nums.sort()
        median = nums[len(nums) // 2]
        return sum(abs(x - median) for x in nums)
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
public:
    int minMoves2(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int median = nums[nums.size() / 2];
        long long moves = 0;
        for (int x : nums) {
            moves += abs((long long)x - median);
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
var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);
    const median = nums[Math.floor(nums.length / 2)];
    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        moves += Math.abs(nums[i] - median);
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
