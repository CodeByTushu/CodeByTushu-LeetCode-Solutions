/**
 * Problem: LeetCode 1344 - Angle Between Hands of a Clock
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
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
