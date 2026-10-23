/**
 * Problem: LeetCode 1344 - Angle Between Hands of a Clock
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
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
