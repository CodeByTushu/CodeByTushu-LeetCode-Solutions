# LeetCode 1569: Number of Ways to Reorder Array to Get Same BST

- **Publication Date:** 18 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/](https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ivpejwbyliY?si=Dk7VL6VZPP0j9mHQ)

---

## Problem Summary

Given an array `nums` that represents a permutation of integers from `1` to `n`. We are going to construct a binary search tree (BST) by inserting the elements of `nums` in order into an initially empty BST. Find the number of different ways to reorder `nums` so that the constructed BST is identical to that formed from the original array `nums`.

- For example, given `nums = [2,1,3]`, we will have `2` as the root, `1` as a left child, and `3` as a right child. The array `[2,3,1]` also yields the same BST but `[3,2,1]` yields a different BST.

Return the number of ways to reorder `nums` such that the BST formed is identical to the original BST formed from `nums`.

Since the answer may be very large, return it **modulo $10^9 + 7$**.

---

### Examples

#### Example 1:
- **Input:** `nums = [2,1,3]`
- **Output:** `1`
- **Explanation:**
  We can reorder `nums` to be `[2,3,1]` which will yield the same BST. There are no other ways to reorder `nums` which will yield the same BST.

#### Example 2:
- **Input:** `nums = [3,4,5,1,2]`
- **Output:** `5`
- **Explanation:**
  The following 5 arrays will yield the same BST:
  - `[3,1,2,4,5]`
  - `[3,1,4,2,5]`
  - `[3,1,4,5,2]`
  - `[3,4,1,2,5]`
  - `[3,4,1,5,2]`

#### Example 3:
- **Input:** `nums = [1,2,3]`
- **Output:** `0`
- **Explanation:**
  There are no other ways to reorder `nums` to yield the same BST.

---

### Constraints

- $1 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le \text{nums.length}$
- All integers in `nums` are distinct.

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Tree**
- **Combinatorics**
- **Binary Tree**
- **Recursion**
- **Modular Arithmetic**

---

## Approach & Intuition

1. **Root Invariant in BST Insertion**:
   - The first element of any sequence `nums[0]` is always inserted as the root of the current subtree.
   - All subsequent elements smaller than the root belong to the **left subtree**.
   - All subsequent elements greater than the root belong to the **right subtree**.
   - The relative ordering among elements in the left subtree must be preserved internally, and the relative ordering among elements in the right subtree must also be preserved internally.

2. **Interleaving Left and Right Subtrees (Combinatorics)**:
   - If the left subtree contains $L$ elements and the right subtree contains $R$ elements, there are $L + R$ total positions to fill after the root.
   - Any valid ordering corresponds to choosing $L$ positions out of $L + R$ for the left subtree elements (which uniquely fixes the remaining $R$ positions for the right subtree):
     $$\binom{L + R}{L} = \binom{L + R}{R}$$
   - By multiplying with the recursive ways to arrange the left subtree and the right subtree:
     $$\text{ways}(T) = \binom{L + R}{L} \times \text{ways}(\text{left}) \times \text{ways}(\text{right}) \pmod{10^9 + 7}$$

3. **Subtracting Original Sequence**:
   - The problem asks for the number of *reorderings* (other than the initial given permutation).
   - Therefore, the final result is:
     $$(\text{total\_ways} - 1 + \text{MOD}) \pmod{\text{MOD}}$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - Precomputing Pascal's triangle for combination numbers $\binom{n}{k}$ up to $N = 1000$ takes $\mathcal{O}(N^2)$ time.
  - Partitioning the array into left and right subtrees takes $\mathcal{O}(N)$ per level. In the worst case (skewed tree), the recursion depth is $\mathcal{O}(N)$, giving $\mathcal{O}(N^2)$ overall.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - Storing Pascal's triangle combinations takes $\mathcal{O}(N^2)$ space (or $\mathcal{O}(N)$ with recursion call stack and subarray partitions).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ivpejwbyliY?si=Dk7VL6VZPP0j9mHQ](https://youtu.be/ivpejwbyliY?si=Dk7VL6VZPP0j9mHQ)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
