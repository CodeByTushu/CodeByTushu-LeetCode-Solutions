# LeetCode 3689: Maximum Total Subarray Value I

- **Publication Date:** 09 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-total-subarray-value-i/](https://leetcode.com/problems/maximum-total-subarray-value-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/i55hAAnD0Is?si=aS1uEZSA1wGjtwGX)

---

## Problem Summary

You are given an integer array `nums` of length `n` and an integer `k`.

You need to choose **exactly** `k` non-empty subarrays `nums[l..r]` of `nums`. Subarrays may overlap, and the exact same subarray (same `l` and `r`) can be chosen more than once.

The **value** of a subarray `nums[l..r]` is defined as:
$$\text{value}(nums[l..r]) = \max(\text{nums}[l..r]) - \min(\text{nums}[l..r])$$

The **total value** is the sum of the values of all chosen subarrays.

Return the **maximum possible total value** you can achieve.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 3, 2]`, `k = 2`
- **Output:** `4`
- **Explanation:**
  - One optimal approach is:
    - Choose `nums[0..1] = [1, 3]`: $\max = 3, \min = 1 \implies 3 - 1 = 2$.
    - Choose `nums[0..2] = [1, 3, 2]`: $\max = 3, \min = 1 \implies 3 - 1 = 2$.
    - Alternatively, choose `nums[0..2]` both times: $2 + 2 = 4$.
  - Total value achieved = $2 + 2 = 4$.

#### Example 2:
- **Input:** `nums = [4, 2, 5, 1]`, `k = 3`
- **Output:** `12`
- **Explanation:**
  - The global maximum is $5$ and global minimum is $1$.
  - Choosing the full array `[4, 2, 5, 1]` gives value $5 - 1 = 4$.
  - Choosing this same subarray all $k = 3$ times gives a total value of $4 \times 3 = 12$.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le k \le 10^5$

---

## Algorithmic Approach

### 1. Mathematical Upper Bound & Greedy Repetition
The problem contains a crucial specification:
> *"Subarrays may overlap, and the exact same subarray (same $l$ and $r$) can be chosen more than once."*

1. **Upper Bound on a Single Subarray:**
   For any subarray $nums[l..r]$:
   $$\max(nums[l..r]) \le \max(nums) \quad \text{and} \quad \min(nums[l..r]) \ge \min(nums)$$
   Therefore, the value of any chosen subarray is strictly bounded by:
   $$\text{value}(nums[l..r]) = \max(nums[l..r]) - \min(nums[l..r]) \le \max(nums) - \min(nums)$$

2. **Achievability:**
   Any subarray containing both the global minimum and global maximum element (for instance, the entire array $nums[0..n-1]$) achieves this theoretical maximum of:
   $$\Delta_{\max} = \max(nums) - \min(nums)$$

3. **Optimal Selection:**
   Since we can select the exact same subarray all $k$ times without restriction, the optimal strategy simply selects this maximally valued subarray $k$ times:
   $$\text{Answer} = 1\text{L} \times (\max(nums) - \min(nums)) \times k$$

4. **Implementation:**
   Scan `nums` once to identify `min` and `max`, then multiply their difference by `k` using 64-bit integer arithmetic to prevent overflow.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Single linear pass across `nums` to compute the global minimum and maximum. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few scalar variables (`min`, `max`) are allocated. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public long maxTotalValue(int[] nums, int k) {
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;

        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        return 1L * (max - min) * k;
    }
}
```

### Python
```python
from typing import List


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return (max_val - min_val) * k
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int minVal = nums[0];
        int maxVal = nums[0];

        for (int num : nums) {
            minVal = min(minVal, num);
            maxVal = max(maxVal, num);
        }

        return 1LL * (maxVal - minVal) * k;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {
    let min = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min) min = nums[i];
        if (nums[i] > max) max = nums[i];
    }

    return (max - min) * k;
};
```
