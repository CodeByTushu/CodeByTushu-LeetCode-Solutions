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
