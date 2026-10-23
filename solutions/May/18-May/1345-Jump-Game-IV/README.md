# LeetCode 1345: Jump Game IV

- **Publication Date:** 18 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/jump-game-iv/](https://leetcode.com/problems/jump-game-iv/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/95lkFqqXfQg)

---

## Problem Summary

Given an array of integers `arr`, you are initially positioned at the first index of the array (index `0`).

In one step you can jump from index `i` to index:
- `i + 1` where: `i + 1 < arr.length`.
- `i - 1` where: `i - 1 >= 0`.
- `j` where: `arr[i] == arr[j]` and `i != j`.

Return the **minimum number of steps** to reach the last index of the array (`arr.length - 1`).

Notice that you cannot jump outside of the array at any time.

---

### Examples

#### Example 1:
- **Input:** `arr = [100, -23, -23, 404, 100, 23, 23, 23, 3, 404]`
- **Output:** `3`
- **Explanation:**
  - You need 3 jumps from index 0 $\to$ 4 $\to$ 3 $\to$ 9.
  - Note that index 9 is the last index of the array.

#### Example 2:
- **Input:** `arr = [7]`
- **Output:** `0`
- **Explanation:**
  - Start index is already the last index. You do not need to jump.

#### Example 3:
- **Input:** `arr = [7, 6, 9, 6, 9, 6, 9, 7]`
- **Output:** `1`
- **Explanation:**
  - You can jump directly from index 0 to index 7 since `arr[0] == arr[7] == 7`.

---

### Constraints

- $1 \le \text{arr.length} \le 5 \times 10^4$
- $-10^8 \le \text{arr}[i] \le 10^8$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Breadth-First Search**

---

## Approach & Intuition

### 1. Shortest Path on an Unweighted Graph

We can model the array indices as vertices of an unweighted graph where every index $i \in [0, n - 1]$ has directed edges to:
1. $i - 1$ (if $i - 1 \ge 0$)
2. $i + 1$ (if $i + 1 < n$)
3. All indices $j$ such that $\text{arr}[j] == \text{arr}[i]$ and $j \ne i$

Since all edge weights are equal to $1$, the standard algorithm to find the minimum number of steps (shortest path) from index $0$ to index $n - 1$ is **Breadth-First Search (BFS)**.

### 2. Grouping Identical Values with a Hash Map

Before starting the BFS, we build an adjacency map `valueIndices` mapping each unique element value to a list of all indices where that value occurs:
$$\text{valueIndices}[\text{arr}[i]] = [i_1, i_2, \dots]$$

### 3. Critical $\mathcal{O}(N^2) \to \mathcal{O}(N)$ Optimization (Same-Value Pruning)

If an array contains many identical values (e.g. $[7, 7, 7, \dots, 7]$), exploring same-value edges repeatedly from every index would result in $\mathcal{O}(N^2)$ edge traversals and cause Time Limit Exceeded (TLE).

**The Key Insight:**
- Once index `curr` explores all indices that share the value `arr[curr]`, all of those sibling indices are pushed into the queue and marked as `visited`.
- Any subsequent index with value `arr[curr]` would only attempt to visit already-visited nodes.
- Therefore, after traversing the list for `arr[curr]`, we immediately **erase/clear** `arr[curr]` from `valueIndices`.
- This ensures that each same-value list is scanned **at most once**, guaranteeing an optimal linear time complexity of $\mathcal{O}(N)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Building the `valueIndices` hash map takes $\mathcal{O}(N)$ time.
  - In BFS, each vertex $i \in [0, n - 1]$ is pushed and popped from the queue at most once.
  - Adjacent transitions $i - 1$ and $i + 1$ take $\mathcal{O}(1)$ time per node.
  - Same-value edges are traversed at most once across the entire algorithm because the list is deleted after the first visit.
  - Hence, total time is strictly linear: $\mathcal{O}(N) \approx 5 \times 10^4$ operations.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The `valueIndices` hash map stores $N$ entries in total.
  - The `queue` and `visited` array/bitset require $\mathcal{O}(N)$ space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/95lkFqqXfQg](https://youtu.be/95lkFqqXfQg)
