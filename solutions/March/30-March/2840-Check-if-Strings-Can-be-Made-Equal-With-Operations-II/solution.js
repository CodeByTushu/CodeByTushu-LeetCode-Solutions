/**
 * Problem: 2840. Check if Strings Can be Made Equal With Operations II
 * Difficulty: Medium
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Swap operations preserve parity. Count character occurrences at even and odd
 * indices using two 26-element typed frequency arrays.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkStrings = function(s1, s2) {
    const n = s1.length;
    const countEven = new Int32Array(26);
    const countOdd = new Int32Array(26);

    for (let i = 0; i < n; i++) {
        const code1 = s1.charCodeAt(i) - 97;
        const code2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            countEven[code1]++;
            countEven[code2]--;
        } else {
            countOdd[code1]++;
            countOdd[code2]--;
        }
    }

    for (let i = 0; i < 26; i++) {
        if (countEven[i] !== 0 || countOdd[i] !== 0) {
            return false;
        }
    }

    return true;
};
