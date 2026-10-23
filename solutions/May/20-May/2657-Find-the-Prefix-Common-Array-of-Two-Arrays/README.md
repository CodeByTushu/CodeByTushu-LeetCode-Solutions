# LeetCode 2657: Find the Prefix Common Array of Two Arrays

- **Publication Date:** 20 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/](https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/W91IYzHUi4k)

---

## Problem Summary

You are given two 0-indexed integer permutations `A` and `B` of length `n`.

A **prefix common array** of `A` and `B` is an array `C` such that `C[i]` is equal to the count of numbers that are present at or before the index `i` in both `A` and `B`.

Return the **prefix common array** of `A` and `B`.

A sequence of `n` integers is called a **permutation** if it contains all integers from $1$ to $n$ exactly once.

---

### Examples

#### Example 1:
- **Input:** `A = [1, 3, 2, 4]`, `B = [3, 1, 2, 4]`
- **Output:** `[0, 2, 3, 4]`
- **Explanation:**
  - At $i = 0$: no number is common in prefixes (`A[0..0] = {1}`, `B[0..0] = {3}`), so $C[0] = 0$.
  - At $i = 1$: numbers $1$ and $3$ are common in prefixes (`{1, 3}` and `{3, 1}`), so $C[1] = 2$.
  - At $i = 2$: numbers $1, 2,$ and $3$ are common in prefixes, so $C[2] = 3$.
  - At $i = 3$: numbers $1, 2, 3,$ and $4$ are common in both prefixes, so $C[3] = 4$.

#### Example 2:
- **Input:** `A = [2, 3, 1]`, `B = [3, 1, 2]`
- **Output:** `[0, 1, 3]`
- **Explanation:**
  - At $i = 0$: no common number $\implies C[0] = 0$.
  - At $i = 1$: only $3$ is common in prefixes $\implies C[1] = 1$.
  - At $i = 2$: numbers $1, 2,$ and $3$ are common $\implies C[2] = 3$.

---

### Constraints

- $1 \le A.\text{length} == B.\text{length} == n \le 50$
- $1 \le A[i], B[i] \le n$
- It is guaranteed that $A$ and $B$ are both permutations of $n$ integers.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Bit Manipulation**

---

## Approach & Intuition

### 1. Key Permutation Invariant

Because $A$ and $B$ are permutations of numbers from $1$ to $n$:
- Each number $x \in [1, n]$ appears **at most once** in array $A$.
- Each number $x \in [1, n]$ appears **at most once** in array $B$.

Consequently, across both prefixes $A[0..i]$ and $B[0..i]$, any number can appear at most **twice**:
- If frequency of $x$ is $1$, it has appeared in either $A$ or $B$, but not both yet.
- If frequency of $x$ becomes $2$, it has now appeared in **both** $A$ and $B$ within the current prefix range!

### 2. Single-Pass Running Frequency Count ($\mathcal{O}(N)$)

1. Maintain a frequency array `freq` of size $n + 1$ initialized to $0$, and a counter `commonCount = 0`.
2. Iterate through each index $i$ from $0$ to $n - 1$:
   - Increment `freq[A[i]]`. If it becomes $2$, increment `commonCount`.
   - Increment `freq[B[i]]`. If it becomes $2$, increment `commonCount`.
   - Store $C[i] = \text{commonCount}$.
3. If $A[i] == B[i]$, `freq[A[i]]` is incremented once to $1$, then immediately to $2$, correctly incrementing `commonCount` by $1$.

This avoids quadratic $\mathcal{O}(N^2)$ set intersections and computes the answer in a single linear sweep.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We traverse the arrays of length $N$ once.
  - At each index $i$, frequency table updates and comparisons take $\mathcal{O}(1)$ time.
  - Overall time complexity is strictly $\mathcal{O}(N) \approx 50$ operations ($< 1\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The frequency table `freq` takes $\mathcal{O}(N)$ space ($51$ entries).
  - *(Note: Since $N \le 50$, this can also be implemented in $\mathcal{O}(1)$ auxiliary space using a 64-bit bitmask integer).*

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/W91IYzHUi4k](https://youtu.be/W91IYzHUi4k)
