# LeetCode 3660: Jump Game IX

- **Publication Date:** 07 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/jump-game-ix/](https://leetcode.com/problems/jump-game-ix/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/nDq2l17fBCo)

---

## Problem Summary

You are given an integer array `nums`.

From any index `i`, you can jump to another index `j` under the following rules:
- Jump to index `j` where $j > i$ is allowed only if $\text{nums}[j] < \text{nums}[i]$ (jumping right to a smaller element).
- Jump to index `j` where $j < i$ is allowed only if $\text{nums}[j] > \text{nums}[i]$ (jumping left to a larger element).

For each index `i`, find the **maximum value** in `nums` that can be reached by following any sequence of valid jumps starting at `i`.

Return an array `ans` where `ans[i]` is the maximum value reachable starting from index `i`.

---

### Examples

#### Example 1:
- **Input:** `nums = [2, 1, 3]`
- **Output:** `[2, 2, 3]`
- **Explanation:**
  - For $i = 0$: No jump increases the value, maximum reachable is $2$.
  - For $i = 1$: Jump to $j = 0$ as $\text{nums}[0] = 2 > \text{nums}[1] = 1$. The maximum value reachable is $2$.
  - For $i = 2$: Since $\text{nums}[2] = 3$ is already the maximum value in `nums`, no jump increases the value.
  - Thus, $\text{ans} = [2, 2, 3]$.

#### Example 2:
- **Input:** `nums = [2, 3, 1]`
- **Output:** `[3, 3, 3]`
- **Explanation:**
  - For $i = 0$: Jump forward to $j = 2$ ($\text{nums}[2] = 1 < \text{nums}[0] = 2$), then jump backward to $j = 1$ ($\text{nums}[1] = 3 > \text{nums}[2] = 1$). Reachable max is $3$.
  - For $i = 1$: $\text{nums}[1] = 3$ is the array maximum.
  - For $i = 2$: Jump backward to $j = 1$ ($\text{nums}[1] = 3 > \text{nums}[2] = 1$). Reachable max is $3$.
  - Thus, $\text{ans} = [3, 3, 3]$.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Greedy**
- **Prefix / Suffix Precomputation**

---

## Approach & Intuition

### 1. Bidirectional Graph Invariance (Undirected Reachability)

Consider any two indices $u$ and $v$ with $u < v$:
- A forward jump from $u \to v$ requires:
  $$u < v \quad \text{and} \quad \text{nums}[u] > \text{nums}[v]$$
- A backward jump from $v \to u$ requires:
  $$v > u \quad \text{and} \quad \text{nums}[u] > \text{nums}[v]$$

Notice that the condition for $u \to v$ and the condition for $v \to u$ are **identical**:
> **An edge exists between $u$ and $v$ if and only if $u < v$ and $\text{nums}[u] > \text{nums}[v]$, and this edge is completely bidirectional!**

Therefore, reachability forms connected components in an undirected graph. Within any connected component, every node can reach every other node, and hence the answer for all nodes in that component is simply the **maximum value present in that component**.

### 2. Boundary Cuts & Suffix Min / Prefix Max Condition

For an index $i$, when can nodes in $\{0, \dots, i\}$ connect to any node in $\{i + 1, \dots, n - 1\}$?
- There must exist at least one pair $(u, v)$ with $u \le i < v$ such that $\text{nums}[u] > \text{nums}[v]$.
- This condition holds if and only if the maximum value to the left is strictly greater than the minimum value to the right:
  $$\max_{u \le i} \text{nums}[u] > \min_{v > i} \text{nums}[v] \iff \text{preMax}[i] > \text{sufMin}$$

### 3. Dynamic Programming / Backward Propagation

1. Precompute the prefix maximums:
   $$\text{preMax}[i] = \max(\text{preMax}[i - 1], \text{nums}[i])$$
2. Traverse from right to left ($i = n - 1$ down to $0$) while maintaining the running suffix minimum `sufMin` of elements strictly to the right:
   - If $\text{preMax}[i] > \text{sufMin}$:
     - A valid bridge exists between $\{0, \dots, i\}$ and $\{i + 1, \dots, n - 1\}$. Index $i$ merges into the component of $i + 1$, meaning:
       $$\text{ans}[i] = \text{ans}[i + 1]$$
   - Otherwise ($\text{preMax}[i] \le \text{sufMin}$):
     - No edge crosses this cut. Index $i$ cannot reach any element to its right, so its maximum reachable value is capped within its prefix component:
       $$\text{ans}[i] = \text{preMax}[i]$$
   - Update `sufMin = min(sufMin, nums[i])`.

This elegant linear sweep computes all answers in $\mathcal{O}(n)$ time!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$
  - First forward pass computes prefix maximums in $\mathcal{O}(n)$.
  - Second backward pass computes answers and updates suffix minimum in $\mathcal{O}(n)$.
  - Total time complexity is strictly $\mathcal{O}(n)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - Requires $\mathcal{O}(n)$ space for the `preMax` array and the output `ans` array.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/nDq2l17fBCo](https://youtu.be/nDq2l17fBCo)
