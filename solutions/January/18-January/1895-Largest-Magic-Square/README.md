# LeetCode 1895: Largest Magic Square

- **Publication Date:** 18 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/largest-magic-square/](https://leetcode.com/problems/largest-magic-square/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

A $k \times k$ **magic square** is a $k \times k$ grid filled with integers such that:
- Every row sum is equal.
- Every column sum is equal.
- Both diagonal sums (main diagonal and anti-diagonal) are equal.
- All of the above sums are equal to each other.

The integers in the magic square do not have to be distinct. Every $1 \times 1$ grid is trivially a magic square.

Given an $m \times n$ integer `grid`, return the **size** (i.e., the side length $k$) of the **largest magic square** that can be found within this grid.

---

### Examples

#### Example 1:
- **Input:** `grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]`
- **Output:** `3`
- **Explanation:**
  - The largest magic square has size $3$ with top-left at $(1, 1)$:
    $$\begin{pmatrix} 5 & 1 & 6 \\ 5 & 4 & 3 \\ 2 & 7 & 3 \end{pmatrix}$$
  - Row sums: $5+1+6 = 5+4+3 = 2+7+3 = 12$.
  - Column sums: $5+5+2 = 1+4+7 = 6+3+3 = 12$.
  - Diagonal sums: $5+4+3 = 6+4+2 = 12$.

#### Example 2:
- **Input:** `grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]`
- **Output:** `2`
- **Explanation:**
  - The $2 \times 2$ square of all $3$'s has row, column, and diagonal sums equal to $6$.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $1 \le m, n \le 50$
- $1 \le \text{grid}[i][j] \le 10^6$

---

## Topics and Tags

- **Array**
- **Matrix**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Reverse Search & Early Termination

1. **Greedy Search by Size:**
   - The maximum possible side length is $\min(m, n) \le 50$.
   - Because every $1 \times 1$ subgrid is trivially a magic square, the answer is always at least $1$.
   - If we iterate downwards from $k = \min(m, n)$ to $2$, the very first $k$ for which a valid magic square exists is guaranteed to be the largest possible size! We can immediately return $k$.

2. **Prefix Sums for $\mathcal{O}(1)$ Row & Column Querying:**
   - Precompute horizontal 1D prefix sums for each row:
     $$\text{rowSum}[r][c + 1] = \text{rowSum}[r][c] + \text{grid}[r][c]$$
     Sum of row $r$ from col $c$ to $c + k - 1$ is $\text{rowSum}[r][c + k] - \text{rowSum}[r][c]$.
   - Precompute vertical 1D prefix sums for each column:
     $$\text{colSum}[r + 1][c] = \text{colSum}[r][c] + \text{grid}[r][c]$$
     Sum of column $c$ from row $r$ to $r + k - 1$ is $\text{colSum}[r + k][c] - \text{colSum}[r][c]$.

3. **Validating a Candidate $k \times k$ Square:**
   - Set the expected sum to the first row's sum: $S = \text{rowSum}[r][c + k] - \text{rowSum}[r][c]$.
   - Check the remaining $k - 1$ rows in $\mathcal{O}(k)$ time.
   - Check all $k$ columns in $\mathcal{O}(k)$ time.
   - Sum the main diagonal and anti-diagonal in $\mathcal{O}(k)$ time.
   - Total verification takes only $\mathcal{O}(k)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\min(m, n) \cdot m \cdot n)$
  - Prefix sums take $\mathcal{O}(m \cdot n)$ precomputation.
  - For each size $k \in [2, \min(m, n)]$, there are $(m - k + 1)(n - k + 1)$ candidate positions.
  - Checking each candidate takes $\mathcal{O}(k)$ operations.
  - With $m, n \le 50$, the maximum number of operations is under $2.5 \times 10^5$, executing in $\approx 2\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$ for prefix sum tables `rowSum` and `colSum`.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
