/**
 * Problem: LeetCode 33 - Search in Rotated Sorted Array
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Check if the left half [left...mid] is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1; // Target is within sorted left half
                } else {
                    left = mid + 1;  // Target is in right half
                }
            } else { // Right half [mid...right] is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;  // Target is within sorted right half
                } else {
                    right = mid - 1; // Target is in left half
                }
            }
        }

        return -1;
    }
}
