# LeetCode 1306: Jump Game III

- **Publication Date:** 17 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/jump-game-iii/](https://leetcode.com/problems/jump-game-iii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/JnySdp-1ExE)

---

## Problem Summary

Given an array of non-negative integers `arr`, you are initially positioned at `start` index of the array. When you are at index `i`, you can jump to:
- `i + arr[i]` (forward jump)
- `i - arr[i]` (backward jump)

Check if you can reach **any index with value 0**.

Notice that you cannot jump outside of the array boundaries at any time.

---

### Examples

#### Example 1:
- **Input:** `arr = [4, 2, 3, 0, 3, 1, 2]`, `start = 5`
- **Output:** `true`
- **Explanation:**
  - All possible ways to reach index 3 with value 0 are:
    - index 5 $\to$ index 4 $\to$ index 1 $\to$ index 3
    - index 5 $\to$ index 6 $\to$ index 4 $\to$ index 1 $\to$ index 3

#### Example 2:
- **Input:** `arr = [4, 2, 3, 0, 3, 1, 2]`, `start = 0`
- **Output:** `true`
- **Explanation:**
  - One possible way to reach index 3 with value 0 is:
    - index 0 $\to$ index 4 $\to$ index 1 $\to$ index 3

#### Example 3:
- **Input:** `arr = [3, 0, 2, 1, 2]`, `start = 2`
- **Output:** `false`
- **Explanation:**
  - There is no way to reach index 1 with value 0 from index 2.

---

### Constraints

- $1 \le \text{arr.length} \le 5 \times 10^4$
- $0 \le \text{arr}[i] < \text{arr.length}$
- $0 \le \text{start} < \text{arr.length}$

---

## Topics and Tags

- **Array**
- **Depth-First Search**
- **Breadth-First Search**

---

## Approach & Intuition

### 1. Graph Reachability Formulation

The problem can be modeled as finding a path in an unweighted directed graph:
- Each index $i \in [0, n - 1]$ is a node.
- Directed outgoing edges from node $i$ point to:
  - $i + \text{arr}[i]$ if $i + \text{arr}[i] < n$
  - $i - \text{arr}[i]$ if $i - \text{arr}[i] \ge 0$
- We want to determine if there exists a directed path from node `start` to any node $t$ such that $\text{arr}[t] == 0$.

### 2. Breadth-First Search (BFS) / Depth-First Search (DFS)

Using **BFS** with a `visited` array:
1. Initialize a queue with `start` and mark `visited[start] = true`.
2. While the queue is not empty:
   - Dequeue the front element `curr`.
   - If `arr[curr] == 0`, return `true` immediately.
   - Compute forward jump `forward = curr + arr[curr]`:
     - If `forward < n` and `!visited[forward]`, mark visited and push to queue.
   - Compute backward jump `backward = curr - arr[curr]`:
     - If `backward >= 0` and `!visited[backward]`, mark visited and push to queue.
3. If the queue is exhausted without reaching value 0, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Each of the $N$ indices is pushed and popped from the queue at most once.
  - From each node, at most 2 outgoing transitions are checked in $\mathcal{O}(1)$ time.
  - Overall time complexity is strictly linear: $\mathcal{O}(N) \approx 5 \times 10^4$ operations ($\approx 2\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The `visited` array and queue store at most $N$ elements.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/JnySdp-1ExE](https://youtu.be/JnySdp-1ExE)
