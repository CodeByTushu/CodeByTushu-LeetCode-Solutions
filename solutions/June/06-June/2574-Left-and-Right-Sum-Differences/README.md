# LeetCode 2574: Left and Right Sum Differences

- **Publication Date:** 06 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/left-and-right-sum-differences/](https://leetcode.com/problems/left-and-right-sum-differences/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/c1cZbTBoEWQ?si=8H9Ps8MCA_GGQ6dO)

---

## Problem Summary

You are given a **0-indexed** integer array `nums` of size `n`.

Define two arrays `leftSum` and `rightSum` where:
- `leftSum[i]` is the sum of elements to the left of the index `i` in the array `nums`. If there is no such element, `leftSum[i] = 0`.
- `rightSum[i]` is the sum of elements to the right of the index `i` in the array `nums`. If there is no such element, `rightSum[i] = 0`.

Return an integer array `answer` of size `n` where `answer[i] = |leftSum[i] - rightSum[i]|`.

---

### Examples

#### Example 1:
- **Input:** `nums = [10, 4, 8, 3]`
- **Output:** `[15, 1, 11, 22]`
- **Explanation:**
  - The array `leftSum` is `[0, 10, 14, 22]`.
  - The array `rightSum` is `[15, 11, 3, 0]`.
  - The array `answer` is:
    $$\big[|0 - 15|, |10 - 11|, |14 - 3|, |22 - 0|\big] = [15, 1, 11, 22]$$

#### Example 2:
- **Input:** `nums = [1]`
- **Output:** `[0]`
- **Explanation:**
  - The array `leftSum` is `[0]`.
  - The array `rightSum` is `[0]`.
  - The array `answer` is $[|0 - 0|] = [0]$.

---

### Constraints

- $1 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le 10^5$

---

## Algorithmic Approach

### 1. Optimal Prefix & Suffix Balance ($\mathcal{O}(1)$ Auxiliary Space)
A naive approach would compute the sum of elements to the left and the sum of elements to the right for every index independently, requiring $\mathcal{O}(N)$ work per index and leading to an overall time complexity of $\mathcal{O}(N^2)$.

Instead, we can optimize this to a linear single pass after computing the total sum:
1. **Total Sum Calculation:**
   Compute the total sum of all elements:
   $$\text{totalSum} = \sum_{j=0}^{n-1} \text{nums}[j]$$
2. **Dynamic Prefix/Suffix Maintenance:**
   - Initialize `leftSum = 0` and `rightSum = totalSum`.
   - Iterate index $i$ from $0$ to $n - 1$:
     - Subtract `nums[i]` from `rightSum` because `nums[i]` is the current element and cannot belong to the right-hand sum of index $i$.
     - Calculate the absolute difference: $\text{answer}[i] = |\text{leftSum} - \text{rightSum}|$.
     - Add `nums[i]` to `leftSum` so it becomes part of the left-hand sum for all subsequent indices.
3. This eliminates the need for separate prefix and suffix arrays, achieving optimal $\mathcal{O}(N)$ runtime with $\mathcal{O}(1)$ auxiliary space.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | One initial pass to compute `totalSum` followed by a single pass to construct `answer`. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few scalar integer variables (`totalSum`, `leftSum`, `rightSum`) are used; output array is excluded. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int[] leftRightDifference(int[] nums) {

        int n = nums.length;
        int[] answer = new int[n];

        int totalSum = 0;

        for (int num : nums) {
            totalSum += num;
        }

        int leftSum = 0;
        int rightSum = totalSum;

        for (int i = 0; i < n; i++) {

            rightSum -= nums[i];

            answer[i] = Math.abs(leftSum - rightSum);

            leftSum += nums[i];
        }

        return answer;
    }
}
```

### Python
```python
from typing import List


class Solution:
    def leftRightDifference(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [0] * n

        total_sum = sum(nums)
        left_sum = 0
        right_sum = total_sum

        for i in range(n):
            right_sum -= nums[i]
            answer[i] = abs(left_sum - right_sum)
            left_sum += nums[i]

        return answer
```

### C++
```cpp
#include <vector>
#include <cmath>
#include <numeric>

using namespace std;

class Solution {
public:
    vector<int> leftRightDifference(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n);

        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }

        int leftSum = 0;
        int rightSum = totalSum;

        for (int i = 0; i < n; i++) {
            rightSum -= nums[i];
            answer[i] = abs(leftSum - rightSum);
            leftSum += nums[i];
        }

        return answer;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function(nums) {
    const n = nums.length;
    const answer = new Array(n);

    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += nums[i];
    }

    let leftSum = 0;
    let rightSum = totalSum;

    for (let i = 0; i < n; i++) {
        rightSum -= nums[i];
        answer[i] = Math.abs(leftSum - rightSum);
        leftSum += nums[i];
    }

    return answer;
};
```
