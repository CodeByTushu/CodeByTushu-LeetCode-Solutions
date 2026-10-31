/**
 * Problem: LeetCode 3629 - Minimum Jumps to Reach End via Prime Teleportation
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var minJumps = function(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    let maxVal = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }

    // Smallest Prime Factor (SPF) Sieve
    const spf = new Int32Array(maxVal + 1);
    for (let i = 0; i <= maxVal; i++) spf[i] = i;
    for (let i = 2; i * i <= maxVal; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= maxVal; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    // Map each prime factor to the list of indices divisible by it
    const primeToIndices = new Map();
    for (let i = 0; i < n; i++) {
        let x = nums[i];
        while (x > 1) {
            const p = spf[x];
            let list = primeToIndices.get(p);
            if (!list) {
                list = [];
                primeToIndices.set(p, list);
            }
            list.push(i);
            while (x % p === 0) x = Math.floor(x / p);
        }
    }

    // BFS with queue
    const dist = new Int32Array(n).fill(-1);
    dist[0] = 0;
    const queue = new Int32Array(n);
    let head = 0, tail = 0;
    queue[tail++] = 0;

    while (head < tail) {
        const u = queue[head++];
        const d = dist[u];

        if (u === n - 1) return d;

        // 1. Adjacent steps: u - 1 and u + 1
        if (u - 1 >= 0 && dist[u - 1] === -1) {
            dist[u - 1] = d + 1;
            if (u - 1 === n - 1) return d + 1;
            queue[tail++] = u - 1;
        }
        if (u + 1 < n && dist[u + 1] === -1) {
            dist[u + 1] = d + 1;
            if (u + 1 === n - 1) return d + 1;
            queue[tail++] = u + 1;
        }

        // 2. Prime Teleportation: if nums[u] is prime
        const val = nums[u];
        if (val >= 2 && spf[val] === val) {
            const list = primeToIndices.get(val);
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    const v = list[i];
                    if (dist[v] === -1) {
                        dist[v] = d + 1;
                        if (v === n - 1) return d + 1;
                        queue[tail++] = v;
                    }
                }
                primeToIndices.delete(val);
            }
        }
    }

    return dist[n - 1];
};
