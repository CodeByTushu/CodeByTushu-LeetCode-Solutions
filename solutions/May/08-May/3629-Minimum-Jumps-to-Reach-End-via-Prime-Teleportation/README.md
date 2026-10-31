# LeetCode 3629: Minimum Jumps to Reach End via Prime Teleportation

- **Publication Date:** 08 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation/](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Ft-ucSTwGWI)

---

## Problem Summary

You are given an integer array `nums` of length $n$.

You start at index $0$, and your goal is to reach index $n - 1$.

From any index $i$, you may perform one of the following operations:
- **Adjacent Step:** Jump to index $i + 1$ or $i - 1$, if the index is within bounds.
- **Prime Teleportation:** If `nums[i]` is a prime number $p$, you may instantly jump to any index $j \neq i$ such that $\text{nums}[j] \pmod p == 0$.

Return the **minimum number of jumps** required to reach index $n - 1$.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 4, 6]`
- **Output:** `2`
- **Explanation:**
  - Start at index $i = 0$. Take an adjacent step to index $1$.
  - At index $i = 1$, $\text{nums}[1] = 2$ is a prime number. Therefore, teleport to index $i = 3$ as $\text{nums}[3] = 6$ is divisible by $2$.
  - Thus, the minimum jumps required is $2$.

#### Example 2:
- **Input:** `nums = [2, 3, 4, 7, 9]`
- **Output:** `2`
- **Explanation:**
  - Start at index $i = 0$ ($\text{nums}[0] = 2$). Take an adjacent step to index $i = 1$ ($\text{nums}[1] = 3$).
  - At index $i = 1$, $\text{nums}[1] = 3$ is a prime number. Teleport directly to index $i = 4$ because $\text{nums}[4] = 9$ is divisible by $3$ ($9 \pmod 3 == 0$).
  - Thus, the answer is $2$.

#### Example 3:
- **Input:** `nums = [4, 6, 5, 8]`
- **Output:** `3`
- **Explanation:**
  - Move sequentially: $0 \to 1 \to 2 \to 3$ via adjacent steps.
  - No prime teleportation offers a shortcut. Total jumps $= 3$.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^6$

---

## Topics and Tags

- **Array**
- **Breadth-First Search (BFS)**
- **Graph**
- **Math / Number Theory (Sieve of Eratosthenes)**
- **Shortest Path**

---

## Approach & Intuition

### 1. BFS for Shortest Path on Unweighted Graph

Since every jump (adjacent step or prime teleportation) has a uniform cost of $1$ step, the shortest path from index $0$ to index $n - 1$ is naturally solved using **Breadth-First Search (BFS)**.

However, naive transitions where we scan all elements divisible by a prime $p$ every time we visit a prime number would lead to quadratic $\mathcal{O}(n^2)$ worst-case time and Time Limit Exceeded (TLE).

### 2. Number Theory Optimization: SPF & Bucket Mapping

To achieve linear / sub-linear exploration:
1. **Smallest Prime Factor (SPF) Sieve:**
   - Precompute the Smallest Prime Factor (SPF) for all integers up to $M = \max(\text{nums})$ ($M \le 10^6$) using a sieve in $\mathcal{O}(M \log \log M)$ or $\mathcal{O}(M)$ time.
   - Any number $x$ can then be factorized into its unique prime factors in $\mathcal{O}(\log x)$ time.
2. **Prime-to-Indices Inverted Index:**
   - For every index $j$, decompose $\text{nums}[j]$ into its distinct prime factors.
   - Append index $j$ into `primeToIndices[p]` for each prime factor $p$ of $\text{nums}[j]$.
   - Since $x \le 10^6$, any integer has at most $7$ distinct prime factors ($2 \times 3 \times 5 \times 7 \times 11 \times 13 \times 17 > 10^6$). The total size of `primeToIndices` across all entries is bounded by $\le 7n$.

### 3. Avoiding Redundant BFS Edge Expansions

- When the BFS visits node $u$ with value $\text{nums}[u] = p$:
  - If $p$ is prime ($p \ge 2$ and $\text{spf}[p] == p$):
    - Retrieve all target indices in `primeToIndices[p]`.
    - For unvisited targets, set $\text{dist}[v] = \text{dist}[u] + 1$ and push into the queue.
    - **Crucial Optimization:** Immediately remove / clear `primeToIndices[p]`! Once all multiples of prime $p$ have been reached at distance $\text{dist}[u] + 1$, no future visit to another node with value $p$ can ever find a shorter path to these multiples.
- Each index and each prime list is traversed at most once during the entire BFS, ensuring strictly optimal performance.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \log \log M + N \log(\max(\text{nums})))$
  - Sieve precomputation takes $\mathcal{O}(M \log \log M)$ where $M = \max(\text{nums}) \le 10^6$.
  - Prime factorization for each element takes at most $\mathcal{O}(\log(\text{nums}[i])) \le 7$ steps.
  - The BFS visits each index at most once and processes each prime bucket at most once: $\mathcal{O}(N)$.
  - Total runtime is well under $50\text{ ms}$, effortlessly passing all tests.

- **Auxiliary Space Complexity:** $\mathcal{O}(M + N)$
  - Requires $\mathcal{O}(M)$ auxiliary space for the SPF sieve table.
  - Requires $\mathcal{O}(N)$ space for the `dist` array, BFS queue, and inverted index `primeToIndices`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/Ft-ucSTwGWI](https://youtu.be/Ft-ucSTwGWI)
