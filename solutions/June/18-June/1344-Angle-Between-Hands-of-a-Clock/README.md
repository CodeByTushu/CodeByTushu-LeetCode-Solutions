# LeetCode 1344: Angle Between Hands of a Clock

- **Publication Date:** 18 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/angle-between-hands-of-a-clock/](https://leetcode.com/problems/angle-between-hands-of-a-clock/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/lU5YQ5kKC_E?si=XSubHKr0YodMPPXm)

---

## Problem Summary

Given two numbers, `hour` and `minutes`, return the smaller angle (in degrees) formed between the hour and the minute hand.

Answers within $10^{-5}$ of the actual value will be accepted as correct.

---

### Examples

#### Example 1:
- **Input:** `hour = 12, minutes = 30`
- **Output:** `165`
- **Explanation:**
  - Hour hand moves to $12 \times 30^\circ + 30 \times 0.5^\circ = 15^\circ$ from 12 o'clock.
  - Minute hand moves to $30 \times 6^\circ = 180^\circ$ from 12 o'clock.
  - Absolute difference: $|15^\circ - 180^\circ| = 165^\circ$.
  - Smaller angle: $\min(165^\circ, 360^\circ - 165^\circ) = 165^\circ$.

#### Example 2:
- **Input:** `hour = 3, minutes = 30`
- **Output:** `75`
- **Explanation:**
  - Hour hand: $3 \times 30^\circ + 30 \times 0.5^\circ = 90^\circ + 15^\circ = 105^\circ$.
  - Minute hand: $30 \times 6^\circ = 180^\circ$.
  - Absolute difference: $|105^\circ - 180^\circ| = 75^\circ$.
  - Smaller angle: $\min(75^\circ, 360^\circ - 75^\circ) = 75^\circ$.

#### Example 3:
- **Input:** `hour = 3, minutes = 15`
- **Output:** `7.5`
- **Explanation:**
  - Hour hand: $3 \times 30^\circ + 15 \times 0.5^\circ = 90^\circ + 7.5^\circ = 97.5^\circ$.
  - Minute hand: $15 \times 6^\circ = 90^\circ$.
  - Absolute difference: $|97.5^\circ - 90^\circ| = 7.5^\circ$.
  - Smaller angle: $\min(7.5^\circ, 360^\circ - 7.5^\circ) = 7.5^\circ$.

---

### Constraints

- $1 \le \text{hour} \le 12$
- $0 \le \text{minutes} \le 59$

---

## Algorithmic Approach

### Mathematical Angle Calculation

A standard circular clock face has $360^\circ$ divided into 12 hour divisions and 60 minute divisions:

1. **Angular Rates:**
   - **Minute hand:** In 60 minutes, it rotates $360^\circ$. Therefore, it moves:
     $$\frac{360^\circ}{60} = 6^\circ \text{ per minute}$$
   - **Hour hand:** In 12 hours, it rotates $360^\circ$. In 1 hour, it moves:
     $$\frac{360^\circ}{12} = 30^\circ \text{ per hour}$$
     Additionally, as the minutes advance within the hour, the hour hand moves continuously:
     $$\frac{30^\circ}{60} = 0.5^\circ \text{ per minute}$$

2. **Angles Relative to 12:00 Position:**
   - Map `hour = 12` to `0` using modulo: `hour %= 12`.
   - Calculate total hour hand angle:
     $$\text{hourAngle} = \text{hour} \times 30^\circ + \text{minutes} \times 0.5^\circ$$
   - Calculate minute hand angle:
     $$\text{minuteAngle} = \text{minutes} \times 6^\circ$$

3. **Compute the Smaller Angle:**
   - The absolute difference between both hands is:
     $$\text{angle} = |\text{hourAngle} - \text{minuteAngle}|$$
   - Because a circular face measures $360^\circ$ in total, the hands divide the clock into two complementary angles ($\text{angle}$ and $360^\circ - \text{angle}$). The smaller angle is:
     $$\min(\text{angle}, 360^\circ - \text{angle})$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(1)$ | Only a few basic arithmetic operations (multiplications, additions, and modulo) are executed. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Constant extra space used for scalar numeric variables. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public double angleClock(int hour, int minutes) {
        // Convert 12 to 0 for calculation
        hour %= 12;

        // Hour hand moves 30° per hour + 0.5° per minute
        double hourAngle = hour * 30 + minutes * 0.5;

        // Minute hand moves 6° per minute
        double minuteAngle = minutes * 6;

        // Absolute difference
        double angle = Math.abs(hourAngle - minuteAngle);

        // Return the smaller angle
        return Math.min(angle, 360 - angle);
    }
}
```

### Python
```python
class Solution:
    def angleClock(self, hour: int, minutes: int) -> float:
        # Convert 12 to 0 for calculation
        hour %= 12

        # Hour hand moves 30° per hour + 0.5° per minute
        hour_angle = hour * 30 + minutes * 0.5

        # Minute hand moves 6° per minute
        minute_angle = minutes * 6

        # Absolute difference
        angle = abs(hour_angle - minute_angle)

        # Return the smaller angle
        return min(angle, 360 - angle)
```

### C++
```cpp
#include <cmath>
#include <algorithm>

using namespace std;

class Solution {
public:
    double angleClock(int hour, int minutes) {
        // Convert 12 to 0 for calculation
        hour %= 12;

        // Hour hand moves 30° per hour + 0.5° per minute
        double hourAngle = hour * 30.0 + minutes * 0.5;

        // Minute hand moves 6° per minute
        double minuteAngle = minutes * 6.0;

        // Absolute difference
        double angle = abs(hourAngle - minuteAngle);

        // Return the smaller angle
        return min(angle, 360.0 - angle);
    }
};
```

### JavaScript
```javascript
/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function(hour, minutes) {
    // Convert 12 to 0 for calculation
    hour %= 12;

    // Hour hand moves 30° per hour + 0.5° per minute
    const hourAngle = hour * 30 + minutes * 0.5;

    // Minute hand moves 6° per minute
    const minuteAngle = minutes * 6;

    // Absolute difference
    const angle = Math.abs(hourAngle - minuteAngle);

    // Return the smaller angle
    return Math.min(angle, 360 - angle);
};
```

---

<p align="center">
  <a href="../17-June/3614-Process-String-with-Special-Operations-II/"><strong>⬅️ Previous Problem (17 June: #3614)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
