/**
 * Problem: LeetCode 1665 - Minimum Initial Energy to Finish Tasks
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} tasks
 * @return {number}
 */
var minimumEffort = function(tasks) {
    // Sort tasks descending by (minimum - actual)
    // Prioritizing tasks with larger surplus energy (minimum - actual) minimizes overall starting energy
    tasks.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));

    let initialEnergy = 0;
    let currentEnergy = 0;

    for (let i = 0; i < tasks.length; i++) {
        const actual = tasks[i][0];
        const minimum = tasks[i][1];

        if (currentEnergy < minimum) {
            initialEnergy += (minimum - currentEnergy);
            currentEnergy = minimum;
        }
        currentEnergy -= actual;
    }

    return initialEnergy;
};
