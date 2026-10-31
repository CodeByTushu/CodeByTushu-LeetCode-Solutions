# LeetCode 1536: Minimum Swaps to Arrange a Binary Grid

- **Publication Date:** 02 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid/](https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/2LJLLMfp4k0?si=U9zyfFohZCRdejDl)

---

## Problem Summary

Given an $n \times n$ binary `grid`, in one step you can choose two adjacent rows of the grid and swap them.

A grid is said to be **valid** if all the cells above the main diagonal are zeros.

Return the **minimum number of steps** needed to make the grid valid, or `-1` if the grid cannot be valid.

The main diagonal of a grid is the diagonal that starts at cell $(1, 1)$ and ends at cell $(n, n)$.

---

### Examples

#### Example 1:
- **Input:** `grid = [[0,0,1],[1,1,0],[1,0,0]]`
- **Output:** `3`
- **Explanation:**
  - Swap row 1 with row 2: `[[1,1,0],[0,0,1],[1,0,0]]`
  - Swap row 2 with row 3: `[[1,1,0],[1,0,0],[0,0,1]]`
  - Swap row 1 with row 2: `[[1,0,0],[1,1,0],[0,0,1]]`
  - Total swaps = 3.

#### Example 2:
- **Input:** `grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]`
- **Output:** `-1`
- **Explanation:** All rows are identical and none has enough trailing zeros; swaps have no effect on making the grid valid.

#### Example 3:
- **Input:** `grid = [[1,0,0],[1,1,0],[1,1,1]]`
- **Output:** `0`
- **Explanation:** The grid is already valid.

---

### Constraints

- $n == \text{grid.length} == \text{grid}[i].\text{length}$
- $1 \le n \le 200$
- `grid[i][j]` is either `0` or `1`.

---

## Topics and Tags

- **Primary Tags:** Array, Greedy, Matrix
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Condition for Validity

In an $n \times n$ matrix:
- For row $i$ (0-indexed, where $0 \le i < n$), all elements in columns strictly greater than $i$ (i.e., columns $i + 1, i + 2, \dots, n - 1$) must be `0`.
- The number of such cells in row $i$ is exactly $(n - 1) - i$.
- Hence, row $i$ requires **at least $n - 1 - i$ trailing zeros**.

### 2. Reduction to Trailing Zero Counts

We first compress each row $i$ of `grid` into an integer `trailingZeros[i]`, which represents the number of consecutive zeros from the rightmost column moving left until the first `1` (or until column 0 is reached).

### 3. Greedy Selection & Inversion Minimization

For each row position $i$ from $0$ to $n - 1$:
1. We determine the requirement: $\text{required} = n - 1 - i$.
2. We search for the smallest index $j \ge i$ such that `trailingZeros[j] >= required`.
   - **Why the smallest $j$?** Picking the first qualifying row minimizes the number of adjacent swaps ($j - i$) required to move it to position $i$. Furthermore, any row satisfying a stricter requirement (larger $n - 1 - i$) also satisfies subsequent looser requirements, so pulling the closest valid row leaves the remaining rows in an optimal relative ordering.
