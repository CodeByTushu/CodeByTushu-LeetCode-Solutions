/**
 * Problem: LeetCode 2126 - Destroying Asteroids
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a, b) => a - b);
    let currentMass = mass;

    for (let i = 0; i < asteroids.length; i++) {
        if (currentMass < asteroids[i]) {
            return false;
        }
        currentMass += asteroids[i];
    }

    return true;
};
