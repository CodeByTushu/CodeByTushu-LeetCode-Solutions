import java.util.*;

class Solution {
    public int[] lexicographicallySmallestArray(int[] nums, int limit) {
        int n = nums.length;
        
        // Step 1: index array banao aur value ke basis par sort karo
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> nums[a] - nums[b]);
        
        int[] result = new int[n];
        
        // Step 2: Groups banao - consecutive sorted elements jinka diff <= limit
        int i = 0;
        while (i < n) {
            int j = i + 1;
            
            // Group extend karo jab tak consecutive sorted values ka diff <= limit
            while (j < n && nums[idx[j]] - nums[idx[j-1]] <= limit) {
                j++;
            }
            
            // Group: idx[i..j-1]
            // In indices ko sort karo (original positions)
            // Aur sorted values assign karo in sorted positions par
            
            // Group ke original indices nikalo
            List<Integer> groupIndices = new ArrayList<>();
            for (int k = i; k < j; k++) {
                groupIndices.add(idx[k]);
            }
            
            // Positions sort karo
            Collections.sort(groupIndices);
            
            // Sorted positions par sorted values assign karo
            for (int k = 0; k < groupIndices.size(); k++) {
                result[groupIndices.get(k)] = nums[idx[i + k]];
            }
            
            i = j;
        }
        
        return result;
    }
}
