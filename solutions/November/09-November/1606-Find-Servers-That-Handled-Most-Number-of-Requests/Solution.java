/**
 * Problem: LeetCode 1606 - Find Servers That Handled Most Number of Requests
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public List<Integer> busiestServers(int k, int[] arrival, int[] load) {
        int[] count = new int[k];

        // Self-balancing BST to track currently available server IDs
        TreeSet<Integer> free = new TreeSet<>();
        for (int i = 0; i < k; i++) free.add(i);

        // Min-heap tracking busy servers: {completionTime, serverId}
        PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));

        for (int i = 0; i < arrival.length; i++) {
            long start = arrival[i];

            // Free all servers that have finished before or at current arrival time
            while (!busy.isEmpty() && busy.peek()[0] <= start) {
                free.add((int) busy.poll()[1]);
            }

            // If all servers are occupied, request is dropped
            if (free.isEmpty()) continue;

            // Cyclic lookup: find smallest available server >= (i % k), wrapping to first()
            Integer server = free.ceiling(i % k);
            if (server == null) server = free.first();

            free.remove(server);
            count[server]++;
            busy.offer(new long[]{start + load[i], server});
        }

        // Find the maximum number of requests handled
        int max = 0;
        for (int c : count) max = Math.max(max, c);

        // Collect all server IDs achieving the maximum request count
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            if (count[i] == max) result.add(i);
        }
        return result;
    }
}
