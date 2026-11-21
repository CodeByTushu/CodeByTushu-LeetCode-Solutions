/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int[] findSubtreeSizes(int[] parent, String s) {
        int n = parent.length;

        // Children ki adjacency list (linked-list style)
        int[] head = new int[n];
        int[] nxt = new int[n];
        Arrays.fill(head, -1);
        for (int i = 1; i < n; i++) {
            nxt[i] = head[parent[i]];
            head[parent[i]] = i;
        }

        int[] last = new int[26];          // last[c] = current path pe c character wala sabse nazdeeki ancestor
        Arrays.fill(last, -1);

        int[] newPar = parent.clone();     // changes ke baad parent
        int[] saved = new int[n];          // backtrack ke liye purani last[] value
        int[] order = new int[n];          // DFS preorder
        int cnt = 0;

        int[] it = head.clone();           // har node ka next child pointer
        int[] stack = new int[n];
        int sp = 0;

        // Root enter karo
        int c0 = s.charAt(0) - 'a';
        saved[0] = last[c0];
        last[c0] = 0;
        order[cnt++] = 0;
        stack[sp++] = 0;

        // Iterative DFS (n = 10^5 pe recursion se stack overflow ho sakta hai)
        while (sp > 0) {
            int x = stack[sp - 1];
            if (it[x] != -1) {
                int child = it[x];
                it[x] = nxt[child];

                int c = s.charAt(child) - 'a';
                saved[child] = last[c];
                if (last[c] != -1) newPar[child] = last[c]; // closest same-char ancestor mila

                last[c] = child;
                order[cnt++] = child;
                stack[sp++] = child;
            } else {
                sp--;
                last[s.charAt(x) - 'a'] = saved[x]; // backtrack
            }
        }

        // Subtree sizes: preorder ko reverse mein process karo (child pehle, parent baad mein)
        int[] size = new int[n];
        Arrays.fill(size, 1);
        for (int i = n - 1; i >= 1; i--) {
            int x = order[i];
            size[newPar[x]] += size[x];
        }

        return size;
    }
}
