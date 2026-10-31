/**
 * Problem: LeetCode 2069 - Walking Robot Simulation II
 * Language: Java
 * Time Complexity: Constructor O(W + H), step/getPos/getDir O(1)
 * Space Complexity: O(W + H)
 */
class Robot {
    private final int[][] coords;
    private final String[] dirs;
    private final int perimeter;
    private int idx;
    private boolean moved;

    public Robot(int width, int height) {
        perimeter = 2 * (width + height) - 4;
        coords = new int[perimeter][2];
        dirs = new String[perimeter];
        idx = 0;
        moved = false;

        int index = 0;
        // Bottom row: (0, 0) to (width - 1, 0)
        for (int i = 0; i < width; i++) {
            coords[index] = new int[]{i, 0};
            dirs[index] = "East";
            index++;
        }
        // Right col: (width - 1, 1) to (width - 1, height - 1)
        for (int j = 1; j < height; j++) {
            coords[index] = new int[]{width - 1, j};
            dirs[index] = "North";
            index++;
        }
        // Top row: (width - 2, height - 1) down to (0, height - 1)
        for (int i = width - 2; i >= 0; i--) {
            coords[index] = new int[]{i, height - 1};
            dirs[index] = "West";
            index++;
        }
        // Left col: (0, height - 2) down to (0, 1)
        for (int j = height - 2; j > 0; j--) {
            coords[index] = new int[]{0, j};
            dirs[index] = "South";
            index++;
        }
        // Arriving at origin after movement faces South
        dirs[0] = "South";
    }

    public void step(int num) {
        moved = true;
        idx = (idx + num) % perimeter;
    }

    public int[] getPos() {
        return coords[idx];
    }

    public String getDir() {
        if (!moved) {
            return "East";
        }
        return dirs[idx];
    }
}