3. If no such row exists among all $j \in [i, n - 1]$, it is impossible to satisfy position $i$, and we immediately return `-1`.
4. If a valid row is found at index $j$:
   - Add $j - i$ to our total swap count.
   - Shift the rows between index $i$ and $j - 1$ down by one position to simulate bubbling row $j$ up to index $i$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$.
  - Counting trailing zeros across all rows takes $\mathcal{O}(n^2)$ time.
  - The greedy selection and bubbling across $n$ rows takes $\sum_{i=0}^{n-1} \mathcal{O}(n - i) = \mathcal{O}(n^2)$ time.
  - With $n \le 200$, $n^2 \approx 4 \times 10^4$ operations, executing in under $2$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ to store the array of trailing zero counts.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minSwaps(int[][] grid) {
        int n = grid.length;
        int[] trailingZeros = new int[n];

        // Step 1: Count trailing zeros for each row
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = n - 1; j >= 0; j--) {
                if (grid[i][j] == 0) {
                    count++;
                } else {
                    break;
                }
            }
            trailingZeros[i] = count;
        }

        int swaps = 0;

        // Step 2: For each row i, find the first available row with >= (n - 1 - i) trailing zeros
        for (int i = 0; i < n; i++) {
            int requiredZeros = n - 1 - i;
            int foundIdx = -1;

            for (int j = i; j < n; j++) {
                if (trailingZeros[j] >= requiredZeros) {
                    foundIdx = j;
                    break;
                }
            }

            if (foundIdx == -1) {
                return -1;
            }

            // Step 3: Shift the qualifying row up to position i
            swaps += (foundIdx - i);
            int temp = trailingZeros[foundIdx];
            for (int j = foundIdx; j > i; j--) {
                trailingZeros[j] = trailingZeros[j - 1];
            }
            trailingZeros[i] = temp;
        }

        return swaps;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minSwaps(self, grid: List[List[int]]) -> int:
        n = len(grid)
        trailing_zeros = []

        # Step 1: Count trailing zeros for each row
        for row in grid:
            count = 0
            for val in reversed(row):
                if val == 0:
                    count += 1
                else:
                    break
            trailing_zeros.append(count)

        swaps = 0

        # Step 2: For each row i, find first row with at least (n - 1 - i) zeros
        for i in range(n):
            required = n - 1 - i
            found_idx = -1
            for j in range(i, n):
                if trailing_zeros[j] >= required:
                    found_idx = j
                    break

            if found_idx == -1:
                return -1

            # Step 3: Shift row to index i
            swaps += found_idx - i
            val = trailing_zeros.pop(found_idx)
            trailing_zeros.insert(i, val)

        return swaps
```

### C++
```cpp
/**
 * Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minSwaps(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<int> trailingZeros(n);

        // Step 1: Count trailing zeros for each row
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = n - 1; j >= 0; j--) {
                if (grid[i][j] == 0) {
                    count++;
                } else {
                    break;
                }
            }
            trailingZeros[i] = count;
        }

        int swaps = 0;

        // Step 2: Greedy selection of closest row meeting requirement
        for (int i = 0; i < n; i++) {
            int required = n - 1 - i;
            int foundIdx = -1;

            for (int j = i; j < n; j++) {
                if (trailingZeros[j] >= required) {
                    foundIdx = j;
                    break;
                }
            }

            if (foundIdx == -1) {
                return -1;
            }

            // Step 3: Shift qualifying row up to index i
            swaps += (foundIdx - i);
            int temp = trailingZeros[foundIdx];
            for (int j = foundIdx; j > i; j--) {
                trailingZeros[j] = trailingZeros[j - 1];
            }
            trailingZeros[i] = temp;
        }

        return swaps;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps = function(grid) {
    const n = grid.length;
    const trailingZeros = new Array(n);

    // Step 1: Count trailing zeros for each row
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = n - 1; j >= 0; j--) {
            if (grid[i][j] === 0) {
                count++;
            } else {
                break;
            }
        }
        trailingZeros[i] = count;
    }

    let swaps = 0;

    // Step 2: Greedy search for first qualifying row
    for (let i = 0; i < n; i++) {
        const required = n - 1 - i;
        let foundIdx = -1;

        for (let j = i; j < n; j++) {
            if (trailingZeros[j] >= required) {
                foundIdx = j;
                break;
            }
        }

        if (foundIdx === -1) {
            return -1;
        }

        // Step 3: Bubble up qualifying row to index i
        swaps += (foundIdx - i);
        const temp = trailingZeros[foundIdx];
        for (let j = foundIdx; j > i; j--) {
            trailingZeros[j] = trailingZeros[j - 1];
        }
        trailingZeros[i] = temp;
    }

    return swaps;
};
```
