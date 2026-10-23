# LeetCode 2515: Shortest Distance to Target String in a Circular Array

- **Publication Date:** 15 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/dBau2j8rHQ4)

---

## Problem Summary

You are given a 0-indexed **circular** string array `words` and a string `target`. In a circular array, the end connects to the beginning:
- The next element of `words[i]` is `words[(i + 1) % n]`.
- The previous element of `words[i]` is `words[(i - 1 + n) % n]`.

Starting from `startIndex`, you can move to either the next word or the previous word with 1 step at a time.

Return the **shortest distance** needed to reach the string `target`. If `target` does not exist in `words`, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `words = ["hello", "i", "am", "leetcode", "hello"]`, `target = "hello"`, `startIndex = 1`
- **Output:** `1`
- **Explanation:**
  - Starting from index $1$, we can reach `"hello"` at index $0$ by moving $1$ unit to the left.
  - Shortest distance is $1$.

#### Example 2:
- **Input:** `words = ["a", "b", "leetcode"]`, `target = "leetcode"`, `startIndex = 0`
- **Output:** `1`
- **Explanation:**
  - Starting from index $0$, we can reach `"leetcode"` at index $2$ by moving $1$ unit to the left.
  - Shortest distance is $1$.

#### Example 3:
- **Input:** `words = ["i", "eat", "leetcode"]`, `target = "ate"`, `startIndex = 0`
- **Output:** `-1`
- **Explanation:**
  - `"ate"` does not exist in `words`, so return $-1$.

---

### Constraints

- $1 \le \text{words.length} \le 100$
- $1 \le \text{words}[i].\text{length} \le 100$
- `words[i]` and `target` consist only of lowercase English letters.
- $0 \le \text{startIndex} < \text{words.length}$

---

## Topics and Tags

- **Array**
- **String**
- **Simulation**

---

## Approach & Intuition

### 1. Direct Circular Distance Metric

In a circular array of size $n$, the distance between two indices `startIndex` and $i$ can be traversed in two directions:
1. **Direct distance along the linear index:**
   $$d = |i - \text{startIndex}|$$
2. **Wrap-around distance across the array boundary:**
   $$n - d = n - |i - \text{startIndex}|$$

The shortest distance to index $i$ is:
$$\text{dist}(i, \text{startIndex}) = \min(|i - \text{startIndex}|, \ n - |i - \text{startIndex}|)$$

### 2. Single-Pass Search

- Iterate through all indices $i \in [0, n - 1]$.
- If `words[i] == target`, compute $\min(|i - \text{startIndex}|, \ n - |i - \text{startIndex}|)$ and update the running minimum distance.
- If no matching string was found after scanning the entire array, return $-1$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot L)$
  - Scanning $N \le 100$ words, each string comparison takes $\mathcal{O}(L \le 100)$ time.
  - Overall time is $\mathcal{O}(N \cdot L)$ operations ($\approx 10^4$), completing in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar integer distance variables are stored, requiring zero extra memory allocations.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/dBau2j8rHQ4](https://youtu.be/dBau2j8rHQ4)
