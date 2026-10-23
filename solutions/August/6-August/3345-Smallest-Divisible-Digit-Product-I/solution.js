/**
 * Problem: LeetCode 3345 - Smallest Divisible Digit Product I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    const digitProduct = (num) => {
        let product = 1;
        while (num > 0) {
            product *= (num % 10);
            num = Math.floor(num / 10);
        }
        return product;
    };

    while (true) {
        if (digitProduct(n) % t === 0) {
            return n;
        }
        n++;
    }
};
