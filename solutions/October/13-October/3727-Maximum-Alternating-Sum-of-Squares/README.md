# LeetCode 3727: Maximum Alternating Sum of Squares

- **Publication Date:** 13 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-alternating-sum-of-squares/](https://leetcode.com/problems/maximum-alternating-sum-of-squares/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/lPOO0qTlah4?si=1wjwXU9KfcCsMHjo)

---

## Problem Summary

You are given an integer array `nums`. You may rearrange the elements in any order.

The **alternating score** of an array `arr` is defined as:
$$\text{score} = \text{arr}[0]^2 - \text{arr}[1]^2 + \text{arr}[2]^2 - \text{arr}[3]^2 + \dots$$

Return an integer denoting the **maximum possible alternating score** of `nums` after rearranging its elements.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 3]`
- **Output:** `12`
- **Explanation:**
  A possible rearrangement for `nums` is `[2, 1, 3]`, which gives the maximum alternating score:
  $$\text{score} = 2^2 - 1^2 + 3^2 = 4 - 1 + 9 = 12$$

#### Example 2:
- **Input:** `nums = [1, -1, 2, -2, 3, -3]`
- **Output:** `16`
- **Explanation:**
  A possible rearrangement for `nums` is `[-3, -1, -2, 1, 3, 2]`, which gives the maximum alternating score:
  $$\text{score} = (-3)^2 - (-1)^2 + (-2)^2 - (1)^2 + 3^2 - 2^2 = 9 - 1 + 4 - 1 + 9 - 4 = 16$$

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $-4 \times 10^4 \le \text{nums}[i] \le 4 \times 10^4$

---

## Topics and Tags

- **Array**
- **Greedy**
- **Sorting**
- **Math**

---

## Approach & Intuition

1. **Sign Breakdown in Alternating Score**:
   - In any array of size $n$, indices $0, 2, 4, \dots$ contribute positively ($+x^2$).
   - Indices $1, 3, 5, \dots$ contribute negatively ($-x^2$).
   - Total positive terms: $\lceil n / 2 \rceil = n - \lfloor n / 2 \rfloor$.
   - Total negative terms: $\lfloor n / 2 \rfloor$.

2. **Greedy Assignment**:
   - Since $x^2 \ge 0$ for all real numbers, each element's square is non-negative.
   - To maximize the net sum $\sum \text{positive} - \sum \text{negative}$, we must assign:
     - The **smallest $\lfloor n / 2 \rfloor$ squares** to the negative positions.
     - The **remaining largest $n - \lfloor n / 2 \rfloor$ squares** to the positive positions.

3. **Step-by-Step Algorithm**:
   - Compute the square of every element: $\text{sq}[i] = \text{nums}[i]^2$.
   - Sort the squares in ascending order.
   - Subtract the first $\lfloor n / 2 \rfloor$ squares from the total.
   - Add the remaining squares to the total.
   - Return the resulting 64-bit integer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Computing $n$ squares takes $\mathcal{O}(N)$ time.
  - Sorting the array of $n$ squares takes $\mathcal{O}(N \log N)$ time.
  - Linear scan for addition/subtraction takes $\mathcal{O}(N)$ time.
  - Total time: $\mathcal{O}(N \log N)$, which runs well within the $10^5$ limit ($< 60\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing the array of squares requires $\mathcal{O}(N)$ auxiliary memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/lPOO0qTlah4?si=1wjwXU9KfcCsMHjo](https://youtu.be/lPOO0qTlah4?si=1wjwXU9KfcCsMHjo)
