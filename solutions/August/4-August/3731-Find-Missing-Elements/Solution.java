import java.util.*;

class Solution {
    public List<Integer> findMissingElements(int[] nums) {
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        Set<Integer> present = new HashSet<>();
        for (int num : nums) {
            present.add(num);
        }
        List<Integer> result = new ArrayList<>();
        for (int i = min; i <= max; i++) {
            if (!present.contains(i)) {
                result.add(i);
            }
        }
        return result;
    }
}
