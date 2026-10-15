/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
    const result = new Set();
    const n = digits.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                if (i === j || j === k || i === k) continue;
                if (digits[i] === 0) continue;
                if (digits[k] % 2 !== 0) continue;
                const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                result.add(num);
            }
        }
    }
    return result.size;
};
