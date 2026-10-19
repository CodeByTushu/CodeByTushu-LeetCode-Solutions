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
