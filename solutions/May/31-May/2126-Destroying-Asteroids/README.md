# LeetCode 2126: Destroying Asteroids

- **Publication Date:** 31 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/destroying-asteroids/](https://leetcode.com/problems/destroying-asteroids/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/7i8gMq4Pneo)

---

## Problem Summary

You are given an integer `mass`, representing the initial mass of a planet. You are also given an integer array `asteroids`, where `asteroids[i]` is the mass of the $i^{\text{th}}$ asteroid.

You can arrange for the planet to collide with the asteroids in **any arbitrary order**.
- If the current mass of the planet is **greater than or equal to** the asteroid's mass, the asteroid is destroyed and the planet gains the asteroid's mass ($m \leftarrow m + \text{asteroid}$).
- Otherwise, the planet is destroyed.

Return `true` if all asteroids can be destroyed, or `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `mass = 10`, `asteroids = [3, 9, 19, 5, 21]`
- **Output:** `true`
- **Explanation:**
  - Collide with asteroid of mass $3$: new mass is $10 + 3 = 13$.
  - Collide with asteroid of mass $5$: new mass is $13 + 5 = 18$.
  - Collide with asteroid of mass $9$: new mass is $18 + 9 = 27$.
  - Collide with asteroid of mass $19$: new mass is $27 + 19 = 46$.
  - Collide with asteroid of mass $21$: new mass is $46 + 21 = 67$.
  - All asteroids are successfully destroyed.

#### Example 2:
- **Input:** `mass = 5`, `asteroids = [4, 9, 23, 4]`
- **Output:** `false`
- **Explanation:**
  - Even after destroying asteroids $4, 4, 9$, total mass is $5 + 4 + 4 + 9 = 22 < 23$.
  - The planet cannot destroy the asteroid of mass $23$.

---

### Constraints

- $1 \le \text{mass} \le 10^5$
- $1 \le \text{asteroids.length} \le 10^5$
- $1 \le \text{asteroids}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Greedy**
- **Sorting**

---

## Approach & Intuition

### 1. Greedy Choice Property

To maximize the chance of destroying all asteroids, the planet should always consume the smallest available asteroid first:
- If the planet cannot destroy the smallest asteroid remaining, it cannot destroy any larger asteroid either.
- By absorbing smaller asteroids first, the planet's mass monotonically increases, making subsequent larger collisions strictly easier.

### 2. Implementation & 64-bit Overflow Prevention

- Sort `asteroids` in non-decreasing order: $\mathcal{O}(N \log N)$.
- Iterate through each asteroid:
  - If `currentMass < asteroid`, return `false`.
  - Otherwise, `currentMass += asteroid`.
- **Note on integer overflow:** With $\text{asteroids.length} = 10^5$ and each asteroid up to $10^5$, total mass can reach $10^{10}$, which exceeds 32-bit signed integers ($2^{31} - 1 \approx 2.14 \times 10^9$). We use 64-bit integers (`long` in Java, `long long` in C++) to prevent overflow.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting `asteroids` of size $N = 10^5$ takes $\mathcal{O}(N \log N)$ time.
  - Linear scan takes $\mathcal{O}(N)$ time.
  - Overall time complexity is $\mathcal{O}(N \log N)$ ($\approx 15\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(N)$
  - In-place sorting requires $\mathcal{O}(1)$ auxiliary space in C++ (or $\mathcal{O}(\log N)$ stack space).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/7i8gMq4Pneo](https://youtu.be/7i8gMq4Pneo)
