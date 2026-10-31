# LeetCode 2751: Robot Collisions

- **Publication Date:** 01 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/robot-collisions/](https://leetcode.com/problems/robot-collisions/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

There are `n` 1-indexed robots, each having a position on a line, health, and movement direction.

You are given 0-indexed integer arrays `positions`, `healths`, and a string `directions` (`directions[i]` is either `'L'` for left or `'R'` for right). All integers in `positions` are unique.

All robots start moving on the line simultaneously at the same speed in their given directions. If two robots ever share the same position while moving, they will collide.

If two robots collide, the robot with lower health is removed from the line, and the health of the other robot decreases by one. The surviving robot continues in the same direction it was going. If both robots have the same health, they are both removed from the line.

Your task is to determine the health of the robots that survive the collisions, in the same order that the robots were given, i.e. final health of robot 1 (if survived), final health of robot 2 (if survived), and so on. If there are no survivors, return an empty array.

Return an array containing the health of the remaining robots (in the order they were given in the input), after no further collisions can occur.

---

### Examples

#### Example 1:
- **Input:** `positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"`
- **Output:** `[2,17,9,15,10]`
- **Explanation:** No collision occurs in this example, since all robots are moving in the same direction. So, the health of the robots in order from the first robot is returned, `[2, 17, 9, 15, 10]`.

#### Example 2:
- **Input:** `positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"`
- **Output:** `[14]`
- **Explanation:** There are 2 collisions in this example. Firstly, robot 1 and robot 2 will collide, and since both have the same health, they will be removed from the line. Next, robot 3 and robot 4 will collide and since robot 4's health is smaller, it gets removed, and robot 3's health becomes 15 - 1 = 14. Only robot 3 remains, so we return `[14]`.

#### Example 3:
- **Input:** `positions = [1,2,5,6], healths = [10,10,11,11], directions = "RLRL"`
- **Output:** `[]`
- **Explanation:** Robot 1 and robot 2 will collide and since both have the same health, they are both removed. Robot 3 and 4 will collide and since both have the same health, they are both removed. So, we return an empty array, `[]`.

---

### Constraints

- $1 \le \text{positions.length} == \text{healths.length} == \text{directions.length} == n \le 10^5$
- $1 \le \text{positions}[i], \text{healths}[i] \le 10^9$
- $\text{directions}[i] == \text{'L'}$ or $\text{directions}[i] == \text{'R'}$
- All values in `positions` are distinct.

---

## Topics and Tags

- **Primary Tags:** Array, Stack, Sorting, Simulation
- **Secondary Tags:** Monotonic Stack, Two Pointers

---

## Detailed Algorithm Walkthrough

### 1. Collision Invariant & Spatial Sorting

All robots move with identical uniform speed. Consequently:
- Two robots moving in the same direction (`L` and `L`, or `R` and `R`) maintain constant relative distance and can never collide.
- An `L`-moving robot positioned to the left of an `R`-moving robot moves away indefinitely into opposite directions ($-\infty$ and $+\infty$).
- Hence, **collisions occur if and only if an `R`-moving robot is located to the left of an `L`-moving robot**.

Since input arrays `positions`, `healths`, and `directions` may arrive in arbitrary unsorted order, we first sort all robot indices based on their coordinate positions in ascending order:
$$\text{indices} = [0, 1, \dots, n-1] \quad \text{sorted by } \text{positions}[i]$$

### 2. Simulating Collisions with a Stack

Scanning robots strictly from left to right:
1. **Encountering `'R'`:**
   - Any robot moving rightward cannot collide with robots behind it. We push its index onto our tracking stack.
2. **Encountering `'L'`:**
   - This robot moves leftward and will collide with the most recently encountered `'R'` robot on its left (the top of our stack).
   - While the stack is non-empty and the current `'L'` robot still has positive health:
     - Let $\text{top}$ be the index at the stack top.
     - **Case A ($\text{healths}[\text{top}] < \text{healths}[\text{curr}]$):** The `'R'` robot is destroyed. We set $\text{healths}[\text{top}] = 0$, pop it from the stack, decrement the `'L'` robot's health ($\text{healths}[\text{curr}] -= 1$), and continue checking subsequent `'R'` robots in the stack.
     - **Case B ($\text{healths}[\text{top}] > \text{healths}[\text{curr}]$):** The `'L'` robot is destroyed. We set $\text{healths}[\text{curr}] = 0$, decrement the `'R'` robot's health ($\text{healths}[\text{top}] -= 1$), and the collision resolves with the `'R'` robot remaining on top of the stack.
     - **Case C ($\text{healths}[\text{top}] == \text{healths}[\text{curr}]$):** Mutual annihilation. Both robots are destroyed: $\text{healths}[\text{top}] = 0, \text{healths}[\text{curr}] = 0$, and we pop the stack.

### 3. Preserving Original Input Order

The problem requires returning the healths of the surviving robots in the original input index order (from robot 0 to $n - 1$). Since we mutate the `healths` array in-place, we simply collect all $\text{healths}[i]$ where $\text{healths}[i] > 0$ for $i \in [0, n - 1]$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$, where $n$ is the number of robots. Sorting the $n$ indices by position takes $\mathcal{O}(n \log n)$ time. During the stack traversal, every robot index is pushed onto and popped from the stack at most once, which runs in amortized $\mathcal{O}(n)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$, required to store the sorted index list and the collision simulation stack.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public List<Integer> survivedRobotsHealths(int[] positions, int[] healths, String directions) {
        int n = positions.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }

        // Sort indices based on robot positions in ascending order
        Arrays.sort(indices, (a, b) -> Integer.compare(positions[a], positions[b]));

        Deque<Integer> stack = new ArrayDeque<>(); // stores indices of 'R' moving robots

        for (int curr : indices) {
            if (directions.charAt(curr) == 'R') {
                stack.push(curr);
            } else {
                // Robot moving 'L' collides with any 'R' robots encountered so far
                while (!stack.isEmpty() && healths[curr] > 0) {
                    int top = stack.peek();
                    if (healths[top] < healths[curr]) {
                        healths[top] = 0;
                        stack.pop();
                        healths[curr] -= 1;
                    } else if (healths[top] > healths[curr]) {
                        healths[curr] = 0;
                        healths[top] -= 1;
                    } else {
                        // Equal health: both robots eliminated
                        healths[top] = 0;
                        healths[curr] = 0;
                        stack.pop();
                    }
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (healths[i] > 0) {
                result.add(healths[i]);
            }
        }
        return result;
    }
}
```

### Python
```python
"""
Problem: LeetCode 2751 - Robot Collisions
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List


class Solution:
    def survivedRobotsHealths(self, positions: List[int], healths: List[int], directions: str) -> List[int]:
        n = len(positions)
        indices = sorted(range(n), key=lambda i: positions[i])
        stack = []  # stores indices of robots moving 'R'

        for curr in indices:
            if directions[curr] == 'R':
                stack.append(curr)
            else:
                # Robot moving 'L' collides with any 'R' robots in stack
                while stack and healths[curr] > 0:
                    top = stack[-1]
                    if healths[top] < healths[curr]:
                        healths[top] = 0
                        stack.pop()
                        healths[curr] -= 1
                    elif healths[top] > healths[curr]:
                        healths[curr] = 0
                        healths[top] -= 1
                    else:
                        healths[top] = 0
                        healths[curr] = 0
                        stack.pop()

        return [healths[i] for i in range(n) if healths[i] > 0]
```

### C++
```cpp
/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>
#include <numeric>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> survivedRobotsHealths(vector<int>& positions, vector<int>& healths, string directions) {
        int n = positions.size();
        vector<int> indices(n);
        iota(indices.begin(), indices.end(), 0);

        // Sort indices by positions ascending
        sort(indices.begin(), indices.end(), [&](int a, int b) {
            return positions[a] < positions[b];
        });

        vector<int> st; // stack storing indices of 'R' moving robots

        for (int curr : indices) {
            if (directions[curr] == 'R') {
                st.push_back(curr);
            } else {
                // Robot moving 'L' collides with 'R' robots in stack
                while (!st.empty() && healths[curr] > 0) {
                    int top = st.back();
                    if (healths[top] < healths[curr]) {
                        healths[top] = 0;
                        st.pop_back();
                        healths[curr] -= 1;
                    } else if (healths[top] > healths[curr]) {
                        healths[curr] = 0;
                        healths[top] -= 1;
                    } else {
                        healths[top] = 0;
                        healths[curr] = 0;
                        st.pop_back();
                    }
                }
            }
        }

        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (healths[i] > 0) {
                result.push_back(healths[i]);
            }
        }
        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function(positions, healths, directions) {
    const n = positions.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    indices.sort((a, b) => positions[a] - positions[b]);

    const stack = []; // stores indices of robots moving 'R'

    for (const curr of indices) {
        if (directions[curr] === 'R') {
            stack.push(curr);
        } else {
            // Robot moving 'L' collides with 'R' robots in stack
            while (stack.length > 0 && healths[curr] > 0) {
                const top = stack[stack.length - 1];
                if (healths[top] < healths[curr]) {
                    healths[top] = 0;
                    stack.pop();
                    healths[curr] -= 1;
                } else if (healths[top] > healths[curr]) {
                    healths[curr] = 0;
                    healths[top] -= 1;
                } else {
                    healths[top] = 0;
                    healths[curr] = 0;
                    stack.pop();
                }
            }
        }
    }

    const result = [];
    for (let i = 0; i < n; i++) {
        if (healths[i] > 0) {
            result.push(healths[i]);
        }
    }
    return result;
};
```
