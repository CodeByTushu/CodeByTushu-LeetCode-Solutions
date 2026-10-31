# LeetCode 657: Robot Return to Origin

- **Publication Date:** 05 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/robot-return-to-origin/](https://leetcode.com/problems/robot-return-to-origin/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

There is a robot starting at position `(0, 0)`, the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at `(0, 0)` after it completes all of its moves.

You are given a string `moves` that represents the move sequence of the robot where `moves[i]` represents its $i$-th move. Valid moves are:
- `'R'` (right)
- `'L'` (left)
- `'U'` (up)
- `'D'` (down)

Return `true` if the robot returns to the origin after it finishes all of its moves, or `false` otherwise.

**Note:**
- The way that the robot is "facing" is irrelevant.
- `'R'` will always move right once, `'L'` will always move left once, etc.
- Assume that the magnitude of the robot's movement is the same for each move.

---

### Examples

#### Example 1:
- **Input:** `moves = "UD"`
- **Output:** `true`
- **Explanation:**
  The robot moves up once, and then down once. All moves have the same magnitude, so it ends up at the origin `(0, 0)`. Therefore, we return `true`.

#### Example 2:
- **Input:** `moves = "LL"`
- **Output:** `false`
- **Explanation:**
  The robot moves left twice. It ends up two units to the left of the origin at `(-2, 0)`. We return `false` because it is not at the origin at the end of its moves.

---

### Constraints

- $1 \le \text{moves.length} \le 2 \times 10^4$
- `moves` only contains the characters `'U'`, `'D'`, `'L'`, and `'R'`.

---

## Topics and Tags

- **Primary Tags:** String, Simulation
- **Secondary Tags:** Math

---

## Detailed Algorithm Walkthrough

### 1. Coordinate Representation
We model the robot's position on the Cartesian coordinate plane starting at:
$$(x, y) = (0, 0)$$

For each character in the string `moves`:
- `'U'` (Up): Increment the $y$-coordinate ($y \leftarrow y + 1$).
- `'D'` (Down): Decrement the $y$-coordinate ($y \leftarrow y - 1$).
- `'R'` (Right): Increment the $x$-coordinate ($x \leftarrow x + 1$).
- `'L'` (Left): Decrement the $x$-coordinate ($x \leftarrow x - 1$).

### 2. Origin Verification
For the robot to return to the origin after processing all moves, the total displacements along both axes must cancel out:
$$x == 0 \quad \text{and} \quad y == 0$$

Equivalently, the number of up moves must equal the number of down moves ($\text{count}('U') == \text{count}('D')$), and the number of left moves must equal the number of right moves ($\text{count}('L') == \text{count}('R')$).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We traverse the string `moves` of length $N$ exactly once.
  - Each character transition takes $\mathcal{O}(1)$ time.
  - Overall time complexity is linear $\mathcal{O}(N)$, running in under $2\text{ ms}$ for $N \le 2 \times 10^4$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only two integer variables (`x` and `y`) are used to track displacement coordinates.

---

## Solutions

### Java
```java
class Solution {
    public boolean judgeCircle(String moves) {
        int x = 0;
        int y = 0;

        for (int i = 0; i < moves.length(); i++) {
            char move = moves.charAt(i);
            if (move == 'U') {
                y++;
            } else if (move == 'D') {
                y--;
            } else if (move == 'R') {
                x++;
            } else if (move == 'L') {
                x--;
            }
        }

        return x == 0 && y == 0;
    }
}
```

### Python
```python
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        x = 0
        y = 0

        for move in moves:
            if move == 'U':
                y += 1
            elif move == 'D':
                y -= 1
            elif move == 'R':
                x += 1
            elif move == 'L':
                x -= 1

        return x == 0 and y == 0
```

### C++
```cpp
#include <string>

using namespace std;

class Solution {
public:
    bool judgeCircle(string moves) {
        int x = 0;
        int y = 0;

        for (char move : moves) {
            if (move == 'U') y++;
            else if (move == 'D') y--;
            else if (move == 'R') x++;
            else if (move == 'L') x--;
        }

        return x == 0 && y == 0;
    }
};
```

### JavaScript
```javascript
var judgeCircle = function(moves) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < moves.length; i++) {
        const move = moves.charAt(i);
        if (move === 'U') {
            y++;
        } else if (move === 'D') {
            y--;
        } else if (move === 'R') {
            x++;
        } else if (move === 'L') {
            x--;
        }
    }

    return x === 0 && y === 0;
};
```
