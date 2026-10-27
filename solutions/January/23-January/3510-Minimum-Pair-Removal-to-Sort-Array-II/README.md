# LeetCode 3510: Minimum Pair Removal to Sort Array II

- **Publication Date:** 23 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-pair-removal-to-sort-array-ii/](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-nEsW23jy1c?si=4xgP1fgQP7vIk8rD)

---

## Problem Summary

Given an array `nums`, you can perform the following operation any number of times:
- Select the adjacent pair with the **minimum sum** in `nums`. If multiple such pairs exist, choose the **leftmost** one.
- Replace the pair with their sum.

Return the **minimum number of operations** needed to make the array **non-decreasing**.

An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

---

### Examples

#### Example 1:
- **Input:** `nums = [5, 2, 3, 1]`
- **Output:** `2`
- **Explanation:**
  - The pair $(3, 1)$ has the minimum sum of $4$. After replacement, `nums = [5, 2, 4]`.
  - The pair $(2, 4)$ has the minimum sum of $6$. After replacement, `nums = [5, 6]`.
  - The array `nums` becomes non-decreasing in two operations.

#### Example 2:
- **Input:** `nums = [1, 2, 2]`
- **Output:** `0`
- **Explanation:**
  - The array `nums` is already non-decreasing, so $0$ operations are needed.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $-10^9 \le \text{nums}[i] \le 10^9$

---

## Topics and Tags

- **Array**
- **Heap (Priority Queue)**
- **Linked List**
- **Simulation**
- **Hash Table**

---

## Approach & Intuition

### Key Challenges in Part II:
- In Part I (LeetCode 3507), $n \le 50$, which permitted direct $\mathcal{O}(n^2)$ array slicing.
- In Part II, $n \le 10^5$, meaning an $\mathcal{O}(n^2)$ algorithm would perform up to $10^{10}$ operations and cause a severe Time Limit Exceeded (TLE).
- We must maintain the array of elements dynamically and identify the minimum adjacent pair in $\mathcal{O}(\log n)$ time.

### Algorithmic Blueprint ($\mathcal{O}(n \log n)$):

1. **Doubly Linked List for Dynamic Elements:**
   - Model the array as a doubly linked list using flat arrays `prev` and `next`.
   - Merging adjacent nodes $u$ and $v = \text{next}[u]$ updates pointers in $\mathcal{O}(1)$:
     - `val[u] = val[u] + val[v]`
     - `next[u] = next[v]`
     - `prev[next[v]] = u`
     - Mark $v$ as deleted.

2. **Inversion / Descent Tracking in $\mathcal{O}(1)$:**
   - Rather than checking whether the entire array is sorted in $\mathcal{O}(n)$ time at each step, maintain a count `descents` equal to the number of adjacent pairs $(a, b)$ where $\text{val}[a] > \text{val}[b]$.
   - The array is sorted if and only if `descents == 0`.
   - When merging $u$ and $v$, only the local transitions around $p = \text{prev}[u]$, $u$, $v$, and $w = \text{next}[v]$ are affected. We remove old contributions and add new ones in $\mathcal{O}(1)$ time.

3. **Priority Queue (Min-Heap) with Lazy Invalidation:**
   - Insert all initial adjacent pairs into a min-heap ordered by:
     1. Primary: Pair sum ascending ($\text{sum} = \text{val}[u] + \text{val}[v]$).
     2. Secondary: Left node ID $u$ ascending (breaking ties leftmost).
   - Because $u$ always keeps the leftmost original index upon merging, $u < w$ strictly preserves the left-to-right order of all active nodes.
   - To handle stale heap entries caused by previous merges, maintain a `version` array for each node. When an entry is popped, if its stored version does not match the current node version or if $v$ is deleted, discard it.
   - When nodes are merged, push the updated pairs $(p, u)$ and $(u, w)$ into the min-heap with incremented versions.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$
  - Building the initial heap takes $\mathcal{O}(n \log n)$ time.
  - Each of the at most $n - 1$ merges pushes at most 2 new pairs into the min-heap.
  - Across all operations, the total number of heap pushes and pops is at most $\mathcal{O}(n)$, each taking $\mathcal{O}(\log n)$ time.
  - Descent counter and pointer updates take $\mathcal{O}(1)$ per merge.
  - Total time: $\mathcal{O}(n \log n)$, comfortably finishing within $\approx 70\text{ ms}$ for $10^5$ elements.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - Storing `val`, `prev`, `next`, `version`, `deleted`, and the PriorityQueue requires linear memory.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
