# LeetCode 3640: Trionic Array II

- **Publication Date:** 04 February 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/trionic-array-ii/](https://leetcode.com/problems/trionic-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ILAiBS_P3qg?si=_mjUVv9lkcdvm2pp)

---

## Problem Summary

You are given an integer array `nums` of length `n`.

A **trionic subarray** is a contiguous subarray `nums[l...r]` ($0 \le l < r < n$) for which there exist indices $l < p < q < r$ such that:
- `nums[l...p]` is **strictly increasing**,
- `nums[p...q]` is **strictly decreasing**,
- `nums[q...r]` is **strictly increasing**.

Return the **maximum sum** of any trionic subarray in `nums`.

It is guaranteed that at least one trionic subarray exists.

---

### Examples

#### Example 1:
- **Input:** `nums = [0, -2, -1, -3, 0, 2, -1]`
- **Output:** `-4`
- **Explanation:**
  Pick $l = 1, p = 2, q = 3, r = 5$:
  - `nums[l...p] = nums[1...2] = [-2, -1]` is strictly increasing ($-2 < -1$).
  - `nums[p...q] = nums[2...3] = [-1, -3]` is strictly decreasing ($-1 > -3$).
  - `nums[q...r] = nums[3...5] = [-3, 0, 2]` is strictly increasing ($-3 < 0 < 2$).
  - Sum = $(-2) + (-1) + (-3) + 0 + 2 = -4$.

#### Example 2:
- **Input:** `nums = [1, 4, 2, 7]`
- **Output:** `14`
- **Explanation:**
  Pick $l = 0, p = 1, q = 2, r = 3$:
  - `nums[l...p] = nums[0...1] = [1, 4]` is strictly increasing ($1 < 4$).
  - `nums[p...q] = nums[1...2] = [4, 2]` is strictly decreasing ($4 > 2$).
  - `nums[q...r] = nums[2...3] = [2, 7]` is strictly increasing ($2 < 7$).
  - Sum = $1 + 4 + 2 + 7 = 14$.

---

### Constraints

- $4 \le n \le 10^5$
- $-10^9 \le \text{nums}[i] \le 10^9$
- It is guaranteed that at least one trionic subarray exists.

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming, Array, Two Pointers
- **Secondary Tags:** Greedy, Prefix Sum

---

## Detailed Algorithm Walkthrough

### 1. Key Invariant & Observation

A valid trionic subarray requires indices $l < p < q < r$ dividing the subarray into three continuous segments:
1. **First Segment (`nums[l...p]`):** Strictly increasing. Since $l < p$, the element right before $p$ is $nums[p-1]$, implying $nums[p-1] < nums[p]$.
2. **Second Segment (`nums[p...q]`):** Strictly decreasing. For all $k \in [p, q-1]$, $nums[k] > nums[k+1]$.
3. **Third Segment (`nums[q...r]`):** Strictly increasing. Since $q < r$, the element right after $q$ is $nums[q+1]$, implying $nums[q] < nums[q+1]$.

Notice that any element $k$ strictly between the start and end of a decreasing sequence satisfies $nums[k-1] > nums[k] > nums[k+1]$:
- It cannot serve as peak $p$ because $nums[k-1] < nums[k]$ is violated.
- It cannot serve as valley $q$ because $nums[k] < nums[k+1]$ is violated.

Therefore, the middle segment `nums[p...q]` **must be an entire maximal strictly decreasing run**, starting at a local peak $p$ (where $nums[p-1] < nums[p]$) and terminating at a local valley $q$ (where $nums[q] < nums[q+1]$).

### 2. Prefix & Suffix Maximization via Kadane's Algorithm

For each candidate decreasing segment `nums[p...q]`:
- To maximize the left increasing run `nums[l...p-1]` ending at $p-1$: We need the maximum suffix sum of the strictly increasing sequence ending at $p-1$. By Kadane's algorithm:
  $$\text{leftInc}[i] = \text{nums}[i] + \max(0, \text{leftInc}[i - 1]) \quad \text{if } \text{nums}[i] > \text{nums}[i - 1]$$
- To maximize the right increasing run `nums[q+1...r]` starting at $q+1$: We need the maximum prefix sum of the strictly increasing sequence starting at $q+1$. By backwards Kadane's algorithm:
  $$\text{rightInc}[i] = \text{nums}[i] + \max(0, \text{rightInc}[i + 1]) \quad \text{if } \text{nums}[i] < \text{nums}[i + 1]$$

### 3. Combining the Solution

For every valid decreasing segment with peak $p > 0$ and valley $q < n - 1$:
$$\text{Total Sum} = \text{leftInc}[p - 1] + \sum_{k=p}^{q} \text{nums}[k] + \text{rightInc}[q + 1]$$
We maintain the maximum total sum across all valid pairs $(p, q)$ in linear time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$
  - Computing `leftInc` takes one linear pass: $\mathcal{O}(n)$.
  - Computing `rightInc` takes one backwards linear pass: $\mathcal{O}(n)$.
  - Identifying decreasing runs and accumulating segment sums takes $\mathcal{O}(n)$ total steps.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - Two arrays of size $n$ to store `leftInc` and `rightInc`.

---

## Source Code

### Java
```java
class Solution {
    public long maxSumTrionic(int[] nums) {
        int n = nums.length;

        long[] leftInc = new long[n];
        for (int i = 0; i < n; i++) {
            leftInc[i] = nums[i];
            if (i > 0 && nums[i] > nums[i - 1]) {
                leftInc[i] = nums[i] + Math.max(0L, leftInc[i - 1]);
            }
        }

        long[] rightInc = new long[n];
        for (int i = n - 1; i >= 0; i--) {
            rightInc[i] = nums[i];
            if (i + 1 < n && nums[i] < nums[i + 1]) {
                rightInc[i] = nums[i] + Math.max(0L, rightInc[i + 1]);
            }
        }

        long maxSum = Long.MIN_VALUE;
        int i = 0;

        while (i < n) {
            int j = i;
            while (j + 1 < n && nums[j] > nums[j + 1]) {
                j++;
            }

            if (j > i) {
                int p = i;
                int q = j;

                if (p > 0 && nums[p - 1] < nums[p] && q + 1 < n && nums[q] < nums[q + 1]) {
                    long decSum = 0;
                    for (int k = p; k <= q; k++) {
                        decSum += nums[k];
                    }

                    long total = leftInc[p - 1] + decSum + rightInc[q + 1];
                    if (total > maxSum) {
                        maxSum = total;
                    }
                }
            }

            i = Math.max(i + 1, j);
        }

        return maxSum;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def maxSumTrionic(self, nums: List[int]) -> int:
        n = len(nums)

        left_inc = [0] * n
        for i in range(n):
            left_inc[i] = nums[i]
            if i > 0 and nums[i] > nums[i - 1]:
                left_inc[i] = nums[i] + max(0, left_inc[i - 1])

        right_inc = [0] * n
        for i in range(n - 1, -1, -1):
            right_inc[i] = nums[i]
            if i + 1 < n and nums[i] < nums[i + 1]:
                right_inc[i] = nums[i] + max(0, right_inc[i + 1])

        max_sum = float('-inf')
        i = 0

        while i < n:
            j = i
            while j + 1 < n and nums[j] > nums[j + 1]:
                j += 1

            if j > i:
                p, q = i, j
                if p > 0 and nums[p - 1] < nums[p] and q + 1 < n and nums[q] < nums[q + 1]:
                    dec_sum = sum(nums[p:q + 1])
                    total = left_inc[p - 1] + dec_sum + right_inc[q + 1]
                    if total > max_sum:
                        max_sum = total

            i = max(i + 1, j)

        return max_sum
```

### C++
```cpp
#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long maxSumTrionic(vector<int>& nums) {
        int n = nums.size();

        vector<long long> leftInc(n);
        for (int i = 0; i < n; i++) {
            leftInc[i] = nums[i];
            if (i > 0 && nums[i] > nums[i - 1]) {
                leftInc[i] = nums[i] + max(0LL, leftInc[i - 1]);
            }
        }

        vector<long long> rightInc(n);
        for (int i = n - 1; i >= 0; i--) {
            rightInc[i] = nums[i];
            if (i + 1 < n && nums[i] < nums[i + 1]) {
                rightInc[i] = nums[i] + max(0LL, rightInc[i + 1]);
            }
        }

        long long maxSum = LLONG_MIN;
        int i = 0;

        while (i < n) {
            int j = i;
            while (j + 1 < n && nums[j] > nums[j + 1]) {
                j++;
            }

            if (j > i) {
                int p = i;
                int q = j;

                if (p > 0 && nums[p - 1] < nums[p] && q + 1 < n && nums[q] < nums[q + 1]) {
                    long long decSum = 0;
                    for (int k = p; k <= q; k++) {
                        decSum += nums[k];
                    }

                    long long total = leftInc[p - 1] + decSum + rightInc[q + 1];
                    if (total > maxSum) {
                        maxSum = total;
                    }
                }
            }

            i = max(i + 1, j);
        }

        return maxSum;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumTrionic = function(nums) {
    const n = nums.length;

    const leftInc = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        leftInc[i] = nums[i];
        if (i > 0 && nums[i] > nums[i - 1]) {
            leftInc[i] = nums[i] + Math.max(0, leftInc[i - 1]);
        }
    }

    const rightInc = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        rightInc[i] = nums[i];
        if (i + 1 < n && nums[i] < nums[i + 1]) {
            rightInc[i] = nums[i] + Math.max(0, rightInc[i + 1]);
        }
    }

    let maxSum = -Infinity;
    let i = 0;

    while (i < n) {
        let j = i;
        while (j + 1 < n && nums[j] > nums[j + 1]) {
            j++;
        }

        if (j > i) {
            const p = i;
            const q = j;

            if (p > 0 && nums[p - 1] < nums[p] && q + 1 < n && nums[q] < nums[q + 1]) {
                let decSum = 0;
                for (let k = p; k <= q; k++) {
                    decSum += nums[k];
                }

                const total = leftInc[p - 1] + decSum + rightInc[q + 1];
                if (total > maxSum) {
                    maxSum = total;
                }
            }
        }

        i = Math.max(i + 1, j);
    }

    return maxSum;
};
```
