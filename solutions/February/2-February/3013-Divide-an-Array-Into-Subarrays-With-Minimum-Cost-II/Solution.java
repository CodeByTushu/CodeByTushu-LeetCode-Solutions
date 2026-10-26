/**
 * Problem: LeetCode 3013 - Divide an Array Into Subarrays With Minimum Cost II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Comparator;
import java.util.TreeSet;

class Solution {
    static class Pair {
        long val;
        int id;

        Pair(long val, int id) {
            this.val = val;
            this.id = id;
        }
    }

    private TreeSet<Pair> left;
    private TreeSet<Pair> right;
    private long sumL;
    private int m;

    public long minimumCost(int[] nums, int k, int dist) {
        int n = nums.length;
        this.m = k - 1;

        // Comparator ordering by value ascending, then by original index ascending
        Comparator<Pair> cmp = (a, b) -> {
            if (a.val != b.val) return Long.compare(a.val, b.val);
            return Integer.compare(a.id, b.id);
        };

        left = new TreeSet<>(cmp);
        right = new TreeSet<>(cmp);
        sumL = 0;

        // Initialize the first sliding window of size dist + 1: indices 1 to min(n - 1, 1 + dist)
        for (int i = 1; i <= Math.min(n - 1, 1 + dist); i++) {
            add(new Pair(nums[i], i), cmp);
        }

        long minSum = sumL;

        // Slide the window across nums[1 ... n - 1]
        for (int i = 2 + dist; i < n; i++) {
            add(new Pair(nums[i], i), cmp);
            remove(new Pair(nums[i - dist - 1], i - dist - 1));
            minSum = Math.min(minSum, sumL);
        }

        return (long) nums[0] + minSum;
    }

    private void add(Pair p, Comparator<Pair> cmp) {
        if (left.size() < m) {
            left.add(p);
            sumL += p.val;
        } else {
            if (cmp.compare(p, left.last()) < 0) {
                Pair maxL = left.pollLast();
                sumL -= maxL.val;
                right.add(maxL);

                left.add(p);
                sumL += p.val;
            } else {
                right.add(p);
            }
        }
    }

    private void remove(Pair p) {
        if (left.contains(p)) {
            left.remove(p);
            sumL -= p.val;
            if (!right.isEmpty()) {
                Pair minR = right.pollFirst();
                left.add(minR);
                sumL += minR.val;
            }
        } else {
            right.remove(p);
        }
    }
}
