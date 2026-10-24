/**
 * Problem: LeetCode 3454 - Separate Squares II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.*;

class Solution {
    // Event representing the start or end of a square along the y-axis
    static class Event implements Comparable<Event> {
        long y;
        int type; // +1 for square bottom (enter), -1 for square top (exit)
        long x1, x2;

        Event(long y, int type, long x1, long x2) {
            this.y = y;
            this.type = type;
            this.x1 = x1;
            this.x2 = x2;
        }

        @Override
        public int compareTo(Event other) {
            return Long.compare(this.y, other.y);
        }
    }

    // Segment Tree to maintain the union of x-intervals
    static class SegmentTree {
        int n;
        long[] xs;
        int[] count;
        long[] len;

        SegmentTree(long[] xs) {
            this.xs = xs;
            this.n = xs.length - 1; // number of elementary intervals [xs[i], xs[i+1]]
            this.count = new int[4 * n];
            this.len = new long[4 * n];
        }

        void update(int node, int start, int end, int l, int r, int val) {
            if (l <= start && end <= r) {
                count[node] += val;
            } else {
                int mid = start + (end - start) / 2;
                if (l <= mid) {
                    update(2 * node, start, mid, l, r, val);
                }
                if (r > mid) {
                    update(2 * node + 1, mid + 1, end, l, r, val);
                }
            }

            if (count[node] > 0) {
                len[node] = xs[end + 1] - xs[start];
            } else {
                if (start == end) {
                    len[node] = 0;
                } else {
                    len[node] = len[2 * node] + len[2 * node + 1];
                }
            }
        }

        long query() {
            return len[1];
        }
    }

    public double separateSquares(int[][] squares) {
        int n = squares.length;
        List<Event> events = new ArrayList<>(2 * n);
        long[] allX = new long[2 * n];
        int xIdx = 0;

        for (int[] sq : squares) {
            long x1 = sq[0];
            long y1 = sq[1];
            long l = sq[2];
            long x2 = x1 + l;
            long y2 = y1 + l;

            events.add(new Event(y1, 1, x1, x2));
            events.add(new Event(y2, -1, x1, x2));
            allX[xIdx++] = x1;
            allX[xIdx++] = x2;
        }

        Collections.sort(events);
        Arrays.sort(allX);

        // Deduplicate X coordinates
        int uniqueCount = 0;
        for (int i = 0; i < allX.length; i++) {
            if (i == 0 || allX[i] != allX[i - 1]) {
                allX[uniqueCount++] = allX[i];
            }
        }
        long[] xs = Arrays.copyOf(allX, uniqueCount);

        SegmentTree st = new SegmentTree(xs);

        // Strips between consecutive y-events
        // Each strip has: y1, y2, activeWidth, stripArea
        List<double[]> strips = new ArrayList<>();
        double totalArea = 0.0;

        int numEvents = events.size();
        int i = 0;
        int m = xs.length - 2;

        while (i < numEvents) {
            long currentY = events.get(i).y;

            // Apply all events occurring at currentY
            while (i < numEvents && events.get(i).y == currentY) {
                Event e = events.get(i);
                int l = Arrays.binarySearch(xs, e.x1);
                int r = Arrays.binarySearch(xs, e.x2) - 1;
                if (l <= r) {
                    st.update(1, 0, m, l, r, e.type);
                }
                i++;
            }

            if (i < numEvents) {
                long nextY = events.get(i).y;
                long width = st.query();
                long height = nextY - currentY;
                double stripArea = (double) width * height;
                if (stripArea > 0) {
                    strips.add(new double[]{(double) currentY, (double) nextY, (double) width, stripArea});
                    totalArea += stripArea;
                }
            }
        }

        double targetArea = totalArea / 2.0;
        double currentArea = 0.0;

        for (double[] strip : strips) {
            double y1 = strip[0];
            double y2 = strip[1];
            double width = strip[2];
            double area = strip[3];

            if (currentArea + area >= targetArea) {
                double needed = targetArea - currentArea;
                return y1 + (needed / width);
            }
            currentArea += area;
        }

        return events.get(0).y;
    }
}
