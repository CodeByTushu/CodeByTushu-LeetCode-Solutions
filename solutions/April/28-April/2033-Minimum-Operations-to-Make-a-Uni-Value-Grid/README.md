# LeetCode 2033: Minimum Operations to Make a Uni-Value Grid

- **Publication Date:** 28 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Exlk_P5QMB0)

---

## Problem Summary

You are given a 2D integer `grid` of size $m \times n$ and an integer `x`. In one operation, you can add `x` to or subtract `x` from any element in the grid.

A **uni-value grid** is a grid where all the elements of it are equal.

Return the *minimum number of operations* to make the grid uni-value. If it is not possible, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[2,4],[6,8]], x = 2`
- **Output:** `4`
- **Explanation:** We can make every element equal to 4 by doing the following:
  - Add $x$ to 2 once.
  - Subtract $x$ from 6 once.
  - Subtract $x$ from 8 twice.
  A total of 4 operations were used.

#### Example 2:
- **Input:** `grid = [[1,5],[2,3]], x = 1`
- **Output:** `5`
- **Explanation:** We can make every element equal to 3.

#### Example 3:
- **Input:** `grid = [[1,2],[3,4]], x = 2`
- **Output:** `-1`
- **Explanation:** It is impossible to make every element equal because elements have differing remainders modulo $x$.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $1 \le m, n \le 10^5$
- $m \times n \le 10^5$
- $1 \le x \le 10^4$
- $1 \le \text{grid}[i][j] \le 10^4$

---

## Topics and Tags

- **Array**
- **Math**
- **Sorting**
- **Matrix**

---

## Approach & Intuition

### 1. Parity / Modulo Feasibility Check

Every single operation adds or subtracts a multiple of $x$. Therefore, the remainder of any number modulo $x$ is invariant under all valid operations:
$$\text{grid}[i][j] \pmod x = (\text{grid}[i][j] \pm k \cdot x) \pmod x$$

If there exist two cells in the grid with different remainders modulo $x$:
$$\text{grid}[i][j] \pmod x \ne \text{grid}[0][0] \pmod x$$
it is mathematically impossible to transform them into the same target integer. In that case, we can immediately return `-1`.

### 2. Median Optimization (L1 Distance Minimization)

If all numbers have identical remainders modulo $x$, any element can be transformed into any other element in the grid.

Suppose we flatten the grid into a 1D array of values $a_1, a_2, \dots, a_N$ (where $N = m \times n$).
To make all elements equal to an integer $T$, the total number of operations required is:
$$\text{Cost}(T) = \sum_{i=1}^{N} \frac{|a_i - T|}{x} = \frac{1}{x} \sum_{i=1}^{N} |a_i - T|$$

Minimizing the sum of absolute deviations $\sum |a_i - T|$ is a classic mathematical problem whose minimum is uniquely achieved when $T$ is the **median** of the values:
$$T = \text{median}(a_1, a_2, \dots, a_N)$$

### 3. Algorithm Steps:
1. Flatten all elements of `grid` into a 1D array `vals`.
2. Check that every `val % x == grid[0][0] % x`. If not, return `-1`.
3. Sort `vals` in ascending order.
4. Pick the median value $M = \text{vals}[\lfloor N / 2 \rfloor]$.
5. Compute and return $\sum_{i=0}^{N-1} \frac{|vals[i] - M|}{x}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$ where $N = m \times n$
  - Flattening and modulo check take $\mathcal{O}(N)$ time.
  - Sorting $N \le 10^5$ integers takes $\mathcal{O}(N \log N)$ operations (sub-millisecond execution).
  - Computing the final sum takes $\mathcal{O}(N)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing the flattened array of $N$ integers.

---
