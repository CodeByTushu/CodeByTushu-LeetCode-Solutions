/**
 * Problem: LeetCode 3464 - Maximize the Distance Between Points on a Square
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} side
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(side, points, k) {
    const n = points.length;
    const arr = new Float64Array(n);

    // Step 1: Convert boundary points into 1D perimeter distance
    for (let i = 0; i < n; i++) {
        const x = points[i][0];
        const y = points[i][1];

        if (x === 0) {
            arr[i] = y;
        } else if (y === side) {
            arr[i] = side + x;
        } else if (x === side) {
            arr[i] = 3 * side - y;
        } else {
            arr[i] = 4 * side - x;
        }
    }

    arr.sort();

    const perimeter = 4 * side;
    const arrExt = new Float64Array(2 * n);
    for (let i = 0; i < n; i++) {
        arrExt[i] = arr[i];
        arrExt[i + n] = arr[i] + perimeter;
    }

    function canPlace(d) {
        for (let i = 0; i < n; i++) {
            let curr = arr[i];
            let count = 1;
            let idx = i;

            for (let step = 1; step < k; step++) {
                const target = curr + d;
                let l = idx + 1, r = i + n - 1;
                let found = -1;

                while (l <= r) {
                    const mid = (l + r) >> 1;
                    if (arrExt[mid] >= target) {
                        found = mid;
                        r = mid - 1;
                    } else {
                        l = mid + 1;
                    }
                }

                if (found === -1) break;
                curr = arrExt[found];
                idx = found;
                count++;
            }

            if (count === k && (arr[i] + perimeter - curr) >= d) {
                return true;
            }
        }
        return false;
    }

    let left = 1, right = side, ans = 0;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canPlace(mid)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return ans;
};
