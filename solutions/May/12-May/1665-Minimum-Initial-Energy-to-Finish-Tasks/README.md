# LeetCode 1665: Minimum Initial Energy to Finish Tasks

- **Publication Date:** 12 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks/](https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/h46nijPwoQQ)

---

## Problem Summary

You are given an array `tasks` where `tasks[i] = [actual_i, minimum_i]`:
- `actual_i` is the actual amount of energy you spend to finish the $i^{\text{th}}$ task.
- `minimum_i` is the minimum amount of energy you require to begin the $i^{\text{th}}$ task.

For example, if the task is `[10, 12]` and your current energy is `11`, you cannot start this task. However, if your current energy is `13`, you can complete this task, and your energy will be $13 - 10 = 3$.

You can finish the tasks in **any order** you like.

Return the **minimum initial amount of energy** you will need to finish all the tasks.

---

### Examples

#### Example 1:
- **Input:** `tasks = [[1, 2], [2, 4], [4, 8]]`
- **Output:** `8`
- **Explanation:**
  - Starting with 8 energy, finish the tasks in the following order:
    1. 3rd task (`[4, 8]`): Current energy $\ge 8$. After completion, energy = $8 - 4 = 4$.
    2. 2nd task (`[2, 4]`): Current energy $\ge 4$. After completion, energy = $4 - 2 = 2$.
    3. 1st task (`[1, 2]`): Current energy $\ge 2$. After completion, energy = $2 - 1 = 1$.
  - Notice that even though we could start with 7 to finish some tasks, we wouldn't be able to finish all of them.

#### Example 2:
- **Input:** `tasks = [[1, 3], [2, 4], [10, 11], [10, 12], [8, 9]]`
- **Output:** `32`
- **Explanation:**
  - Starting with 32 energy, finish the tasks in the following order:
    1. 1st task (`[1, 3]`): After completion, energy = $32 - 1 = 31$.
    2. 2nd task (`[2, 4]`): After completion, energy = $31 - 2 = 29$.
    3. 3rd task (`[10, 11]`): After completion, energy = $29 - 10 = 19$.
    4. 4th task (`[10, 12]`): After completion, energy = $19 - 10 = 9$.
    5. 5th task (`[8, 9]`): After completion, energy = $9 - 8 = 1$.

#### Example 3:
- **Input:** `tasks = [[1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12]]`
- **Output:** `27`
- **Explanation:**
  - Starting with 27 energy, finish tasks in optimal order:
    - 5th task (`[5, 11]`) $\to$ energy = $27 - 5 = 22$.
    - 6th task (`[6, 12]`) $\to$ energy = $22 - 6 = 16$.
    - 4th task (`[4, 10]`) $\to$ energy = $16 - 4 = 12$.
    - 3rd task (`[3, 9]`) $\to$ energy = $12 - 3 = 9$.
    - 2nd task (`[2, 8]`) $\to$ energy = $9 - 2 = 7$.
    - 1st task (`[1, 7]`) $\to$ energy = $7 - 1 = 6$.

---

### Constraints

- $1 \le \text{tasks.length} \le 10^5$
- $1 \le actual_i \le minimum_i \le 10^4$

---

## Topics and Tags

- **Array**
- **Greedy**
- **Sorting**

---

## Approach & Intuition

### 1. Greedy Choice & Exchange Argument

Each task $i$ has an "unused buffer / surplus energy" requirement of:
$$\Delta_i = minimum_i - actual_i \ge 0$$

Consider two adjacent tasks $A = [actual_A, minimum_A]$ and $B = [actual_B, minimum_B]$:
- **Order $A$ then $B$:**
  - Before starting $A$, we need at least $minimum_A$.
  - After $A$, remaining energy is $E - actual_A$. To perform $B$, we need $E - actual_A \ge minimum_B \implies E \ge actual_A + minimum_B$.
  - Therefore, the minimum starting energy is:
    $$E_{AB} = \max(minimum_A, actual_A + minimum_B)$$
- **Order $B$ then $A$:**
  - Similarly, the minimum starting energy is:
    $$E_{BA} = \max(minimum_B, actual_B + minimum_A)$$

Subtracting $actual_A + actual_B$ from both sides of the comparison shows:
$$actual_A + minimum_B \le actual_B + minimum_A \iff minimum_B - actual_B \le minimum_A - actual_A$$

Thus, executing tasks with **larger difference $(minimum_i - actual_i)$ first** strictly minimizes the required initial energy!

### 2. Forward Simulation Algorithm

1. Sort all tasks in **descending order** of $(minimum_i - actual_i)$.
2. Track two variables:
   - `initialEnergy`: the total initial energy required so far.
   - `currentEnergy`: the currently available energy during execution.
3. For each task $[actual, minimum]$:
   - If `currentEnergy < minimum`, we must top up our initial energy by $(minimum - currentEnergy)$, setting `currentEnergy = minimum`.
   - Spend $actual$ energy: `currentEnergy -= actual`.
4. Return `initialEnergy`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting the array of $N$ tasks takes $\mathcal{O}(N \log N)$ time.
  - The linear pass over the sorted tasks takes $\mathcal{O}(N)$ time.
  - Overall time complexity is dominated by sorting: $\mathcal{O}(N \log N)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(N)$
  - Constant auxiliary space $\mathcal{O}(1)$ beyond the memory required for the in-place / Timsort sorting algorithm ($\mathcal{O}(\log N)$ to $\mathcal{O}(N)$).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/h46nijPwoQQ](https://youtu.be/h46nijPwoQQ)
