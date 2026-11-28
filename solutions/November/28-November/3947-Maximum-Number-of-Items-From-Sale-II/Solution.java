/**
 * Problem: LeetCode 3947 - Maximum Number of Items From Sale II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;

        // cnt[v] = kitne items ka factor v hai
        int[] cnt = new int[n + 1];
        for (int[] it : items) cnt[it[0]]++;

        // m[d] = kitne items ka factor d ka multiple hai (Harmonic sum, O(n log n))
        int[] m = new int[n + 1];
        for (int d = 1; d <= n; d++) {
            for (int x = d; x <= n; x += d) m[d] += cnt[x];
        }

        long minPrice = Long.MAX_VALUE;
        long[] keys = new long[n];
        for (int i = 0; i < n; i++) {
            int f = m[items[i][0]] - 1;               // khud ko chhodke
            long price = items[i][1];
            minPrice = Math.min(minPrice, price);
            keys[i] = price * 131072L + f;            // price ke hisaab se sort, f saath mein
        }
        Arrays.sort(keys);

        long rem = budget;
        long ans = 0;

        for (long key : keys) {
            long price = key / 131072L;
            long f = key % 131072L;

            // Value-2 copy tabhi faydemand hai jab price < 2 * minPrice
            if (price >= 2 * minPrice) break;
            if (f == 0) continue;

            long take = Math.min(f, rem / price);
            rem -= take * price;
            ans += 2 * take;

            if (take < f) break; // ab is price ya usse upar ka kuch afford nahi hoga
        }

        // Bacha hua budget sabse sasta item ki copies pe (value 1 each)
        ans += rem / minPrice;

        return (int) ans;
    }
}
