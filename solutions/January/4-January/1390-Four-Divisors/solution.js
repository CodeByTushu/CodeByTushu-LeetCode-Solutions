/**
 * Problem: LeetCode 1390 - Four Divisors
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function(nums) {
    let totalSum = 0;

    for (const num of nums) {
        let count = 0;
        let sum = 0;

        for (let d = 1; d * d <= num; d++) {
            if (num % d === 0) {
                if (d * d === num) {
                    count += 1;
                    sum += d;
                } else {
                    count += 2;
                    sum += d + (num / d);
                }
                if (count > 4) {
                    break;
                }
            }
        }

        if (count === 4) {
            totalSum += sum;
        }
    }

    return totalSum;
};
