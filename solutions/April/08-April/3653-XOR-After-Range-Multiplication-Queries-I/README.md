# LeetCode 3653: XOR After Range Multiplication Queries I

- **Publication Date:** 08 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/xor-after-range-multiplication-queries-i/](https://leetcode.com/problems/xor-after-range-multiplication-queries-i/)
- **YouTube Solution:** [Watch Video](https://youtu.be/tvbkbHCh5dY?si=JuTN3NHl7YrlsUb9)

---

## Problem Summary

You are given an integer array `nums` of length `n` and a 2D integer array `queries` of size `q`, where `queries[i] = [l_i, r_i, k_i, v_i]`.

For each query, you must apply the following operations in order:
1. Set `idx = l_i`.
2. While `idx <= r_i`:
   - Update: `nums[idx] = (nums[idx] * v_i) % (10^9 + 7)`
   - Set `idx += k_i`.

Return the **bitwise XOR** of all elements in `nums` after processing all queries.

---

### Examples

#### Example 1:
```text
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
- A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
- The array changes from [1, 1, 1] to [4, 4, 4].
- The XOR of all elements is 4 ^ 4 ^ 4 = 4.
```

#### Example 2:
```text
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
- The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
- The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
- Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.
```

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^3$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le q == \text{queries.length} \le 10^3$
- $\text{queries}[i] = [l_i, r_i, k_i, v_i]$
- $0 \le l_i \le r_i < n$
- $1 \le k_i \le n$
- $1 \le v_i \le 10^5$

---

## Detailed Intuition & Approach

### 1. Key Observations
1. **Constraints Analysis:**
   - The array size $n \le 10^3$.
   - The number of queries $q \le 10^3$.
   - In the worst case where $k_i = 1$, each query updates at most $n$ elements.
   - The total number of updates across all queries is at most $q \times n = 10^3 \times 10^3 = 10^6$ operations.
   - A total of $10^6$ operations executes well within 5–10 milliseconds in modern runtime environments.

2. **Simulation Strategy:**
   - Iterate over each query `[l, r, k, v]`.
   - Traverse indices `idx` from $l$ to $r$ stepping by $k$.
   - Perform the in-place modular multiplication:
     $$\text{nums}[idx] = (\text{nums}[idx] \times v) \pmod{10^9 + 7}$$
   - Use 64-bit integer types (`long` in Java/C++, `BigInt` or standard double precision in JS, arbitrary precision integers in Python) to avoid integer overflow during multiplication before the modulo operation.

3. **Bitwise XOR Aggregation:**
   - Once all $q$ queries have mutated `nums`, iterate over the entire array and compute:
     $$\text{result} = \bigoplus_{i=0}^{n-1} \text{nums}[i]$$
   - Return the resulting XOR sum.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n + q \cdot \frac{n}{k})$. In the worst case ($k = 1$), this is $\mathcal{O}(q \cdot n) \le 10^6$ basic operations, easily running within standard time limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ beyond the input array, as updates are applied strictly in-place.

---

## Multi-Language Solutions

### Java ☕
```java
/**
 * Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int xorAfterQueries(int[] nums, int[][] queries) {
        long MOD = 1_000_000_007L;

        for (int[] query : queries) {
            int l = query[0];
            int r = query[1];
            int k = query[2];
            int v = query[3];

            for (int idx = l; idx <= r; idx += k) {
                nums[idx] = (int) (((long) nums[idx] * v) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
}
```

### Python 🐍
```python
"""
Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def xorAfterQueries(self, nums: list[int], queries: list[list[int]]) -> int:
        MOD = 1_000_000_007

        for l, r, k, v in queries:
            for idx in range(l, r + 1, k):
                nums[idx] = (nums[idx] * v) % MOD

        xor_sum = 0
        for val in nums:
            xor_sum ^= val

        return xor_sum
```

### C++ ⚡
```cpp
/**
 * Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int xorAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        long long MOD = 1000000007LL;

        for (const auto& query : queries) {
            int l = query[0];
            int r = query[1];
            int k = query[2];
            int v = query[3];

            for (int idx = l; idx <= r; idx += k) {
                nums[idx] = (int) ((1LL * nums[idx] * v) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007;

    for (let i = 0; i < queries.length; i++) {
        const [l, r, k, v] = queries[i];
        for (let idx = l; idx <= r; idx += k) {
            nums[idx] = (nums[idx] * v) % MOD;
        }
    }

    let xorSum = 0;
    for (let i = 0; i < nums.length; i++) {
        xorSum ^= nums[i];
    }

    return xorSum;
};
```
