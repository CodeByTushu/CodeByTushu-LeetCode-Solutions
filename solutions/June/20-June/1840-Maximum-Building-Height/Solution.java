import java.util.*;

class Solution {
    public int maxBuilding(int n, int[][] restrictions) {
        List<int[]> list = new ArrayList<>();

        // Building 1 always has height 0
        list.add(new int[]{1, 0});

        for (int[] r : restrictions) {
            list.add(new int[]{r[0], r[1]});
        }

        // Add building n if not already present
        boolean hasN = false;
        for (int[] r : list) {
            if (r[0] == n) {
                hasN = true;
                break;
            }
        }
        if (!hasN) {
            list.add(new int[]{n, n - 1});
        }

        // Sort by building index
        Collections.sort(list, (a, b) -> Integer.compare(a[0], b[0]));

        int m = list.size();

        // Left to right pass
        for (int i = 1; i < m; i++) {
            int dist = list.get(i)[0] - list.get(i - 1)[0];
            list.get(i)[1] = Math.min(list.get(i)[1],
                    list.get(i - 1)[1] + dist);
        }

        // Right to left pass
        for (int i = m - 2; i >= 0; i--) {
            int dist = list.get(i + 1)[0] - list.get(i)[0];
            list.get(i)[1] = Math.min(list.get(i)[1],
                    list.get(i + 1)[1] + dist);
        }

        int ans = 0;

        // Compute maximum possible peak between adjacent restrictions
        for (int i = 1; i < m; i++) {

            int x1 = list.get(i - 1)[0];
            int h1 = list.get(i - 1)[1];

            int x2 = list.get(i)[0];
            int h2 = list.get(i)[1];

            int dist = x2 - x1;

            int peak = (h1 + h2 + dist) / 2;

            ans = Math.max(ans, peak);
        }

        return ans;
    }
}
