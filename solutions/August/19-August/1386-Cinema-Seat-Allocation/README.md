# LeetCode 1386: Cinema Seat Allocation

- **Publication Date:** 19 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/cinema-seat-allocation/](https://leetcode.com/problems/cinema-seat-allocation/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Sz2EF170fTQ?si=yvjT3IAAwchLylJy)

---

## Problem Summary

A cinema has $n$ rows of seats, numbered from $1$ to $n$. Each row has $10$ seats, numbered from $1$ to $10$.

You are given a 2D integer array `reservedSeats`, where `reservedSeats[i] = [row_i, seat_i]` means that seat `seat_i` in row `row_i` is already reserved.

A four-person family group must be assigned to four contiguous seats in the same row. In accordance with the cinema aisle layout, a four-person group can be seated in one of the following three candidate seat blocks:
- **Left block:** seats `2, 3, 4, 5`
- **Middle block:** seats `4, 5, 6, 7`
- **Right block:** seats `6, 7, 8, 9`

A block can be used only if none of its seats are reserved. Each seat can be assigned to at most one group.

Return the **maximum number of four-person families** that can be assigned seats.

---

### Examples

#### Example 1:

- **Input:** `n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]`
- **Output:** `4`
- **Explanation:**
  - Row 1: Seats 2, 3, 8 are reserved. Middle block `[4, 5, 6, 7]` is completely free $\implies$ 1 family.
  - Row 2: Seat 6 is reserved. Left block `[2, 3, 4, 5]` is free $\implies$ 1 family.
  - Row 3: Seats 1 and 10 are reserved. Both Left `[2, 3, 4, 5]` and Right `[6, 7, 8, 9]` are completely free $\implies$ 2 families.
  - Total families accommodated = $1 + 1 + 2 = 4$.

#### Example 2:

- **Input:** `n = 2, reservedSeats = [[2,1],[1,8],[2,6]]`
- **Output:** `2`

#### Example 3:

- **Input:** `n = 4, reservedSeats = [[4,3],[1,4],[4,6],[1,7]]`
- **Output:** `4`

---

### Constraints

- $1 \le n \le 10^9$
- $1 \le \text{reservedSeats.length} \le \min(10 \cdot n, 10^4)$
- $\text{reservedSeats}[i] = [\text{row}_i, \text{seat}_i]$
- $1 \le \text{row}_i \le n$
- $1 \le \text{seat}_i \le 10$
- All $\text{reservedSeats}[i]$ are distinct.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Greedy**
- **Bit Manipulation**

---

## Intuition and Approach

### 1. Structure of a 10-Seat Cinema Row:
Notice that aisle locations partition each 10-seat row into three candidate blocks for 4-person groups:
- **Left Block:** `[2, 3, 4, 5]`
- **Middle Block:** `[4, 5, 6, 7]`
- **Right Block:** `[6, 7, 8, 9]`

Seats $1$ and $10$ never participate in any valid 4-person block and can be disregarded when checking block availability.

In any single row:
- The maximum number of groups that can fit is **2**: achieved if and only if **both Left and Right blocks** are unreserved.
- If we cannot place 2 groups, we can place **at most 1 group** if **any** of the Left, Middle, or Right blocks is completely unreserved.
- If all three blocks overlap with at least one reserved seat, **0 groups** can be placed.

### 2. Large $n$ Optimization via Hash Map & Bitmasks:
Because $n$ can be as large as $10^9$, we cannot iterate row-by-row. However, $|\text{reservedSeats}| \le 10^4$, meaning at most $10^4$ rows have any reservations at all:
- Any completely unreserved row can always accommodate **2 families**.
- We use a hash map `rowMask` to map each modified row index to a 10-bit integer bitmask, where bit `seat` is set if that seat is reserved.
- For bitmask evaluation:
  - `leftBlock = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5)`
  - `midBlock = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7)`
  - `rightBlock = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9)`

For each row in `rowMask`:
- If `(mask & leftBlock) == 0 && (mask & rightBlock) == 0`: $+2$ families.
- Else if `(mask & leftBlock) == 0 || (mask & midBlock) == 0 || (mask & rightBlock) == 0`: $+1$ family.

Finally, for the remaining empty rows:
$$\text{total} += (n - \text{rowMask.size()}) \times 2$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M)$
  - Let $M$ be the number of reserved seats ($M \le 10^4$).
  - We insert each reservation into a hash map in $\mathcal{O}(1)$ average time.
  - We iterate through at most $M$ unique rows in the map, performing $\mathcal{O}(1)$ bitwise operations per row.
  - Overall time is $\mathcal{O}(M)$, running in $\approx 5\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(U)$
  - Let $U$ be the number of unique rows with reservations ($U \le M \le 10^4$).
  - The hash map stores at most $U$ entries, consuming $\mathcal{O}(U)$ auxiliary memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
