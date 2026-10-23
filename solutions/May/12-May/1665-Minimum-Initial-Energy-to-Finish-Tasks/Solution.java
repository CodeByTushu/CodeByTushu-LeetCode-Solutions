/**
 * Problem: LeetCode 1665 - Minimum Initial Energy to Finish Tasks
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int minimumEffort(int[][] tasks) {
        // Sort tasks descending by (minimum - actual)
        // Prioritizing tasks with larger surplus energy (minimum - actual) minimizes overall starting energy
        Arrays.sort(tasks, (a, b) -> (b[1] - b[0]) - (a[1] - a[0]));

        int initialEnergy = 0;
        int currentEnergy = 0;

        for (int[] task : tasks) {
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
}
