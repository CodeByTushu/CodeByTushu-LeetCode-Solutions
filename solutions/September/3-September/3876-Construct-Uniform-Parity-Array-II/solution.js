/**
 * Problem: LeetCode 3876 - Construct Uniform Parity Array II
 * Language: JavaScript (Node.js)
 * Approach: Greedy Parity Inversion with Minimum Value Tracking
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 * 
 * @param {number[]} nums1
 * @return {boolean}
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
