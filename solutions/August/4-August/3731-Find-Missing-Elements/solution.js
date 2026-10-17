/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    let minVal = Infinity;
    let maxVal = -Infinity;
    const present = new Set();

    for (const num of nums) {
        if (num < minVal) minVal = num;
        if (num > maxVal) maxVal = num;
        present.add(num);
    }

    const result = [];
    for (let i = minVal; i <= maxVal; i++) {
        if (!present.has(i)) {
            result.push(i);
        }
    }

    return result;
};
