# LeetCode 3737: Count Subarrays With Majority Element I

- **Publication Date:** 25 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-subarrays-with-majority-element-i/](https://leetcode.com/problems/count-subarrays-with-majority-element-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/mrevhEsRkzg?si=nlv7mtIClT8TKMpT)

---

## Problem Summary

You are given an integer array `nums` and an integer `target`.

Return the number of **subarrays** of `nums` in which `target` is the **majority element**.

The **majority element** of a subarray is the element that appears strictly more than half of the times in that subarray.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 2, 3], target = 2`
- **Output:** `5`
- **Explanation:** Valid subarrays with `target = 2` as the majority element:
  - `nums[1..1] = [2]`
  - `nums[2..2] = [2]`
  - `nums[1..2] = [2, 2]`
  - `nums[0..2] = [1, 2, 2]`
  - `nums[1..3] = [2, 2, 3]`
  So there are 5 such subarrays.

#### Example 2:
- **Input:** `nums = [1, 1, 1, 1], target = 1`
- **Output:** `10`
- **Explanation:** All 10 subarrays have `1` as the majority element.

---

### Constraints

- $1 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le \text{target} \le 10^9$

---

## Algorithmic Approach

### Subarray Frequency Enumeration ($\mathcal{O}(N^2)$)

1. **Majority Condition:**
   - For any subarray `nums[i..j]` of length $\text{len} = j - i + 1$, an element `target` is strictly the majority element if its frequency $\text{cnt}$ satisfies:
     $$\text{cnt} > \frac{\text{len}}{2} \iff 2 \cdot \text{cnt} > \text{len}$$
   - Using integer multiplication ($2 \cdot \text{cnt} > \text{len}$) avoids floating-point operations and precision issues entirely.

2. **Nested Subarray Traversal:**
   - The outer loop fixes the starting boundary $i$ from $0$ up to $n - 1$.
   - A running counter $\text{cnt}$ is initialized to $0$ at the start of each outer loop.
   - The inner loop expands the ending boundary $j$ from $i$ up to $n - 1$:
     - If `nums[j] == target`, increment $\text{cnt}$.
     - Compute the current subarray length $\text{len} = j - i + 1$.
     - If $2 \cdot \text{cnt} > \text{len}$, the current subarray meets the majority requirement, so increment `ans`.

3. **Optimality for Constraints:**
   - Since $N \le 1000$, the total number of subarray evaluations is:
     $$\frac{N(N + 1)}{2} \le \frac{1000 \times 1001}{2} = 500,500$$
   - Half a million basic arithmetic operations execute in under $2\text{ ms}$, comfortably within time limits without requiring complex tree structures.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N^2)$ | Two nested loops iterate over all possible subarrays of `nums`. Each step performs $\mathcal{O}(1)$ operations. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive scalar variables (`ans`, `cnt`, `len`, `i`, `j`) are used. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int countMajoritySubarrays(int[] nums, int target) {
        int n = nums.length;
        int ans = 0;

        for (int i = 0; i < n; i++) {
            int cnt = 0;

            for (int j = i; j < n; j++) {
                if (nums[j] == target) {
                    cnt++;
                }

                int len = j - i + 1;

                if (cnt * 2 > len) {
                    ans++;
                }
            }
        }

        return ans;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def countMajoritySubarrays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        ans = 0

        for i in range(n):
            cnt = 0
            for j in range(i, n):
                if nums[j] == target:
                    cnt += 1

                length = j - i + 1
                if cnt * 2 > length:
                    ans += 1

        return ans
```

### C++
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    int countMajoritySubarrays(vector<int>& nums, int target) {
        int n = nums.size();
        int ans = 0;

        for (int i = 0; i < n; i++) {
            int cnt = 0;

            for (int j = i; j < n; j++) {
                if (nums[j] == target) {
                    cnt++;
                }

                int len = j - i + 1;

                if (cnt * 2 > len) {
                    ans++;
                }
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        let cnt = 0;

        for (let j = i; j < n; j++) {
            if (nums[j] === target) {
                cnt++;
            }

            const len = j - i + 1;

            if (cnt * 2 > len) {
                ans++;
            }
        }
    }

    return ans;
};
```

---

<p align="center">
  <a href="../24-June/3700-Number-of-ZigZag-Arrays-II/"><strong>⬅️ Previous Problem (24 June: #3700)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
