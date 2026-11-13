/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function(nums, k) {
    const n = nums.length;
    const pre = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + nums[i];
    }

    // High performance array-backed deque (front push/pop and back pop)
    const buf = new Int32Array(n + 10);
    let head = n + 5;
    let tail = n + 5;

    let total = 0;
    let r = n - 1;
    let ans = 0;

    for (let l = n - 1; l >= 0; l--) {
        // Add nums[l] to the left, remove smaller/equal records
        while (head < tail && nums[buf[head]] <= nums[l]) {
            const f = buf[head++];
            const end = (head < tail) ? buf[head] : r + 1;
            total -= nums[f] * (end - f);
        }

        const end = (head < tail) ? buf[head] : r + 1;
        total += nums[l] * (end - l);
        buf[--head] = l;

        // cost = sum(prefixMax) - sum(nums) in window [l..r]
        let cost = total - (pre[r + 1] - pre[l]);

        // If cost exceeds k, shrink window from right side
        while (cost > k) {
            const last = buf[tail - 1];
            total -= nums[last];
            if (last === r) {
                tail--;
            }
            r--;
            cost = total - (pre[r + 1] - pre[l]);
        }

        ans += (r - l + 1);
    }

    return ans;
};
