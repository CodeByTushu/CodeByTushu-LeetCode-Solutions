/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    let minCoin = coins[0];
    for (const c of coins) {
        if (c < minCoin) minCoin = c;
    }

    let lo = 1;
    let hi = k * minCoin;

    function gcd(a, b) {
        while (b !== 0) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    function lcm(a, b) {
        return Math.floor(a / gcd(a, b)) * b;
    }

    function bitCount(n) {
        let count = 0;
        while (n > 0) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }

    const n = coins.length;

    function countUpTo(x) {
        let count = 0;
        for (let mask = 1; mask < (1 << n); mask++) {
            let lcmVal = 1;
            let tooBig = false;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    lcmVal = lcm(lcmVal, coins[i]);
                    if (lcmVal > x) {
                        tooBig = true;
                        break;
                    }
                }
            }

            if (tooBig) continue;

            const term = Math.floor(x / lcmVal);
            if (bitCount(mask) % 2 === 1) {
                count += term;
            } else {
                count -= term;
            }
        }
        return count;
    }

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (countUpTo(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo;
};
