# LeetCode 1406: Stone Game III

- **Publication Date:** 03 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/stone-game-iii/](https://leetcode.com/problems/stone-game-iii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/OQrWpN7LNZI?si=TNHpWlVC-m-fxSWQ)

---

## Problem Summary

Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array `stoneValue`.

Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take `1`, `2`, or `3` stones from the **first remaining stones** in the row.

The score of each player is the sum of the values of the stones taken. The score of each player is `0` initially.

The objective of the game is to end with the highest score, and the winner is the player with the highest score. There could be a tie. The game continues until all the stones have been taken.

Assume Alice and Bob play optimally.

Return `"Alice"` if Alice will win, `"Bob"` if Bob will win, or `"Tie"` if they will end the game with the same score.

---

### Examples

#### Example 1:

- **Input:** `stoneValue = [1,2,3,7]`
- **Output:** `"Bob"`
- **Explanation:**
  - Alice will always lose. Her best move is to take three piles: score becomes `1 + 2 + 3 = 6`.
  - Bob then takes the remaining pile `7`. Bob's score is `7`, and Bob wins.

#### Example 2:

- **Input:** `stoneValue = [1,2,3,-9]`
- **Output:** `"Alice"`
- **Explanation:**
  - Alice must choose all three piles on the first move to get `1 + 2 + 3 = 6` and leave Bob with the single negative pile `-9`.
  - Bob receives `-9`. Alice wins with $6 > -9$.

#### Example 3:

- **Input:** `stoneValue = [1,2,3,6]`
- **Output:** `"Tie"`
- **Explanation:**
  - Alice cannot win this game. She can end the game in a draw if she chooses all the first three piles (`1 + 2 + 3 = 6`), leaving Bob with `6`.
  - Both players end with score `6`, resulting in `"Tie"`.

---

### Constraints

- $1 \le \text{stoneValue.length} \le 5 \times 10^4$
- $-1000 \le \text{stoneValue}[i] \le 1000$

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Game Theory**

---

## Intuition and Approach

### Minimax & Relative Score Difference:
In a two-player zero-sum game, instead of tracking both players' individual cumulative scores, we can define the game state using the **relative score advantage**:
$$\text{Relative Score} = \text{Current Player's Points} - \text{Opponent's Points}$$

Let `dp[i]` represent the maximum relative score difference the current player can achieve from the suffix `stoneValue[i..n-1]`.

### Transition Formulation:
Starting at index $i$, a player can choose to take $1$, $2$, or $3$ stones:
- Let $k \in \{1, 2, 3\}$ such that $i + k \le n$.
- The stones taken yield a immediate sum:
  $$\text{take} = \sum_{j=0}^{k-1} \text{stoneValue}[i + j]$$
- The remaining stones begin at index $i + k$, where the opponent will play optimally and achieve relative advantage `dp[i + k]`.
- Therefore, the current player's net gain from picking $k$ stones is:
  $$\text{take} - \text{dp}[i + k]$$

Under optimal play, the current player maximizes this outcome:
$$\text{dp}[i] = \max_{1 \le k \le 3,\; i+k \le n} \left( \sum_{j=0}^{k-1} \text{stoneValue}[i + j] - \text{dp}[i + k] \right)$$

### Base Case & Evaluation:
- **Base Case:** `dp[n] = 0` (no stones left to pick).
- Iterate backwards from $i = n - 1$ down to $0$.
- **Result at Index 0:**
  - If `dp[0] > 0`: Alice has a strictly positive advantage $\implies$ `"Alice"`.
  - If `dp[0] < 0`: Alice has a negative advantage (Bob scores more) $\implies$ `"Bob"`.
  - If `dp[0] == 0`: Equal final scores $\implies$ `"Tie"`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We compute $N$ states from right to left. At each state $i$, we consider at most $3$ choices ($k = 1, 2, 3$).
  - Total operations $\le 3N$. For $N = 5 \times 10^4$, this executes in $< 3\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - A 1D array of size $N + 1$. *(Note: This can be reduced to $\mathcal{O}(1)$ space since each state only depends on the next 3 values).*

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
