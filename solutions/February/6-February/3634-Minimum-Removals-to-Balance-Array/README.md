# LeetCode 3634: Minimum Removals to Balance Array

- **Publication Date:** 06 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-removals-to-balance-array/](https://leetcode.com/problems/minimum-removals-to-balance-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/s01Ekh72fRo?si=fqTtMVWwkaAMCa5A)

---

## Problem Summary

You are given an integer array `nums` and an integer `k`.

An array is considered **balanced** if the value of its maximum element is at most `k` times its minimum element:
$$\max \le \min \times k$$

You may remove any number of elements from `nums` without making it empty.

Return the **minimum number of elements to remove** so that the remaining array is balanced.

> **Note:** An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.

---

### Examples

#### Example 1:
- **Input:** `nums = [2, 1, 5], k = 2`
- **Output:** `1`
- **Explanation:**
  - Remove `nums[2] = 5` to get `nums = [2, 1]`.
  - Now $\max = 2, \min = 1$, and $\max \le \min \times k$ ($2 \le 1 \times 2 = 2$).
  - Thus, the minimum number of removals is 1.

#### Example 2:
- **Input:** `nums = [1, 6, 2, 9], k = 3`
- **Output:** `2`
- **Explanation:**
  - Remove `nums[0] = 1` and `nums[3] = 9` to get `nums = [6, 2]`.
  - Now $\max = 6, \min = 2$, and $\max \le \min \times k$ ($6 \le 2 \times 3 = 6$).
  - Thus, the minimum number of removals is 2.

#### Example 3:
- **Input:** `nums = [4, 6], k = 2`
- **Output:** `0`
- **Explanation:**
  - Since `nums` is already balanced ($6 \le 4 \times 2 = 8$), no elements need to be removed.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le k \le 10^5$

---

## Topics and Tags

- **Primary Tags:** Array, Sorting, Two Pointers
- **Secondary Tags:** Sliding Window, Binary Search

---

## Detailed Algorithm Walkthrough

### 1. Problem Inversion: Maximize Kept Elements

Minimizing the number of removed elements from an array of size $n$ is mathematically equivalent to **maximizing the number of kept elements**:
$$\text{minRemovals} = n - \text{maxKept}$$

If we pick a subset of elements to keep where the minimum element is $a$ and the maximum element is $b$, the condition requires $b \le a \times k$. If we include any element $x$ with $a \le x \le b$, the condition remains valid because the minimum is still $a$ and the maximum is still $b$. 

Therefore, in a sorted array, the optimal set of kept elements will always form a contiguous subarray $nums[i \dots j]$!

### 2. Sorting & Two Pointers / Sliding Window

1. Sort `nums` in non-decreasing order: $nums[0] \le nums[1] \le \dots \le nums[n - 1]$.
2. For any fixed left boundary index `left`, the minimum kept value is $nums[left]$. The maximum allowed value for any element in the balanced subset is:
   $$\text{limit} = nums[left] \times k$$
3. Since $nums[left]$ is monotonically non-decreasing as `left` advances, `limit` is also non-decreasing.
4. Hence, the right pointer `right` only ever moves to the right. We advance `right` while $right < n$ and $nums[right] \le \text{limit}$.
5. The number of kept elements in this window is $right - left$. We update `maxKept = max(maxKept, right - left)`.

### 3. Overflow Prevention

Because $nums[i] \le 10^9$ and $k \le 10^5$, the product $nums[left] \times k$ can reach up to $10^{14}$, which exceeds the standard 32-bit signed integer maximum ($\approx 2 \times 10^9$). In Java and C++, we cast to a 64-bit integer (`long` in Java, `long long` in C++) before multiplication to prevent arithmetic overflow.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$
  - Sorting the array of size $n$ takes $\mathcal{O}(n \log n)$ time.
  - The two-pointer traversal visits each element at most twice (once by `left`, once by `right`), taking $\mathcal{O}(n)$ time.
  - Overall time complexity is dominated by sorting: $\mathcal{O}(n \log n)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(\log n)$ depending on the internal sorting algorithm implementation.

---

## Source Code

### Java
```java
import java.util.Arrays;

class Solution {
    public int minRemoval(int[] nums, int k) {
        int n = nums.length;
        Arrays.sort(nums);

        int maxKept = 1;
        int right = 0;

        for (int left = 0; left < n; left++) {
            long limit = (long) nums[left] * k;
            while (right < n && nums[right] <= limit) {
                right++;
            }
            maxKept = Math.max(maxKept, right - left);
        }

        return n - maxKept;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def minRemoval(self, nums: List[int], k: int) -> int:
        n = len(nums)
        nums.sort()

        max_kept = 1
        right = 0

        for left in range(n):
            limit = nums[left] * k
            while right < n and nums[right] <= limit:
                right += 1
            max_kept = max(max_kept, right - left)

        return n - max_kept
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minRemoval(vector<int>& nums, int k) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        int maxKept = 1;
        int right = 0;

        for (int left = 0; left < n; left++) {
            long long limit = (long long)nums[left] * k;
            while (right < n && nums[right] <= limit) {
                right++;
            }
            maxKept = max(maxKept, right - left);
        }

        return n - maxKept;
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
var minRemoval = function(nums, k) {
    const n = nums.length;
    nums.sort((a, b) => a - b);

    let maxKept = 1;
    let right = 0;

    for (let left = 0; left < n; left++) {
        const limit = nums[left] * k;
        while (right < n && nums[right] <= limit) {
            right++;
        }
        maxKept = Math.max(maxKept, right - left);
    }

    return n - maxKept;
};
```
