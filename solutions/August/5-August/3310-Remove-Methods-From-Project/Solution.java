import java.util.*;

class Solution {
    public List<Integer> remainingMethods(int n, int k, int[][] invocations) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] inv : invocations) {
            graph.get(inv[0]).add(inv[1]);
        }
        
        // Find all suspicious methods (reachable from k)
        boolean[] suspicious = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.add(k);
        suspicious[k] = true;
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            for (int next : graph.get(curr)) {
                if (!suspicious[next]) {
                    suspicious[next] = true;
                    queue.add(next);
                }
            }
        }
        
        // Check if any method outside the suspicious group invokes a method inside it
        for (int[] inv : invocations) {
            int a = inv[0], b = inv[1];
            if (!suspicious[a] && suspicious[b]) {
                // Cannot remove — return all methods
                List<Integer> all = new ArrayList<>();
                for (int i = 0; i < n; i++) all.add(i);
                return all;
            }
        }
        
        // Safe to remove — return methods that are NOT suspicious
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (!suspicious[i]) result.add(i);
        }
        
        return result;
    }
}
