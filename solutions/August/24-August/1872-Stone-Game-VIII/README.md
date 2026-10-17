# LeetCode 1872: Stone Game VIII

- **Publication Date:** 24 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/stone-game-viii/](https://leetcode.com/problems/stone-game-viii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3YcfHs8mapA?si=GNDPeRspfZmKpFXY)

---

## Problem Summary

Alice and Bob take turns playing a game, with **Alice starting first**.

There are `n` stones arranged in a row. On each player's turn, while the number of stones is **more than one**, they will perform the following steps:
1. Choose an integer $x > 1$, and remove the leftmost $x$ stones from the row.
2. Add the **sum** of the removed stones' values to the player's score.
3. Place a **new stone**, whose value is equal to that sum, on the left side of the row.

The game stops when **only one stone** is left in the row.

The score difference between Alice and Bob is $(\text{Alice's score} - \text{Bob's score})$. Alice's goal is to **maximize** the score difference, and Bob's goal is to **minimize** the score difference.

Given an integer array `stones` of length `n` where `stones[i]` represents the value of the $i$-th stone from the left, return the *score difference between Alice and Bob if they both play optimally*.

---

### Examples

#### Example 1:

- **Input:** `stones = [-1, 2, -3, 4, -5]`
- **Output:** `5`
- **Explanation:**
  - Alice removes the first 4 stones, adds $(-1) + 2 + (-3) + 4 = 2$ to her score, and places a stone of value $2$ on the left. The stones array becomes `[2, -5]`.
  - Bob removes the remaining 2 stones, adds $2 + (-5) = -3$ to his score, and places a stone of value $-3$ on the left. The stones array becomes `[-3]`.
  - The difference between their scores is $2 - (-3) = 5$.

#### Example 2:

- **Input:** `stones = [7, -6, 5, 10, 5, -2, -6]`
- **Output:** `13`
- **Explanation:**
  - Alice removes all stones, adds $7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13$ to her score, and places a stone of value $13$ on the left. `stones = [13]`.
  - The difference between their scores is $13 - 0 = 13$.

#### Example 3:

- **Input:** `stones = [-10, -12]`
- **Output:** `-22`
- **Explanation:**
  - Alice can only make one move, which is to remove both stones. She adds $(-10) + (-12) = -22$ to her score and places a stone of value $-22$ on the left. `stones = [-22]`.
  - The difference between their scores is $(-22) - 0 = -22$.

---

### Constraints

- $n == \text{stones.length}$
- $2 \le n \le 10^5$
- $-10^4 \le \text{stones}[i] \le 10^4$

---

## Topics and Tags

- **Game Theory**
- **Dynamic Programming**
- **Math**
- **Prefix Sum**
- **Array**

---

## Intuition and Approach

### 1. Invariance of Prefix Sums
Notice what happens when a player removes the leftmost $x$ stones ($x \ge 2$):
- Let `prefix[i]` be the prefix sum $\sum_{k=0}^{i} \text{stones}[k]$.
- When the first $x$ stones ($0$ to $x-1$) are merged, their sum is $\text{prefix}[x - 1]$.
- A new stone with value $\text{prefix}[x - 1]$ is placed at the front.
- If the next player subsequently chooses $y$ stones from the new array, they are taking the merged stone (which equals $\text{prefix}[x - 1]$) plus original stones from index $x$ up to some index $j$.
- Crucially, the sum of this new operation is:
  $$\text{prefix}[x - 1] + \sum_{k=x}^{j} \text{stones}[k] = \text{prefix}[j]$$
- **Key Realization:** Any move simply amounts to choosing an index $i \ge 1$. The player scores $\text{prefix}[i]$, and leaves behind a state where the next player must choose some index $j > i$.

### 2. Minimax Recurrence
Let $dp[i]$ denote the maximum score difference the current player can achieve given that the previous turn picked at index $i - 1$ (so the current player can pick any index from $i$ to $n - 1$):
- If the current player decides to pick index $i$, they collect $\text{prefix}[i]$ points, and the opponent will achieve a relative score difference of $dp[i + 1]$ from that point forward. Thus, the net difference is $\text{prefix}[i] - dp[i + 1]$.
- Alternatively, the current player can choose *not* to stop at index $i$, and instead choose some later index $\ge i + 1$. In that case, the best difference they can achieve is $dp[i + 1]$.
- Therefore, the transition is:
  $$dp[i] = \max(dp[i + 1],\; \text{prefix}[i] - dp[i + 1])$$

### 3. Base Case & Final Answer
- At index $n - 1$ (the last element), the player has no choice but to take all stones, so:
  $$dp[n - 1] = \text{prefix}[n - 1]$$
- We compute backwards from $i = n - 2$ down to $i = 1$.
- Because Alice must remove at least 2 stones on her very first move ($x \ge 2$), her choice starts at index $1$ (she can pick any $i \in [1, n - 1]$).
- Hence, the answer is simply $dp[1]$.
- We can maintain $dp$ in $\mathcal{O}(1)$ space using a single scalar variable during the backward iteration.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass of size $N$ to compute the prefix sums.
  - A single backward pass of size $N - 1$ to update the dynamic programming state.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$ (or $\mathcal{O}(1)$ if modifying the array in-place or computing prefix sum on the fly).
