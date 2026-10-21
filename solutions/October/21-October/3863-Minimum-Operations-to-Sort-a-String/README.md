# LeetCode 3863: Minimum Operations to Sort a String

- **Publication Date:** 21 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-sort-a-string/](https://leetcode.com/problems/minimum-operations-to-sort-a-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Jb65LCRArCE?si=HA5QTCnreZbcywcZ)

---

## Problem Summary

You are given a string `s` consisting of lowercase English letters.

In one operation, you can select any substring of `s` that is **not the entire string** and sort it in non-descending alphabetical order.

Return the **minimum number of operations** required to make `s` sorted in non-descending order. If it is not possible, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `s = "dog"`
- **Output:** `1`
- **Explanation:**
  - Sort substring `"og"` to `"go"`.
  - Now, `s = "dgo"`, which is sorted in ascending order. Thus, the answer is `1`.

#### Example 2:
- **Input:** `s = "card"`
- **Output:** `2`
- **Explanation:**
  - Sort substring `"car"` to `"acr"`, so `s = "acrd"`.
  - Sort substring `"rd"` to `"dr"`, making `s = "acdr"`, which is sorted in ascending order. Thus, the answer is `2`.

#### Example 3:
- **Input:** `s = "gf"`
- **Output:** `-1`
- **Explanation:**
  - It is impossible to sort `s` under the given constraints. Thus, the answer is `-1`.

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s` consists of only lowercase English letters.

---

## Topics and Tags

- **String**
- **Greedy**
- **Sorting**

---

## Approach & Intuition

### 1. Case-by-Case Greedy Analysis

Since any operation must choose a **proper substring** (length $< n$), the operations must leave at least one character untouched. We can systematically determine the answer:

1. **0 Operations:**
   - If `s` is already sorted in non-decreasing order, no operation is needed (`return 0`).

2. **-1 Operation (Impossible):**
   - If $n = 2$ and `s` is unsorted (e.g. `"gf"`), the only proper substrings have length 1. Sorting a length-1 substring cannot change any character position, so sorting `s` is impossible (`return -1`).

3. **1 Operation:**
   - A single operation can either sort `s[0 ... n - 2]` (leaving `s[n - 1]` untouched) or sort `s[1 ... n - 1]` (leaving `s[0]` untouched).
   - Sorting `s[1 ... n - 1]` works if and only if `s[0]` is already the global minimum (`s[0] == mn`).
   - Sorting `s[0 ... n - 2]` works if and only if `s[n - 1]` is already the global maximum (`s[n - 1] == mx`).
   - If either holds, 1 operation is sufficient (`return 1`).

4. **3 Operations:**
   - Consider the case where `s[0]` is strictly greater than all other characters (`s[0] > max(s[1:])`), AND `s[n - 1]` is strictly smaller than all other characters (`s[n - 1] < min(s[:-1])`).
   - Neither 1 nor 2 operations can simultaneously swap the extreme characters to opposite ends without touching the whole string.
   - Hence, exactly 3 operations are required (`return 3`).

5. **2 Operations:**
   - For all remaining configurations, 2 operations are always sufficient (e.g., sorting prefix `s[0 ... n - 2]` followed by suffix `s[1 ... n - 1]`, or vice-versa) (`return 2`).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A few simple linear passes over the string of length $N$ to find min/max elements and check the sorted status.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar character and boolean variables are maintained.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/Jb65LCRArCE?si=HA5QTCnreZbcywcZ](https://youtu.be/Jb65LCRArCE?si=HA5QTCnreZbcywcZ)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
