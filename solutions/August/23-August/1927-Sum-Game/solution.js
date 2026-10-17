/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const n = num.length;
    const half = Math.floor(n / 2);

    let sum1 = 0, sum2 = 0;
    let q1 = 0, q2 = 0;

    for (let i = 0; i < half; i++) {
        if (num[i] === '?') {
            q1++;
        } else {
            sum1 += num.charCodeAt(i) - 48;
        }
    }

    for (let i = half; i < n; i++) {
        if (num[i] === '?') {
            q2++;
        } else {
            sum2 += num.charCodeAt(i) - 48;
        }
    }

    if ((q1 + q2) % 2 === 1) {
        return true;
    }

    const diff = sum1 - sum2;
    const finalDiff = diff + Math.floor(9 * (q1 - q2) / 2);

    return finalDiff !== 0;
};
