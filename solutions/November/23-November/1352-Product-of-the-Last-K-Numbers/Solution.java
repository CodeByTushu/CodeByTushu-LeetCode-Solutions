/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.List;

class ProductOfNumbers {
    private List<Integer> prefix;

    public ProductOfNumbers() {
        prefix = new ArrayList<>();
        prefix.add(1); // empty product neutral element
    }

    public void add(int num) {
        if (num == 0) {
            // 0 ke aate hi pichhle saare products useless ho jate hain, prefix list reset karo
            prefix.clear();
            prefix.add(1);
        } else {
            prefix.add(prefix.get(prefix.size() - 1) * num);
        }
    }

    public int getProduct(int k) {
        int size = prefix.size();

        // Agar k >= size hai, toh last k numbers me 0 include ho chuka hai
        if (k >= size) return 0;

        return prefix.get(size - 1) / prefix.get(size - 1 - k);
    }
}
