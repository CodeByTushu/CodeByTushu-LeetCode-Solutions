/**
 * Problem: LeetCode 3454 - Separate Squares II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

struct Event {
    long long y;
    int type; // +1 enter, -1 exit
    long long x1, x2;

    bool operator<(const Event& other) const {
        return y < other.y;
    }
};

class SegmentTree {
private:
    int n;
    const vector<long long>& xs;
    vector<int> count;
    vector<long long> len;

public:
    SegmentTree(const vector<long long>& x_coords) : xs(x_coords) {
        n = static_cast<int>(xs.size()) - 1;
        count.assign(4 * n, 0);
        len.assign(4 * n, 0);
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

    long long query() const {
        return len[1];
    }
};

class Solution {
public:
    double separateSquares(vector<vector<int>>& squares) {
        int n = squares.size();
        vector<Event> events;
        events.reserve(2 * n);
        vector<long long> xs;
        xs.reserve(2 * n);

        for (const auto& sq : squares) {
            long long x1 = sq[0];
            long long y1 = sq[1];
            long long l = sq[2];
            long long x2 = x1 + l;
            long long y2 = y1 + l;

            events.push_back({y1, 1, x1, x2});
            events.push_back({y2, -1, x1, x2});
            xs.push_back(x1);
            xs.push_back(x2);
        }

        sort(events.begin(), events.end());
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());

        SegmentTree st(xs);

        struct Strip {
            double y1, y2, width, area;
        };
        vector<Strip> strips;
        double totalArea = 0.0;

        int numEvents = events.size();
        int i = 0;
        int m = static_cast<int>(xs.size()) - 2;

        while (i < numEvents) {
            long long currY = events[i].y;

            while (i < numEvents && events[i].y == currY) {
                const auto& e = events[i];
                int l = lower_bound(xs.begin(), xs.end(), e.x1) - xs.begin();
                int r = lower_bound(xs.begin(), xs.end(), e.x2) - xs.begin() - 1;
                if (l <= r) {
                    st.update(1, 0, m, l, r, e.type);
                }
                i++;
            }

            if (i < numEvents) {
                long long nextY = events[i].y;
                long long width = st.query();
                long long height = nextY - currY;
                double stripArea = static_cast<double>(width) * height;
                if (stripArea > 0) {
                    strips.push_back({static_cast<double>(currY), static_cast<double>(nextY), static_cast<double>(width), stripArea});
                    totalArea += stripArea;
                }
            }
        }

        double targetArea = totalArea / 2.0;
        double currentArea = 0.0;

        for (const auto& strip : strips) {
            if (currentArea + strip.area >= targetArea) {
                double needed = targetArea - currentArea;
                return strip.y1 + (needed / strip.width);
            }
            currentArea += strip.area;
        }

        return static_cast<double>(events[0].y);
    }
};
