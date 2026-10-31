/**
 * Problem: LeetCode 3629 - Minimum Jumps to Reach End via Prime Teleportation
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int minJumps(int[] nums) {
        int n = nums.length;
        if (n <= 1) return 0;

        int maxVal = 0;
        for (int x : nums) {
            if (x > maxVal) maxVal = x;
        }

        // Precompute Smallest Prime Factor (SPF)
        int[] spf = new int[maxVal + 1];
        for (int i = 0; i <= maxVal; i++) spf[i] = i;
        for (int i = 2; i * i <= maxVal; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= maxVal; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }

        // Map each prime factor to the list of indices whose value is divisible by it
        Map<Integer, List<Integer>> primeToIndices = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            while (x > 1) {
                int p = spf[x];
                primeToIndices.computeIfAbsent(p, k -> new ArrayList<>()).add(i);
                while (x % p == 0) x /= p;
            }
        }

        // BFS for shortest path (minimum jumps)
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[0] = 0;

        int[] queue = new int[n];
        int head = 0, tail = 0;
        queue[tail++] = 0;

        while (head < tail) {
            int u = queue[head++];
            int d = dist[u];

            if (u == n - 1) return d;

            // 1. Adjacent steps: u - 1 and u + 1
            if (u - 1 >= 0 && dist[u - 1] == -1) {
                dist[u - 1] = d + 1;
                if (u - 1 == n - 1) return d + 1;
                queue[tail++] = u - 1;
            }
            if (u + 1 < n && dist[u + 1] == -1) {
                dist[u + 1] = d + 1;
                if (u + 1 == n - 1) return d + 1;
                queue[tail++] = u + 1;
            }

            // 2. Prime Teleportation: if nums[u] is prime
            int val = nums[u];
            if (val >= 2 && spf[val] == val) {
                List<Integer> list = primeToIndices.remove(val);
                if (list != null) {
                    for (int v : list) {
                        if (dist[v] == -1) {
                            dist[v] = d + 1;
                            if (v == n - 1) return d + 1;
                            queue[tail++] = v;
                        }
                    }
                }
            }
        }

        return dist[n - 1];
    }
}
