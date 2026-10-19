# LeetCode 1846: Maximum Element After Decreasing and Rearranging

- **Publication Date:** 28 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging/](https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/IZNyIfgbRmc?si=OkpwNgWd55IcPyV6)

---

## Problem Summary

You are given an array of positive integers `arr`. Perform some operations (possibly none) on `arr` so that it satisfies these conditions:
1. The value of the **first element** in `arr` must be `1`.
2. The absolute difference between any two adjacent elements must be **at most 1**, meaning:
   $$|arr[i] - arr[i - 1]| \le 1 \quad \text{for each } 1 \le i < arr.\text{length}$$

There are two types of operations you can perform any number of times:
- **Decrease** the value of any element of `arr` to a smaller positive integer.
- **Rearrange** the elements of `arr` into any order.

Return the **maximum possible value** of an element in `arr` after performing the operations to satisfy the conditions.

---

### Examples

#### Example 1:
- **Input:** `arr = [2, 2, 1, 2, 1]`
- **Output:** `2`
- **Explanation:** We can satisfy the conditions by rearranging `arr` so it becomes `[1, 2, 2, 2, 1]`. The largest element in `arr` is `2`.

#### Example 2:
- **Input:** `arr = [100, 1, 1000]`
- **Output:** `3`
- **Explanation:** One valid rearranged and decreased sequence is `[1, 2, 3]`. The largest element is `3`.

#### Example 3:
- **Input:** `arr = [1, 2, 3, 4, 5]`
- **Output:** `5`
- **Explanation:** The array already satisfies the conditions, and the largest element is `5`.

---

### Constraints

- $1 \le \text{arr.length} \le 10^5$
- $1 \le \text{arr}[i] \le 10^9$

---

## Algorithmic Approach

### Greedy Sorting Strategy

1. **Monotonic Order Invariant:**
   - Since we want to maximize the maximum value and we can freely rearrange elements, placing the elements in non-decreasing sorted order is strictly optimal.
   - Any decrease operation moves values downward, never upward. Sorting ensures that larger available values are placed towards the end of the array, giving them the best opportunity to grow as high as possible.

2. **Sequential Step Bounds:**
   - The first element must always be forced to `1` (or decreased to `1` if greater).
   - For every subsequent index $i$ from $1$ to $n - 1$:
     - The previous valid value is `ans`.
     - The adjacent difference constraint mandates that the current element cannot exceed `ans + 1`.
     - At the same time, we are only allowed to *decrease* elements, meaning the current element cannot exceed its original value `arr[i]`.
     - Therefore, the optimal value for the current element is:
       $$\text{ans} = \min(arr[i], \text{ans} + 1)$$

3. **Optimality:**
   - By picking the maximum permissible value at each step in sorted order, we maintain the greedy invariant that `ans` is maximized after processing the prefix $arr[0..i]$.
   - After traversing all $n$ elements, the final `ans` is the global maximum.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \log N)$ | Sorting the array takes $\mathcal{O}(N \log N)$ time. The single greedy linear pass takes $\mathcal{O}(N)$ operations. Overall runtime is strictly dominated by sorting, executing well within $\approx 15\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ or $\mathcal{O}(\log N)$ | In-place primitive sorting algorithms require $\mathcal{O}(1)$ or $\mathcal{O}(\log N)$ auxiliary call stack space with no additional data structures. |

---

## Multi-Language Implementations

### Java
```java
import java.util.Arrays;

class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);

        int ans = 1;

        for (int i = 1; i < arr.length; i++) {
            ans = Math.min(arr[i], ans + 1);
        }

        return ans;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        arr.sort()

        ans = 1

        for i in range(1, len(arr)):
            ans = min(arr[i], ans + 1)

        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end());

        int ans = 1;

        for (int i = 1; i < arr.size(); i++) {
            ans = min(arr[i], ans + 1);
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function(arr) {
    arr.sort((a, b) => a - b);

    let ans = 1;

    for (let i = 1; i < arr.length; i++) {
        ans = Math.min(arr[i], ans + 1);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../27-June/3020-Find-the-Maximum-Number-of-Elements-in-Subset/"><strong>⬅️ Previous Problem (27 June: #3020)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
