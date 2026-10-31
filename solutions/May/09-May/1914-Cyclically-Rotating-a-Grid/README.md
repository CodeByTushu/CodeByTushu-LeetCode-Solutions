# LeetCode 1914: Cyclically Rotating a Grid

- **Publication Date:** 09 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/cyclically-rotating-a-grid/](https://leetcode.com/problems/cyclically-rotating-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/BRch78xZcf0)

---

## Problem Summary

You are given an $m \times n$ integer matrix `grid`, where both $m$ and $n$ are **even integers**, and an integer $k$.

The matrix is composed of several concentric rectangular layers. A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the **counter-clockwise** direction.

Return the matrix after applying $k$ cyclic rotations to each layer.

---

### Examples

#### Example 1:
- **Input:** `grid = [[40,10],[30,20]], k = 1`
- **Output:** `[[10,20],[40,30]]`
- **Explanation:** 
  - The elements of the single outer layer are rotated counter-clockwise by $1$ step:
    - $(0, 0)$ [value 40] moves to $(1, 0)$
    - $(1, 0)$ [value 30] moves to $(1, 1)$
    - $(1, 1)$ [value 20] moves to $(0, 1)$
    - $(0, 1)$ [value 10] moves to $(0, 0)$

#### Example 2:
- **Input:** `grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2`
- **Output:** `[[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]`
- **Explanation:** 
  - The matrix consists of two concentric layers (outer boundary and inner $2 \times 2$ block).
  - Each layer is independently rotated counter-clockwise by $2$ positions.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $2 \le m, n \le 50$
- Both $m$ and $n$ are **even** integers.
- $1 \le \text{grid}[i][j] \le 5000$
- $1 \le k \le 10^9$

---

## Topics and Tags

- **Array**
- **Matrix**
- **Simulation**

---

## Approach & Intuition

### 1. Concentric Layer Decomposition

Because both $m$ and $n$ are even integers, the grid naturally decomposes into exactly $\min(m, n) / 2$ concentric rectangular layers:
- Layer index $l$ spans rows from $r_1 = l$ to $r_2 = m - 1 - l$, and columns from $c_1 = l$ to $c_2 = n - 1 - l$.
- Each layer is completely independent of the others during cyclic rotation.

### 2. Perimeter Extraction in Counter-Clockwise Order

To rotate in a counter-clockwise direction, we trace the perimeter of layer $l$ in counter-clockwise order:
1. **Left Column (Top $\to$ Bottom):** from $(r_1, c_1)$ down to $(r_2, c_1)$.
2. **Bottom Row (Left $\to$ Right):** from $(r_2, c_1 + 1)$ across to $(r_2, c_2)$.
3. **Right Column (Bottom $\to$ Top):** from $(r_2 - 1, c_2)$ up to $(r_1, c_2)$.
4. **Top Row (Right $\to$ Left):** from $(r_1, c_2 - 1)$ leftwards to $(r_1, c_1 + 1)$.

The total number of elements in layer $l$ is:
$$L = 2 \times (r_2 - r_1 + c_2 - c_1)$$

### 3. Modular Shift & In-Place Writeback

Since $k$ can be as large as $10^9$, rotating step-by-step would cause a Time Limit Exceeded (TLE). However, rotating an array of length $L$ by $L$ steps brings every element back to its starting position.

Hence, the effective rotation shift is simply:
$$\text{shift} = k \pmod L$$

For each element at original index $i$ in our counter-clockwise coordinate list:
- Its new position in the rotated matrix is the coordinate at index $(i + \text{shift}) \pmod L$.
- We store the layer's original values in an auxiliary 1D array of size $L$ and write them directly into their rotated target cells in `grid`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \times n)$
  - Each cell in the matrix belongs to exactly one layer.
  - Extracting elements takes $\mathcal{O}(m \times n)$ total operations.
  - Writing the shifted elements back takes $\mathcal{O}(m \times n)$ operations.
  - Total time complexity is strictly linear in the number of matrix cells $\mathcal{O}(m \times n)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(m + n)$
  - Only one layer buffer of size $L \le 2(m + n)$ is allocated at any given time.
  - The rotation is performed directly within the input `grid`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/BRch78xZcf0](https://youtu.be/BRch78xZcf0)
