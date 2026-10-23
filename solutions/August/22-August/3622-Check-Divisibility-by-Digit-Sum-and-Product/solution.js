/**
 * Problem: LeetCode 3622 - Check Divisibility by Digit Sum and Product
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
    let sum = 0;
    let product = 1;
    let temp = n;

    while (temp > 0) {
        const digit = temp % 10;
        sum += digit;
        product *= digit;
        temp = Math.floor(temp / 10);
    }

    return n % (sum + product) === 0;
};
