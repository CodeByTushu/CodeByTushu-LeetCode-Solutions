# LeetCode 3739: Count Subarrays With Majority Element II

- **Publication Date:** 26 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/count-subarrays-with-majority-element-ii/](https://leetcode.com/problems/count-subarrays-with-majority-element-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/6sFE5_T_DsE?si=9Utt09w88az4aWMM)

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

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le \text{target} \le 10^9$

---

## Algorithmic Approach

### Prefix Sum Transformation + Binary Indexed Tree (Fenwick Tree)

1. **Mathematical Reduction (+1 / -1 Transformation):**
   - In any subarray `nums[i..j]` of length $\text{len} = j - i + 1$, `target` is the strictly majority element if and only if:
     $$\text{count}(\text{target}) > \text{len} - \text{count}(\text{target}) \iff \text{count}(\text{target}) - \text{count}(\text{others}) > 0$$
   - Let us transform each element:
     $$A[k] = \begin{cases} +1, & \text{if } \text{nums}[k] = \text{target} \\ -1, & \text{if } \text{nums}[k] \neq \text{target} \end{cases}$$
   - The majority condition on `nums[i..j]` is equivalent to the subarray sum being strictly positive:
     $$\sum_{k=i}^j A[k] > 0$$

2. **Prefix Sum Inversion Count:**
   - Defining $P[k] = \sum_{r=0}^k A[r]$ (with $P[-1] = 0$), the subarray sum is:
     $$P[j] - P[i - 1] > 0 \iff P[i - 1] < P[j]$$
   - Thus, as we sweep ending index $j$, we need to count how many previous prefix sums $P[i - 1]$ satisfy $P[i - 1] < P[j]$.

3. **Coordinate Shift & Binary Indexed Tree:**
   - Over an array of length $n$, the prefix sum $P$ can range from $-n$ to $+n$.
   - By adding an offset of $n + 1$, every prefix sum shifts into the strictly positive range $[1, 2n + 1]$.
   - A **Binary Indexed Tree (Fenwick Tree)** of size $2n + 1$ tracks the frequencies of observed prefix sums.
   - We initialize the BIT with the base state $P[-1] = 0 \to \text{offset} = n + 1$ with frequency 1.
   - For each element in `nums`:
     - Update the running `prefix` ($+1$ if `x == target` else $-1$).
     - Query `bit.query(prefix - 1)` for the count of all prior prefix sums strictly less than the current prefix sum.
     - Add the query result to `ans` (using 64-bit integer to prevent overflow since $ans \le \frac{n(n+1)}{2} \approx 5 \times 10^9$).
     - Record the current prefix sum in the BIT via `bit.update(prefix, 1)`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \log N)$ | Processing each of the $N$ elements takes $\mathcal{O}(\log(2N))$ time for BIT point updates and prefix sum queries. Overall operations $\approx 10^5 \times 18 \approx 1.8 \times 10^6$, running in under $25\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | The Fenwick Tree array requires size $2N + 2$ integers, well within memory limits. |

---

## Multi-Language Implementations

### Java
```java
class BinaryIndexedTree {
    private final int n;
    private final int[] bit;

    public BinaryIndexedTree(int n) {
        this.n = n;
        bit = new int[n + 1];
    }

    public void update(int idx, int val) {
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & -idx;
        }
    }

    public int query(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
}

class Solution {
    public long countMajoritySubarrays(int[] nums, int target) {
        int n = nums.length;

        BinaryIndexedTree bit = new BinaryIndexedTree(2 * n + 1);

        int prefix = n + 1;
        bit.update(prefix, 1);

        long ans = 0;

        for (int x : nums) {
            if (x == target) {
                prefix++;
            } else {
                prefix--;
            }

            ans += bit.query(prefix - 1);
            bit.update(prefix, 1);
        }

        return ans;
    }
}
```

### Python
```python
from typing import List

class BinaryIndexedTree:
    def __init__(self, n: int):
        self.n = n
        self.bit = [0] * (n + 1)

    def update(self, idx: int, val: int) -> None:
        while idx <= self.n:
            self.bit[idx] += val
            idx += idx & (-idx)

    def query(self, idx: int) -> int:
        total = 0
        while idx > 0:
            total += self.bit[idx]
            idx -= idx & (-idx)
        return total

class Solution:
    def countMajoritySubarrays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        bit = BinaryIndexedTree(2 * n + 1)

        prefix = n + 1
        bit.update(prefix, 1)

        ans = 0

        for x in nums:
            if x == target:
                prefix += 1
            else:
                prefix -= 1

            ans += bit.query(prefix - 1)
            bit.update(prefix, 1)

        return ans
```

### C++
```cpp
#include <vector>

using namespace std;

class BinaryIndexedTree {
private:
    int n;
    vector<int> bit;

public:
    BinaryIndexedTree(int n) : n(n), bit(n + 1, 0) {}

    void update(int idx, int val) {
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & -idx;
        }
    }

    int query(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
};

class Solution {
public:
    long long countMajoritySubarrays(vector<int>& nums, int target) {
        int n = nums.size();

        BinaryIndexedTree bit(2 * n + 1);

        int prefix = n + 1;
        bit.update(prefix, 1);

        long long ans = 0;

        for (int x : nums) {
            if (x == target) {
                prefix++;
            } else {
                prefix--;
            }

            ans += bit.query(prefix - 1);
            bit.update(prefix, 1);
        }

        return ans;
    }
};
```

### JavaScript
```javascript
class BinaryIndexedTree {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.n = n;
        this.bit = new Int32Array(n + 1);
    }

    /**
     * @param {number} idx
     * @param {number} val
     */
    update(idx, val) {
        while (idx <= this.n) {
            this.bit[idx] += val;
            idx += idx & -idx;
        }
    }

    /**
     * @param {number} idx
     * @return {number}
     */
    query(idx) {
        let sum = 0;
        while (idx > 0) {
            sum += this.bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;
    const bit = new BinaryIndexedTree(2 * n + 1);

    let prefix = n + 1;
    bit.update(prefix, 1);

    let ans = 0;

    for (let i = 0; i < n; i++) {
        if (nums[i] === target) {
            prefix++;
        } else {
            prefix--;
        }

        ans += bit.query(prefix - 1);
        bit.update(prefix, 1);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../25-June/3737-Count-Subarrays-With-Majority-Element-I/"><strong>⬅️ Previous Problem (25 June: #3737)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
