# LeetCode 3525: Find X Value of Array II

- **Publication Date:** 22 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-x-value-of-array-ii/](https://leetcode.com/problems/find-x-value-of-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0bCLt32jDVA?si=yPUjMNsXENJAY0uU)

---

## Problem Summary

You are given an array of positive integers `nums` and a positive integer `k`. You are also given a 2D array `queries`, where `queries[i] = [index_i, value_i, start_i, x_i]`.

You are allowed to perform an operation **once** on `nums`, where you can remove any suffix from `nums` such that `nums` remains **non-empty**.

The **x-value** of `nums` for a given `x` is defined as the number of ways to perform this operation so that the **product** of the remaining elements leaves a remainder of `x` modulo `k`.

For each query in `queries`, you need to determine the **x-value** of `nums` for $x_i$ after performing the following actions:
1. Update `nums[index_i]` to `value_i`. **Only this step persists for the rest of the queries.**
2. Remove the prefix `nums[0..(start_i - 1)]` (where `nums[0..(-1)]` represents an empty prefix).

Return an array `result` of size `queries.length` where `result[i]` is the answer for the $i$-th query.

A **prefix** of an array is a subarray that starts from the beginning of the array and extends to any point within it.  
A **suffix** of an array is a subarray that starts at any point within the array and extends to the end of the array.  
Note that the prefix and suffix to be chosen for the operation can be **empty**.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,2,3,4,5], k = 3, queries = [[2,2,0,2],[3,3,3,0],[0,1,0,1]]`
- **Output:** `[2,2,2]`
- **Explanation:**
  - **Query 0:** `nums` becomes `[1, 2, 2, 4, 5]`, and the empty prefix is removed. The possible operations leaving remainder $2 \pmod 3$ are:
    - Remove the suffix `[2, 4, 5]`. `nums` becomes `[1, 2]`.
    - Remove the empty suffix. `nums` becomes `[1, 2, 2, 4, 5]` (product $80 \equiv 2 \pmod 3$).
  - **Query 1:** `nums` becomes `[1, 2, 2, 3, 5]`, and the prefix `[1, 2, 2]` is removed (starting at index $3$). The possible operations leaving remainder $0 \pmod 3$ are:
    - Remove the empty suffix. `nums` becomes `[3, 5]` (product $15 \equiv 0 \pmod 3$).
    - Remove the suffix `[5]`. `nums` becomes `[3]` (product $3 \equiv 0 \pmod 3$).
  - **Query 2:** `nums` becomes `[1, 2, 2, 3, 5]`, and the empty prefix is removed. The operations leaving remainder $1 \pmod 3$ are:
    - Remove the suffix `[2, 2, 3, 5]`. `nums` becomes `[1]`.
    - Remove the suffix `[3, 5]`. `nums` becomes `[1, 2, 2]`.

#### Example 2:
- **Input:** `nums = [1,2,4,8,16,32], k = 4, queries = [[0,2,0,2],[0,2,0,1]]`
- **Output:** `[1,0]`
- **Explanation:**
  - **Query 0:** `nums` becomes `[2, 2, 4, 8, 16, 32]`. The only operation resulting in remainder $2 \pmod 4$ is removing suffix `[2, 4, 8, 16, 32]`, leaving `[2]`.
  - **Query 1:** `nums` remains `[2, 2, 4, 8, 16, 32]`. There is no possible way to leave a remainder of $1 \pmod 4$.

#### Example 3:
- **Input:** `nums = [1,1,2,1,1], k = 2, queries = [[2,1,0,1]]`
- **Output:** `[5]`

---

### Constraints

- $1 \le \text{nums}[i] \le 10^9$
- $1 \le \text{nums.length} \le 10^5$
- $1 \le k \le 5$
- $1 \le \text{queries.length} \le 2 \times 10^4$
- $\text{queries}[i] == [\text{index}_i, \text{value}_i, \text{start}_i, x_i]$
- $0 \le \text{index}_i \le \text{nums.length} - 1$
- $1 \le \text{value}_i \le 10^9$
- $0 \le \text{start}_i \le \text{nums.length} - 1$
- $0 \le x_i \le k - 1$

---

## Topics and Tags

- **Array**
- **Segment Tree**
- **Dynamic Programming**
- **Math**

---

## Approach & Intuition

### 1. Problem Reformulation
Each query asks:
1. Update element at `index` to `value`.
2. Consider the suffix array starting from `start` to $N - 1$: `nums[start .. N - 1]`.
3. How many non-empty prefixes of this suffix subarray (i.e., subarrays of the form `nums[start .. r]` where $\text{start} \le r < N$) have an element product whose remainder modulo $k$ equals $x$?

Since point updates are persistent across queries and we need range suffix query counts dynamically, this is an ideal candidate for a **Segment Tree**.

### 2. Segment Tree Node Representation
For any contiguous segment $[L, R]$, each node stores:
1. `prod`: The total product of all elements in $[L, R]$ modulo $k$:
   $$\text{prod} = \left(\prod_{j=L}^{R} nums[j]\right) \bmod k$$
2. `remain[r]`: The number of non-empty prefixes of segment $[L, R]$ (starting at $L$ and ending at some $j \in [L, R]$) whose product modulo $k$ is $r$ (for $0 \le r < k$).

### 3. Merging Two Nodes (`left` and `right`)
When merging a `left` child covering $[L, M]$ and a `right` child covering $[M + 1, R]$:
- Total product:
  $$\text{parent.prod} = (\text{left.prod} \times \text{right.prod}) \bmod k$$
- Remainder counts:
  1. Any prefix ending strictly inside the left child has remainder counts directly inherited:
     $$\text{parent.remain}[r] += \text{left.remain}[r]$$
  2. Any prefix extending into the right child consists of the **entire left child** plus a prefix of the right child. If a prefix in the right child has remainder $r$, prepending the full left child scales the remainder by $\text{left.prod}$:
     $$\text{combined} = (\text{left.prod} \times r) \bmod k$$
     $$\text{parent.remain}[\text{combined}] += \text{right.remain}[r]$$

### 4. Query Execution
- To answer for `start` to $N - 1$, we query the segment tree for range $[\text{start}, N - 1]$.
- The result node holds the exact counts of prefixes starting at `start` for every remainder $r \in [0, k - 1]$.
- The answer for this query is simply `resNode.remain[x]`.

---

## Complexity Analysis

- **Time Complexity:**
  - **Tree Construction:** $\mathcal{O}(N \times k)$
  - **Point Updates:** $\mathcal{O}(k \log N)$ per update
  - **Range Queries:** $\mathcal{O}(k \log N)$ per query
  - **Total Time:** $\mathcal{O}(N \cdot k + Q \cdot k \log N)$. With $N \le 10^5$, $Q \le 2 \times 10^4$, and $k \le 5$, the number of operations is approximately $2 \times 10^4 \times 5 \times 17 \approx 1.7 \times 10^6$, which finishes in well under $150\text{ ms}$.
- **Auxiliary Space Complexity:**
  - Segment tree requires $4N$ nodes, each holding an array of size $k$.
  - Space: $\mathcal{O}(N \cdot k) = \mathcal{O}(N)$, which comfortably fits within memory limits.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
