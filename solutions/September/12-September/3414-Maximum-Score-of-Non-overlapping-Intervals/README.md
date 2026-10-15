# LeetCode 3414: Maximum Score of Non-overlapping Intervals

- **Publication Date:** 12 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/](https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/bQDwhfF4AZE?si=-6KFXu8LPNqIobVx)

---

## Problem Summary

You are given a 2D integer array `intervals`, where `intervals[i] = [l_i, r_i, weight_i]`. Interval $i$ starts at position $l_i$ and ends at $r_i$, and has a weight of $\text{weight}_i$. 

You can choose **up to 4 non-overlapping intervals**. The **score** of the chosen intervals is defined as the total sum of their weights.

Return the **lexicographically smallest** array of at most 4 indices from `intervals` with **maximum score**, representing your choice of non-overlapping intervals.

**Note:**
- Two intervals are said to be **non-overlapping** if they do not share any points. In particular, intervals sharing a boundary point ($r_a = l_b$) are considered **overlapping**.
- The resulting list of indices must be returned in **sorted order**.

---

### Examples

#### Example 1:
- **Input:** `intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]`
- **Output:** `[2,3]`
- **Explanation:**
  You can choose the intervals with indices 2 and 3 with respective weights of 5 and 3. Total weight = 8.

#### Example 2:
- **Input:** `intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]`
- **Output:** `[1,3,5,6]`
- **Explanation:**
  You can choose intervals with indices 1, 3, 5, and 6 with respective weights of 7, 6, 3, and 5. Total weight = 21.

---

### Constraints

- $1 \le \text{intervals.length} \le 5 \times 10^4$
- $\text{intervals}[i].\text{length} == 3$
- $\text{intervals}[i] = [l_i, r_i, \text{weight}_i]$
- $1 \le l_i \le r_i \le 10^9$
- $1 \le \text{weight}_i \le 10^9$

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Dynamic Programming**
- **Sorting**

---

## Approach & Intuition (Sorting + Binary Search + Prefix DP)

1. **Interval Sorting**:
   - To make non-overlapping decisions sequentially, sort all intervals by their right endpoints $r_i$ in ascending order:
     $$\text{sort key: } (r_i, l_i, \text{weight}_i, \text{originalIndex})$$
   - Sorting by right endpoints ensures that any non-overlapping preceding interval finishes strictly before the start of interval $i$ ($r_j < l_i$).

2. **Binary Search for Predecessors**:
   - For interval $i$ starting at $l_i$, use binary search (`bisect_left` or `lower_bound`) on the sorted right endpoints to locate the rightmost interval $j < i$ satisfying $r_j < l_i$.
   - Let $p = j + 1$ denote the number of candidate intervals in the prefix that do not overlap with interval $i$.

3. **Prefix Dynamic Programming**:
   - Let $\text{posScore}[i + 1][k]$ be the maximum score achievable using exactly $k$ non-overlapping intervals ($1 \le k \le 4$) from the first $i$ intervals.
   - Let $\text{posIdx}[i + 1][k]$ be the lexicographically smallest sorted array of chosen original indices achieving that score.
   - For each interval $i$:
     - **Option 1 (Exclude interval $i$):**
       Inherit the best solution from prefix $i$:
       $$\text{posScore}[i + 1][k] = \text{posScore}[i][k]$$
       $$\text{posIdx}[i + 1][k] = \text{posIdx}[i][k]$$
     - **Option 2 (Include interval $i$):**
       Combine interval $i$ with the best $(k - 1)$ intervals from prefix $p$:
       $$\text{newScore} = \text{posScore}[p][k - 1] + \text{weight}_i$$
       $$\text{newIdx} = \text{sorted}(\text{posIdx}[p][k - 1] \cup \{\text{originalIndex}_i\})$$
     - Update $\text{posScore}[i + 1][k]$ if $\text{newScore}$ is strictly greater, or equal with a lexicographically smaller $\text{newIdx}$.

4. **Global Selection**:
   - Compare the best outcomes across all $k \in \{1, 2, 3, 4\}$ at prefix $n$, picking the combination with the maximum total score and breaking ties by lexicographical comparison.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting $N$ intervals takes $\mathcal{O}(N \log N)$.
  - For each of the $N$ intervals, binary search takes $\mathcal{O}(\log N)$.
  - Evaluating $K = 4$ transitions with fixed size-4 index arrays takes $\mathcal{O}(K \cdot K \log K) = \mathcal{O}(1)$ operations.
  - Overall time complexity is $\mathcal{O}(N \log N)$, easily executing well within the 2.0s time limit for $N = 50,000$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The DP table maintains states for $(N + 1) \times 5$, where each state holds a 64-bit score and an index array of length at most 4.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/bQDwhfF4AZE?si=-6KFXu8LPNqIobVx](https://youtu.be/bQDwhfF4AZE?si=-6KFXu8LPNqIobVx)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
