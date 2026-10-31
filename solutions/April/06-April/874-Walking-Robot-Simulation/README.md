# LeetCode 874: Walking Robot Simulation

- **Publication Date:** 06 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/walking-robot-simulation/](https://leetcode.com/problems/walking-robot-simulation/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

A robot on an infinite XY-plane starts at point `(0, 0)` facing north. The robot receives an array of integers `commands`, which represents a sequence of moves that it needs to execute. There are only three possible types of instructions:
- `-2`: Turn left $90$ degrees.
- `-1`: Turn right $90$ degrees.
- $1 \le k \le 9$: Move forward $k$ units, one unit at a time.

Some of the grid squares are `obstacles`. The $i$-th obstacle is at grid point `obstacles[i] = (x_i, y_i)`. If the robot runs into an obstacle, it stays in its current location (on the block adjacent to the obstacle) and moves onto the next command.

Return the **maximum squared Euclidean distance** that the robot reaches at any point in its path (i.e. if the distance is $5$, return $25$).

**Notes:**
- There can be an obstacle at `(0, 0)`. If this happens, the robot ignores the obstacle until it has moved off the origin. However, it will be unable to return to `(0, 0)` due to the obstacle.
- North means $+Y$ direction: $(0, 1)$.
- East means $+X$ direction: $(1, 0)$.
- South means $-Y$ direction: $(0, -1)$.
- West means $-X$ direction: $(-1, 0)$.

---

### Examples

#### Example 1:
- **Input:** `commands = [4, -1, 3], obstacles = []`
- **Output:** `25`
- **Explanation:**
  The robot starts at $(0, 0)$:
  1. Move north $4$ units to $(0, 4)$.
  2. Turn right (now facing East).
  3. Move east $3$ units to $(3, 4)$.
  The furthest point the robot ever gets from the origin is $(3, 4)$, which squared is $3^2 + 4^2 = 25$ units away.

#### Example 2:
- **Input:** `commands = [4, -1, 4, -2, 4], obstacles = [[2, 4]]`
- **Output:** `65`
- **Explanation:**
  The robot starts at $(0, 0)$:
  1. Move north $4$ units to $(0, 4)$.
  2. Turn right (facing East).
  3. Move east $1$ unit and gets blocked by the obstacle at $(2, 4)$, so robot stops at $(1, 4)$.
  4. Turn left (facing North).
  5. Move north $4$ units to $(1, 8)$.
  The furthest point reached is $(1, 8)$, where $1^2 + 8^2 = 65$.

#### Example 3:
- **Input:** `commands = [6, -1, -1, 6], obstacles = [[0, 0]]`
- **Output:** `36`
- **Explanation:**
  The robot starts at $(0, 0)$:
  1. Move north $6$ units to $(0, 6)$.
  2. Turn right.
  3. Turn right (facing South).
  4. Move south $5$ units and gets blocked by the obstacle at $(0, 0)$, so robot stops at $(0, 1)$.
  The furthest point reached is $(0, 6)$, where $6^2 = 36$.

---

### Constraints

- $1 \le \text{commands.length} \le 10^4$
- `commands[i]` is either `-2`, `-1`, or an integer in the range $[1, 9]$.
- $0 \le \text{obstacles.length} \le 10^4$
- $-3 \times 10^4 \le x_i, y_i \le 3 \times 10^4$
- The answer is guaranteed to be less than $2^{31}$.

---

## Topics and Tags

- **Primary Tags:** Array, Hash Table, Simulation
- **Secondary Tags:** Math, Geometry

---

## Detailed Algorithm Walkthrough

### 1. Orientation Modeling
We represent the four cardinal directions using cyclical indexing:
- `d = 0`: North with vector $\Delta = (0, 1)$
- `d = 1`: East with vector $\Delta = (1, 0)$
- `d = 2`: South with vector $\Delta = (0, -1)$
- `d = 3`: West with vector $\Delta = (-1, 0)$

Turning operations correspond to modular arithmetic:
- Turning Right (`-1`): $d \leftarrow (d + 1) \pmod 4$
- Turning Left (`-2`): $d \leftarrow (d + 3) \pmod 4$

### 2. Fast Obstacle Lookup
Obstacle coordinates span $[-30000, 30000]$. We store all obstacle positions in a hash set to allow $\mathcal{O}(1)$ collision checks. In languages like Java or C++, we can pack the pair $(x, y)$ into a single 64-bit primitive integer `(x << 32) | (y & 0xFFFFFFFFL)` to eliminate object allocation overhead.

### 3. Step-by-Step Simulation
For each forward movement command $k \in [1, 9]$:
- Take steps one unit at a time.
- Compute the candidate next coordinate:
  $$nx = x + dx[d], \quad ny = y + dy[d]$$
- If $(nx, ny)$ exists in the obstacle set, the robot halts immediately for the remainder of this command.
- Otherwise, update $(x, y) \leftarrow (nx, ny)$ and update our maximum squared Euclidean distance:
  $$\text{maxDistSq} = \max(\text{maxDistSq}, \; x^2 + y^2)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(C \cdot K + M)$
  - $M$ is the number of obstacles inserted into the hash set in $\mathcal{O}(M)$ time.
  - $C$ is the number of commands, and each movement command advances at most $K \le 9$ unit steps.
  - Total operations are at most $10^4 \times 9 + 10^4 \approx 10^5$, executing in $\approx 10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(M)$
  - Storing up to $10^4$ obstacles in a hash set.

---

## Solutions

### Java
```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int robotSim(int[] commands, int[][] obstacles) {
        Set<Long> obstacleSet = new HashSet<>(obstacles.length);
        for (int[] obs : obstacles) {
            long key = (((long) obs[0]) << 32) | (obs[1] & 0xFFFFFFFFL);
            obstacleSet.add(key);
        }

        int[] dx = {0, 1, 0, -1};
        int[] dy = {1, 0, -1, 0};
        int d = 0;

        int x = 0;
        int y = 0;
        int maxDistSq = 0;

        for (int cmd : commands) {
            if (cmd == -1) {
                d = (d + 1) % 4;
            } else if (cmd == -2) {
                d = (d + 3) % 4;
            } else {
                for (int step = 0; step < cmd; step++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    long nextKey = (((long) nx) << 32) | (ny & 0xFFFFFFFFL);
                    if (obstacleSet.contains(nextKey)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    maxDistSq = Math.max(maxDistSq, x * x + y * y);
                }
            }
        }

        return maxDistSq;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        obstacle_set = {(ox, oy) for ox, oy in obstacles}

        dx = [0, 1, 0, -1]
        dy = [1, 0, -1, 0]
        d = 0

        x = 0
        y = 0
        max_dist_sq = 0

        for cmd in commands:
            if cmd == -1:
                d = (d + 1) % 4
            elif cmd == -2:
                d = (d + 3) % 4
            else:
                for _ in range(cmd):
                    nx = x + dx[d]
                    ny = y + dy[d]
                    if (nx, ny) in obstacle_set:
                        break
                    x = nx
                    y = ny
                    max_dist_sq = max(max_dist_sq, x * x + y * y)

        return max_dist_sq
```

### C++
```cpp
#include <vector>
#include <unordered_set>
#include <algorithm>

using namespace std;

class Solution {
public:
    int robotSim(vector<int>& commands, vector<vector<int>>& obstacles) {
        unordered_set<long long> obstacleSet;
        obstacleSet.reserve(obstacles.size());
        for (const auto& obs : obstacles) {
            long long key = (((long long)obs[0]) << 32) | ((unsigned int)obs[1]);
            obstacleSet.insert(key);
        }

        int dx[4] = {0, 1, 0, -1};
        int dy[4] = {1, 0, -1, 0};
        int d = 0;

        int x = 0;
        int y = 0;
        int maxDistSq = 0;

        for (int cmd : commands) {
            if (cmd == -1) {
                d = (d + 1) % 4;
            } else if (cmd == -2) {
                d = (d + 3) % 4;
            } else {
                for (int step = 0; step < cmd; step++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    long long nextKey = (((long long)nx) << 32) | ((unsigned int)ny);
                    if (obstacleSet.count(nextKey)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    maxDistSq = max(maxDistSq, x * x + y * y);
                }
            }
        }

        return maxDistSq;
    }
};
```

### JavaScript
```javascript
var robotSim = function(commands, obstacles) {
    const obstacleSet = new Set();
    for (let i = 0; i < obstacles.length; i++) {
        obstacleSet.add(`${obstacles[i][0]},${obstacles[i][1]}`);
    }

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let d = 0;

    let x = 0;
    let y = 0;
    let maxDistSq = 0;

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        if (cmd === -1) {
            d = (d + 1) % 4;
        } else if (cmd === -2) {
            d = (d + 3) % 4;
        } else {
            for (let step = 0; step < cmd; step++) {
                const nx = x + dx[d];
                const ny = y + dy[d];
                if (obstacleSet.has(`${nx},${ny}`)) {
                    break;
                }
                x = nx;
                y = ny;
                maxDistSq = Math.max(maxDistSq, x * x + y * y);
            }
        }
    }

    return maxDistSq;
};
```
