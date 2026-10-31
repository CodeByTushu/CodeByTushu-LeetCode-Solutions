/**
 * Problem: LeetCode 874 - Walking Robot Simulation
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var robotSim = function(commands, obstacles) {
    const obstacleSet = new Set();
    for (let i = 0; i < obstacles.length; i++) {
        obstacleSet.add(`${obstacles[i][0]},${obstacles[i][1]}`);
    }

    // 0: North, 1: East, 2: South, 3: West
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let d = 0;

    let x = 0;
    let y = 0;
    let maxDistSq = 0;

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        if (cmd === -1) {
            d = (d + 1) % 4;
        } else if (cmd === -2) {
            d = (d + 3) % 4;
        } else {
            for (let step = 0; step < cmd; step++) {
                const nx = x + dx[d];
                const ny = y + dy[d];
                if (obstacleSet.has(`${nx},${ny}`)) {
                    break;
                }
                x = nx;
                y = ny;
                maxDistSq = Math.max(maxDistSq, x * x + y * y);
            }
        }
    }

    return maxDistSq;
};
