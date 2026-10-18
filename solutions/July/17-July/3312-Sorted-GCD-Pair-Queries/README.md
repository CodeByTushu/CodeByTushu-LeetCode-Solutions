# LeetCode 3312: Sorted GCD Pair Queries

- **Publication Date:** 17 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/sorted-gcd-pair-queries/](https://leetcode.com/problems/sorted-gcd-pair-queries/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Psee_5soKek?si=pKdWvWyD-tdnSOM3)

---

## Problem Summary

You are given an integer array `nums` of length $n$ and an integer array `queries`.

Let `gcdPairs` denote an array obtained by calculating the greatest common divisor ($\gcd$) of all possible pairs $(\text{nums}[i], \text{nums}[j])$ where $0 \le i < j < n$, and then sorting these values in ascending order.

For each query `queries[i]`, find the element at index `queries[i]` in `gcdPairs`.

Return an integer array `answer`, where `answer[i]` is the value at $\text{gcdPairs}[\text{queries}[i]]$ for each query.

---

### Examples

#### Example 1:

- **Input:** `nums = [2, 3, 4], queries = [0, 2, 2]`
- **Output:** `[1, 2, 2]`
- **Explanation:**
  - $\text{gcdPairs} = [\gcd(\text{nums}[0], \text{nums}[1]), \gcd(\text{nums}[0], \text{nums}[2]), \gcd(\text{nums}[1], \text{nums}[2])] = [1, 2, 1]$
  - After sorting in ascending order, $\text{gcdPairs} = [1, 1, 2]$.
  - $\text{gcdPairs}[\text{queries}[0]] = \text{gcdPairs}[0] = 1$
  - $\text{gcdPairs}[\text{queries}[1]] = \text{gcdPairs}[2] = 2$
  - $\text{gcdPairs}[\text{queries}[2]] = \text{gcdPairs}[2] = 2$
  - Result: `[1, 2, 2]`.

#### Example 2:

- **Input:** `nums = [4, 4, 2, 1], queries = [5, 3, 1, 0]`
- **Output:** `[4, 2, 1, 1]`
- **Explanation:**
  - Pairs GCDs:
    - $\gcd(4, 4) = 4$
    - $\gcd(4, 2) = 2$
    - $\gcd(4, 1) = 1$
    - $\gcd(4, 2) = 2$
    - $\gcd(4, 1) = 1$
    - $\gcd(2, 1) = 1$
  - Sorted $\text{gcdPairs} = [1, 1, 1, 2, 2, 4]$.
  - Queries:
    - Index $5 \to 4$
    - Index $3 \to 2$
    - Index $1 \to 1$
    - Index $0 \to 1$
  - Result: `[4, 2, 1, 1]`.

#### Example 3:

- **Input:** `nums = [2, 2], queries = [0, 0]`
- **Output:** `[2, 2]`
- **Explanation:**
  - $\text{gcdPairs} = [2]$.
  - Result: `[2, 2]`.

---

### Constraints

- $2 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 5 \cdot 10^4$
- $1 \le \text{queries.length} \le 10^5$
- $0 \le \text{queries}[i] < \frac{n \times (n - 1)}{2}$

---

## Algorithmic Approach

Directly generating all $\frac{n(n - 1)}{2} \approx 5 \cdot 10^9$ pairs and sorting them is completely infeasible. Instead, we compute the exact frequency of each GCD value using number theory and sieve-like inclusion-exclusion, followed by prefix sums and binary search.

Let $M = \max(\text{nums}) \le 5 \cdot 10^4$.

### 1. Multiples and Pair Counting ($\mathcal{O}(M \log M)$)
- Maintain a frequency array `freq` where `freq[x]` stores the occurrences of $x$ in `nums`.
- For each integer $g \in [1, M]$:
  - Count how many numbers in `nums` are divisible by $g$:
    $$c = \sum_{j = 1, j \cdot g \le M} \text{freq}[j \cdot g]$$
  - Any pair chosen from these $c$ numbers will have a common divisor of at least $g$. The number of such pairs is:
    $$\text{cnt}[g] = \frac{c(c - 1)}{2}$$
- By harmonic progression, iterating through multiples takes $\sum_{g = 1}^M \frac{M}{g} \approx M \ln M$ steps.

### 2. Sieve Inclusion-Exclusion for Exact GCDs ($\mathcal{O}(M \log M)$)
- $\text{cnt}[g]$ includes pairs whose GCD is $g$, $2g$, $3g$, and so forth.
- To obtain the exact number of pairs with $\gcd = g$, iterate backwards from $g = M$ down to $1$:
  $$\text{exact}[g] = \text{cnt}[g] - \sum_{k = 2, k \cdot g \le M} \text{exact}[k \cdot g]$$
- Running backwards guarantees that all multiples $\text{exact}[k \cdot g]$ are already finalized before computing $\text{exact}[g]$.

### 3. Cumulative Prefix Distribution ($\mathcal{O}(M)$)
- Since the array $\text{gcdPairs}$ is sorted ascending, all pairs with $\gcd = 1$ occupy the beginning, followed by pairs with $\gcd = 2$, and so on.
- Build prefix sums:
  $$\text{prefix}[g] = \text{prefix}[g - 1] + \text{exact}[g]$$
- Here, $\text{prefix}[g]$ denotes the total number of pairs with $\gcd \le g$.

### 4. Binary Search per Query ($\mathcal{O}(q \log M)$)
- Each query asks for the element at 0-indexed position $\text{queries}[i]$, which corresponds to the $k$-th pair ($k = \text{queries}[i] + 1$, 1-indexed).
- Binary search for the smallest $g \in [1, M]$ such that $\text{prefix}[g] \ge k$.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n + M \log M + q \log M)$ | Finding maximum and frequency array takes $\mathcal{O}(n)$. Harmonic sieving for multiples and exact counts takes $\mathcal{O}(M \log M)$ with $M \le 50000$. Prefix sum takes $\mathcal{O}(M)$. Each of the $q$ queries is answered via binary search in $\mathcal{O}(\log M)$. |
| **Auxiliary Space** | $\mathcal{O}(M)$ | Frequency, pair counts, exact counts, and prefix arrays of size $M + 1 \le 50001$. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
