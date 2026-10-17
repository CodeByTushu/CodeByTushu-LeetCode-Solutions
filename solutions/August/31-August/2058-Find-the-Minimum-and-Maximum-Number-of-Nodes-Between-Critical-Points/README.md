# LeetCode 2058: Find the Minimum and Maximum Number of Nodes Between Critical Points

- **Publication Date:** 31 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/](https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/yX_uc3LzluE?si=6Gf5JVhPpkHcBden)

---

## Problem Summary

A **critical point** in a linked list is defined as either a **local maxima** or a **local minima**.

- A node is a **local maxima** if the current node has a value **strictly greater** than the previous node and the next node.
- A node is a **local minima** if the current node has a value **strictly smaller** than the previous node and the next node.

Note that a node can only be a local maxima/minima if there exists **both** a previous node and a next node.

Given a linked list `head`, return an array of length 2 containing `[minDistance, maxDistance]` where `minDistance` is the minimum distance between any two distinct critical points and `maxDistance` is the maximum distance between any two distinct critical points. If there are fewer than two critical points, return `[-1, -1]`.

---

### Examples

#### Example 1:

- **Input:** `head = [3,1]`
- **Output:** `[-1,-1]`
- **Explanation:** There are no critical points in `[3,1]`.

#### Example 2:

- **Input:** `head = [5,3,1,2,5,1,2]`
- **Output:** `[1,3]`
- **Explanation:** There are three critical points:
  - Index 3 (`val = 1`): Local minima because $1 < 3$ and $1 < 2$.
  - Index 5 (`val = 5`): Local maxima because $5 > 2$ and $5 > 1$.
  - Index 6 (`val = 1`): Local minima because $1 < 5$ and $1 < 2$.
  - The minimum distance is between the fifth and sixth node: $6 - 5 = 1$.
  - The maximum distance is between the third and sixth node: $6 - 3 = 3$.

#### Example 3:

- **Input:** `head = [1,3,2,2,3,2,2,2,7]`
- **Output:** `[3,3]`
- **Explanation:** There are two critical points:
  - Index 2 (`val = 3`): Local maxima because $3 > 1$ and $3 > 2$.
  - Index 5 (`val = 3`): Local maxima because $3 > 2$ and $3 > 2$.
  - Both the minimum and maximum distances are between the second and fifth node: $5 - 2 = 3$.
  - Note that the last node is not considered a local maxima because it does not have a next node.

---

### Constraints

- The number of nodes in the list is in the range $[2, 10^5]$.
- $1 \le \text{Node.val} \le 10^5$

---

## Topics and Tags

- **Linked List**

---

## Intuition and Approach

### 1. Identifying Critical Points
We traverse the linked list maintaining pointers to the `prev` node, `curr` node, and examining `curr.next`. A node at index `index` (1-indexed) is a critical point if and only if:
- **Local Maxima:** `curr.val > prev.val` AND `curr.val > curr.next.val`
- **Local Minima:** `curr.val < prev.val` AND `curr.val < curr.next.val`

Neither the first node (no previous node) nor the last node (no next node) can ever be a critical point.

### 2. Distance Computation
If fewer than 2 critical points exist, we immediately return `[-1, -1]`.

When 2 or more critical points are identified:
- **Maximum Distance:** Since critical point indices are recorded in strictly ascending order, the maximum distance must always be between the first critical point and the last critical point:
  $$\text{maxDist} = \text{criticalPoints}[\text{size} - 1] - \text{criticalPoints}[0]$$
- **Minimum Distance:** In any sorted list of coordinates, the minimum pairwise distance is always achieved between adjacent/consecutive elements:
  $$\text{minDist} = \min_{1 \le i < \text{size}} (\text{criticalPoints}[i] - \text{criticalPoints}[i - 1])$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear traversal through the linked list visits each of the $N$ nodes once to detect critical points.
  - Computing the minimum and maximum distances requires a single linear scan over the list of $K$ critical points ($K < N$).
  - Total time complexity is strictly $\mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(K) \subseteq \mathcal{O}(N)$
  - Storing the indices of critical points takes at most $\mathcal{O}(N)$ auxiliary space in the worst case (e.g. alternating zig-zag list).
