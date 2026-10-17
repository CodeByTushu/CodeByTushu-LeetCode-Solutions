# LeetCode 1563: Stone Game V

- **Publication Date:** 17 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/stone-game-v/](https://leetcode.com/problems/stone-game-v/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/OdLAqBQsvhk?si=iZQTtgItQbrJVag3)

---

## Problem Summary

There are several stones arranged in a row, and each stone has an associated value given in the array `stoneValue`.

In each round of the game, Alice divides the row into **two non-empty rows** (a left row and a right row). Then Bob calculates the sum of values of each row:
- Bob throws away the row with the **maximum value**, and Alice's score increases by the value of the **remaining row**.
- If the values of the two rows are **equal**, Bob lets Alice decide which row to throw away.
- The next round continues recursively with the remaining row.
- The game ends when there is only **one stone remaining**. Alice's score is initially zero.

Return the **maximum score** that Alice can obtain.

---

### Examples

#### Example 1:

- **Input:** `stoneValue = [6,2,3,4,5,5]`
- **Output:** `18`
- **Explanation:**
  - Round 1: Alice divides the row into `[6,2,3]` (sum = 11) and `[4,5,5]` (sum = 14). Bob throws away the right row. Alice's score becomes $11$, and the remaining row is `[6,2,3]`.
  - Round 2: Alice divides `[6,2,3]` into `[6]` (sum = 6) and `[2,3]` (sum = 5). Bob throws away the left row. Alice's score becomes $11 + 5 = 16$, and the remaining row is `[2,3]`.
  - Round 3: Alice divides `[2,3]` into `[2]` (sum = 2) and `[3]` (sum = 3). Bob throws away the right row. Alice's score becomes $16 + 2 = 18$.
  - The game ends because only one stone is remaining. Maximum score Alice obtains is $18$.

#### Example 2:

- **Input:** `stoneValue = [7,7,7,7,7,7,7]`
- **Output:** `28`

#### Example 3:

- **Input:** `stoneValue = [4]`
- **Output:** `0`
- **Explanation:** Only one stone remains initially, so the game ends with a score of 0.

---

### Constraints

- $1 \le \text{stoneValue.length} \le 500$
- $1 \le \text{stoneValue}[i] \le 10^6$

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Game Theory**

---

## Intuition and Approach

### 1. Interval Dynamic Programming
At any stage of the game, the remaining stones always form a contiguous subarray `stoneValue[l..r]`.
We define our dynamic programming state:
$$\text{solve}(l, r) = \text{maximum score Alice can obtain from the subsegment } \text{stoneValue}[l..r]$$

### 2. Base Case:
- When $l == r$, there is only one stone remaining. Alice cannot make any further splits, so:
  $$\text{solve}(l, l) = 0$$

### 3. Transition:
For a segment $[l, r]$, Alice can choose any partition point $m$ where $l \le m < r$, splitting the segment into:
- Left row: $[l, m]$ with sum $S_{\text{left}}$
- Right row: $[m + 1, r]$ with sum $S_{\text{right}}$

Using a precomputed prefix sum array `prefixSum`, we can compute:
$$S_{\text{left}} = \text{prefixSum}[m + 1] - \text{prefixSum}[l]$$
$$S_{\text{right}} = \text{prefixSum}[r + 1] - \text{prefixSum}[m + 1]$$

Depending on the relationship between $S_{\text{left}}$ and $S_{\text{right}}$:
1. **$S_{\text{left}} < S_{\text{right}}$:**
   Bob throws away the right row. Alice receives $S_{\text{left}}$ and continues with the left segment:
   $$\text{score} = S_{\text{left}} + \text{solve}(l, m)$$
2. **$S_{\text{left}} > S_{\text{right}}$:**
   Bob throws away the left row. Alice receives $S_{\text{right}}$ and continues with the right segment:
   $$\text{score} = S_{\text{right}} + \text{solve}(m + 1, r)$$
3. **$S_{\text{left}} == S_{\text{right}}$:**
   Bob lets Alice decide which row to keep. Alice greedily picks the choice yielding the higher total score:
   $$\text{score} = S_{\text{left}} + \max(\text{solve}(l, m), \text{solve}(m + 1, r))$$

We take the maximum score across all valid partition points $m \in [l, r - 1]$:
$$\text{solve}(l, r) = \max_{l \le m < r} (\text{score}_m)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^3)$
  - There are $\mathcal{O}(N^2)$ states $(l, r)$ with $0 \le l \le r < N$.
  - For each state, we iterate $m$ from $l$ to $r - 1$ ($\mathcal{O}(N)$ partition points).
  - Prefix sums provide $\mathcal{O}(1)$ subarray sum queries.
  - For $N \le 500$, total operations are bounded by $\approx \frac{N^3}{6} \approx 2 \times 10^7$, well within standard time limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - $N \times N$ 2D memoization table `memo[N][N]` to store subproblem solutions.
  - $\mathcal{O}(N)$ recursion call stack depth and prefix sum array.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
