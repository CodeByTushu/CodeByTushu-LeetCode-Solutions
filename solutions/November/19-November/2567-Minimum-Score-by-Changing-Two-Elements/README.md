# LeetCode 2567: Minimum Score by Changing Two Elements

- **Publication Date:** 19 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-score-by-changing-two-elements/](https://leetcode.com/problems/minimum-score-by-changing-two-elements/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/pGxCYi03odI)

---

## 💡 Problem Summary

You are given an integer array `nums`.

- The **low score** of `nums` is the minimum absolute difference between any two integers: $\min_{i \ne j} |\text{nums}[i] - \text{nums}[j]|$.
- The **high score** of `nums` is the maximum absolute difference between any two integers: $\max_{i \ne j} |\text{nums}[i] - \text{nums}[j]|$.
- The **score** of `nums` is the sum of the **high** and **low** scores: $\text{score} = \text{high score} + \text{low score}$.

Return the **minimum score** after changing at most **two** elements of `nums`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [1,4,7,8,5]`
- **Output:** `3`
- **Explanation:**
  - Change `nums[0]` and `nums[1]` to `6` so that `nums` becomes `[6,6,7,8,5]`.
  - The low score is $|6 - 6| = 0$.
  - The high score is $|8 - 5| = 3$.
  - Total score $= 3 + 0 = 3$.

#### Example 2:
- **Input:** `nums = [1,4,3]`
- **Output:** `0`
- **Explanation:**
  - Change `nums[1]` and `nums[2]` to `1` so that `nums` becomes `[1,1,1]`.
  - The low score is $0$ and the high score is $0$.
  - Total score $= 0 + 0 = 0$.

---

### 🔒 Constraints

- $3 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Crucial Observation: Low Score is Always 0
- The length of the array is at least $3$ ($n \ge 3$).
- Since we are permitted to change any two elements to arbitrary values, we can always choose to set one of the modified elements equal to any existing element in the array.
- This creates at least one pair of identical elements $(x, x)$, making $|x - x| = 0$.
- Because absolute differences are non-negative, the minimum possible low score is $0$, and we can **always** achieve $\text{low score} = 0$.
- Therefore:
  $$\text{score} = \text{high score} + \text{low score} = \text{high score} + 0 = \max(\text{nums}) - \min(\text{nums})$$
  Our goal simplifies entirely to **minimizing the range $(\max - \min)$ after modifying 2 elements**.

### 2. Extreme Value Analysis via Sorting
Sort the array `nums` in ascending order:
$$\text{nums}[0] \le \text{nums}[1] \le \text{nums}[2] \le \dots \le \text{nums}[n - 3] \le \text{nums}[n - 2] \le \text{nums}[n - 1]$$

To minimize the span between the maximum and minimum elements after changing 2 values, an optimal strategy is to "clamp" or eliminate the most extreme values by setting them within the remaining interior range. Modifying 2 elements gives exactly 3 greedy choices:

1. **Option 1: Modify the 2 smallest elements**
   - Change $\text{nums}[0]$ and $\text{nums}[1]$ to match $\text{nums}[2]$.
   - The new minimum is $\text{nums}[2]$, and the maximum remains $\text{nums}[n - 1]$.
   - Resulting span: $\text{nums}[n - 1] - \text{nums}[2]$.

2. **Option 2: Modify 1 smallest and 1 largest element**
   - Change $\text{nums}[0]$ to match $\text{nums}[1]$, and $\text{nums}[n - 1]$ to match $\text{nums}[n - 2]$.
   - The new minimum is $\text{nums}[1]$, and the new maximum is $\text{nums}[n - 2]$.
   - Resulting span: $\text{nums}[n - 2] - \text{nums}[1]$.

3. **Option 3: Modify the 2 largest elements**
   - Change $\text{nums}[n - 1]$ and $\text{nums}[n - 2]$ to match $\text{nums}[n - 3]$.
   - The minimum remains $\text{nums}[0]$, and the new maximum is $\text{nums}[n - 3]$.
   - Resulting span: $\text{nums}[n - 3] - \text{nums}[0]$.

The minimum score is simply the minimum of these three choices:
$$\text{ans} = \min(\text{nums}[n - 1] - \text{nums}[2],\ \text{nums}[n - 2] - \text{nums}[1],\ \text{nums}[n - 3] - \text{nums}[0])$$

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \log n)$ | Sorting the array takes $\mathcal{O}(n \log n)$ time. Finding the minimum of 3 boundary differences takes $\mathcal{O}(1)$ constant time. |
| **Auxiliary Space** | $\mathcal{O}(1) \text{ to } \mathcal{O}(\log n)$ | Only a few primitive variables are used ($\mathcal{O}(1)$ space), with $\mathcal{O}(\log n)$ recursion depth for Quicksort in Java/C++. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int minimizeSum(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;

        // Low score can always be made 0 by duplicating an element.
        // Therefore, we only need to minimize the high score (max - min) after changing 2 elements.
        int opt1 = nums[n - 1] - nums[2];     // Change 2 smallest elements
        int opt2 = nums[n - 2] - nums[1];     // Change 1 smallest + 1 largest element
        int opt3 = nums[n - 3] - nums[0];     // Change 2 largest elements

        return Math.min(opt1, Math.min(opt2, opt3));
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimizeSum(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)

        # Low score can always be 0 by making two elements identical.
        # Thus, we only need to minimize the high score (max - min) after modifying 2 elements.
        opt1 = nums[n - 1] - nums[2]     # Modify 2 smallest elements
        opt2 = nums[n - 2] - nums[1]     # Modify 1 smallest + 1 largest element
        opt3 = nums[n - 3] - nums[0]     # Modify 2 largest elements

        return min(opt1, opt2, opt3)
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimizeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();

        // Low score can always be made 0 by duplicating an element.
        // Therefore, we only need to minimize the high score (max - min).
        int opt1 = nums[n - 1] - nums[2];     // Modify 2 smallest elements
        int opt2 = nums[n - 2] - nums[1];     // Modify 1 smallest + 1 largest element
        int opt3 = nums[n - 3] - nums[0];     // Modify 2 largest elements

        return min({opt1, opt2, opt3});
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;

    // Low score can always be 0 by making two elements equal.
    // We only need to minimize the high score (max - min) after modifying 2 elements.
    const opt1 = nums[n - 1] - nums[2];     // Modify 2 smallest elements
    const opt2 = nums[n - 2] - nums[1];     // Modify 1 smallest + 1 largest element
    const opt3 = nums[n - 3] - nums[0];     // Modify 2 largest elements

    return Math.min(opt1, opt2, opt3);
};
```

---

## 🔗 Quick Navigation

- ⬅️ [Back to November 2026 Archive](../../README.md)
- 🏠 [Main Repository](../../../../README.md)
- 🌐 [Official Live Platform — CodeByTushu](https://codebytushu.com/Leetcode/)
