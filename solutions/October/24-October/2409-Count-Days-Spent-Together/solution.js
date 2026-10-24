/**
 * Problem: LeetCode 2409 - Count Days Spent Together
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const prefix = new Array(13).fill(0);
    for (let m = 1; m <= 12; m++) {
        prefix[m] = prefix[m - 1] + days[m - 1];
    }

    const toDay = (date) => {
        const month = parseInt(date.substring(0, 2), 10);
        const day = parseInt(date.substring(3, 5), 10);
        return prefix[month - 1] + day;
    };

    const aA = toDay(arriveAlice);
    const lA = toDay(leaveAlice);
    const aB = toDay(arriveBob);
    const lB = toDay(leaveBob);

    const start = Math.max(aA, aB);
    const end = Math.min(lA, lB);
    return Math.max(0, end - start + 1);
};
