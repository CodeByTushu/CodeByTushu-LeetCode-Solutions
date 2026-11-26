# LeetCode 3360: Stone Removal Game

- **Publication Date:** 26 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/stone-removal-game/](https://leetcode.com/problems/stone-removal-game/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/Xg43IHEr838)

---

## 💡 Problem Summary

Alice and Bob are playing a game where they take turns removing stones from a pile, with **Alice going first**.

- Alice starts by removing **exactly 10 stones** on her first turn.
- For each subsequent turn, each player removes **exactly 1 fewer stone** than the previous opponent.
- The player who cannot make a move (i.e. remaining stones are fewer than required) loses the game.

Given a positive integer `n`, return `true` if Alice wins the game and `false` otherwise.

---

### 🧪 Example Walkthrough

#### Example 1:
- **Input:** `n = 12`
- **Output:** `true`
- **Explanation:**  
  1. Turn 1 (Alice): Removes 10 stones. Stones left: $12 - 10 = 2$.
  2. Turn 2 (Bob): Needs to remove 9 stones, but only 2 stones remain. Bob cannot make a move.
  - Therefore, Alice wins.

#### Example 2:
- **Input:** `n = 1`
- **Output:** `false`
- **Explanation:**  
  1. Turn 1 (Alice): Needs to remove 10 stones, but only 1 stone is available. Alice cannot make a move.
  - Therefore, Alice loses, Bob wins.

---

### 🔒 Constraints

- $1 \le n \le 50$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Game Rules & Stone Pattern
The required stones to remove follow a strictly decreasing sequence starting from 10:
- Turn 1 (Alice): $10$ stones
- Turn 2 (Bob): $9$ stones
- Turn 3 (Alice): $8$ stones
- Turn 4 (Bob): $7$ stones
- Turn 5 (Alice): $6$ stones
- Turn 6 (Bob): $5$ stones
- Turn 7 (Alice): $4$ stones
- Turn 8 (Bob): $3$ stones
- Turn 9 (Alice): $2$ stones
- Turn 10 (Bob): $1$ stone

Cumulative stones required after each turn:
- After Turn 1 (Alice): $10$
- After Turn 2 (Bob): $10 + 9 = 19$
- After Turn 3 (Alice): $19 + 8 = 27$
- After Turn 4 (Bob): $27 + 7 = 34$
- After Turn 5 (Alice): $34 + 6 = 40$
- After Turn 6 (Bob): $40 + 5 = 45$
- After Turn 7 (Alice): $45 + 4 = 49$
- After Turn 8 (Bob): $49 + 3 = 52$

Given the constraint $n \le 50$, the game takes at most $8$ turns!

### 2. Direct Simulation Strategy
We maintain:
- `remove`: Initialized to $10$.
- `aliceTurn`: Initialized to `true`.

In each iteration of the loop:
- Check if $n \ge \text{remove}$.
- If yes, deduct `remove` from $n$, decrement `remove` by 1, and toggle `aliceTurn`.
- If no, the current player cannot move and loses the game.
- If it is currently Bob's turn (`aliceTurn == false`) when the game stops, Bob could not make his move, which means **Alice wins** (`return true`).
- If it is Alice's turn (`aliceTurn == true`) when the game stops, Alice could not make her move, which means **Alice loses** (`return false`).

Hence, the return value is simply `!aliceTurn`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(1)$ | The loop executes at most $8$ times because $n \le 50$ and cumulative stones reach $52$ by turn 8. Each step performs $\mathcal{O}(1)$ basic arithmetic. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only two scalar integer variables (`n`, `remove`) and one boolean flag (`aliceTurn`) are allocated in memory. Zero dynamic memory. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public boolean canAliceWin(int n) {
        int remove = 10;
        boolean aliceTurn = true;

        while (n >= remove) {
            n -= remove;
            remove--;
            aliceTurn = !aliceTurn;
        }

        // Jis player ki turn hai aur wo move nahi kar sakta, wo haar gaya.
        // Agar ab Bob ki turn hai, matlab Bob haara, Alice jeeti.
        return !aliceTurn;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3360 - Stone Removal Game
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def canAliceWin(self, n: int) -> bool:
        remove = 10
        alice_turn = True

        while n >= remove:
            n -= remove
            remove -= 1
            alice_turn = not alice_turn

        # Agar ab Bob ki turn hai aur wo move nahi kar sakta, toh Alice jeet gayi
        return not alice_turn
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

class Solution {
public:
    bool canAliceWin(int n) {
        int remove = 10;
        bool aliceTurn = true;

        while (n >= remove) {
            n -= remove;
            remove--;
            aliceTurn = !aliceTurn;
        }

        // Agar Bob ki turn aayi aur wo stones nahi utha paya, toh Alice jeet gayi
        return !aliceTurn;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function(n) {
    let remove = 10;
    let aliceTurn = true;

    while (n >= remove) {
        n -= remove;
        remove--;
        aliceTurn = !aliceTurn;
    }

    // Agar Bob ki baari me stones kam pad gaye, toh Alice jeet gayi
    return !aliceTurn;
};
```

---

<p align="center">
  <strong>CodeByTushu</strong> — <em>Learn. Build. Share. Grow.</em>
</p>
