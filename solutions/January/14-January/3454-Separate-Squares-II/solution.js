/**
 * Problem: LeetCode 3454 - Separate Squares II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

class SegmentTree {
    constructor(xs) {
        this.xs = xs;
        this.n = xs.length - 1;
        this.count = new Int32Array(4 * this.n);
        this.len = new Float64Array(4 * this.n);
    }

    update(node, start, end, l, r, val) {
        if (l <= start && end <= r) {
            this.count[node] += val;
        } else {
            const mid = (start + end) >> 1;
            if (l <= mid) {
                this.update(2 * node, start, mid, l, r, val);
            }
            if (r > mid) {
                this.update(2 * node + 1, mid + 1, end, l, r, val);
            }
        }

        if (this.count[node] > 0) {
            this.len[node] = this.xs[end + 1] - this.xs[start];
        } else {
            if (start === end) {
                this.len[node] = 0;
            } else {
                this.len[node] = this.len[2 * node] + this.len[2 * node + 1];
            }
        }
    }

    query() {
        return this.len[1];
    }
}

function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (arr[mid] >= target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low;
}

/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function(squares) {
    const events = [];
    const xSet = new Set();

    for (let i = 0; i < squares.length; i++) {
        const [x, y, l] = squares[i];
        events.push({ y, type: 1, x1: x, x2: x + l });
        events.push({ y: y + l, type: -1, x1: x, x2: x + l });
        xSet.add(x);
        xSet.add(x + l);
    }

    events.sort((a, b) => a.y - b.y);
    const xs = Array.from(xSet).sort((a, b) => a - b);

    const st = new SegmentTree(xs);
    const strips = [];
    let totalArea = 0;

    let i = 0;
    const numEvents = events.length;
    const m = xs.length - 2;

    while (i < numEvents) {
        const currY = events[i].y;

        while (i < numEvents && events[i].y === currY) {
            const e = events[i];
            const l = binarySearch(xs, e.x1);
            const r = binarySearch(xs, e.x2) - 1;
            if (l <= r) {
                st.update(1, 0, m, l, r, e.type);
            }
            i++;
        }

        if (i < numEvents) {
            const nextY = events[i].y;
            const width = st.query();
            const height = nextY - currY;
            const stripArea = width * height;
            if (stripArea > 0) {
                strips.push({ y1: currY, y2: nextY, width, area: stripArea });
                totalArea += stripArea;
            }
        }
    }

    const targetArea = totalArea / 2;
    let currentArea = 0;

    for (let j = 0; j < strips.length; j++) {
        const strip = strips[j];
        if (currentArea + strip.area >= targetArea) {
            const needed = targetArea - currentArea;
            return strip.y1 + (needed / strip.width);
        }
        currentArea += strip.area;
    }

    return events[0].y;
};
