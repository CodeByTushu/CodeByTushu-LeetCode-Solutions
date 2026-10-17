# LeetCode 1510: Stone Game IV

- **Publication Date:** 10 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/stone-game-iv/](https://leetcode.com/problems/stone-game-iv/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/QFVxluA9TG4?si=QwKoR_unwgKplQOe)

---

## Problem Summary

Alice and Bob take turns playing a game, with Alice starting first.

Initially, there are `n` stones in a pile. On each player's turn, that player makes a move consisting of removing any **non-zero square number** of stones in the pile.

Also, if a player cannot make a move, he/she loses the game.

Given a positive integer `n`, return `true` if and only if Alice wins the game otherwise return `false`, assuming both players play optimally.

---

### Examples

#### Example 1:

- **Input:** `n = 1`
- **Output:** `true`
- **Explanation:** Alice can remove $1$ stone ($1^2 = 1$) winning the game immediately because Bob has no remaining stones and cannot make any move.

#### Example 2:

- **Input:** `n = 2`
- **Output:** `false`
- **Explanation:** Alice can only remove $1$ stone ($1^2 = 1$), leaving $1$ stone. Bob then removes the last stone ($1^2 = 1$) and wins the game ($2 \to 1 \to 0$).

#### Example 3:

- **Input:** `n = 4`
- **Output:** `true`
- **Explanation:** $n = 4$ is a perfect square ($2^2 = 4$). Alice can remove all $4$ stones in her first turn, leaving $0$ stones for Bob and winning immediately.

---

### Constraints

- $1 \le n \le 10^5$

---

## Topics and Tags

- **Math**
- **Dynamic Programming**
- **Game Theory**

---

## Intuition and Approach

### Combinatorial Game Theory & Winning/Losing Positions:
This is an impartial two-player normal play game under complete information.
- A position $i$ is a **winning position** (`true`) if there exists at least one legal move to a **losing position** (`false`) for the opponent.
- A position $i$ is a **losing position** (`false`) if every legal move leads only to **winning positions** for the opponent (or if no legal moves exist at all).

### Base Case:
- When $i = 0$, the player whose turn it is has no stones to remove and loses immediately:
  $$\text{dp}[0] = \text{false}$$

### Dynamic Programming Transition:
Let `dp[i]` denote whether the current player starting with $i$ stones can guarantee a win.

For any pile size $i$ from $1$ up to $n$:
1. Check every non-zero perfect square $k^2 \le i$ (where $k \ge 1$).
2. Removing $k^2$ stones leaves the opponent with $i - k^2$ stones.
3. If the opponent faces a losing state (`!dp[i - k * k]`), the current player can make this choice to force the opponent to lose:
   $$\text{dp}[i] = \text{true}$$
4. If after testing all $k^2 \le i$ no move leaves the opponent in a losing state, the current player is forced into a loss:
   $$\text{dp}[i] = \text{false}$$

Since Alice moves first starting with $n$ stones, the answer is simply `dp[n]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \sqrt{n})$
  - For each state $i$ ($1 \le i \le n$), we iterate $k$ while $k^2 \le i$, which takes $\mathcal{O}(\sqrt{i})$ steps.
  - The total number of iterations is bounded by:
    $$\sum_{i=1}^n \sqrt{i} \approx \int_0^n \sqrt{x}\,dx = \frac{2}{3}n^{1.5}$$
  - For $n = 10^5$, $\frac{2}{3} \times (10^5)^{1.5} \approx 2.1 \times 10^7$ basic operations in the worst case (with early breaking further reducing actual loop iterations).
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - A 1D boolean array `dp` of size $n + 1$ stores the game state for each pile size from $0$ to $n$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
