/**
 * Problem: LeetCode 3633 - Earliest Finish Time for Land and Water Rides I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let answer = Infinity;

    // Land ride first, then Water ride
    for (let i = 0; i < landStartTime.length; i++) {
        const landFinish = landStartTime[i] + landDuration[i];
        for (let j = 0; j < waterStartTime.length; j++) {
            const waterStart = Math.max(landFinish, waterStartTime[j]);
            const totalFinish = waterStart + waterDuration[j];
            answer = Math.min(answer, totalFinish);
        }
    }

    // Water ride first, then Land ride
    for (let i = 0; i < waterStartTime.length; i++) {
        const waterFinish = waterStartTime[i] + waterDuration[i];
        for (let j = 0; j < landStartTime.length; j++) {
            const landStart = Math.max(waterFinish, landStartTime[j]);
            const totalFinish = landStart + landDuration[j];
            answer = Math.min(answer, totalFinish);
        }
    }

    return answer;
};
