/**
 * Problem: LeetCode 3875 - Construct Uniform Parity Array I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 */

var uniformArray = function(nums1) {
    let oddCount = 0;
    let evenCount = 0;

    for (const x of nums1) {
        if (x % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    const allEven = (oddCount === 0 || oddCount >= 2);
    const allOdd = (evenCount === 0 || oddCount >= 1);
    return allEven || allOdd;
};
