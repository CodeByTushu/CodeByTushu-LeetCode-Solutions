# LeetCode 3761: Minimum Absolute Distance Between Mirror Pairs

- **Publication Date:** 17 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs/](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Hh0u2qOIgQE)

---

## Problem Summary

You are given an integer array `nums`.

A **mirror pair** is a pair of indices `(i, j)` such that:
- $0 \le i < j < \text{nums.length}$, and
- $\text{reverse}(\text{nums}[i]) == \text{nums}[j]$, where $\text{reverse}(x)$ denotes the integer formed by reversing the digits of $x$. Leading zeros are omitted after reversing (for example, $\text{reverse}(120) = 21$).

Return the **minimum absolute distance** between the indices of any mirror pair ($\text{abs}(i - j)$). If no mirror pair exists, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [12, 21, 45, 33, 54]`
- **Output:** `1`
- **Explanation:**
  - Mirror pair $(0, 1)$ has $\text{reverse}(\text{nums}[0]) = \text{reverse}(12) = 21 = \text{nums}[1]$, with distance $|0 - 1| = 1$.
  - Mirror pair $(2, 4)$ has $\text{reverse}(\text{nums}[2]) = \text{reverse}(45) = 54 = \text{nums}[4]$, with distance $|2 - 4| = 2$.
  - The minimum absolute distance is $\min(1, 2) = 1$.

#### Example 2:
- **Input:** `nums = [120, 21]`
- **Output:** `1`
- **Explanation:**
  - $\text{reverse}(\text{nums}[0]) = \text{reverse}(120) = 21 = \text{nums}[1]$.
  - The pair $(0, 1)$ forms a valid mirror pair with distance $|0 - 1| = 1$.

#### Example 3:
- **Input:** `nums = [21, 120]`
- **Output:** `-1`
- **Explanation:**
  - A mirror pair requires $i < j$ and $\text{reverse}(\text{nums}[i]) == \text{nums}[j]$.
  - $\text{reverse}(\text{nums}[0]) = \text{reverse}(21) = 12 \ne 120$.
  - No valid mirror pair exists, so the answer is $-1$.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Math**

---

## Approach & Intuition

### 1. The Mirror Invariant

A pair of indices $(i, j)$ with $i < j$ qualifies as a mirror pair if and only if:
$$\text{reverse}(\text{nums}[i]) = \text{nums}[j]$$

Since we want to minimize the index distance $j - i$, for each index $j$, the optimal companion index $i < j$ is the **most recent** index where $\text{reverse}(\text{nums}[i]) = \text{nums}[j]$.

### 2. Single-Pass Hash Map

Instead of an $\mathcal{O}(N^2)$ brute-force comparison of all pairs:
1. Maintain a hash map `lastSeen` where keys are reversed values $\text{reverse}(\text{nums}[i])$ and values are their corresponding most recent indices $i$.
2. For each index $j$ from $0$ to $n - 1$:
   - Check if $\text{nums}[j]$ already exists in `lastSeen`.
   - If present, we have found a valid mirror pair $(i, j)$ where $i = \text{lastSeen}[\text{nums}[j]]$. The distance is $j - i$. Update `minDistance = min(minDistance, j - i)`.
   - **Early Exit:** Because the indices are distinct ($i < j$), the smallest possible distance is $1$. If `minDistance == 1`, return $1$ immediately.
   - Afterwards, compute $\text{rev} = \text{reverse}(\text{nums}[j])$ and record `lastSeen[rev] = j` to serve as candidate $i$ for future indices $k > j$.
3. If no mirror pair is found by the end of the pass, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log_{10} C)$
  - Here $N \le 10^5$ and $C \le 10^9$.
  - Reversing an integer $\le 10^9$ takes at most $10$ modulo/division operations ($\mathcal{O}(\log_{10} C)$).
  - Hash map insertions and lookups take $\mathcal{O}(1)$ average time.
  - Overall time complexity is $\mathcal{O}(N)$, running in $< 25\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing up to $N$ entries in the `lastSeen` hash map requires $\mathcal{O}(N)$ space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/Hh0u2qOIgQE](https://youtu.be/Hh0u2qOIgQE)
