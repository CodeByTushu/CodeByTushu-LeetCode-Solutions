# LeetCode 2069: Walking Robot Simulation II

- **Publication Date:** 07 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/walking-robot-simulation-ii/](https://leetcode.com/problems/walking-robot-simulation-ii/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

A `width x height` grid is on an XY-plane with the bottom-left cell at `(0, 0)` and the top-right cell at `(width - 1, height - 1)`. The grid is aligned with the four cardinal directions (`"North"`, `"East"`, `"South"`, and `"West"`). A robot is initially at cell `(0, 0)` facing direction `"East"`.

The robot can be instructed to move for a specific number of steps. For each step, it does the following:
1. Attempts to move forward one cell in the direction it is facing.
2. If the cell the robot is moving to is out of bounds, the robot instead turns $90$ degrees counterclockwise and retries the step.

After the robot finishes moving the number of steps required, it stops and awaits the next instruction.

Implement the `Robot` class:
- `Robot(int width, int height)`: Initializes the `width x height` grid with the robot at `(0, 0)` facing `"East"`.
- `void step(int num)`: Instructs the robot to move forward `num` steps.
- `int[] getPos()`: Returns the current cell the robot is at, as an array of length 2, `[x, y]`.
- `String getDir()`: Returns the current direction of the robot, `"North"`, `"East"`, `"South"`, or `"West"`.

---

### Examples

#### Example 1:
```text
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]

Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2); // It moves two steps East to (2, 0), and faces East.
robot.step(2); // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2); // It moves one step East to (5, 0), and faces East.
               // Moving the next step East would be out of bounds, so it turns and faces North.
               // Then, it moves one step North to (5, 1), and faces North.
robot.step(1); // It moves one step North to (5, 2), and faces North (not West).
robot.step(4); // Moving the next step North would be out of bounds, so it turns and faces West.
               // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"
```

---

### Constraints

- $2 \le \text{width}, \text{height} \le 100$
- $1 \le \text{num} \le 10^5$
- At most $10^4$ calls in total will be made to `step`, `getPos`, and `getDir`.

---

## Topics and Tags

- **Primary Tags:** Design, Simulation, Math
- **Secondary Tags:** Array

---

## Detailed Algorithm Walkthrough

### 1. Perimeter Confinement Observation
Because the robot starts at `(0, 0)` facing East and only ever turns $90^\circ$ counterclockwise when it reaches a grid boundary, it is **strictly confined to walking along the outer perimeter** of the grid in counterclockwise order:
1. Bottom boundary: moving **East** from $(0, 0)$ to $(\text{width} - 1, 0)$
2. Right boundary: moving **North** from $(\text{width} - 1, 0)$ to $(\text{width} - 1, \text{height} - 1)$
3. Top boundary: moving **West** from $(\text{width} - 1, \text{height} - 1)$ to $(0, \text{height} - 1)$
4. Left boundary: moving **South** from $(0, \text{height} - 1)$ to $(0, 0)$

The total number of unique cells along the perimeter is fixed:
$$\text{perimeter} = 2 \times (\text{width} - 1) + 2 \times (\text{height} - 1) = 2 \times (\text{width} + \text{height}) - 4$$

Since $\text{width}, \text{height} \le 100$, the perimeter is at most $396$ cells.

### 2. Precomputation of Perimeter States
During initialization in the constructor, we precompute an ordered sequence of all perimeter coordinates along with their facing directions:
- Position array `coords[P][2]`
- Direction array `dirs[P]`

### 3. Edge Case: Origin Facing Direction
- **Initial State:** At the very start before any call to `step()`, the robot sits at $(0, 0)$ facing `"East"`.
- **After Completing Loops:** Once the robot has taken at least one step and ends up back at $(0, 0)$ via modular arithmetic, it arrived from cell $(0, 1)$ traveling South. At that moment, it faces `"South"`.
- We easily manage this using a boolean flag `moved`. If `!moved`, `getDir()` returns `"East"`; otherwise, it returns `dirs[idx]`.

### 4. Constant-Time Queries
- `step(num)`:
  $$\text{idx} = (\text{idx} + \text{num}) \pmod{\text{perimeter}}$$
- `getPos()`: returns `coords[idx]` in $\mathcal{O}(1)$ time.
- `getDir()`: returns `dirs[idx]` in $\mathcal{O}(1)$ time.

---

## Complexity Analysis

- **Time Complexity:**
  - `Robot(width, height)`: $\mathcal{O}(\text{width} + \text{height})$ to precompute up to $396$ perimeter cells.
  - `step(num)`: $\mathcal{O}(1)$ via modulo arithmetic.
  - `getPos()`: $\mathcal{O}(1)$ array lookup.
  - `getDir()`: $\mathcal{O}(1)$ array lookup.
- **Auxiliary Space Complexity:** $\mathcal{O}(\text{width} + \text{height})$ for storing the precomputed perimeter coordinates and direction strings (at most $396$ entries).

---

## Solutions

### Java
```java
class Robot {
    private final int[][] coords;
    private final String[] dirs;
    private final int perimeter;
    private int idx;
    private boolean moved;

    public Robot(int width, int height) {
        perimeter = 2 * (width + height) - 4;
        coords = new int[perimeter][2];
        dirs = new String[perimeter];
        idx = 0;
        moved = false;

        int index = 0;
        for (int i = 0; i < width; i++) {
            coords[index] = new int[]{i, 0};
            dirs[index] = "East";
            index++;
        }
        for (int j = 1; j < height; j++) {
            coords[index] = new int[]{width - 1, j};
            dirs[index] = "North";
            index++;
        }
        for (int i = width - 2; i >= 0; i--) {
            coords[index] = new int[]{i, height - 1};
            dirs[index] = "West";
            index++;
        }
        for (int j = height - 2; j > 0; j--) {
            coords[index] = new int[]{0, j};
            dirs[index] = "South";
            index++;
        }

        dirs[0] = "South";
    }

    public void step(int num) {
        moved = true;
        idx = (idx + num) % perimeter;
    }

    public int[] getPos() {
        return coords[idx];
    }

    public String getDir() {
        if (!moved) {
            return "East";
        }
        return dirs[idx];
    }
}
```

### Python
```python
from typing import List

class Robot:
    def __init__(self, width: int, height: int):
        self.perimeter = 2 * (width + height) - 4
        self.coords = []
        self.dirs = []
        self.idx = 0
        self.moved = False

        # Bottom row
        for i in range(width):
            self.coords.append([i, 0])
            self.dirs.append("East")
        # Right column
        for j in range(1, height):
            self.coords.append([width - 1, j])
            self.dirs.append("North")
        # Top row
        for i in range(width - 2, -1, -1):
            self.coords.append([i, height - 1])
            self.dirs.append("West")
        # Left column
        for j in range(height - 2, 0, -1):
            self.coords.append([0, j])
            self.dirs.append("South")

        self.dirs[0] = "South"

    def step(self, num: int) -> None:
        self.moved = True
        self.idx = (self.idx + num) % self.perimeter

    def getPos(self) -> List[int]:
        return self.coords[self.idx]

    def getDir(self) -> str:
        if not self.moved:
            return "East"
        return self.dirs[self.idx]
```

### C++
```cpp
#include <vector>
#include <string>

using namespace std;

class Robot {
private:
    vector<vector<int>> coords;
    vector<string> dirs;
    int perimeter;
    int idx;
    bool moved;

public:
    Robot(int width, int height) {
        perimeter = 2 * (width + height) - 4;
        coords.reserve(perimeter);
        dirs.reserve(perimeter);
        idx = 0;
        moved = false;

        for (int i = 0; i < width; ++i) {
            coords.push_back({i, 0});
            dirs.push_back("East");
        }
        for (int j = 1; j < height; ++j) {
            coords.push_back({width - 1, j});
            dirs.push_back("North");
        }
        for (int i = width - 2; i >= 0; --i) {
            coords.push_back({i, height - 1});
            dirs.push_back("West");
        }
        for (int j = height - 2; j > 0; --j) {
            coords.push_back({0, j});
            dirs.push_back("South");
        }

        dirs[0] = "South";
    }

    void step(int num) {
        moved = true;
        idx = (idx + num) % perimeter;
    }

    vector<int> getPos() {
        return coords[idx];
    }

    string getDir() {
        if (!moved) return "East";
        return dirs[idx];
    }
};
```

### JavaScript
```javascript
var Robot = function(width, height) {
    this.perimeter = 2 * (width + height) - 4;
    this.coords = [];
    this.dirs = [];
    this.idx = 0;
    this.moved = false;

    // Bottom row
    for (let i = 0; i < width; i++) {
        this.coords.push([i, 0]);
        this.dirs.push("East");
    }
    // Right col
    for (let j = 1; j < height; j++) {
        this.coords.push([width - 1, j]);
        this.dirs.push("North");
    }
    // Top row
    for (let i = width - 2; i >= 0; i--) {
        this.coords.push([i, height - 1]);
        this.dirs.push("West");
    }
    // Left col
    for (let j = height - 2; j > 0; j--) {
        this.coords.push([0, j]);
        this.dirs.push("South");
    }

    this.dirs[0] = "South";
};

Robot.prototype.step = function(num) {
    this.moved = true;
    this.idx = (this.idx + num) % this.perimeter;
};

Robot.prototype.getPos = function() {
    return this.coords[this.idx];
};

Robot.prototype.getDir = function() {
    if (!this.moved) return "East";
    return this.dirs[this.idx];
};
```
