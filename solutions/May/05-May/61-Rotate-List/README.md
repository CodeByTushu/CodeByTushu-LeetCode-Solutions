# LeetCode 61: Rotate List

- **Publication Date:** 05 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/rotate-list/](https://leetcode.com/problems/rotate-list/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/gjZTwxOHhUY)

---

## Problem Summary

Given the `head` of a linked list, rotate the list to the right by `k` places.

---

### Examples

#### Example 1:
```text
Original: 1 -> 2 -> 3 -> 4 -> 5
Rotate 1: 5 -> 1 -> 2 -> 3 -> 4
Rotate 2: 4 -> 5 -> 1 -> 2 -> 3
```
- **Input:** `head = [1,2,3,4,5]`, `k = 2`
- **Output:** `[4,5,1,2,3]`

#### Example 2:
```text
Original: 0 -> 1 -> 2
Rotate 1: 2 -> 0 -> 1
Rotate 2: 1 -> 2 -> 0
Rotate 3: 0 -> 1 -> 2
Rotate 4: 2 -> 0 -> 1
```
- **Input:** `head = [0,1,2]`, `k = 4`
- **Output:** `[2,0,1]`

---

### Constraints

- The number of nodes in the list is in the range `[0, 500]`.
- $-100 \le \text{Node.val} \le 100$
- $0 \le k \le 2 \times 10^9$

---

## Topics and Tags

- **Linked List**
- **Two Pointers**

---

## Approach & Intuition

### 1. Modulo Reduction on $k$

Rotating a list of length $L$ by $L$ steps brings the list back to its original configuration. Since $k$ can be as large as $2 \times 10^9$, we first calculate the length $L$ of the list and reduce $k$:
$$k = k \pmod{L}$$
If $k == 0$, or if the list has fewer than $2$ nodes (`head == null` or `head.next == null`), no rotation is needed and we return `head` directly.

### 2. Forming a Circular List

A very clean way to perform cyclic rotation on a singly linked list without extra pointers or arrays:
1. Traverse to the tail of the list while counting the total length $L$.
2. Connect `tail.next = head` to form a circular linked list.
3. The new head after rotating right by $k$ will be the node at position $L - k$ (1-indexed from the original head).
4. The node right before it (at position $L - k$ from `tail`) will become the **new tail**.
5. Advance $L - k$ steps from `tail` to reach the `newTail`.
6. Set `newHead = newTail.next`.
7. Break the cycle by setting `newTail.next = null`.
8. Return `newHead`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - First pass to determine the length $L$ and find `tail` takes $\mathcal{O}(N)$ time.
  - Second pass moves at most $L$ steps to find `newTail`.
  - Overall time complexity is $\mathcal{O}(N)$, which easily processes lists up to length $500$ in sub-millisecond time.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - The rotation is performed strictly in-place by updating node references without creating additional nodes or arrays.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/gjZTwxOHhUY](https://youtu.be/gjZTwxOHhUY)
