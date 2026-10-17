# LeetCode 3551: Minimum Swaps to Sort by Digit Sum

- **Publication Date:** 17 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum/](https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/jjMwisPTHhE?si=880_8v7Hdqx7VLOv)

---

## Problem Summary

You are given an array `nums` of distinct positive integers. You need to sort the array in increasing order based on the sum of the digits of each number. If two numbers have the same digit sum, the smaller number should appear first in the sorted order.

Return the **minimum number of swaps** required to rearrange `nums` into this sorted order. A swap is defined as exchanging the values at two distinct positions in the array.

---

### Examples

#### Example 1:
- **Input:** `nums = [37, 100]`
- **Output:** `1`
- **Explanation:**
  - Compute the digit sum for each integer: `[3 + 7 = 10, 1 + 0 + 0 = 1]` $\to$ `[10, 1]`
  - Sort the integers based on digit sum: `[100, 37]`. Swap `37` with `100` to obtain the sorted order.
  - Thus, the minimum number of swaps required is `1`.

#### Example 2:
- **Input:** `nums = [22, 14, 33, 7]`
- **Output:** `0`
- **Explanation:**
  - Compute the digit sums: `[4, 5, 6, 7]`
  - Sorted order: `[22, 14, 33, 7]`
  - The array is already in sorted order, so `0` swaps are required.

#### Example 3:
- **Input:** `nums = [18, 43, 34, 16]`
- **Output:** `2`
- **Explanation:**
  - Digit sums: `[9, 7, 7, 7]`
  - Target sorted order: `[16, 34, 43, 18]`
  - Swap `18` with `16` and `43` with `34` to achieve the sorted order in `2` swaps.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- `nums` consists of distinct positive integers.

---

## Topics and Tags

- *(Unassigned / Pending)*

---

## Approach & Intuition

1. **Target Position Determination**:
   - For every element $x \in \text{nums}$, calculate its digit sum: $\sum \text{digits}(x)$.
   - Create an index array $[0, 1, \dots, n-1]$ and sort the indices using a custom comparator:
     - Primary key: $\text{digit\_sum}[\text{idx}[i]]$ ascending.
     - Secondary key: $\text{nums}[\text{idx}[i]]$ ascending.
   - The sorted index array maps each position in the sorted array to its original position in $\text{nums}$.

2. **Permutation Cycle Decomposition**:
   - The problem of finding the minimum number of swaps to reach target order can be modeled as cycle decomposition of a permutation graph.
   - We construct directed edges from each index $i$ to where the element at index $i$ must go: $i \to \text{idx}[i]$.
   - This partitions the $n$ elements into disjoint cycles:
     - If an element is already in place, it forms a trivial cycle of length $1$ (requires $0$ swaps).
     - For any cycle of length $K$, exactly $K - 1$ swaps are necessary and sufficient to place all $K$ elements in their correct destinations.

3. **Algorithm**:
   - Maintain a boolean `visited` array of size $n$.
   - Iterate through $i \in [0, n - 1]$:
     - If $i$ is unvisited and not a fixed point ($\text{idx}[i] \ne i$), trace the cycle until returning to an already visited node.
     - Increment `swaps` by $\text{cycle\_length} - 1$.
   - Return the total number of swaps.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Computing digit sums takes $\mathcal{O}(N \log_{10}(\max(\text{nums}))) = \mathcal{O}(N)$ since $\text{nums}[i] \le 10^9$ has at most 10 digits.
  - Sorting the index array takes $\mathcal{O}(N \log N)$ time.
  - Cycle detection visits each node and edge exactly once, taking $\mathcal{O}(N)$ time.
  - Overall time complexity is $\mathcal{O}(N \log N)$, running in $< 150\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing digit sums, index permutations, and visited tracking arrays requires $\mathcal{O}(N)$ memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/jjMwisPTHhE?si=880_8v7Hdqx7VLOv](https://youtu.be/jjMwisPTHhE?si=880_8v7Hdqx7VLOv)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
