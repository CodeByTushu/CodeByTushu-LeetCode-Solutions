# LeetCode 3105: Longest Strictly Increasing or Strictly Decreasing Subarray

- **Publication Date:** 12 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/](https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/nwFpQzEAHvs?si=kJCIXIv5XDvzbuHE)

---

## 💡 Problem Summary

You are given an array of integers `nums`. Return the length of the **longest subarray** of `nums` which is either **strictly increasing** or **strictly decreasing**.

A subarray is strictly increasing if every pair of adjacent elements satisfies $\text{nums}[i - 1] < \text{nums}[i]$, and strictly decreasing if every pair satisfies $\text{nums}[i - 1] > \text{nums}[i]$. A single-element subarray always has length `1` and satisfies both properties.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [1,4,3,3,2]`
- **Output:** `2`
- **Explanation:**
  - The strictly increasing subarrays of `nums` are `[1]`, `[2]`, `[3]`, `[3]`, `[4]`, and `[1,4]`.
  - The strictly decreasing subarrays of `nums` are `[1]`, `[2]`, `[3]`, `[3]`, `[4]`, `[3,2]`, and `[4,3]`.
  - Hence, we return `2`.

#### Example 2:
- **Input:** `nums = [3,3,3,3]`
- **Output:** `1`
- **Explanation:**
  - Because adjacent elements are equal, neither strictly increasing nor strictly decreasing streaks can extend past length `1`.
  - The longest strictly increasing or decreasing subarrays are single-element subarrays `[3]`, so we return `1`.

#### Example 3:
- **Input:** `nums = [3,2,1]`
- **Output:** `3`
- **Explanation:**
  - The entire array `[3,2,1]` is strictly decreasing ($3 > 2 > 1$), giving a maximum length of `3`.

---

### 🔒 Constraints

- $1 \le \text{nums.length} \le 50$
- $1 \le \text{nums}[i] \le 50$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Dual Streak Tracking in a Single Pass
Instead of scanning all $\mathcal{O}(n^2)$ subarrays or running two separate passes for increasing and decreasing sequences, we track both active streaks ending at the current index $i$ simultaneously:
- `inc`: length of the longest **strictly increasing** subarray ending at `nums[i]`.
- `dec`: length of the longest **strictly decreasing** subarray ending at `nums[i]`.
- `ans`: global maximum subarray length discovered across all positions.

All three variables initialize to `1` because `nums.length >= 1` and a single element forms a valid monotonic subarray of length `1`.

### 2. Adjacent Element Transition Rules
For each index `i` from `1` to `nums.length - 1`, compare `nums[i]` with `nums[i - 1]`:
1. **`nums[i] > nums[i - 1]` (Strictly Increasing):**
   - Extend the increasing streak: `inc++`
   - Break any decreasing streak: `dec = 1` (the single element `nums[i]` starts a fresh decreasing candidate)
2. **`nums[i] < nums[i - 1]` (Strictly Decreasing):**
   - Extend the decreasing streak: `dec++`
   - Break any increasing streak: `inc = 1`
3. **`nums[i] == nums[i - 1]` (Equal / Plateau):**
   - Strictly monotonic chains cannot contain equal adjacent values, so reset both: `inc = 1` and `dec = 1`.

After updating `inc` and `dec`, update `ans = max(ans, inc, dec)`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Single linear pass from index `1` to `n - 1`, performing constant-time comparisons, counter resets/increments, and maximum updates per element. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only scalar integer variables (`inc`, `dec`, `ans`, and loop index `i`) are used, requiring constant auxiliary memory regardless of input size. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int inc = 1, dec = 1, ans = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) {
                inc++;
                dec = 1;
            } else if (nums[i] < nums[i - 1]) {
                dec++;
                inc = 1;
            } else {
                inc = 1;
                dec = 1;
            }

            ans = Math.max(ans, Math.max(inc, dec));
        }

        return ans;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List


class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        inc = 1
        dec = 1
        ans = 1

        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                inc += 1
                dec = 1
            elif nums[i] < nums[i - 1]:
                dec += 1
                inc = 1
            else:
                inc = 1
                dec = 1

            ans = max(ans, inc, dec)

        return ans
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int longestMonotonicSubarray(std::vector<int>& nums) {
        int inc = 1, dec = 1, ans = 1;

        for (int i = 1; i < static_cast<int>(nums.size()); ++i) {
            if (nums[i] > nums[i - 1]) {
                ++inc;
                dec = 1;
            } else if (nums[i] < nums[i - 1]) {
                ++dec;
                inc = 1;
            } else {
                inc = 1;
                dec = 1;
            }

            ans = std::max({ans, inc, dec});
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function(nums) {
    let inc = 1, dec = 1, ans = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            inc++;
            dec = 1;
        } else if (nums[i] < nums[i - 1]) {
            dec++;
            inc = 1;
        } else {
            inc = 1;
            dec = 1;
        }

        ans = Math.max(ans, inc, dec);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
