# LeetCode 1340: Jump Game V

- **Publication Date:** 24 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/jump-game-v/](https://leetcode.com/problems/jump-game-v/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/iBW5mDteOPE)

---

## Problem Summary

Given an array of integers `arr` and an integer `d`. In one step you can jump from index `i` to index:
- `i + x` where `i + x < arr.length` and $0 < x \le d$.
- `i - x` where `i - x >= 0` and $0 < x \le d$.

In addition, you can only jump from index `i` to index `j` if:
1. `arr[i] > arr[j]`
2. `arr[i] > arr[k]` for all indices `k` between `i` and `j` (more formally $\min(i, j) < k < \max(i, j)$).

You can choose any index of the array and start jumping. Return the **maximum number of indices you can visit**.

Notice that you cannot jump outside of the array at any time.

---

### Examples

#### Example 1:
- **Input:** `arr = [6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12]`, `d = 2`
- **Output:** `4`
- **Explanation:**
  - You can start at index 10 (`arr[10] = 12`).
  - Jump to index 9 (`arr[9] = 10`).
  - Jump to index 7 (`arr[7] = 7`).
  - Jump to index 6 (`arr[6] = 6`).
  - You cannot visit more than 4 indices.

#### Example 2:
- **Input:** `arr = [3, 3, 3, 3, 3]`, `d = 3`
- **Output:** `1`
- **Explanation:**
  - You cannot jump to any other index because all values are equal.

#### Example 3:
- **Input:** `arr = [7, 6, 5, 4, 3, 2, 1]`, `d = 1`
- **Output:** `7`
- **Explanation:**
  - Start at index 0 and jump 1 step to the right each time until index 6.

---

### Constraints

- $1 \le \text{arr.length} \le 1000$
- $1 \le \text{arr}[i] \le 10^5$
- $1 \le d \le \text{arr.length}$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Sorting**

---

## Approach & Intuition

### 1. Directed Acyclic Graph (DAG) Structure

Since jumps can only transition from a strictly greater value to a strictly smaller value (`arr[i] > arr[j]`), there are **no cycles** in the transition graph. 

Finding the maximum number of visitable indices is mathematically equivalent to finding the **longest path in a DAG**.

### 2. Memoized Depth-First Search (Top-Down DP)

Let $\text{memo}[i]$ denote the maximum number of indices that can be visited starting from index $i$:
1. Base case: Visiting just the starting index gives $\text{memo}[i] \ge 1$.
2. **Rightward Transitions:**
   - For $j = i + 1, i + 2, \dots, \min(i + d, n - 1)$:
     - If $\text{arr}[j] \ge \text{arr}[i]$, the path is blocked by an equal or taller bar. We must `break` immediately because jumps cannot pass over blocking bars.
     - Otherwise, we can jump to $j$, contributing $1 + \text{dfs}(j)$.
3. **Leftward Transitions:**
   - For $j = i - 1, i - 2, \dots, \max(i - d, 0)$:
     - If $\text{arr}[j] \ge \text{arr}[i]$, the path is blocked; `break` immediately.
     - Otherwise, contribute $1 + \text{dfs}(j)$.
4. Store the maximum across all valid jumps in $\text{memo}[i]$ and return it.
5. Overall answer is $\max_{0 \le i < n} \text{memo}[i]$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot d)$
  - There are $N$ subproblems (one for each index $i \in [0, N - 1]$).
  - From each state $i$, we inspect at most $2d$ possible jumps.
  - With memoization, each state is computed once.
  - Worst case: $N \cdot d \le 1000 \times 1000 = 10^6$ operations ($\approx 8\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The `memo` array of size $N$.
  - The recursion stack depth is at most $N$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/iBW5mDteOPE](https://youtu.be/iBW5mDteOPE)
