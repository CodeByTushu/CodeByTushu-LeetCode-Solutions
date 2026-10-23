/**
 * Problem: LeetCode 3488 - Closest Equal Element Queries
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var solveQueries = function(nums, queries) {
    const n = nums.length;
    // minDist[i] stores the minimum circular distance to an identical element
    const minDist = new Int32Array(n).fill(n);
    const lastSeen = new Map();
    
    // Traverse the circular array twice to capture all adjacent pairs & wrap-around
    for (let i = 0; i < n * 2; ++i) {
        const index = i % n;
        const val = nums[index];
        
        if (lastSeen.has(val)) {
            const prevIndex = lastSeen.get(val) % n;
            const d = i - lastSeen.get(val);
            if (d < minDist[index]) minDist[index] = d;
            if (d < minDist[prevIndex]) minDist[prevIndex] = d;
        }
        lastSeen.set(val, i);
    }
    
    // Answer each query in O(1) time
    const ans = new Array(queries.length);
    for (let k = 0; k < queries.length; ++k) {
        const q = queries[k];
        ans[k] = minDist[q] === n ? -1 : minDist[q];
    }
    
    return ans;
};
