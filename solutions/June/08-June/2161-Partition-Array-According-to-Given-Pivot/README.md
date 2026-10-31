# LeetCode 2161: Partition Array According to Given Pivot

- **Publication Date:** 08 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/partition-array-according-to-given-pivot/](https://leetcode.com/problems/partition-array-according-to-given-pivot/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/xpnVidFrzaY?si=-BFnmFjiuyfWHy61)

---

## Problem Summary

You are given a **0-indexed** integer array `nums` and an integer `pivot`. Rearrange `nums` such that the following conditions are satisfied:
- Every element less than `pivot` appears **before** every element greater than `pivot`.
- Every element equal to `pivot` appears **in between** the elements less than and greater than `pivot`.
- The **relative order** of the elements less than `pivot` and the elements greater than `pivot` is **maintained**.
  - More formally, consider every $p_i, p_j$ where $p_i$ is the new position of the $i^{\text{th}}$ element and $p_j$ is the new position of the $j^{\text{th}}$ element. If $i < j$ and both elements are smaller (or larger) than `pivot`, then $p_i < p_j$.

Return `nums` after the rearrangement.

---

### Examples

#### Example 1:
- **Input:** `nums = [9, 12, 5, 10, 14, 3, 10]`, `pivot = 10`
- **Output:** `[9, 5, 3, 10, 10, 12, 14]`
- **Explanation:**
  - The elements `9`, `5`, and `3` are less than the pivot so they are on the left side of the array.
  - The elements `10` and `10` are equal to the pivot and sit in the middle.
  - The elements `12` and `14` are greater than the pivot so they are on the right side of the array.
  - The relative ordering of elements in each category is strictly preserved.

#### Example 2:
- **Input:** `nums = [-3, 4, 3, 2]`, `pivot = 2`
- **Output:** `[-3, 2, 4, 3]`
- **Explanation:**
  - The element `-3` is less than `pivot` ($2$), positioned first.
  - The element `2` is equal to `pivot`, positioned in the middle.
  - The elements `4` and `3` are greater than `pivot`, placed at the end preserving their relative order `[4, 3]`.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $-10^6 \le \text{nums}[i] \le 10^6$
- `pivot` equals to some element of `nums`.

---

## Algorithmic Approach

### 1. Stable Three-Pass Linear Construction
Traditional partitioning schemes (like Lomuto or Hoare partitioning in standard QuickSort) are in-place but **unstable**, which would violate the requirement to preserve the original relative order.

To maintain strict stability with minimal complexity:
1. Allocate a result array `result` of size $n = \text{nums.length}$.
2. **Pass 1 (Elements $< \text{pivot}$):** Iterate from left to right through `nums`. Whenever $\text{num} < \text{pivot}$, place it into `result` and increment the output pointer.
3. **Pass 2 (Elements $== \text{pivot}$):** Iterate through `nums` again. Whenever $\text{num} == \text{pivot}$, place it into `result` and increment the output pointer.
4. **Pass 3 (Elements $> \text{pivot}$):** Iterate through `nums` once more. Whenever $\text{num} > \text{pivot}$, append it into `result` and increment the output pointer.

Because each pass traverses `nums` in the original index order ($0 \to n - 1$), stability is naturally guaranteed for every group.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Three sequential passes across $N$ elements require exactly $3N$ operations, running in optimal linear time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a single index pointer is used; memory for the returned array of size $N$ is required by the problem interface. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int[] pivotArray(int[] nums, int pivot) {
        int n = nums.length;
        int[] result = new int[n];

        int index = 0;

        // Elements less than pivot
        for (int num : nums) {
            if (num < pivot) {
                result[index++] = num;
            }
        }

        // Elements equal to pivot
        for (int num : nums) {
            if (num == pivot) {
                result[index++] = num;
            }
        }

        // Elements greater than pivot
        for (int num : nums) {
            if (num > pivot) {
                result[index++] = num;
            }
        }

        return result;
    }
}
```

### Python
```python
from typing import List


class Solution:
    def pivotArray(self, nums: List[int], pivot: int) -> List[int]:
        n = len(nums)
        result = [0] * n
        index = 0

        # Elements less than pivot
        for num in nums:
            if num < pivot:
                result[index] = num
                index += 1

        # Elements equal to pivot
        for num in nums:
            if num == pivot:
                result[index] = num
                index += 1

        # Elements greater than pivot
        for num in nums:
            if num > pivot:
                result[index] = num
                index += 1

        return result
```

### C++
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> pivotArray(vector<int>& nums, int pivot) {
        int n = nums.size();
        vector<int> result(n);
        int index = 0;

        // Elements less than pivot
        for (int num : nums) {
            if (num < pivot) {
                result[index++] = num;
            }
        }

        // Elements equal to pivot
        for (int num : nums) {
            if (num == pivot) {
                result[index++] = num;
            }
        }

        // Elements greater than pivot
        for (int num : nums) {
            if (num > pivot) {
                result[index++] = num;
            }
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function(nums, pivot) {
    const n = nums.length;
    const result = new Array(n);
    let index = 0;

    // Elements less than pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] < pivot) {
            result[index++] = nums[i];
        }
    }

    // Elements equal to pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] === pivot) {
            result[index++] = nums[i];
        }
    }

    // Elements greater than pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] > pivot) {
            result[index++] = nums[i];
        }
    }

    return result;
};
```
