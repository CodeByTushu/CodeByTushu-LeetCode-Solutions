/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function(nums) {
    const freq = new Map();

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        freq.set(x, (freq.get(x) || 0) + 1);
    }

    let ans = 1;

    if (freq.has(1)) {
        const cnt = freq.get(1);
        ans = Math.max(ans, cnt % 2 === 0 ? cnt - 1 : cnt);
    }

    for (const x of freq.keys()) {
        if (x === 1) continue;

        let cur = x;
        let len = 0;

        while ((freq.get(cur) || 0) >= 2) {
            len += 2;

            if (cur > Math.floor(1000000000 / cur)) {
                break;
            }

            cur *= cur;
        }

        if ((freq.get(cur) || 0) === 1) {
            len++;
        } else {
            len--;
        }

        ans = Math.max(ans, len);
    }

    return ans;
};
