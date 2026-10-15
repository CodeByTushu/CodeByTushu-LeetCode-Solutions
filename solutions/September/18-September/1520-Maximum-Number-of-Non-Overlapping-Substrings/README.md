# LeetCode 1520: Maximum Number of Non-Overlapping Substrings

- **Publication Date:** 18 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/](https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/LwmKiOhrPpI?si=u0BmrzkVgvwSVJAI)

---

## Problem Summary

Given a string `s` of lowercase letters, find the maximum number of **non-empty** substrings of `s` that meet the following conditions:

1. The substrings do not overlap, that is for any two substrings `s[i..j]` and `s[x..y]`, either `j < x` or `i > y` is true.
2. A substring that contains a certain character `c` must also contain all occurrences of `c`.

Find the *maximum number of substrings* that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with *minimum total length*. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in **any order**.

---

### Examples

#### Example 1:
- **Input:** `s = "adefaddaccc"`
- **Output:** `["e","f","ccc"]`
- **Explanation:**
  The following are all the possible substrings that meet the conditions:
  `["adefaddaccc", "adefadda", "ef", "e", "f", "ccc"]`
  If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose `"adefadda"`, we are left with `"ccc"` which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose `"ef"` since it can be split into two. Therefore, the optimal way is to choose `["e","f","ccc"]` which gives us 3 substrings. No other solution of the same number of substrings exists.

#### Example 2:
- **Input:** `s = "abbaccd"`
- **Output:** `["d","bb","cc"]`
- **Explanation:**
  Notice that while the set of substrings `["d","abba","cc"]` also has length 3, it's considered incorrect since it has larger total length (`"abba"` vs `"bb"`).

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s` contains only lowercase English letters.

---

## Topics and Tags

- **String**
- **Greedy**
- **Hash Table**

---

## Approach & Intuition

### Key Observations:

1. **Condition 2 Mandate (All Occurrences Contained)**:
   - For any character $c$ present in a valid substring $s[l..r]$, every occurrence of $c$ in the entire string must lie within $[l, r]$.
   - Hence, if character $c$ is included, we must have:
     $$l \le \text{first}[c] \quad \text{and} \quad r \ge \text{last}[c]$$
   - A minimal valid substring starting at position $i$ must start at the very first occurrence of some character $c$ ($\text{first}[c] == i$). If $i$ is not the first occurrence of $s[i]$, any substring starting at $i$ would either miss earlier occurrences of $s[i]$ or not be minimal.

2. **Window Expansion**:
   - For every character $c$ whose first appearance is at index $i$, initialize candidate bounds:
     $$l = i, \quad r = \text{last}[c]$$
   - Scan $j$ from $l$ to $r$:
     - If any intermediate character $ch = s[j]$ has its first occurrence strictly before $l$ ($\text{first}[ch] < l$), then any substring containing $ch$ would have to expand leftwards beyond $l$. However, our candidate starts at $l$. This makes a valid substring starting at $l$ impossible, so we discard this candidate immediately (`valid = false`).
     - Otherwise, we expand our right boundary to accommodate all occurrences of $ch$:
       $$r = \max(r, \text{last}[ch])$$

3. **Greedy Interval Scheduling & Replacement**:
   - Since we iterate $i$ from $0$ to $n - 1$, valid candidate intervals $[l, r]$ are inspected with strictly non-decreasing start positions $l$.
   - **Case 1 (Non-overlapping):** If $l > \text{prevEnd}$, this interval does not overlap with previously chosen intervals. We append $s[l..r]$ to our results and record $\text{prevEnd} = r$.
   - **Case 2 (Strictly Contained):** If $r < \text{prevEnd}$, because $l \ge \text{prevStart}$, the new interval $[l, r]$ is completely contained within the previously picked interval!
     Replacing the previous interval with $[l, r]$ strictly reduces the total length and frees up more room to the right, which can never decrease the total number of non-overlapping substrings. Therefore, we replace the last chosen substring with $s[l..r]$ and update $\text{prevEnd} = r$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(26 \cdot N) = \mathcal{O}(N)$
  - Finding first and last occurrences of all characters takes $\mathcal{O}(N)$ time.
  - Candidate substring expansion occurs only at indices where $i = \text{first}[c]$, which happens at most 26 times.
  - Each window scan checks characters up to $N$. Thus, total time is bounded by $26 \times N = \mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(26) = \mathcal{O}(1)$
  - Fixed-size frequency/index arrays of length 26 (`first`, `last`).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
