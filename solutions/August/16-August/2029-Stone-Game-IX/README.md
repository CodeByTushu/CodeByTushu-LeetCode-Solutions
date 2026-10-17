# LeetCode 2029: Stone Game IX

- **Publication Date:** 16 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/stone-game-ix/](https://leetcode.com/problems/stone-game-ix/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0xYKStmu5Lo?si=GW0kUTFhNjQDeP4s)

---

## Problem Summary

Alice and Bob continue their games with stones. There is a row of $n$ stones, and each stone has an associated value. You are given an integer array `stones`, where `stones[i]` is the value of the $i^{\text{th}}$ stone.

Alice and Bob take turns, with **Alice starting first**. On each turn, the player may remove any stone from `stones`. The player who removes a stone **loses** if the **sum of the values of all removed stones is divisible by 3**. Bob will win automatically if there are no remaining stones (even if it is Alice's turn).

Assuming both players play **optimally**, return `true` if Alice wins and `false` if Bob wins.

---

### Examples

#### Example 1:

- **Input:** `stones = [2,1]`
- **Output:** `true`
- **Explanation:** The game will be played as follows:
  - Turn 1: Alice can remove either stone.
  - Turn 2: Bob removes the remaining stone.
  The sum of the removed stones is $1 + 2 = 3$ and is divisible by 3. Therefore, Bob loses and Alice wins the game.

#### Example 2:

- **Input:** `stones = [2]`
- **Output:** `false`
- **Explanation:** Alice will remove the only stone, and the sum of the values on the removed stones is $2$.
  Since all the stones are removed and the sum of values is not divisible by 3, Bob wins the game.

#### Example 3:

- **Input:** `stones = [5,1,2,4,3]`
- **Output:** `false`
- **Explanation:** Bob will always win. One possible way for Bob to win is shown below:
  - Turn 1: Alice removes stone with value 1. Sum = 1.
  - Turn 2: Bob removes stone with value 3. Sum = 1 + 3 = 4.
  - Turn 3: Alice removes stone with value 4. Sum = 1 + 3 + 4 = 8.
  - Turn 4: Bob removes stone with value 2. Sum = 1 + 3 + 4 + 2 = 10.
  - Turn 5: Alice removes stone with value 5. Sum = 1 + 3 + 4 + 2 + 5 = 15.
  Alice loses because the sum ($15$) is divisible by 3. Bob wins the game.

---

### Constraints

- $1 \le \text{stones.length} \le 10^5$
- $1 \le \text{stones}[i] \le 10^4$

---

## Topics and Tags

- **Array**
- **Math**
- **Greedy**
- **Game Theory**
- **Counting**

---

## Intuition and Approach

### Modulo 3 Classification:
Because the win/loss condition depends solely on whether the cumulative sum is divisible by $3$, each stone's actual numerical value is irrelevant—only its remainder modulo 3 matters:
- `cnt[0]`: count of stones with value $\equiv 0 \pmod 3$
- `cnt[1]`: count of stones with value $\equiv 1 \pmod 3$
- `cnt[2]`: count of stones with value $\equiv 2 \pmod 3$

### Role of Stones with Remainder 0:
A stone with remainder $0$ does not change the running sum modulo 3. Playing a $0$-stone only passes the turn to the opponent. Thus, they act purely as parity toggles:
- **Case 1: `cnt[0]` is Even**
  - An even number of $0$-stones can always be symmetrically matched by the opposing player.
  - Alice must choose either a remainder $1$ or remainder $2$ stone on turn 1.
  - If Alice chooses remainder $1$, subsequent optimal play requires alternating between $1$ and $2$ (e.g. sequence modulo 3: $1, 1, 2, 1, 2, 1, 2, \dots$).
  - If either `cnt[1] == 0` or `cnt[2] == 0`, Alice is forced to pick the only available remainder and will quickly cause a multiple of 3 on turn 3, or Bob wins when stones run out.
  - Therefore, Alice wins if and only if:
    $$\text{cnt}[1] \ge 1 \quad \text{and} \quad \text{cnt}[2] \ge 1$$

- **Case 2: `cnt[0]` is Odd**
  - An odd number of $0$-stones transfers the turn advantage: whoever plays the last $0$-stone flips who is cornered.
  - Alice wins if and only if one remainder category substantially outnumbers the other so that the alternate player is forced to cause a multiple of 3:
    $$|\text{cnt}[1] - \text{cnt}[2]| > 2$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over the array counts the frequencies modulo 3.
  - Followed by $\mathcal{O}(1)$ constant-time arithmetic checks.
  - Runs in $\approx 1\text{ ms}$ for $N = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only a fixed-size array of 3 integers.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
