# LeetCode 1288: Remove Covered Intervals

- **Publication Date:** 06 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/remove-covered-intervals/](https://leetcode.com/problems/remove-covered-intervals/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/80ycan6T6jk?si=olTBuqXYrQg_lk-T)

---

## Problem Summary

Given an array `intervals` where `intervals[i] = [l_i, r_i]` represent the interval $[l_i, r_i)$, remove all intervals that are covered by another interval in the list.

The interval $[a, b)$ is covered by the interval $[c, d)$ if and only if:
$$c \le a \quad \text{and} \quad b \le d$$

Return the **number of remaining intervals**.

---

### Examples

#### Example 1:

- **Input:** `intervals = [[1,4],[3,6],[2,8]]`
- **Output:** `2`
- **Explanation:**
  - Interval `[3, 6]` is covered by `[2, 8]` because $2 \le 3$ and $6 \le 8$.
  - Therefore, `[3, 6]` is removed, leaving `[1, 4]` and `[2, 8]`.

#### Example 2:

- **Input:** `intervals = [[1,4],[2,3]]`
- **Output:** `1`
- **Explanation:**
  - Interval `[2, 3]` is covered by `[1, 4]`, leaving only `[1, 4]`.

---

### Constraints

- $1 \le \text{intervals.length} \le 1000$
- $\text{intervals}[i].\text{length} == 2$
- $0 \le l_i < r_i \le 10^5$
- All the given intervals are **unique**.

---

## Topics and Tags

- **Array**
- **Sorting**

---

## Intuition and Approach

### 1. Custom Sorting Strategy
An interval $[a, b)$ is covered by $[c, d)$ when $c \le a$ and $b \le d$. 
If we sort intervals primarily by their starting coordinates $l_i$ in **ascending order**:
- Any interval that could potentially cover interval $i$ must appear **before** $i$ in the sorted sequence.

What if two intervals have the **same starting point**?
- E.g., `[1, 5]` and `[1, 4]`.
- Here, `[1, 5]` covers `[1, 4]`.
- To ensure the larger interval is processed first, we sort secondarily by right endpoint $r_i$ in **descending order**.

Thus, our sort comparator is:
$$\text{Sort by } l_i \text{ ascending, then by } r_i \text{ descending}.$$

### 2. Single-Pass Greedy Evaluation
After sorting:
- We maintain `maxEnd`, representing the maximum right endpoint seen so far among all processed intervals.
- For each interval $[l, r]$:
  - If $r > \text{maxEnd}$:
    - Since all previously processed intervals started at coordinates $\le l$ and had right endpoints $\le \text{maxEnd} < r$, **no previous interval can cover this interval**.
    - Furthermore, no future interval can cover this interval because all future intervals will have start coordinates $\ge l$.
    - Hence, this interval must be kept! We increment `count` and update $\text{maxEnd} = r$.
  - If $r \le \text{maxEnd}$:
    - There exists some preceding interval that started at $\le l$ and ends at $\text{maxEnd} \ge r$.
    - This preceding interval completely encloses $[l, r]$. Thus, the current interval is covered and discarded.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting the array of $N$ intervals takes $\mathcal{O}(N \log N)$ time.
  - The linear scan evaluates each interval once in $\mathcal{O}(N)$ time.
  - With $N \le 1000$, total operations are $\approx 10^4$, executing in under $2\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ (in-place sort) or $\mathcal{O}(\log N)$ (sorting call stack recursion).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
