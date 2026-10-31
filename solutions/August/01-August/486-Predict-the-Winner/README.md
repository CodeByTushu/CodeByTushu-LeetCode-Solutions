# LeetCode 486: Predict the Winner

- **Publication Date:** 01 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/predict-the-winner/](https://leetcode.com/problems/predict-the-winner/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/NmFcU3huV5g?si=j-DWd_1nGuALGshK)

---

## Problem Summary

You are given an integer array `nums`. Two players are playing a game with this array: Player 1 and Player 2.

Player 1 and Player 2 take turns, with Player 1 starting first. Both players start the game with a score of `0`.

At each turn, the current player takes the number at either end of the array (i.e., `nums[0]` or `nums[nums.length - 1]`), removing it from the array and adding it to their own score. The game ends when there are no more elements in the array.

Return `true` if Player 1's final score is greater than or equal to Player 2's final score, and `false` otherwise.

Note that a tie counts as a win for Player 1. You may assume that both players play optimally.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,5,2]`
- **Output:** `false`
- **Explanation:**
  - Player 1 must open by taking either 1 or 2, and both choices lead to the same result.
  - If Player 1 takes 1, the array becomes `[5,2]`. Player 2 takes 5, leaving 2 for Player 1.
  - If Player 1 takes 2, the array becomes `[1,5]`. Player 2 takes 5, leaving 1 for Player 1.
  - Either way, Player 1 finishes with `1 + 2 = 3` and Player 2 finishes with `5`. Player 1 can never win, so return `false`.

#### Example 2:

- **Input:** `nums = [1,5,233,7]`
- **Output:** `true`
- **Explanation:**
  - Player 1 first takes 1, leaving `[5,233,7]`. Player 2 must then choose between 5 and 7, and no matter which number Player 2 chooses, Player 1 can take 233 on the next turn.
  - Player 1 finishes with a higher score (234) than Player 2 (12), so return `true`.

---

### Constraints

- $1 \le \text{nums.length} \le 20$
- $0 \le \text{nums}[i] \le 10^7$

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**
- **Recursion**
- **Game Theory**

---

## Intuition and Approach

### Minimax & Relative Score Difference:
In a two-player zero-sum game with perfect information, instead of maintaining two separate cumulative scores, we can model the game using the **relative score difference**:
$$\text{Score Difference} = \text{Score of Current Player} - \text{Score of Opponent}$$

If Player 1's net relative score at the end from the entire array `nums[0..n-1]` is $\ge 0$, then Player 1 wins (or ties).

### Dynamic Programming Formulation:
Let `dp[i][j]` represent the maximum score difference the current player can achieve from the subarray `nums[i..j]`.

- **Base Cases (subarrays of length 1):**
  When only one element `nums[i]` is left:
  $$\text{dp}[i][i] = nums[i]$$
- **State Transition (subarrays of length $\ge 2$):**
  The current player has two choices:
  1. Pick the left element `nums[i]`:
     The opponent is left with subarray `nums[i + 1..j]`. By optimality, the opponent will gain a relative advantage of `dp[i + 1][j]`.
     Thus, the net gain for the current player is:
     $$nums[i] - \text{dp}[i + 1][j]$$
  2. Pick the right element `nums[j]`:
     The opponent is left with subarray `nums[i..j - 1]`.
     Thus, the net gain for the current player is:
     $$nums[j] - \text{dp}[i][j - 1]$$
  The optimal player takes the maximum:
  $$\text{dp}[i][j] = \max(nums[i] - \text{dp}[i + 1][j],\; nums[j] - \text{dp}[i][j - 1])$$

- **Final Answer:**
  Player 1 wins if `dp[0][n - 1] >= 0`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - There are $\frac{N(N + 1)}{2}$ subproblems, and each transition takes $\mathcal{O}(1)$ time. With $N \le 20$, $\approx 200$ operations run in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - An $N \times N$ DP table.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
