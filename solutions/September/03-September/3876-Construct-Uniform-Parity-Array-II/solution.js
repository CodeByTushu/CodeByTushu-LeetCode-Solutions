/**
 * Problem: LeetCode 3876 - Construct Uniform Parity Array II
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 */

var uniformArray = function(nums1) {
    function canMakeAll(targetParity) {
        const globalMin = [Infinity, Infinity];
        for (const x of nums1) {
            globalMin[x % 2] = Math.min(globalMin[x % 2], x);
        }

        for (const x of nums1) {
            const curParity = x % 2;
            if (curParity === targetParity) {
                continue;
            }

            const neededJParity = (targetParity + curParity) % 2;
            if (globalMin[neededJParity] >= x) {
                return false;
            }
        }
        return true;
    }

    return canMakeAll(0) || canMakeAll(1);
};
