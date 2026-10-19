class BinaryIndexedTree {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.n = n;
        this.bit = new Int32Array(n + 1);
    }

    /**
     * @param {number} idx
     * @param {number} val
     */
    update(idx, val) {
        while (idx <= this.n) {
            this.bit[idx] += val;
            idx += idx & -idx;
        }
    }

    /**
     * @param {number} idx
     * @return {number}
     */
    query(idx) {
        let sum = 0;
        while (idx > 0) {
            sum += this.bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;
    const bit = new BinaryIndexedTree(2 * n + 1);

    let prefix = n + 1;
    bit.update(prefix, 1);

    let ans = 0;

    for (let i = 0; i < n; i++) {
        if (nums[i] === target) {
            prefix++;
        } else {
            prefix--;
        }

        ans += bit.query(prefix - 1);
        bit.update(prefix, 1);
    }

    return ans;
};
