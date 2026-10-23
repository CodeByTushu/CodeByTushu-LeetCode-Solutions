# LeetCode 2784: Check if Array is Good

- **Publication Date:** 14 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-if-array-is-good/](https://leetcode.com/problems/check-if-array-is-good/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Mmm__v0Gc74)

---

## Problem Summary

You are given an integer array `nums`. We consider an array **good** if it is a permutation of an array `base[n]`.

$$\text{base}[n] = [1, 2, \dots, n - 1, n, n]$$

In other words, `base[n]` is an array of length $n + 1$ which contains $1$ through $n - 1$ exactly once, plus two occurrences of $n$.
- For example, $\text{base}[1] = [1, 1]$ and $\text{base}[3] = [1, 2, 3, 3]$.

Return `true` if the given array is good, otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `nums = [2, 1, 3]`
- **Output:** `false`
- **Explanation:** Since the maximum element of the array is 3, the only candidate $n$ for which this array could be a permutation of $\text{base}[n]$ is $n = 3$. However, $\text{base}[3]$ has 4 elements, but `nums` has only 3 elements. Therefore, it cannot be a permutation of $\text{base}[3] = [1, 2, 3, 3]$, so the answer is `false`.

#### Example 2:
- **Input:** `nums = [1, 3, 3, 2]`
- **Output:** `true`
- **Explanation:** Since the maximum element is 3, candidate $n = 3$. `nums` contains $1, 2$ once and $3$ twice, which is a valid permutation of $\text{base}[3] = [1, 2, 3, 3]$.

#### Example 3:
- **Input:** `nums = [1, 1]`
- **Output:** `true`
- **Explanation:** For $n = 1$, $\text{base}[1] = [1, 1]$, which matches `nums`.

#### Example 4:
- **Input:** `nums = [3, 4, 4, 1, 2, 1]`
- **Output:** `false`
- **Explanation:** Array length is 6, so candidate $n = 5$. Element 1 appears twice and 5 is missing, so it is not a valid permutation.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 200$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Sorting**

---

## Approach & Intuition

### 1. Determining Candidate $n$

By definition, $\text{base}[n]$ has length $n + 1$. Therefore, for `nums` of length $L$:
$$n = L - 1$$
If $L < 2 \implies n < 1$, it is impossible for `nums` to be a valid `base[n]`, so return `false` immediately.

### 2. Frequency Counting in $\mathcal{O}(N)$

To verify if `nums` is a permutation of $\text{base}[n]$:
1. Every integer $x$ in `nums` must satisfy $1 \le x \le n$. If any element falls outside this range, return `false`.
2. Count the occurrences of each integer:
   - For every $1 \le i \le n - 1$: $\text{count}[i]$ must be exactly $1$.
   - For $i = n$: $\text{count}[n]$ must be exactly $2$.
3. If all frequency checks pass, return `true`.

This provides an optimal $\mathcal{O}(N)$ time check without sorting.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over `nums` of length $N$ to record frequencies.
  - A second pass from $1$ to $n$ to check frequencies.
  - Total time is linear: $\mathcal{O}(N)$, executing in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - A frequency buffer of size $n + 1 \le 101$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/Mmm__v0Gc74](https://youtu.be/Mmm__v0Gc74)
