# LeetCode 2409: Count Days Spent Together

- **Publication Date:** 24 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/count-days-spent-together/](https://leetcode.com/problems/count-days-spent-together/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Alice and Bob are traveling to Rome for separate business meetings.

You are given 4 strings `arriveAlice`, `leaveAlice`, `arriveBob`, and `leaveBob`. Alice will be in the city from the dates `arriveAlice` to `leaveAlice` (inclusive), while Bob will be in the city from the dates `arriveBob` to `leaveBob` (inclusive). Each will be a 5-character string in the format `"MM-DD"`, corresponding to the month and day of the date.

Return the **total number of days** that Alice and Bob are in Rome together.

You can assume that all dates occur in the same calendar year, which is not a leap year. Note that the number of days per month can be represented as: `[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]`.

---

### Examples

#### Example 1:
- **Input:** `arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"`
- **Output:** `3`
- **Explanation:**
  - Alice will be in Rome from August 15 to August 18.
  - Bob will be in Rome from August 16 to August 19.
  - They are both in Rome together on August 16th, 17th, and 18th, so the answer is `3`.

#### Example 2:
- **Input:** `arriveAlice = "10-01", leaveAlice = "10-31", arriveBob = "11-01", leaveBob = "12-31"`
- **Output:** `0`
- **Explanation:**
  - There is no day when Alice and Bob are in Rome together, so we return `0`.

---

### Constraints

- All dates are provided in the format `"MM-DD"`.
- Alice and Bob's arrival dates are **earlier than or equal to** their leaving dates.
- The given dates are valid dates of a **non-leap** year.

---

## Topics and Tags

- **Math**
- **String**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Converting Calendar Dates to Day-of-Year Integers

1. **Prefix Sum for Cumulative Month Days:**
   - In a non-leap calendar year, months have the following day counts:
     $$\text{days} = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]$$
   - By constructing a 1-indexed prefix sum array $\text{prefix}$ where $\text{prefix}[m]$ stores the total number of days elapsed from month $1$ through month $m$, we can convert any date `"MM-DD"` directly into an integer day number $D \in [1, 365]$:
     $$\text{toDay}(\text{MM-DD}) = \text{prefix}[\text{MM} - 1] + \text{DD}$$

2. **Interval Intersection (Overlapping Range):**
   - Alice's stay spans the closed interval $[a_A, l_A]$.
   - Bob's stay spans the closed interval $[a_B, l_B]$.
   - The mutual overlap begins at $\text{start} = \max(a_A, a_B)$ and ends at $\text{end} = \min(l_A, l_B)$.
   - If $\text{start} \le \text{end}$, the number of overlapping days is:
     $$\text{Overlap} = \text{end} - \text{start} + 1$$
   - If $\text{start} > \text{end}$, there is no intersection, yielding $\max(0, \text{end} - \text{start} + 1) = 0$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$
  - Month arrays and date strings have a fixed size (12 months and 5 characters). Date conversion and interval arithmetic run in constant time.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Requires only a fixed 13-element prefix sum array and constant auxiliary integer variables.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** *Coming Soon* ⏳
