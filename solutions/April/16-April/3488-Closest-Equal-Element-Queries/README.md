# LeetCode 3488: Closest Equal Element Queries

- **Publication Date:** 16 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/closest-equal-element-queries/](https://leetcode.com/problems/closest-equal-element-queries/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/V2zmsfz4oGc)

---

## Problem Summary

You are given a **circular array** `nums` and an array `queries`.

For each query `i`, you have to find the following:
- The **minimum distance** between the element at index `queries[i]` and **any other index** `j` in the circular array, where `nums[j] == nums[queries[i]]`. If no such index exists, the answer for that query should be `-1`.

Return an array `answer` of the same size as `queries`, where `answer[i]` represents the result for query `i`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,3,1,4,1,3,2]`, `queries = [0,3,5]`
- **Output:** `[2,-1,3]`
- **Explanation:**
  - **Query 0:** The element at `queries[0] = 0` is `nums[0] = 1`. The nearest index with the same value is `2`, and the distance between them is `2`.
  - **Query 1:** The element at `queries[1] = 3` is `nums[3] = 4`. No other index contains `4`, so the result is `-1`.
  - **Query 2:** The element at `queries[2] = 5` is `nums[5] = 3`. The nearest index with the same value is `1`, and the distance between them is `3` (following the circular path: `5 -> 6 -> 0 -> 1`).

#### Example 2:
- **Input:** `nums = [1,2,3,4]`, `queries = [0,1,2,3]`
- **Output:** `[-1,-1,-1,-1]`
- **Explanation:**
  - Every element in `nums` is unique, so no identical elements exist for any index. All queries evaluate to `-1`.

---

### Constraints

- $1 \le \text{queries.length} \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^6$
- $0 \le \text{queries}[i] < \text{nums.length}$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Binary Search**

---

## Approach & Intuition

### 1. Inherent Circular Invariant

In a circular array of size $n$, the distance between two indices $i$ and $j$ is given by:
$$\text{dist}(i, j) = \min(|i - j|, \ n - |i - j|)$$

For any element occurring multiple times, the closest equal element must be either its **immediate circular predecessor** or its **immediate circular successor** among occurrences of that value. Any intermediate elements along the circle are further away.

### 2. Doubled Array Simulation ($2N$ Traversal)

Rather than answering each query individually via binary search in $\mathcal{O}(\log N)$ time, we can precompute the closest equal distance for every index $i \in [0, n - 1]$ in optimal linear time $\mathcal{O}(N)$:
1. Simulate traversing the array twice by iterating $i$ from $0$ to $2n - 1$, accessing elements as `nums[i % n]`.
2. Maintain a hash map `lastSeen` mapping each value `val` to the absolute index $i$ where it was last encountered.
3. When `val` has been seen previously at `prev = lastSeen[val]`:
   - The circular distance between the current occurrence (`i % n`) and previous occurrence (`prev % n`) is $d = i - prev$.
   - Update `minDist[i % n] = min(minDist[i % n], d)`.
   - Update `minDist[prev % n] = min(minDist[prev % n], d)`.
4. Update `lastSeen[val] = i`.
5. Because we loop through $2n$ steps, all adjacent pairs within the original array and across the wrap-around boundary ($n - 1 \leftrightarrow 0$) are considered.
6. If an element appears only once in `nums`, the only difference recorded will be $(i_0 + n) - i_0 = n$. Thus, its minimum distance remains $\ge n$, signaling that no other distinct index shares this value, returning `-1`.

### 3. $\mathcal{O}(1)$ Query Lookup

Once `minDist` is precalculated:
$$\text{ans}[k] = \begin{cases} -1 & \text{if } \text{minDist}[q] = n \\ \text{minDist}[q] & \text{otherwise} \end{cases}$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + Q)$
  - Traversing the array $2N$ steps takes $\mathcal{O}(N)$ time with $\mathcal{O}(1)$ hash map operations.
  - Answering $Q$ queries requires a direct array lookup taking $\mathcal{O}(1)$ per query, resulting in $\mathcal{O}(Q)$ query processing.
  - Overall time complexity is strictly $\mathcal{O}(N + Q)$, easily processing $10^5$ inputs in $< 40\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing the `minDist` array and the `lastSeen` hash map requires $\mathcal{O}(N)$ additional space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/V2zmsfz4oGc](https://youtu.be/V2zmsfz4oGc)
