/**
 * Problem: LeetCode 3789 - Minimum Cost to Acquire Required Items
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long minimumCost(int cost1, int cost2, int costBoth, int need1, int need2) {
        long c1 = cost1, c2 = cost2, cb = costBoth;
        long n1 = need1, n2 = need2;

        long common = Math.min(n1, n2);
        long rem1 = n1 - common;
        long rem2 = n2 - common;

        // Option 1: Buy only Type 1 and Type 2 items separately
        long option1 = n1 * c1 + n2 * c2;

        // Option 2: Buy max(n1, n2) Type 3 items to cover both needs
        long option2 = Math.max(n1, n2) * cb;

        // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        long pairCost = Math.min(c1 + c2, cb);
        long option3 = common * pairCost + rem1 * Math.min(c1, cb) + rem2 * Math.min(c2, cb);

        return Math.min(option1, Math.min(option2, option3));
    }
}
