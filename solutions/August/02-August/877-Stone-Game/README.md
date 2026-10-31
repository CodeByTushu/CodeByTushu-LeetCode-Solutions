# LeetCode 877: Stone Game

- **Publication Date:** 02 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/stone-game/](https://leetcode.com/problems/stone-game/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0oUOGGbZLTw?si=4U6o2FHprhwsdGIf)

---

## Problem Summary

Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive integer number of stones `piles[i]`.

The objective of the game is to end with the most stones. The total number of stones across all the piles is odd, so there are no ties.

Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either from the beginning or from the end of the row. This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alice and Bob play optimally, return `true` if Alice wins the game, or `false` if Bob wins.

---

### Examples

#### Example 1:

- **Input:** `piles = [5,3,4,5]`
- **Output:** `true`
- **Explanation:**
  - Alice starts first, and can only take the first `5` or the last `5`.
  - Say she takes the first `5`, so that the row becomes `[3, 4, 5]`.
  - If Bob takes `3`, then the board is `[4, 5]`, and Alice takes `5` to win with `10` points.
  - If Bob takes the last `5`, then the board is `[3, 4]`, and Alice takes `4` to win with `9` points.
  - This demonstrates that taking the first `5` was a winning move for Alice, so return `true`.

#### Example 2:

- **Input:** `piles = [3,7,2,3]`
- **Output:** `true`

---

### Constraints

- $2 \le \text{piles.length} \le 500$
- `piles.length` is even.
- $1 \le \text{piles}[i] \le 500$
- $\sum \text{piles}[i]$ is odd.

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Game Theory**

---

## Intuition and Approach

### 1. Minimax & Relative Score Difference (Interval DP):
In a zero-sum turn-based game, we can model the game state using the **relative advantage**:
$$\text{Relative Score} = \text{Stones picked by Current Player} - \text{Stones picked by Opponent}$$

Let `dp[i][j]` represent the maximum relative score the current player can achieve from the subarray `piles[i..j]`.

- **Base Cases (subarrays of length 1):**
  When only one pile `piles[i]` remains:
  $$\text{dp}[i][i] = \text{piles}[i]$$
- **State Transition (subarrays of length $\ge 2$):**
  The player can pick either the leftmost pile `piles[i]` or the rightmost pile `piles[j]`:
  1. Pick `piles[i]`: The opponent faces `piles[i + 1..j]` with advantage `dp[i + 1][j]`. Net gain is:
     $$\text{piles}[i] - \text{dp}[i + 1][j]$$
  2. Pick `piles[j]`: The opponent faces `piles[i..j - 1]` with advantage `dp[i][j - 1]`. Net gain is:
     $$\text{piles}[j] - \text{dp}[i][j - 1]$$
  Under optimal play:
  $$\text{dp}[i][j] = \max(\text{piles}[i] - \text{dp}[i + 1][j],\; \text{piles}[j] - \text{dp}[i][j - 1])$$

- **Winning Condition:**
  Since total stones is odd (no ties possible), Alice wins if `dp[0][n - 1] > 0`.

### 2. Mathematical Game Theory Insight ($\mathcal{O}(1)$):
Notice the two crucial problem constraints:
1. `piles.length` is **even**.
2. Total sum of stones is **odd**.

Because the number of piles is even, all piles can be partitioned into **even indices** (`0, 2, 4, ...`) and **odd indices** (`1, 3, 5, ...`).
- $\sum \text{piles}_{\text{even}} \ne \sum \text{piles}_{\text{odd}}$ because the total sum is odd.
- Alice starts first. If she chooses `piles[0]`, Bob is forced to choose from odd positions (`piles[1]` or `piles[n - 1]`). Alice can continue picking only even-indexed piles throughout the game.
- Similarly, Alice could choose `piles[n - 1]` initially to take only odd-indexed piles.
- Alice can determine in advance which group (even or odd indices) has a strictly larger sum and choose that exact strategy. Thus, Alice **always** wins under optimal play, and `return true;` is mathematically guaranteed!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$ for the interval DP implementation ($\mathcal{O}(1)$ via mathematical deduction).
  - Computing all interval lengths from $2$ to $N$ takes $\frac{N(N - 1)}{2}$ state evaluations. With $N \le 500$, $N^2 \approx 2.5 \times 10^5$ operations finish in $< 10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$ for the 2D DP table (can be compressed to $\mathcal{O}(N)$ space).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
