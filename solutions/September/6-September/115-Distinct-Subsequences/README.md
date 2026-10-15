# LeetCode 115: Distinct Subsequences

- **Publication Date:** 06 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/distinct-subsequences/](https://leetcode.com/problems/distinct-subsequences/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3zsIGf3Eshg?si=yh8q8tS_D6U5VvvK)

---

## Problem Summary

Given two strings `s` and `t`, return the number of distinct **subsequences** of `s` which equals `t`.

The test cases are generated so that the answer fits on a 32-bit signed integer.

---

### Examples

#### Example 1:
- **Input:** `s = "rabbbit", t = "rabbit"`
- **Output:** `3`
- **Explanation:**
  As shown below, there are 3 ways you can generate `"rabbit"` from `s`:
  1. `ra_b_bbit`
  2. `rab_b_bit`
  3. `rabb_b_it`

#### Example 2:
- **Input:** `s = "babgbag", t = "bag"`
- **Output:** `5`
- **Explanation:**
  As shown below, there are 5 ways you can generate `"bag"` from `s`:
  1. `ba_b_gbag`
  2. `ba_bgba_g`
  3. `babg_ba_g`
  4. `bab_gba_g`
  5. `babgbag`

---

### Constraints

- $1 \le s.\text{length}, t.\text{length} \le 1000$
- `s` and `t` consist of English letters.

---

## Topics and Tags

- **String**
- **Dynamic Programming**

---

## Approach & Intuition

1. **Recurrence Relation**:
   - Let $\text{dp}[i][j]$ represent the number of distinct subsequences of prefix $s[0..i-1]$ that equal prefix $t[0..j-1]$.
   - **Base Cases**:
     - $\text{dp}[i][0] = 1$ for all $0 \le i \le m$: An empty string $t$ is a subsequence of any prefix of $s$ in exactly 1 way (by deleting all characters).
     - $\text{dp}[0][j] = 0$ for all $1 \le j \le n$: A non-empty string $t$ cannot be formed from an empty string $s$.
   - **Transitions**:
     - At character $s[i-1]$ and $t[j-1]$, we always have the option to ignore $s[i-1]$:
       $$\text{dp}[i][j] = \text{dp}[i-1][j]$$
     - If the current characters match ($s[i-1] == t[j-1]$), we also have the option to match them, which adds the ways to form $t[0..j-2]$ from $s[0..i-2]$:
       $$\text{dp}[i][j] += \text{dp}[i-1][j-1]$$

2. **Final Answer**:
   - The final answer is stored in $\text{dp}[m][n]$ where $m = s.\text{length}()$ and $n = t.\text{length}()$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$
  - Filling the 2D DP table takes nested loops of size $(M + 1) \times (N + 1)$ with $\mathcal{O}(1)$ work per state.
  - Overall time complexity is $\mathcal{O}(M \times N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N)$
  - 2D DP array of size $(M + 1) \times (N + 1)$. Can be further optimized to $\mathcal{O}(N)$ using a 1D rolling array.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/3zsIGf3Eshg?si=yh8q8tS_D6U5VvvK](https://youtu.be/3zsIGf3Eshg?si=yh8q8tS_D6U5VvvK)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
