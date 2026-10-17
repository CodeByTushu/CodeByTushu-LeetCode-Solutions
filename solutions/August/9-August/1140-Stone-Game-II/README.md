# LeetCode 1140: Stone Game II

- **Publication Date:** 09 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/stone-game-ii/](https://leetcode.com/problems/stone-game-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KOI9rfiAfTw?si=zLmIk9cYXhWH3t5m)

---

## Problem Summary

Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row, and each pile has a positive integer number of stones `piles[i]`. The objective of the game is to end with the most stones.

Alice and Bob take turns, with Alice starting first.

On each player's turn, that player can take **all the stones in the first $X$ remaining piles**, where $1 \le X \le 2M$. Then, we set $M = \max(M, X)$. Initially, $M = 1$.

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the **maximum number of stones Alice can get**.

---

### Examples

#### Example 1:

- **Input:** `piles = [2,7,9,4,4]`
- **Output:** `10`
- **Explanation:**
  - If Alice takes one pile at the beginning ($X = 1$), Bob takes two piles, then Alice takes $2$ piles again. Alice gets $2 + 4 + 4 = 10$ stones in total.
  - If Alice takes two piles at the beginning ($X = 2$), Bob can take all three remaining piles. Alice would only get $2 + 7 = 9$ stones.
  - Playing optimally, Alice takes $1$ pile initially to secure $10$ stones.

#### Example 2:

- **Input:** `piles = [1,2,3,4,5,100]`
- **Output:** `104`

---

### Constraints

- $1 \le \text{piles.length} \le 100$
- $1 \le \text{piles}[i] \le 10^4$

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Game Theory**
- **Prefix Sum**

---

## Intuition and Approach

### 1. Game State and Suffix Sums:
At any turn, the game state is fully captured by:
- $i$: The index of the first remaining pile.
- $M$: The current maximum multiplier.

The total stones remaining from index $i$ to the end of the array is given by:
$$\text{suffixSum}[i] = \sum_{k=i}^{n-1} \text{piles}[k]$$

### 2. Minimax Recurrence with Memoization:
Let $\text{solve}(i, M)$ denote the maximum number of stones the current player can collect starting from pile $i$ with parameter $M$.

- **Base Case (Reach the End):**
  If $i + 2M \ge n$, the player can simply take all remaining piles in a single turn, collecting all $\text{suffixSum}[i]$ stones.
- **Recursive Step:**
  The current player can choose any $X \in [1, 2M]$:
  - After taking $X$ piles, the opponent plays next from index $i + X$ with parameter $M' = \max(M, X)$.
  - The opponent will optimally secure $\text{solve}(i + X, \max(M, X))$ stones.
  - Since this is a zero-sum stone game, the current player receives the rest:
    $$\text{stones} = \text{suffixSum}[i] - \text{solve}(i + X, \max(M, X))$$
  - The current player chooses $X$ to maximize this value:
    $$\text{solve}(i, M) = \max_{1 \le X \le 2M} \left( \text{suffixSum}[i] - \text{solve}(i + X, \max(M, X)) \right)$$

Alice starts at index $0$ with $M = 1$, so the answer is $\text{solve}(0, 1)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^3)$
  - There are $N$ choices for $i$ ($0 \le i < N$) and at most $N$ choices for $M$ ($1 \le M \le N$), giving $\mathcal{O}(N^2)$ distinct states.
  - From each state, we iterate $X$ from $1$ to $2M \le 2N$, performing $\mathcal{O}(N)$ transitions.
  - Total time complexity is $\mathcal{O}(N^3)$. For $N = 100$, this requires at most $10^6$ operations, executing in under $5\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - Memoization table of size $N \times (N + 1)$ and $\mathcal{O}(N)$ recursion call stack.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
