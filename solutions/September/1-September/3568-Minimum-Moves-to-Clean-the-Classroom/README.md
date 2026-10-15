# LeetCode 3568: Minimum Moves to Clean the Classroom

- **Publication Date:** 01 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/](https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/LMePGGkRx9E?si=1v_-BLwW6jIIa0Um)

---

## Problem Summary

You are given an `m x n` grid `classroom` where a student volunteer is tasked with cleaning up litter scattered around the room. Each cell in the grid is one of the following:

- `'S'`: Starting position of the student
- `'L'`: Litter that must be collected (once collected, the cell becomes empty)
- `'R'`: Reset area that restores the student's energy to full capacity, regardless of their current energy level (can be used multiple times)
- `'X'`: Obstacle the student cannot pass through
- `'.'`: Empty space

You are also given an integer `energy`, representing the student's maximum energy capacity. The student starts with this energy from the starting position `'S'`.

Each move to an adjacent cell (up, down, left, or right) costs 1 unit of energy. If the energy reaches 0, the student can only continue if they are on a reset area `'R'`, which resets the energy to its maximum capacity `energy`.

Return the **minimum number of moves** required to collect all litter items, or `-1` if it is impossible.

---

### Examples

#### Example 1:
- **Input:** `classroom = ["S.", "XL"], energy = 2`
- **Output:** `2`
- **Explanation:**
  - The student starts at cell `(0, 0)` with 2 units of energy.
  - Cell `(1, 0)` contains an obstacle `'X'`, so the student cannot move directly downward.
  - Move 1: From `(0, 0)` to `(0, 1)` with 1 unit of energy used and 1 remaining.
  - Move 2: From `(0, 1)` to `(1, 1)` to collect litter `'L'`.
  - All litter collected in 2 moves. Output is `2`.

#### Example 2:
- **Input:** `classroom = ["LS", "RL"], energy = 4`
- **Output:** `3`
- **Explanation:**
  - The student starts at `(0, 1)` with 4 energy.
  - Move 1: `(0, 1)` to `(0, 0)` collecting first litter `'L'` (3 energy remaining).
  - Move 2: `(0, 0)` to `(1, 0)` onto `'R'`, resetting energy back to 4.
  - Move 3: `(1, 0)` to `(1, 1)` collecting second litter `'L'`.
  - All litter collected in 3 moves. Output is `3`.

#### Example 3:
- **Input:** `classroom = ["L.S", "RXL"], energy = 3`
- **Output:** `-1`
- **Explanation:**
  - No valid path collects all `'L'` items.

---

### Constraints

- $1 \le m == \text{classroom.length} \le 20$
- $1 \le n == \text{classroom}[i]\text{.length} \le 20$
- $\text{classroom}[i][j]$ is one of `'S'`, `'L'`, `'R'`, `'X'`, or `'.'`.
- $1 \le \text{energy} \le 50$
- Exactly one `'S'` exists in the grid.
- The total number of litter items `'L'` is small (typically $\le 10$).

---

## Topics and Tags

- **Array**
- **Breadth-First Search**
- **Bit Manipulation**
- **Matrix**

---

## Approach & Intuition

1. **State Graph Representation**:
   - We need the **minimum moves** in an unweighted grid, which strongly indicates a **Breadth-First Search (BFS)**.
   - A simple `(r, c)` position is not enough state information because:
     1. The student has remaining `energy` that depletes with each step and refills on `'R'`.
     2. The set of collected litters changes over time.
   - Since the number of litter items $L$ is small, we can represent collected litters as a **bitmask** where the $k$-th bit is $1$ if litter $k$ has been collected, and $0$ otherwise.
   - The state is therefore uniquely determined by a 4-tuple: `(row, col, remainingEnergy, litterMask)`.

2. **BFS Exploration**:
   - Start queue with `(startR, startC, energy, initMask, 0)` moves. If `'S'` happens to contain litter, set its bit in `initMask`.
   - Maintain a `visited[row][col][energy][litterMask]` structure to prevent redundant cycles.
   - At each step, if `litterMask == fullMask` (where `fullMask = (1 << L) - 1`), immediately return `moves` because BFS guarantees the shortest path.
   - If current energy is $0$, the student cannot move further unless they are on a reset cell `'R'`.
   - Explore all 4 cardinal directions (`up`, `down`, `left`, `right`):
     - Ensure the next cell `(nr, nc)` is in bounds and not an obstacle `'X'`.
     - Calculate new energy: if `(nr, nc)` is `'R'`, energy resets to `energy`; otherwise it becomes `e - 1`.
     - If `(nr, nc)` contains a litter, set its corresponding bit in the new bitmask.
     - Push unvisited states to the BFS queue.

3. **Termination**:
   - If the queue is exhausted without reaching `fullMask`, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N \times \text{energy} \times 2^L)$
  - In the worst case, every distinct state is visited at most once, and each transition takes $\mathcal{O}(1)$ time across 4 directions.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N \times \text{energy} \times 2^L)$
  - To store visited states and the BFS queue.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/LMePGGkRx9E?si=1v_-BLwW6jIIa0Um](https://youtu.be/LMePGGkRx9E?si=1v_-BLwW6jIIa0Um)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
