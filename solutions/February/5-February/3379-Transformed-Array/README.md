# LeetCode 3379: Transformed Array

- **Publication Date:** 05 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/transformed-array/](https://leetcode.com/problems/transformed-array/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an integer array `nums` that represents a circular array. Your task is to create a new array `result` of the same size, following these rules:

For each index `i` (where $0 \le i < \text{nums.length}$), perform the following **independent** actions:
- If `nums[i] > 0`: Start at index `i` and move `nums[i]` steps to the **right** in the circular array. Set `result[i]` to the value at the index where you land.
- If `nums[i] < 0`: Start at index `i` and move $|nums[i]|$ steps to the **left** in the circular array. Set `result[i]` to the value at the index where you land.
- If `nums[i] == 0`: Set `result[i]` to `nums[i]`.

Return the new array `result`.

> **Note:** Since `nums` is circular, moving past the last element wraps around to the beginning, and moving before the first element wraps back to the end.

---

### Examples

#### Example 1:
- **Input:** `nums = [3, -2, 1, 1]`
- **Output:** `[1, 1, 1, 3]`
- **Explanation:**
  - For `nums[0] = 3`: Moving 3 steps to the right from index 0 lands at index 3 (`nums[3] = 1`). So `result[0] = 1`.
  - For `nums[1] = -2`: Moving 2 steps to the left from index 1 lands at index 3 (`nums[3] = 1`). So `result[1] = 1`.
  - For `nums[2] = 1`: Moving 1 step to the right from index 2 lands at index 3 (`nums[3] = 1`). So `result[2] = 1`.
  - For `nums[3] = 1`: Moving 1 step to the right from index 3 lands at index 0 (`nums[0] = 3`). So `result[3] = 3`.

#### Example 2:
- **Input:** `nums = [-1, 4, -1]`
- **Output:** `[-1, -1, 4]`
- **Explanation:**
  - For `nums[0] = -1`: Moving 1 step to the left from index 0 lands at index 2 (`nums[2] = -1`). So `result[0] = -1`.
  - For `nums[1] = 4`: Moving 4 steps to the right from index 1 lands at index 2 (`nums[2] = -1`). So `result[1] = -1`.
  - For `nums[2] = -1`: Moving 1 step to the left from index 2 lands at index 1 (`nums[1] = 4`). So `result[2] = 4`.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $-100 \le \text{nums}[i] \le 100$

---

## Topics and Tags

- **Primary Tags:** Array, Simulation
- **Secondary Tags:** Modular Arithmetic, Math

---

## Detailed Algorithm Walkthrough

### 1. Mathematical Index Wrapping

In a circular array of length $n$, indices are labeled $0, 1, \dots, n - 1$.
- Moving $k$ steps to the right from index $i$ corresponds to transitioning to index $(i + k)$.
- Moving $k$ steps to the left from index $i$ corresponds to transitioning to index $(i - k)$. Since $k = |nums[i]|$ and $nums[i] < 0$, we have $i - |nums[i]| = i + nums[i]$.
- If $nums[i] = 0$, staying at index $i$ is equivalent to $i + 0 = i + nums[i]$.

Thus, all three conditions are unified by a single index expression:
$$\text{destination} = i + \text{nums}[i]$$

### 2. Handling Negative Remainders

In programming languages such as Java, C++, and JavaScript, the remainder operator `%` preserves the sign of the dividend (e.g., `-1 % 4 == -1`). To guarantee a valid 0-indexed circular array position in the range $[0, n - 1]$:
$$\text{targetIndex} = ((i + \text{nums}[i]) \pmod n + n) \pmod n$$

In Python, the `%` operator mathematically implements floor division modulo, which automatically evaluates negative operands directly into $[0, n - 1]$.

### 3. Direct Construction

We initialize an output array `result` of length $n$. In a single pass from $i = 0$ to $n - 1$, we compute `targetIndex` in $\mathcal{O}(1)$ time and assign `result[i] = nums[targetIndex]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `nums`. Each index is computed in constant $\mathcal{O}(1)$ mathematical operations.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary memory (aside from the required $\mathcal{O}(n)$ return array).

---

## Source Code

### Java
```java
class Solution {
    public int[] constructTransformedArray(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        for (int i = 0; i < n; i++) {
            int targetIndex = ((i + nums[i]) % n + n) % n;
            result[i] = nums[targetIndex];
        }

        return result;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def constructTransformedArray(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [0] * n

        for i in range(n):
            target_index = (i + nums[i]) % n
            result[i] = nums[target_index]

        return result
```

### C++
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> constructTransformedArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);

        for (int i = 0; i < n; i++) {
            int targetIndex = ((i + nums[i]) % n + n) % n;
            result[i] = nums[targetIndex];
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function(nums) {
    const n = nums.length;
    const result = new Array(n);

    for (let i = 0; i < n; i++) {
        const targetIndex = ((i + nums[i]) % n + n) % n;
        result[i] = nums[targetIndex];
    }

    return result;
};
```
