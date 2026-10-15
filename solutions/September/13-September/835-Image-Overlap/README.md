# LeetCode 835: Image Overlap

- **Publication Date:** 13 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/image-overlap/](https://leetcode.com/problems/image-overlap/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/dcYVhJnlWtc?si=XIQ6S2f17pVRYlpc)

---

## Problem Summary

You are given two images, `img1` and `img2`, represented as binary, square matrices of size $n \times n$. A binary matrix has only `0`s and `1`s as values.

We **translate** one image however we choose by sliding all the `1` bits left, right, up, and/or down any number of units. We then place it on top of the other image. We can then calculate the **overlap** by counting the number of positions that have a `1` in **both** images.

**Note:**
- A translation does **not** include any kind of rotation.
- Any `1` bits that are translated outside of the matrix borders are erased.
- Return the **largest possible overlap**.

---

### Examples

#### Example 1:
```text
  img1:             img2:
  1  1  0           0  0  0
  0  1  0           0  1  1
  0  1  0           0  0  1
```
- **Input:** `img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]`
- **Output:** `3`
- **Explanation:**
  Translate `img1` to the right by 1 unit and down by 1 unit:
  ```text
  0  0  0
  0  1  1
  0  0  1
  ```
  The number of positions that have a `1` in both images is `3`.

#### Example 2:
- **Input:** `img1 = [[1]], img2 = [[1]]`
- **Output:** `1`

#### Example 3:
- **Input:** `img1 = [[0]], img2 = [[0]]`
- **Output:** `0`

---

### Constraints

- $n == \text{img1.length} == \text{img1}[i].\text{length}$
- $n == \text{img2.length} == \text{img2}[i].\text{length}$
- $1 \le n \le 30$
- $\text{img1}[i][j]$ is either `0` or `1`.
- $\text{img2}[i][j]$ is either `0` or `1`.

---

## Topics and Tags

- **Array**
- **Matrix**

---

## Approach & Intuition (2D Translation Simulation)

1. **Shift Vectors Exploration**:
   - Translating an $n \times n$ matrix involves a horizontal shift $\Delta x$ and a vertical shift $\Delta y$.
   - Any horizontal shift greater than or equal to $n$ in magnitude moves the entire matrix out of bounds. Thus, $\Delta x \in [-(n - 1), n - 1]$.
   - Similarly, vertical shift $\Delta y \in [-(n - 1), n - 1]$.
   - This produces exactly $(2n - 1) \times (2n - 1)$ possible translation offsets $(\Delta x, \Delta y)$.

2. **Overlap Calculation for Each $(\Delta x, \Delta y)$**:
   - For a fixed translation $(\Delta x, \Delta y)$, iterate through each cell $(r, c)$ of `img1`.
   - The translated coordinate in `img2` is:
     $$\text{nr} = r + \Delta y, \quad \text{nc} = c + \Delta x$$
   - Check if $(\text{nr}, \text{nc})$ lies within valid matrix boundaries $[0, n - 1] \times [0, n - 1]$.
   - If `img1[r][c] == 1` and `img2[nr][nc] == 1`, increment the overlapping count.

3. **Global Maximum**:
   - Track and return the maximum overlap found over all $(2n - 1)^2$ possible shift configurations.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^4)$
  - There are $(2N - 1)^2$ translation shifts.
  - For each shift, checking all cells in the matrix takes $N^2$ iterations.
  - Total operations: $(2N - 1)^2 \times N^2$. For the maximum constraint $N = 30$, this is approximately $59^2 \times 900 \approx 3.1 \times 10^6$ operations, which easily runs in $\approx 10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No auxiliary data structures are allocated; only scalar counters and loop variables are utilized.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/dcYVhJnlWtc?si=XIQ6S2f17pVRYlpc](https://youtu.be/dcYVhJnlWtc?si=XIQ6S2f17pVRYlpc)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
