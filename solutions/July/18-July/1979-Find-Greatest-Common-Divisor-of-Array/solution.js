/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function(nums) {
    let minVal = Infinity;
    let maxVal = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }

    const gcd = (a, b) => {
        while (b !== 0) {
            const temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    };

    return gcd(minVal, maxVal);
};
