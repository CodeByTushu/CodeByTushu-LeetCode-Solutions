# LeetCode 836: Rectangle Overlap

- **Publication Date:** 14 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/rectangle-overlap/](https://leetcode.com/problems/rectangle-overlap/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Kuq9-R9aqFQ?si=bsQeTqs_FlWmnvCF)

---

## Problem Summary

An axis-aligned rectangle is represented as a list `[x1, y1, x2, y2]`, where `(x1, y1)` is the coordinate of its bottom-left corner, and `(x2, y2)` is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

Two rectangles overlap if the area of their intersection is **positive**. To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two axis-aligned rectangles `rec1` and `rec2`, return `true` if they overlap, otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `rec1 = [0,0,2,2], rec2 = [1,1,3,3]`
- **Output:** `true`
- **Explanation:**
  The rectangles overlap in the region with corners at `(1,1)`, `(2,1)`, `(1,2)`, and `(2,2)`. This region has positive area, so the rectangles overlap.

#### Example 2:
- **Input:** `rec1 = [0,0,1,1], rec2 = [1,0,2,1]`
- **Output:** `false`
- **Explanation:**
  The rectangles share the vertical edge where $x = 1$, but they do not have any common interior region. Since their intersection has zero area, the rectangles do not overlap.

#### Example 3:
- **Input:** `rec1 = [0,0,1,1], rec2 = [2,2,3,3]`
- **Output:** `false`
- **Explanation:**
  The rectangles are completely separate. Rectangle `rec1` ends at $x = 1$ and $y = 1$, while `rec2` starts at $x = 2$ and $y = 2$. Therefore, they have no common points and do not overlap.

---

### Constraints

- `rec1.length == 4`
- `rec2.length == 4`
- $-10^9 \le \text{rec1}[i], \text{rec2}[i] \le 10^9$
- `rec1` and `rec2` represent a valid rectangle with a non-zero area.

---

## Topics and Tags

- **Math**
- **Geometry**

---

## Approach & Intuition

### Intuition (Non-Overlapping Complement):
Two axis-aligned rectangles fail to overlap if and only if one rectangle is completely positioned to the side or above/below the other.

Specifically, `rec2` does **not** overlap with `rec1` if any of the following 4 conditions hold:
1. **`rec2` is strictly to the right of `rec1`:** $\text{rec2}[0] \ge \text{rec1}[2]$
2. **`rec2` is strictly to the left of `rec1`:** $\text{rec2}[2] \le \text{rec1}[0]$
3. **`rec2` is strictly above `rec1`:** $\text{rec2}[1] \ge \text{rec1}[3]$
4. **`rec2` is strictly below `rec1`:** $\text{rec2}[3] \le \text{rec1}[1]$

Because rectangles that touch along edges or corners have zero intersection area, the equality signs ($\ge$ and $\le$) correctly classify boundaries as non-overlapping.

### Overlap Condition:
The rectangles overlap if and only if **none** of the above four conditions are true:
$$\text{overlap} = \neg (\text{rec2}[0] \ge \text{rec1}[2] \lor \text{rec2}[2] \le \text{rec1}[0] \lor \text{rec2}[1] \ge \text{rec1}[3] \lor \text{rec2}[3] \le \text{rec1}[1])$$

This direct comparison checks the overlap in constant time with clean boolean logic.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$
  - Requires only 4 constant-time comparisons.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No auxiliary data structures or dynamic memory allocations are used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/Kuq9-R9aqFQ?si=bsQeTqs_FlWmnvCF](https://youtu.be/Kuq9-R9aqFQ?si=bsQeTqs_FlWmnvCF)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
