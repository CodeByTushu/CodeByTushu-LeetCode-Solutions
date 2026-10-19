class BinaryIndexedTree {
    private final int n;
    private final int[] bit;

    public BinaryIndexedTree(int n) {
        this.n = n;
        bit = new int[n + 1];
    }

    public void update(int idx, int val) {
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & -idx;
        }
    }

    public int query(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
}

class Solution {
    public long countMajoritySubarrays(int[] nums, int target) {
        int n = nums.length;

        BinaryIndexedTree bit = new BinaryIndexedTree(2 * n + 1);

        int prefix = n + 1;
        bit.update(prefix, 1);

        long ans = 0;

        for (int x : nums) {
            if (x == target) {
                prefix++;
            } else {
                prefix--;
            }

            ans += bit.query(prefix - 1);
            bit.update(prefix, 1);
        }

        return ans;
    }
}
