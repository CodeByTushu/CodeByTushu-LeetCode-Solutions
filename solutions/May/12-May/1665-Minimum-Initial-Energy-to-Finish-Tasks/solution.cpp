/**
 * Problem: LeetCode 1665 - Minimum Initial Energy to Finish Tasks
 * Difficulty: Hard
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumEffort(vector<vector<int>>& tasks) {
        // Sort tasks descending by (minimum - actual)
        // Prioritizing tasks with larger surplus energy (minimum - actual) minimizes overall starting energy
        sort(tasks.begin(), tasks.end(), [](const vector<int>& a, const vector<int>& b) {
            return (a[1] - a[0]) > (b[1] - b[0]);
        });

        int initialEnergy = 0;
        int currentEnergy = 0;

        for (const auto& task : tasks) {
            int actual = task[0];
            int minimum = task[1];

            if (currentEnergy < minimum) {
                initialEnergy += (minimum - currentEnergy);
                currentEnergy = minimum;
            }
            currentEnergy -= actual;
        }

        return initialEnergy;
    }
};
