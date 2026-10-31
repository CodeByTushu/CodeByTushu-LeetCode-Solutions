/**
 * Problem: LeetCode 3751 - Total Waviness of Numbers in Range I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    function getWaviness(num) {
        const s = num.toString();
        if (s.length < 3) {
            return 0;
        }

        let waviness = 0;
        for (let i = 1; i < s.length - 1; i++) {
            if ((s[i] > s[i - 1] && s[i] > s[i + 1]) ||
                (s[i] < s[i - 1] && s[i] < s[i + 1])) {
                waviness++;
            }
        }
        return waviness;
    }

    let ans = 0;
    for (let num = num1; num <= num2; num++) {
        ans += getWaviness(num);
    }
    return ans;
};
