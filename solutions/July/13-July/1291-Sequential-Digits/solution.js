/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
    const ans = [];
    const queue = [];
    for (let i = 1; i <= 9; i++) {
        queue.push(i);
    }

    while (queue.length > 0) {
        const num = queue.shift();
        if (num >= low && num <= high) {
            ans.push(num);
        }
        if (num > high) {
            continue;
        }

        const lastDigit = num % 10;
        if (lastDigit < 9) {
            queue.push(num * 10 + lastDigit + 1);
        }
    }

    ans.sort((a, b) => a - b);
    return ans;
};
