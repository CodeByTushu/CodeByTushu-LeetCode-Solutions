/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Language: JavaScript (Node.js)
 * Time Complexity: O(N log N + M log M + N log M)
 * Space Complexity: O(N)
 * 
 * @param {number[]} robots
 * @param {number[]} distance
 * @param {number[]} walls
 * @return {number}
 */
var maxWalls = function(robots, distance, walls) {
    const n = robots.length;
    const r = [];
    for (let i = 0; i < n; i++) {
        r.push({ pos: robots[i], dist: distance[i] });
    }
    r.sort((a, b) => a.pos - b.pos);
    walls.sort((a, b) => a - b);

    function countWalls(low, high) {
        if (low > high) return 0;
        let left = 0, right = walls.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (walls[mid] >= low) right = mid;
            else left = mid + 1;
        }
        const start = left;

        left = 0; right = walls.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (walls[mid] > high) right = mid;
            else left = mid + 1;
        }
        const end = left;
        return Math.max(0, end - start);
    }

    const leftBound = new Array(n);
    const rightBound = new Array(n);
    const wLeft = new Array(n);
    const wRight = new Array(n);

    for (let i = 0; i < n; i++) {
        const lLimit = (i > 0) ? r[i - 1].pos + 1 : -Infinity;
        leftBound[i] = Math.max(r[i].pos - r[i].dist, lLimit);
        wLeft[i] = countWalls(leftBound[i], r[i].pos);

        const rLimit = (i < n - 1) ? r[i + 1].pos - 1 : Infinity;
        rightBound[i] = Math.min(r[i].pos + r[i].dist, rLimit);
        wRight[i] = countWalls(r[i].pos, rightBound[i]);
    }

    // dp0: robot i fires Left
    // dp1: robot i fires Right
    let dp0 = wLeft[0];
    let dp1 = wRight[0];

    for (let i = 1; i < n; i++) {
        let wBoth = 0;
        if (rightBound[i - 1] >= leftBound[i]) {
            wBoth = countWalls(r[i - 1].pos, r[i].pos);
        } else {
            wBoth = wRight[i - 1] + wLeft[i];
        }

        const nextDp0 = Math.max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
        const nextDp1 = Math.max(dp0, dp1) + wRight[i];

        dp0 = nextDp0;
        dp1 = nextDp1;
    }

    return Math.max(dp0, dp1);
};
