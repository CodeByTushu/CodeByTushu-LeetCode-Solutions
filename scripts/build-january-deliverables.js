const fs = require('fs');
const path = require('path');

const janData = [
  {
    day: "01 January 2026",
    id: "66",
    title: "Plus One",
    difficulty: "Easy",
    folder: "solutions/January/1-January/66-Plus-One",
    tech: "Array Traversal & Carry Simulation",
    keyTopics: "Array & Math",
    p1: "We are given a large integer represented as an integer array of decimal digits, where each element represents a single digit from most significant to least significant. Our goal is to increment the large integer by one and return the resulting array of digits without leading zeros.",
    p2: "We iterate backwards from the least significant digit toward the most significant digit. If the current digit is less than 9, we simply increment it by 1 and immediately return the array. If the digit is 9, it rolls over to 0 and we continue leftward to propagate the carry. If all digits were 9, we allocate a new array of length n + 1 with the first digit set to 1, achieving optimal O(N) time and O(1) auxiliary space.",
    h1: "Reverse traversal handles schoolbook decimal addition seamlessly",
    h2: "In-place modification of digits avoids unnecessary reallocations",
    h3: "Early return as soon as a non-9 digit absorbs the carry",
    h4: "Handles all-nines overflow corner case like [9, 9, 9] to [1, 0, 0, 0]",
    h5: "Clean single-pass carry propagation",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Array Traversal", "Carry Propagation", "Simulation"],
    q: "Why is creating a new array only necessary when all original digits are 9?",
    options: [
      "Because arrays in Java have dynamic length by default",
      "Because any non-nine digit absorbs the carry without increasing the total number of digits",
      "Because nine cannot be divided by ten",
      "Because leading zeros are always permitted in integer arrays"
    ],
    hashtags: ["PlusOne", "Array", "Math", "CarryAddition"],
    primaryTags: ["Array", "Math"],
    secondaryTags: ["Simulation", "Carry Propagation", "In-Place Modification"]
  },
  {
    day: "02 January 2026",
    id: "961",
    title: "N-Repeated Element in Size 2N Array",
    difficulty: "Easy",
    folder: "solutions/January/2-January/961-N-Repeated-Element-in-Size-2N-Array",
    tech: "Sliding Window & Hash Set",
    keyTopics: "Hash Table & Array",
    p1: "We are given an integer array of length 2N containing N + 1 unique elements, where exactly one element is repeated N times while every other element appears exactly once. We need to identify and return this repeated element.",
    p2: "By the Pigeonhole Principle, because the repeated element occupies half of the total positions, it must appear adjacent or with a gap of at most two elements across any valid permutation. We can either check a sliding window of size 4 or maintain a small hash set to detect the first duplicate in O(N) time and O(1) space.",
    h1: "Pigeonhole Principle guarantees target repeats within any 3 consecutive slots",
    h2: "Early return on the very first duplicate detected",
    h3: "Sliding window check of distances 1, 2, and 3 requires O(1) extra memory",
    h4: "Handles alternating patterns and edge-placed repetitions",
    h5: "Highly efficient comparison logic running in linear time",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Pigeonhole Principle", "Hash Set Lookup", "Sliding Window"],
    q: "What is the maximum distance between two identical elements of the repeated number in a size 2N array?",
    options: [
      "At most 2 (or 3 in worst-case corner layouts like [x, a, b, x])",
      "Always strictly 1 (they must be strictly adjacent)",
      "At least N elements apart",
      "Cannot be bounded"
    ],
    hashtags: ["NRepeatedElementInSize2NArray", "Array", "HashTable", "PigeonholePrinciple"],
    primaryTags: ["Array", "Hash Table"],
    secondaryTags: ["Pigeonhole Principle", "Sliding Window", "Frequency Detection"]
  },
  {
    day: "03 January 2026",
    id: "1411",
    title: "Number of Ways to Paint N × 3 Grid",
    difficulty: "Hard",
    folder: "solutions/January/3-January/1411-Number-of-Ways-to-Paint-N-3-Grid",
    tech: "Dynamic Programming & State Compression",
    keyTopics: "Dynamic Programming & Math",
    p1: "We are given a grid of size n x 3 and three colors (Red, Yellow, Green). We need to color each cell such that no two adjacent cells share the same color. We must return the total number of valid colorings modulo 1,000,000,007.",
    p2: "For any row of 3 cells, there are only two valid color configurations: Type A (ABA pattern using 2 colors, 6 ways) and Type B (ABC pattern using 3 distinct colors, 6 ways). By analyzing how row i transitions to row i + 1, each ABA pattern transitions to 3 ABA and 2 ABC patterns, while each ABC pattern transitions to 2 ABA and 2 ABC patterns. We track these two counts iteratively across n rows in O(N) time and O(1) space.",
    h1: "Symmetry reduces 27 total row colorings to 2 fundamental equivalence classes",
    h2: "Type A (ABA - 2 colors) and Type B (ABC - 3 colors) initial counts are both 6",
    h3: "State transition formulas: nextA = 3 * A + 2 * B, nextB = 2 * A + 2 * B",
    h4: "Modulo 10^9 + 7 applied at each step to prevent 64-bit integer overflow",
    h5: "O(1) auxiliary space optimization by keeping only the previous row state",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["State Machine DP", "Combinatorics", "Matrix Exponentiation"],
    q: "How many total valid color configurations exist for a single row of length 3 using 3 colors?",
    options: [
      "12 (6 of type ABA and 6 of type ABC)",
      "27 (all permutations of 3 colors)",
      "9 (only 3 colors per slot)",
      "18 (excluding full monochromatic rows)"
    ],
    hashtags: ["NumberOfWaysToPaintN3Grid", "DynamicProgramming", "Math", "Combinatorics"],
    primaryTags: ["Dynamic Programming", "Math"],
    secondaryTags: ["State Machine", "Combinatorics", "Space Optimization"]
  },
  {
    day: "04 January 2026",
    id: "1390",
    title: "Four Divisors",
    difficulty: "Medium",
    folder: "solutions/January/4-January/1390-Four-Divisors",
    tech: "Number Theory & Square Root Factorization",
    keyTopics: "Math & Array",
    p1: "We are given an integer array nums and need to return the sum of divisors of integers in the array that have exactly four distinct positive integer divisors. If an integer does not have exactly four divisors, it contributes 0 to the sum.",
    p2: "For each number n in nums, we iterate potential divisors d from 1 up to floor(sqrt(n)). Each divisor d yields a paired divisor n / d. If d * d == n, it only contributes 1 divisor; otherwise it contributes 2. If at any point the divisor count exceeds 4, we prune early. We only sum the divisors if the final count is strictly four, running in O(N * sqrt(M)) time and O(1) space.",
    h1: "Factors always come in pairs (d, n / d) up to the square root boundary",
    h2: "Early pruning immediately discards numbers with more than 4 divisors",
    h3: "Square numbers like 9 or 25 have an odd number of divisors and cannot have exactly four",
    h4: "Numbers with 4 divisors are either p^3 or p * q for distinct primes p, q",
    h5: "Zero auxiliary memory overhead using clean scalar counters",
    h6: "Time Complexity: O(N * sqrt(M)) | Auxiliary Space Complexity: O(1)",
    patterns: ["Factorization", "Divisor Counting", "Square Root Decomposition"],
    q: "Which form must an integer have to possess exactly four positive divisors?",
    options: [
      "p^3 or p * q, where p and q are distinct prime numbers",
      "Any even composite number",
      "Only the product of two equal primes p^2",
      "Any number divisible by 4"
    ],
    hashtags: ["FourDivisors", "Math", "NumberTheory", "Factorization"],
    primaryTags: ["Math", "Array"],
    secondaryTags: ["Number Theory", "Factorization", "Pruning"]
  },
  {
    day: "05 January 2026",
    id: "1975",
    title: "Maximum Matrix Sum",
    difficulty: "Medium",
    folder: "solutions/January/5-January/1975-Maximum-Matrix-Sum",
    tech: "Greedy & Parity Invariant",
    keyTopics: "Greedy & Matrix",
    p1: "We are given an n x n integer matrix and can multiply any two adjacent cells by -1 any number of times. Our goal is to maximize the summation of all matrix elements.",
    p2: "Because any operation flips the signs of two adjacent cells simultaneously, the parity of the count of negative numbers remains strictly invariant. If the total number of negative values is even, we can flip all numbers to positive. If it is odd, exactly one negative sign must remain, and greedily placing that negative sign on the element with the minimum absolute value maximizes the total sum.",
    h1: "Flipping signs of two adjacent cells preserves the parity of negative numbers",
    h2: "Any negative sign can be propagated anywhere in the grid via a path of flips",
    h3: "Even negative count allows making all matrix elements positive",
    h4: "Odd negative count leaves exactly one negative element: the minimum absolute value",
    h5: "Single pass computes absolute sum, negative count, and min absolute value",
    h6: "Time Complexity: O(N^2) | Auxiliary Space Complexity: O(1)",
    patterns: ["Parity Invariant", "Greedy Strategy", "Matrix Traversal"],
    q: "Why can negative signs be shifted between any two arbitrary cells in the matrix?",
    options: [
      "Because chaining adjacent cell flips along a connected path moves a negative sign to any target cell",
      "Because the problem allows diagonal moves",
      "Because matrix rows can be swapped freely",
      "Because 0 resets the count of negatives"
    ],
    hashtags: ["MaximumMatrixSum", "Greedy", "Matrix", "Math"],
    primaryTags: ["Greedy", "Matrix"],
    secondaryTags: ["Parity Invariant", "Grid Traversal", "Absolute Minimum"]
  },
  {
    day: "06 January 2026",
    id: "1161",
    title: "Maximum Level Sum of a Binary Tree",
    difficulty: "Medium",
    folder: "solutions/January/6-January/1161-Maximum-Level-Sum-of-a-Binary-Tree",
    tech: "Breadth-First Search (Level Order Traversal)",
    keyTopics: "Tree & Breadth-First Search",
    p1: "We are given the root of a binary tree with 1-indexed levels. We need to find the smallest level x such that the sum of all values of the nodes at level x is maximal.",
    p2: "We employ a standard queue-based Breadth-First Search (BFS) for level order traversal. For each level, we measure the queue size, accumulate node values into a level sum, enqueue child nodes, and compare against the maximum sum seen so far. If a level achieves a strictly greater sum, we update our best level index, naturally breaking ties in favor of the smaller level in O(N) time and O(W) space.",
    h1: "Queue-based level order traversal computes level sums layer by layer",
    h2: "Queue size snapshot at the start of each round isolates level boundaries",
    h3: "Tracks 64-bit level sum to prevent overflow with extreme negative or positive values",
    h4: "Strictly greater condition Math.max guarantees the smallest level index on ties",
    h5: "Handles negative node values correctly by initializing maxSum to Long.MIN_VALUE",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(W)",
    patterns: ["Level Order Traversal", "Queue BFS", "Tree Exploration"],
    q: "Why is initializing the maximum sum to 0 incorrect in this problem?",
    options: [
      "Because tree node values can be negative, so a level sum can be less than 0",
      "Because tree levels are 1-indexed",
      "Because the root node is always positive",
      "Because BFS requires a positive sentinel"
    ],
    hashtags: ["MaximumLevelSumOfABinaryTree", "Tree", "BFS", "BinaryTree"],
    primaryTags: ["Tree", "Breadth-First Search"],
    secondaryTags: ["Binary Tree", "Level Order Traversal", "Queue"]
  },
  {
    day: "07 January 2026",
    id: "1339",
    title: "Maximum Product of Splitted Binary Tree",
    difficulty: "Medium",
    folder: "solutions/January/7-January/1339-Maximum-Product-of-Splitted-Binary-Tree",
    tech: "Depth-First Search & Subtree Sum Optimization",
    keyTopics: "Tree & Depth-First Search",
    p1: "We are given the root of a binary tree and need to split it into two subtrees by removing exactly one edge such that the product of the sums of the two resulting subtrees is maximized. The final answer should be returned modulo 1,000,000,007.",
    p2: "Removing an edge decomposes the tree into a subtree with sum S and the remaining tree with sum (TotalSum - S). We make a first DFS pass to compute the total tree sum, and a second DFS pass (or record subtree sums during the first) to maximize the product S * (TotalSum - S) using 64-bit arithmetic, applying modulo only at the very end in O(N) time and O(H) space.",
    h1: "Removing any edge creates two subtrees with sums S and (TotalSum - S)",
    h2: "Product S * (TotalSum - S) is maximized when S is as close to TotalSum / 2 as possible",
    h3: "Two-pass DFS cleanly decouples total sum computation from subtree product evaluation",
    h4: "All intermediate product calculations use 64-bit long to prevent overflow",
    h5: "Modulo 10^9 + 7 applied only to the final maximum product",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(H)",
    patterns: ["Tree DP / Post-Order DFS", "Subtree Sum", "Mathematical Optimization"],
    q: "Why must the modulo operation be deferred until after finding the maximum product?",
    options: [
      "Because taking modulo before comparison corrupts numerical ordering (e.g., 10^9 + 8 mod M = 1)",
      "Because modulo operations cannot be applied to long integers",
      "Because subtree sums must be negative",
      "Because the tree might contain cycles"
    ],
    hashtags: ["MaximumProductOfSplittedBinaryTree", "Tree", "DFS", "BinaryTree"],
    primaryTags: ["Tree", "Depth-First Search"],
    secondaryTags: ["Binary Tree", "Subtree Sum", "Post-Order Traversal"]
  },
  {
    day: "08 January 2026",
    id: "1458",
    title: "Max Dot Product of Two Subsequences",
    difficulty: "Hard",
    folder: "solutions/January/8-January/1458-Max-Dot-Product-of-Two-Subsequences",
    tech: "2D Dynamic Programming",
    keyTopics: "Dynamic Programming & Array",
    p1: "We are given two integer arrays nums1 and nums2. We must return the maximum dot product between non-empty subsequences of nums1 and nums2 of equal length.",
    p2: "Let dp[i][j] be the maximum dot product using non-empty subsequences from prefixes nums1[0..i] and nums2[0..j]. At each pair (i, j), the current elements contribute nums1[i] * nums2[j] either alone or appended to dp[i-1][j-1]. We also consider skipping nums1[i] (dp[i-1][j]) or skipping nums2[j] (dp[i][j-1]), achieving optimal O(M * N) time and O(N) space.",
    h1: "Defines non-empty subsequence dot product with optional prefix chaining",
    h2: "Transition: max(nums1[i]*nums2[j], nums1[i]*nums2[j] + dp[i-1][j-1], dp[i-1][j], dp[i][j-1])",
    h3: "Correctly handles arrays where all products are negative by taking max single product",
    h4: "Space optimized from 2D matrix O(M * N) to 1D row buffer O(N)",
    h5: "Preserves the non-empty subsequence constraint without dummy zeros",
    h6: "Time Complexity: O(M * N) | Auxiliary Space Complexity: O(N)",
    patterns: ["2D Grid DP", "Subsequence Alignment", "Space Optimization"],
    q: "How does the algorithm handle cases where all elements of nums1 are positive and all elements of nums2 are negative?",
    options: [
      "It picks the pair with the smallest absolute product to minimize the negative value",
      "It returns 0 by choosing empty subsequences",
      "It throws an exception",
      "It flips the signs of all elements"
    ],
    hashtags: ["MaxDotProductOfTwoSubsequences", "DynamicProgramming", "Array", "Subsequence"],
    primaryTags: ["Dynamic Programming", "Array"],
    secondaryTags: ["Subsequence Alignment", "2D DP", "Space Optimization"]
  },
  {
    day: "09 January 2026",
    id: "865",
    title: "Smallest Subtree with all the Deepest Nodes",
    difficulty: "Medium",
    folder: "solutions/January/9-January/865-Smallest-Subtree-with-all-the-Deepest-Nodes",
    tech: "Depth-First Search & Lowest Common Ancestor",
    keyTopics: "Tree & Depth-First Search",
    p1: "We are given the root of a binary tree. We need to find the smallest subtree such that it contains all the deepest nodes of the original tree.",
    p2: "This problem is equivalent to finding the Lowest Common Ancestor (LCA) of all the deepest nodes. In a single post-order DFS traversal, each recursive call returns a pair: the maximum depth of its subtree and the candidate LCA node. If the left and right subtrees have equal maximum depth, the current node is the LCA of deepest nodes; otherwise, the deeper subtree holds the answer in O(N) time and O(H) space.",
    h1: "Post-order DFS returns a pair (depth, node) for each subtree",
    h2: "Equal left and right subtree depths mean the current node is the LCA",
    h3: "Unequal depths delegate the LCA candidate to the deeper branch",
    h4: "Single traversal eliminates the need for separate height calculation passes",
    h5: "Handles edge cases with single node trees or skewed linear trees cleanly",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(H)",
    patterns: ["Lowest Common Ancestor", "Post-Order DFS", "Tree Depth Propagation"],
    q: "Why is a node declared the LCA of deepest nodes when its left and right subtrees have identical max depth?",
    options: [
      "Because deepest leaves exist in both branches, making the current node their lowest shared ancestor",
      "Because binary trees must be balanced",
      "Because equal depths guarantee full subtree completeness",
      "Because both child pointers must be non-null"
    ],
    hashtags: ["SmallestSubtreeWithAllTheDeepestNodes", "Tree", "DFS", "LowestCommonAncestor"],
    primaryTags: ["Tree", "Depth-First Search"],
    secondaryTags: ["Lowest Common Ancestor", "Binary Tree", "Post-Order Traversal"]
  },
  {
    day: "10 January 2026",
    id: "712",
    title: "Minimum ASCII Delete Sum for Two Strings",
    difficulty: "Medium",
    folder: "solutions/January/10-January/712-Minimum-ASCII-Delete-Sum-for-Two-Strings",
    tech: "2D Dynamic Programming (LCS Variation)",
    keyTopics: "Dynamic Programming & String",
    p1: "We are given two strings s1 and s2 and need to return the lowest ASCII sum of deleted characters to make two strings equal.",
    p2: "We model this as a variation of the Longest Common Subsequence (LCS) problem. Let dp[i][j] be the minimum ASCII delete sum to make s1[0..i-1] and s2[0..j-1] equal. If characters match (s1[i-1] == s2[j-1]), no deletion is needed and dp[i][j] = dp[i-1][j-1]. Otherwise, we take min of deleting s1[i-1] or deleting s2[j-1]. We can optimize space to O(min(M, N)) with 1D DP in O(M * N) time.",
    h1: "Dynamic programming state dp[i][j] stores minimum deletion cost",
    h2: "Matching characters carry forward diagonal cost with zero penalty",
    h3: "Mismatched characters branch into deleting from s1 or deleting from s2",
    h4: "Base cases initialized with cumulative ASCII prefix sums of individual strings",
    h5: "Space optimized using a 1D array of size N + 1",
    h6: "Time Complexity: O(M * N) | Auxiliary Space Complexity: O(N)",
    patterns: ["String DP", "Longest Common Subsequence", "ASCII Cost Optimization"],
    q: "How does this problem relate to the Longest Common Subsequence (LCS)?",
    options: [
      "Minimizing deleted ASCII sum is equivalent to maximizing the ASCII sum of the common subsequence",
      "It is identical to edit distance with weight 1",
      "It requires finding palindromic substrings",
      "It only works when strings have equal length"
    ],
    hashtags: ["MinimumASCIIDeleteSumForTwoStrings", "DynamicProgramming", "String", "LCS"],
    primaryTags: ["Dynamic Programming", "String"],
    secondaryTags: ["LCS Variation", "2D DP", "Space Optimization"]
  },
  {
    day: "11 January 2026",
    id: "85",
    title: "Maximal Rectangle",
    difficulty: "Hard",
    folder: "solutions/January/11-January/85-Maximal-Rectangle",
    tech: "Monotonic Stack & Histogram Reduction",
    keyTopics: "Array & Monotonic Stack",
    p1: "We are given a rows x cols binary matrix filled with 0s and 1s, and need to find the largest rectangle containing only 1s and return its area.",
    p2: "We treat each row of the matrix as the base of a histogram where bar heights represent consecutive 1s above the current row. For each row, we update height array heights[c] = (matrix[r][c] == '1' ? heights[c] + 1 : 0) and compute the largest rectangular area using a monotonic increasing stack in O(cols) time, bringing total time to O(rows * cols) and space to O(cols).",
    h1: "Reduces 2D maximal rectangle to repeated 1D largest rectangle in histogram",
    h2: "Row-by-row height accumulation tracks contiguous vertical 1s",
    h3: "Monotonic increasing stack finds nearest smaller bars to left and right in linear time",
    h4: "Zero in a cell resets column height to 0 immediately",
    h5: "Single row buffer achieves optimal O(cols) auxiliary memory",
    h6: "Time Complexity: O(rows * cols) | Auxiliary Space Complexity: O(cols)",
    patterns: ["Monotonic Stack", "Histogram Transformation", "Matrix Reduction"],
    q: "Why does encountering a '0' in a matrix cell reset the histogram height to 0?",
    options: [
      "Because any rectangle built on this row cannot extend vertically through a 0 cell",
      "Because monotonic stacks only accept positive heights",
      "Because row widths must be uniform",
      "Because binary matrices cannot store zero heights"
    ],
    hashtags: ["MaximalRectangle", "MonotonicStack", "Array", "Matrix"],
    primaryTags: ["Array", "Monotonic Stack", "Matrix"],
    secondaryTags: ["Largest Rectangle in Histogram", "Grid Reduction", "Stack"]
  },
  {
    day: "12 January 2026",
    id: "1266",
    title: "Minimum Time Visiting All Points",
    difficulty: "Easy",
    folder: "solutions/January/12-January/1266-Minimum-Time-Visiting-All-Points",
    tech: "Chebyshev Distance & Math",
    keyTopics: "Geometry & Math",
    p1: "We are given n points with coordinates points[i] = [xi, yi]. Moving 1 unit vertically, horizontally, or diagonally takes 1 second. We must find the minimum time in seconds to visit all points in order.",
    p2: "Moving diagonally allows changing both x and y coordinates by 1 in a single second. Therefore, moving from (x1, y1) to (x2, y2) takes max(|x2 - x1|, |y2 - y1|) seconds (Chebyshev distance). We simply sum the Chebyshev distances between consecutive points across the array in O(N) time and O(1) space.",
    h1: "Diagonal movement covers 1 unit in both x and y simultaneously in 1 second",
    h2: "Distance between any two points is the Chebyshev distance max(|dx|, |dy|)",
    h3: "Order of visits is fixed, reducing problem to pairwise distance summation",
    h4: "No graph search or pathfinding needed due to unrestricted planar movement",
    h5: "Optimal single pass iteration with zero additional space",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Chebyshev Distance", "Geometry", "Array Iteration"],
    q: "Why is the time between (x1, y1) and (x2, y2) equal to max(|dx|, |dy|) rather than |dx| + |dy|?",
    options: [
      "Because diagonal moves allow simultaneous progress in both dimensions at unit cost",
      "Because points are visited in random order",
      "Because Manhattan distance only applies to non-negative coordinates",
      "Because Euclidean distance is rounded down"
    ],
    hashtags: ["MinimumTimeVisitingAllPoints", "Geometry", "Math", "Array"],
    primaryTags: ["Geometry", "Math", "Array"],
    secondaryTags: ["Chebyshev Distance", "Coordinate Geometry", "Simulation"]
  },
  {
    day: "13 January 2026",
    id: "3453",
    title: "Separate Squares I",
    difficulty: "Medium",
    folder: "solutions/January/13-January/3453-Separate-Squares-I",
    tech: "Binary Search on Floating Point",
    keyTopics: "Binary Search & Geometry",
    p1: "We are given an array of squares where squares[i] = [x, y, l]. We must find the minimum y-coordinate of a horizontal line such that the total area of squares below the line equals the total area of squares above the line.",
    p2: "The total area below horizontal line y is a monotonically non-decreasing function of y. We compute totalArea / 2 as target. We then binary search for y in range [min_y, max_y] with 60 to 80 iterations (precision 10^-5). For a candidate y, area below is sum of min(l, max(0, y - yi)) * l. This runs in O(N * log((max_y - min_y) / eps)) time and O(1) space.",
    h1: "Monotonic relationship between line height y and area below enables binary search",
    h2: "Target area is exactly totalArea / 2 across all given squares",
    h3: "For candidate y, a square contributes l * clamp(y - yi, 0, l) to the lower area",
    h4: "Fixed 60-80 iterations guarantee precision up to 10^-5 without infinite loops",
    h5: "Overlapping squares are treated independently as defined by the problem",
    h6: "Time Complexity: O(N * log(Range / eps)) | Auxiliary Space Complexity: O(1)",
    patterns: ["Binary Search on Answer", "Continuous Domain Search", "Geometric Clamping"],
    q: "Why does a fixed iteration loop (e.g. 70 iterations) work better than while(right - left > eps) in floating point binary search?",
    options: [
      "It avoids infinite loops caused by floating-point precision limits and guarantees predictable convergence",
      "It reduces time complexity from exponential to polynomial",
      "It automatically rounds answers to integers",
      "It handles negative coordinates without branching"
    ],
    hashtags: ["SeparateSquaresI", "BinarySearch", "Geometry", "Math"],
    primaryTags: ["Binary Search", "Geometry"],
    secondaryTags: ["Binary Search on Answer", "Floating Point Precision", "Area Calculation"]
  },
  {
    day: "14 January 2026",
    id: "3454",
    title: "Separate Squares II",
    difficulty: "Hard",
    folder: "solutions/January/14-January/3454-Separate-Squares-II",
    tech: "Line Sweep & Segment Tree",
    keyTopics: "Line Sweep & Segment Tree",
    p1: "We are given an array of squares where overlapping regions must only be counted ONCE (union of areas). We need to find the minimum y-coordinate of a horizontal line such that the union area below equals the union area above.",
    p2: "Unlike Part I, overlapping areas cannot be double counted. We use a Segment Tree with Line Sweep over horizontal slices to compute the exact union area of rectangles across y-intervals. After computing total union area / 2, we determine which horizontal stripe contains the dividing line and interpolate the exact y coordinate in O(N log N) time and O(N) space.",
    h1: "Union area computation requires coordinate compression and segment tree with lazy tags",
    h2: "Horizontal events sweep vertically to track active x-intervals and their union length",
    h3: "Area of each horizontal strip is strip_height * active_x_union_length",
    h4: "Identifies the exact horizontal strip where cumulative union area reaches half",
    h5: "Linear interpolation inside the target strip gives exact y-coordinate",
    h6: "Time Complexity: O(N log N) | Auxiliary Space Complexity: O(N)",
    patterns: ["Line Sweep", "Segment Tree on X-Coordinates", "Coordinate Compression"],
    q: "Why is a segment tree necessary in Separate Squares II but not in Separate Squares I?",
    options: [
      "In Part II overlapping areas must be counted only once (union), requiring dynamic interval union tracking",
      "In Part II square side lengths are negative",
      "Segment trees are required for all Hard problems",
      "Part II has higher precision requirements"
    ],
    hashtags: ["SeparateSquaresII", "LineSweep", "SegmentTree", "Geometry"],
    primaryTags: ["Line Sweep", "Segment Tree", "Geometry"],
    secondaryTags: ["Coordinate Compression", "Union Area", "Binary Search"]
  },
  {
    day: "15 January 2026",
    id: "2943",
    title: "Maximize Area of Square Hole in Grid",
    difficulty: "Medium",
    folder: "solutions/January/15-January/2943-Maximize-Area-of-Square-Hole-in-Grid",
    tech: "Sorting & Consecutive Sequence Detection",
    keyTopics: "Greedy & Sorting",
    p1: "We are given an n x m grid with removable horizontal and vertical bars (hBars and vBars). We want to find the maximum area of a square hole that can be formed by removing bars.",
    p2: "Removing k consecutive bars merges k + 1 grid cells, producing a gap of size k + 1. We sort hBars and vBars and find the longest sequence of consecutive integers in each. If the longest consecutive runs are maxH and maxV, the maximum square hole has side length min(maxH + 1, maxV + 1). The maximum area is side * side in O(H log H + V log V) time and O(1) space.",
    h1: "Removing k consecutive grid bars creates a gap span of k + 1 units",
    h2: "Sorts hBars and vBars to find maximum consecutive integer sequence",
    h3: "Square hole constraint requires taking the minimum of horizontal and vertical spans",
    h4: "Area is simply side * side",
    h5: "Handles non-consecutive bars cleanly by resetting consecutive counter to 1",
    h6: "Time Complexity: O(H log H + V log V) | Auxiliary Space Complexity: O(1)",
    patterns: ["Longest Consecutive Sequence", "Greedy Max Gap", "Sorting"],
    q: "If 3 consecutive grid bars are removed, what is the span of the resulting open gap?",
    options: [
      "4 units (k + 1 for k removed bars)",
      "3 units",
      "6 units",
      "2 units"
    ],
    hashtags: ["MaximizeAreaOfSquareHoleInGrid", "Greedy", "Sorting", "Array"],
    primaryTags: ["Greedy", "Sorting", "Array"],
    secondaryTags: ["Consecutive Runs", "Gap Maximization", "Square Constraints"]
  },
  {
    day: "16 January 2026",
    id: "2975",
    title: "Maximum Square Area by Removing Fences From a Field",
    difficulty: "Medium",
    folder: "solutions/January/16-January/2975-Maximum-Square-Area-by-Removing-Fences-From-a-Field",
    tech: "Hash Set & Pairwise Differences",
    keyTopics: "Hash Table & Math",
    p1: "We are given an m x n field with fences at rows hFences and columns vFences. We need to find the maximum area of a square field that can be formed by removing fences, modulo 1,000,000,007.",
    p2: "Add boundaries 1 and m to hFences, and 1 and n to vFences. Compute all pairwise differences between horizontal fence coordinates and store them in a HashSet. Then compute all pairwise differences between vertical fence coordinates, checking for presence in the set to find the maximum common gap L. If found, return (L * L) % (10^9 + 7), else -1 in O(H^2 + V^2) time and O(H^2) space.",
    h1: "Boundaries 1 and m (or n) must be appended to the fence arrays",
    h2: "All possible gap sizes are pairwise differences |fence[j] - fence[i]|",
    h3: "Hash set stores all horizontal gaps for O(1) membership testing",
    h4: "Finds the maximum gap L common to both horizontal and vertical sets",
    h5: "Computes (L * L) % (10^9 + 7) using 64-bit integer arithmetic",
    h6: "Time Complexity: O(H^2 + V^2) | Auxiliary Space Complexity: O(H^2)",
    patterns: ["Pairwise Differences", "Hash Set Intersection", "Modulo Arithmetic"],
    q: "Why do we include 1 and m/n in the fence coordinates?",
    options: [
      "Because the field boundaries themselves act as permanent outer fences",
      "Because the arrays must be 1-indexed",
      "To avoid zero-length fences",
      "Because fences can only be removed in pairs"
    ],
    hashtags: ["MaximumSquareAreaByRemovingFencesFromAField", "HashTable", "Math", "Geometry"],
    primaryTags: ["Hash Table", "Math", "Geometry"],
    secondaryTags: ["Pairwise Difference", "Set Intersection", "Square Construction"]
  },
  {
    day: "17 January 2026",
    id: "3047",
    title: "Find the Largest Area of Square Inside Two Rectangles",
    difficulty: "Medium",
    folder: "solutions/January/17-January/3047-Find-the-Largest-Area-of-Square-Inside-Two-Rectangles",
    tech: "Rectangle Intersection & Geometric Clamping",
    keyTopics: "Geometry & Array",
    p1: "We are given 2D arrays bottomLeft and topRight representing n axis-aligned rectangles. We must find the maximum area of a square that can fit inside the intersection of at least two rectangles.",
    p2: "We iterate over all pairs of rectangles (i, j) with 0 <= i < j < n. The intersection is [max(x1, x2), max(y1, y2)] to [min(X1, X2), min(Y1, Y2)]. If width = min(X1, X2) - max(x1, x2) > 0 and height = min(Y1, Y2) - max(y1, y2) > 0, the maximum square inside has side min(width, height). We track the maximum side and return maxSide * maxSide in O(N^2) time and O(1) space.",
    h1: "Tests all pairs of rectangles in O(N^2) given N <= 1000",
    h2: "2D intersection is computed by clamping coordinate intervals [max(low), min(high)]",
    h3: "Valid intersection requires both width > 0 and height > 0",
    h4: "Largest square inside rectangle has side length equal to min(width, height)",
    h5: "Area is computed with 64-bit integers to prevent overflow",
    h6: "Time Complexity: O(N^2) | Auxiliary Space Complexity: O(1)",
    patterns: ["Rectangle Intersection", "Pairwise Check", "Geometry"],
    q: "What defines the intersection coordinates of two axis-aligned rectangles [x1, y1, X1, Y1] and [x2, y2, X2, Y2]?",
    options: [
      "[max(x1, x2), max(y1, y2)] as bottom-left and [min(X1, X2), min(Y1, Y2)] as top-right",
      "[min(x1, x2), min(y1, y2)] as bottom-left and [max(X1, X2), max(Y1, Y2)] as top-right",
      "The average of the center points",
      "The bounding box enclosing both rectangles"
    ],
    hashtags: ["FindTheLargestAreaOfSquareInsideTwoRectangles", "Geometry", "Array", "Math"],
    primaryTags: ["Geometry", "Array", "Math"],
    secondaryTags: ["Axis-Aligned Rectangles", "Intersection", "Pairwise Comparison"]
  },
  {
    day: "18 January 2026",
    id: "1895",
    title: "Largest Magic Square",
    difficulty: "Medium",
    folder: "solutions/January/18-January/1895-Largest-Magic-Square",
    tech: "2D Prefix Sums & Diagonal Sums",
    keyTopics: "Matrix & Prefix Sum",
    p1: "A k x k magic square is a grid where all rows, columns, and both diagonals have the exact same sum. We need to find the side length k of the largest magic square that can be found within an m x n grid.",
    p2: "We precompute 2D row prefix sums, column prefix sums, and diagonal/anti-diagonal prefix sums in O(M * N). Then, we iterate potential side lengths k from min(m, n) down to 2. For each top-left position (r, c), we check if all k rows, k columns, and both diagonals have identical sum using our precomputed sums in O(k) time, immediately returning the first valid k in O(M * N * min(M, N)) time and O(M * N) space.",
    h1: "2D prefix sums allow O(1) query of any row, column, and diagonal segment",
    h2: "Searches side lengths in descending order to return immediately upon finding max k",
    h3: "Every 1x1 subgrid is trivially a magic square (base answer is 1)",
    h4: "Diagonal prefix arrays d1[r][c] and d2[r][c] simplify diagonal checks",
    h5: "Early break on row/column mismatch avoids redundant diagonal checks",
    h6: "Time Complexity: O(M * N * min(M, N)) | Auxiliary Space Complexity: O(M * N)",
    patterns: ["2D Prefix Sums", "Diagonal Precomputation", "Descending Search"],
    q: "Why is searching side length k in descending order optimal for Largest Magic Square?",
    options: [
      "The first valid k found is guaranteed to be the maximum possible side length",
      "Because prefix sums only support descending queries",
      "Because magic squares must have odd side lengths",
      "It reduces memory consumption to zero"
    ],
    hashtags: ["LargestMagicSquare", "Matrix", "PrefixSum", "Array"],
    primaryTags: ["Matrix", "Prefix Sum", "Array"],
    secondaryTags: ["Diagonal Sums", "Grid Traversal", "Brute Force Optimization"]
  },
  {
    day: "19 January 2026",
    id: "1292",
    title: "Maximum Side Length of a Square with Sum Less than or Equal to Threshold",
    difficulty: "Medium",
    folder: "solutions/January/19-January/1292-Maximum-Side-Length-of-a-Square-with-Sum-Less-than-or-Equal-to-Threshold",
    tech: "2D Prefix Sum & Sliding Window / Binary Search",
    keyTopics: "Matrix & Binary Search",
    p1: "We are given an m x n matrix of non-negative integers and an integer threshold. We need to find the maximum side-length of a square whose sum of elements is less than or equal to threshold, or return 0 if no such square exists.",
    p2: "We precompute the 2D prefix sum array pref[r][c] in O(M * N). Then, as we traverse each cell (r, c), we maintain a greedy side length ans. If a square of size ans + 1 rooted at (r, c) has sum <= threshold, we increment ans = ans + 1. Since ans only increases, this achieves an optimal O(M * N) time with O(M * N) space.",
    h1: "2D Prefix Sum enables O(1) query of any square subgrid sum",
    h2: "Non-negative elements ensure square sum is monotonically increasing with side length",
    h3: "Greedy expansion only tests if a square of side ans + 1 is valid",
    h4: "Eliminates binary search overhead, reducing complexity to strict O(M * N)",
    h5: "Base return of 0 handled cleanly when no 1x1 cell satisfies the threshold",
    h6: "Time Complexity: O(M * N) | Auxiliary Space Complexity: O(M * N)",
    patterns: ["2D Prefix Sum", "Greedy Expansion", "Monotonic Subgrid Sum"],
    q: "Why can the side length ans only increase during the grid traversal?",
    options: [
      "Because we only seek the maximum side length; a smaller or equal size cannot improve the best answer",
      "Because the matrix values are strictly sorted",
      "Because prefix sums are irreversible",
      "Because square sums decrease when expanding"
    ],
    hashtags: ["MaximumSideLengthOfASquareWithSumLessThanOrEqualToThreshold", "Matrix", "PrefixSum", "BinarySearch"],
    primaryTags: ["Matrix", "Binary Search", "Prefix Sum"],
    secondaryTags: ["2D Prefix Sum", "Greedy Expansion", "Subgrid Queries"]
  },
  {
    day: "20 January 2026",
    id: "3314",
    title: "Construct the Minimum Bitwise Array I",
    difficulty: "Easy",
    folder: "solutions/January/20-January/3314-Construct-the-Minimum-Bitwise-Array-I",
    tech: "Bit Manipulation & Prime Analysis",
    keyTopics: "Bit Manipulation & Array",
    p1: "We are given an array of prime numbers nums. For each nums[i], we need to find the minimum value ans[i] such that ans[i] OR (ans[i] + 1) == nums[i]. If no such value exists, ans[i] = -1.",
    p2: "The operation x OR (x + 1) sets the lowest 0-bit of x to 1. Thus, for any target prime p, p must be odd (since p must have its 0-th bit set). For p = 2, no solution exists (returns -1). For odd primes, p has a trailing block of 1s in binary (e.g. ...0111). Clearing the lowest 1-bit of this block that was set by the +1 operation (i.e. changing the lowest set bit before the trailing ones block) yields the minimal x in O(N) time and O(1) space.",
    h1: "The operation x OR (x + 1) always sets the lowest zero bit in x",
    h2: "The result is always odd; therefore, the even prime 2 has no solution (-1)",
    h3: "For odd primes, clearing the highest bit of the trailing 1s cluster yields minimum x",
    h4: "Formula: x = p - (lowest_zero_bit(p) >> 1)",
    h5: "Bitwise formula runs in O(1) time per element with no iterative guessing",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Bit Manipulation", "Trailing Ones", "Prime Properties"],
    q: "Why does nums[i] = 2 yield -1 in Construct the Minimum Bitwise Array?",
    options: [
      "Because x OR (x + 1) is always odd for any non-negative integer x, and 2 is even",
      "Because 2 is not considered a valid prime in LeetCode",
      "Because x cannot be 0",
      "Because bitwise OR with 1 always results in 0"
    ],
    hashtags: ["ConstructTheMinimumBitwiseArrayI", "BitManipulation", "Array", "Math"],
    primaryTags: ["Bit Manipulation", "Array", "Math"],
    secondaryTags: ["Lowbit Operations", "Trailing Ones", "Bitwise OR"]
  },
  {
    day: "21 January 2026",
    id: "3315",
    title: "Construct the Minimum Bitwise Array II",
    difficulty: "Medium",
    folder: "solutions/January/21-January/3315-Construct-the-Minimum-Bitwise-Array-II",
    tech: "Bit Manipulation & Lowbit Inversion",
    keyTopics: "Bit Manipulation & Array",
    p1: "We are given an array of prime numbers nums with values up to 10^9. For each nums[i], we need to find the minimum value ans[i] such that ans[i] OR (ans[i] + 1) == nums[i], or -1 if impossible.",
    p2: "With nums[i] up to 10^9, a brute-force search is impossible. Observing x OR (x + 1) = p, x is formed by turning off the most significant 1 among the trailing 1s of p. The position of the lowest 0 in p is given by (~p & (p + 1)). Shifting this bit right by 1 gives the exact bit to clear from p: ans[i] = p ^ ((~p & (p + 1)) >> 1). If p == 2, ans[i] = -1. This computes the answer in O(1) time per query in O(N) total time and O(1) space.",
    h1: "Identical mathematical invariant scaled to 10^9 constraint",
    h2: "Even numbers cannot be formed by x OR (x + 1), so p == 2 returns -1",
    h3: "Lowest zero-bit of p is isolated via formula: (~p & (p + 1))",
    h4: "Right shifting that isolated bit by 1 identifies the exact bit to flip off in p",
    h5: "Closed-form O(1) bitwise formula executes in sub-microsecond time",
    h6: "Time Complexity: O(N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Bit Masking", "Lowbit Isolation", "Closed Form Evaluation"],
    q: "Which bitwise expression isolates the lowest 0-bit in an integer p?",
    options: [
      "~p & (p + 1)",
      "p & -p",
      "p ^ (p - 1)",
      "p | (p + 1)"
    ],
    hashtags: ["ConstructTheMinimumBitwiseArrayII", "BitManipulation", "Array", "Math"],
    primaryTags: ["Bit Manipulation", "Array", "Math"],
    secondaryTags: ["Lowbit Masking", "Bit Inversion", "O(1) Evaluation"]
  },
  {
    day: "22 January 2026",
    id: "3507",
    title: "Minimum Pair Removal to Sort Array I",
    difficulty: "Easy",
    folder: "solutions/January/22-January/3507-Minimum-Pair-Removal-to-Sort-Array-I",
    tech: "Greedy Simulation & Array Compaction",
    keyTopics: "Array & Simulation",
    p1: "We are given an array nums. In one operation, we find adjacent pairs (nums[i], nums[i+1]) with the minimum sum, and replace them with their sum. We repeat this until the array is non-decreasing and return the number of operations performed.",
    p2: "With array length up to 50, we can directly simulate the operation. In each round, we check if the array is already sorted. If not, we find the adjacent pair with the minimum sum (breaking ties by earliest index), merge them into their sum, compact the array, and increment our operation count, running in O(N^2) time and O(N) space.",
    h1: "Direct simulation is ideal for constraints N <= 50",
    h2: "Checks non-decreasing condition before each operation for early termination",
    h3: "Scans adjacent pairs to find the global minimum adjacent sum",
    h4: "Tie-breaking preserves the first occurrence of the minimum adjacent sum",
    h5: "Merges the pair in-place and shrinks array length by 1 each step",
    h6: "Time Complexity: O(N^2) | Auxiliary Space Complexity: O(N)",
    patterns: ["Greedy Simulation", "Array Compaction", "Adjacent Sum Merging"],
    q: "How many operations at most can be performed on an array of length N in this problem?",
    options: [
      "At most N - 1 operations, since each operation reduces array length by 1",
      "N^2 operations",
      "Infinite operations if numbers cycle",
      "At most 2 operations"
    ],
    hashtags: ["MinimumPairRemovalToSortArrayI", "Array", "Simulation", "Greedy"],
    primaryTags: ["Array", "Simulation", "Greedy"],
    secondaryTags: ["Pair Merging", "Adjacent Scan", "In-Place Compaction"]
  },
  {
    day: "23 January 2026",
    id: "3510",
    title: "Minimum Pair Removal to Sort Array II",
    difficulty: "Hard",
    folder: "solutions/January/23-January/3510-Minimum-Pair-Removal-to-Sort-Array-II",
    tech: "Min-Heap + Doubly Linked List",
    keyTopics: "Heap (Priority Queue) & Linked List",
    p1: "We are given an array nums with length up to 10^5. In each operation, the adjacent pair with the minimum sum is replaced by their sum. We must find the minimum operations to make the array non-decreasing.",
    p2: "With N up to 10^5, O(N^2) simulation times out. We represent the array as a Doubly Linked List and maintain adjacent pair sums in a Min-Heap. We track inverted pairs (where node.val > node.next.val). In each step, we extract the valid minimum sum pair from the heap, merge them, update DLL neighbors, and maintain the inversion count until inversions drop to 0 in O(N log N) time and O(N) space.",
    h1: "Doubly Linked List allows O(1) node deletion and neighbor relinking",
    h2: "Min-Heap priority queue retrieves minimum adjacent sum in O(log N) time",
    h3: "Version tag / validation check discards stale heap entries lazily",
    h4: "Maintains an active inversion counter to stop as soon as the list is sorted",
    h5: "64-bit integer values prevent overflow during repeated pair additions",
    h6: "Time Complexity: O(N log N) | Auxiliary Space Complexity: O(N)",
    patterns: ["Min-Heap Optimization", "Doubly Linked List", "Inversion Counting"],
    q: "Why is tracking an inversion counter better than checking the whole list each step?",
    options: [
      "Updating the counter takes O(1) during node merge, avoiding an O(N) list scan per step",
      "Because heaps cannot store linked list pointers",
      "Because inversions cannot be determined from values",
      "To prevent stack overflow"
    ],
    hashtags: ["MinimumPairRemovalToSortArrayII", "Heap", "LinkedList", "DoublyLinkedList"],
    primaryTags: ["Heap (Priority Queue)", "Linked List", "Greedy"],
    secondaryTags: ["Doubly Linked List", "Lazy Deletion", "Inversion Tracking"]
  },
  {
    day: "24 January 2026",
    id: "1877",
    title: "Minimize Maximum Pair Sum in Array",
    difficulty: "Medium",
    folder: "solutions/January/24-January/1877-Minimize-Maximum-Pair-Sum-in-Array",
    tech: "Sorting & Two Pointers",
    keyTopics: "Greedy & Two Pointers",
    p1: "We are given an array nums of even length n. We must pair up the elements into n / 2 pairs such that the maximum pair sum is minimized.",
    p2: "By the rearrangement inequality, pairing the smallest remaining element with the largest remaining element balances pair sums and minimizes the maximum sum. We sort the array and use two pointers (left at 0, right at n - 1), moving inward and taking max(nums[left] + nums[right]) across all pairs in O(N log N) time and O(1) auxiliary space.",
    h1: "Greedy pairing matches smallest element with largest element",
    h2: "Rearrangement inequality proves this minimax strategy is globally optimal",
    h3: "Two pointers converge from opposite ends of the sorted array",
    h4: "Single pass computes the maximum pair sum in O(N) after sorting",
    h5: "Zero auxiliary memory overhead beyond in-place sorting",
    h6: "Time Complexity: O(N log N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Greedy Pairing", "Two Pointers", "Sorting"],
    q: "Why does pairing nums[i] with nums[n - 1 - i] minimize the maximum pair sum?",
    options: [
      "Because offsetting the largest values with the smallest values prevents extreme spikes in sum",
      "Because the sum of all elements becomes smaller",
      "Because array sorting reverses the numbers",
      "Because it guarantees all pairs have identical sums"
    ],
    hashtags: ["MinimizeMaximumPairSumInArray", "Greedy", "TwoPointers", "Sorting"],
    primaryTags: ["Greedy", "Two Pointers", "Sorting"],
    secondaryTags: ["Minimax", "Pair Matching", "Array Balancing"]
  },
  {
    day: "25 January 2026",
    id: "1984",
    title: "Minimum Difference Between Highest and Lowest of K Scores",
    difficulty: "Easy",
    folder: "solutions/January/25-January/1984-Minimum-Difference-Between-Highest-and-Lowest-of-K-Scores",
    tech: "Sorting & Fixed Sliding Window",
    keyTopics: "Array & Sliding Window",
    p1: "We are given a 0-indexed integer array nums and an integer k. We must choose any k scores from the array such that the difference between the highest and lowest of the k scores is minimized.",
    p2: "If k == 1, the difference is trivially 0. For k > 1, the optimal k elements will always appear contiguously in the sorted version of nums. We sort nums and slide a fixed window of size k across the array, evaluating nums[i + k - 1] - nums[i] and taking the minimum in O(N log N) time and O(1) space.",
    h1: "Sorting clusters closest values contiguously",
    h2: "Optimal k elements always form a contiguous subarray of length k in sorted order",
    h3: "Fixed window of size k evaluates nums[i + k - 1] - nums[i] in O(1) time",
    h4: "Edge case k == 1 immediately returns 0",
    h5: "Minimal difference is updated in a single linear scan over sorted elements",
    h6: "Time Complexity: O(N log N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Sorting", "Fixed Sliding Window", "Contiguous Subarray Clustering"],
    q: "Why must the k chosen elements be contiguous in the sorted array?",
    options: [
      "Because picking any non-contiguous element would strictly increase or maintain the span between min and max",
      "Because sliding windows only operate on sorted arrays",
      "Because k elements cannot be rearranged",
      "Because nums only contains positive integers"
    ],
    hashtags: ["MinimumDifferenceBetweenHighestAndLowestOfKScores", "Array", "SlidingWindow", "Sorting"],
    primaryTags: ["Array", "Sliding Window", "Sorting"],
    secondaryTags: ["Fixed Window", "Min-Max Gap", "Greedy"]
  },
  {
    day: "26 January 2026",
    id: "1200",
    title: "Minimum Absolute Difference",
    difficulty: "Easy",
    folder: "solutions/January/26-January/1200-Minimum-Absolute-Difference",
    tech: "Sorting & Single Pass Scan",
    keyTopics: "Array & Sorting",
    p1: "We are given an array of distinct integers arr. We need to find all pairs of elements with the minimum absolute difference of any two elements, returning them in ascending order.",
    p2: "In a sorted array, the minimum absolute difference must occur between two adjacent elements. We sort the array, scan adjacent elements to find the global minimum difference, and in a second pass (or single dynamic pass) collect all adjacent pairs whose difference matches this minimum in O(N log N) time and O(N) space for the result.",
    h1: "Sorting guarantees that the minimum absolute difference occurs between adjacent elements",
    h2: "Eliminates O(N^2) all-pairs checks down to O(N) adjacent checks",
    h3: "Single pass dynamically tracks and collects pairs matching the running minimum",
    h4: "Pairs are naturally generated in ascending sorted order",
    h5: "Handles negative and positive integers uniformly without edge-case branching",
    h6: "Time Complexity: O(N log N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Adjacent Pair Difference", "Sorting", "Linear Scan"],
    q: "Why can non-adjacent elements in a sorted array be ignored when finding the minimum difference?",
    options: [
      "Because if a < b < c, then c - a is strictly greater than both b - a and c - b",
      "Because arrays must have unique positive values",
      "Because non-adjacent elements have negative differences",
      "Because two pointers can only inspect neighbors"
    ],
    hashtags: ["MinimumAbsoluteDifference", "Array", "Sorting", "TwoPointers"],
    primaryTags: ["Array", "Sorting"],
    secondaryTags: ["Adjacent Difference", "Min Gap", "Linear Scan"]
  },
  {
    day: "27 January 2026",
    id: "3650",
    title: "Minimum Cost Path with Edge Reversals",
    difficulty: "Medium",
    folder: "solutions/January/27-January/3650-Minimum-Cost-Path-with-Edge-Reversals",
    tech: "Augmented Graph & Dijkstra's Algorithm",
    keyTopics: "Graph & Shortest Path",
    p1: "We are given a directed weighted graph with n nodes. At each node, a switch can be activated at most once to reverse an incoming edge into an outgoing edge at double its weight. We must find the minimum cost to travel from node 0 to node n - 1.",
    p2: "Because all edge weights are strictly positive, any shortest path is simple and visits each node at most once, meaning the 'at most once' switch constraint is naturally satisfied. We construct an augmented graph adding a reverse edge v -> u with weight 2 * w for each original edge u -> v with weight w, and run standard Dijkstra from 0 to n - 1 in O((V + E) log V) time and O(V + E) space.",
    h1: "Augmented graph adds virtual reverse edges with double cost (2 * w)",
    h2: "Strictly positive weights ensure optimal shortest paths are simple (no node visited twice)",
    h3: "Switch-at-most-once constraint is satisfied without complex bitmasks or multi-dimensional states",
    h4: "Min-heap PriorityQueue Dijkstra guarantees minimal cost exploration",
    h5: "Returns -1 gracefully if target node n - 1 is unreachable",
    h6: "Time Complexity: O((V + E) log V) | Auxiliary Space Complexity: O(V + E)",
    patterns: ["Augmented Graph", "Dijkstra's Algorithm", "Edge Reversals"],
    q: "Why does adding reverse edges with weight 2 * w not violate the 'at most once per node' switch constraint?",
    options: [
      "All edge weights are strictly positive, guaranteeing that shortest paths are simple and visit each node at most once",
      "Dijkstra tracks a bitmask of used switches",
      "Reverse edges are only traversed on the first step",
      "The switch resets on cycle detection"
    ],
    hashtags: ["MinimumCostPathWithEdgeReversals", "Graph", "ShortestPath", "Dijkstra"],
    primaryTags: ["Graph", "Shortest Path", "Heap (Priority Queue)"],
    secondaryTags: ["Dijkstra's Algorithm", "Augmented Graph", "Edge Reversals"]
  },
  {
    day: "28 January 2026",
    id: "3651",
    title: "Minimum Cost Path with Teleportations",
    difficulty: "Hard",
    folder: "solutions/January/28-January/3651-Minimum-Cost-Path-with-Teleportations",
    tech: "Layered Dynamic Programming & Suffix Minimum Optimization",
    keyTopics: "Dynamic Programming & Matrix",
    p1: "We are given an m x n grid and integer k. Moving right or down costs the destination cell value. We can also teleport up to k times from any cell (i, j) to any (x, y) with grid[x][y] <= grid[i][j] at cost 0. We need the minimum cost from (0, 0) to (m - 1, n - 1).",
    p2: "Normal moves form a DAG where DP computes optimal paths in O(m * n). Because teleportation condition is transitive, consecutive teleports can be combined into one. We run layered DP across t in [0, k]: in each round, teleport transitions depend on min cost among cells with grid value >= current, computed in O(maxVal) via suffix minimums, followed by DAG relaxation in O(m * n), achieving O(k * (m * n + maxVal)) time.",
    h1: "Normal moves proceed right and down, forming a cycle-free DAG",
    h2: "Teleportation is transitive: multiple consecutive teleports collapse into a single jump",
    h3: "Layered DP decouples teleportation budget into k rounds",
    h4: "Suffix minimum array over grid values eliminates O(m * n) inner search",
    h5: "Starting at (0, 0) incurs 0 cost initially",
    h6: "Time Complexity: O(k * (m * n + maxVal)) | Auxiliary Space Complexity: O(m * n + maxVal)",
    patterns: ["Layered DP", "Suffix Minimum Optimization", "DAG Relaxation"],
    q: "Why can two consecutive teleportations without intermediate normal moves always be replaced by a single teleportation?",
    options: [
      "The condition grid[x][y] <= grid[i][j] is transitive, so a direct jump to the second target is already valid",
      "The teleport counter resets after every second move",
      "Teleportation cost increases exponentially",
      "Teleporting twice causes an infinite DP loop"
    ],
    hashtags: ["MinimumCostPathWithTeleportations", "DynamicProgramming", "Matrix", "Array"],
    primaryTags: ["Array", "Dynamic Programming", "Matrix"],
    secondaryTags: ["Suffix Minimum Optimization", "Layered DP", "DAG Relaxation"]
  },
  {
    day: "29 January 2026",
    id: "2976",
    title: "Minimum Cost to Convert String I",
    difficulty: "Medium",
    folder: "solutions/January/29-January/2976-Minimum-Cost-to-Convert-String-I",
    tech: "Floyd-Warshall All-Pairs Shortest Path",
    keyTopics: "Graph & Shortest Path",
    p1: "We are given two strings source and target, along with character replacement rules and their costs. We must return the minimum cost to convert source to target, or -1 if impossible.",
    p2: "Because character positions transform independently, the problem reduces to all-pairs shortest paths on a directed graph with 26 vertices ('a' to 'z'). Floyd-Warshall runs in O(26^3) = 17,576 operations, taking min for duplicate rules. We then scan the strings in O(N), summing transformation costs into a 64-bit integer in O(|Sigma|^3 + |E| + N) time and O(|Sigma|^2) space.",
    h1: "Character conversions are independent across string positions",
    h2: "Small alphabet size (|Sigma| = 26) makes all-pairs shortest path optimal",
    h3: "Floyd-Warshall precomputes shortest paths between all 26 letters in O(26^3)",
    h4: "Handles multi-hop conversions and duplicate transformation rules cleanly",
    h5: "Uses 64-bit long accumulator to avoid integer overflow",
    h6: "Time Complexity: O(|Sigma|^3 + |E| + N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Floyd-Warshall", "All-Pairs Shortest Path", "Independent Transitions"],
    q: "Why is Floyd-Warshall preferred over running Dijkstra 26 times for LeetCode 2976?",
    options: [
      "With only 26 vertices, Floyd-Warshall takes only 26^3 = 17,576 operations with simpler implementation and zero priority queue overhead",
      "Dijkstra cannot handle directed graphs",
      "Floyd-Warshall works only when negative cycles exist",
      "Dijkstra requires O(N) space where N is the length of the string"
    ],
    hashtags: ["MinimumCostToConvertStringI", "Graph", "ShortestPath", "FloydWarshall"],
    primaryTags: ["Graph", "Shortest Path", "Array", "String"],
    secondaryTags: ["Floyd-Warshall Algorithm", "All-Pairs Shortest Path", "Matrix Representation"]
  },
  {
    day: "30 January 2026",
    id: "2977",
    title: "Minimum Cost to Convert String II",
    difficulty: "Hard",
    folder: "solutions/January/30-January/2977-Minimum-Cost-to-Convert-String-II",
    tech: "Floyd-Warshall & 1D Dynamic Programming",
    keyTopics: "Graph & Dynamic Programming",
    p1: "We are given strings source and target, and substring replacement rules. Chosen operations must have either disjoint or identical index ranges. We need the minimum cost to convert source to target, or -1 if impossible.",
    p2: "Identical-index operations chain together as shortest paths on identical intervals, while disjoint operations partition the string into non-overlapping segments. We map unique substring tokens (V <= 200) to IDs, run Floyd-Warshall to compute all-pairs shortest paths, and use 1D DP across string positions checking single-character matches and transitions matching distinct rule lengths in O(V^3 + N * |lengths| * L_max) time.",
    h1: "Any pair of operations must have either disjoint or identical index ranges",
    h2: "Substring conversions chain together as shortest paths on identical intervals",
    h3: "Graph has at most 200 unique vertices, making Floyd-Warshall optimal",
    h4: "Sparsity check prunes unreachable nodes in Floyd-Warshall for rapid execution",
    h5: "1D Dynamic Programming tests only distinct lengths present in the input rules",
    h6: "Time Complexity: O(V^3 + N * |lengths| * L_max) | Auxiliary Space Complexity: O(V^2 + N)",
    patterns: ["Floyd-Warshall on Substring Tokens", "1D DP Interval Partitioning", "Disjoint Interval DP"],
    q: "Why does the constraint 'operations must be either disjoint or identical' enable a 1D DP solution?",
    options: [
      "It prevents partially overlapping interval dependencies, guaranteeing that every segment of the string can be partitioned and transformed independently",
      "It ensures characters can only be deleted and never inserted",
      "It forces the string length to be a multiple of the substring length",
      "It guarantees that all edge weights in the graph are 1"
    ],
    hashtags: ["MinimumCostToConvertStringII", "Graph", "ShortestPath", "DynamicProgramming"],
    primaryTags: ["Graph", "Shortest Path", "Dynamic Programming", "String"],
    secondaryTags: ["Floyd-Warshall Algorithm", "All-Pairs Shortest Path", "1D Dynamic Programming", "Interval Partitioning"]
  },
  {
    day: "31 January 2026",
    id: "744",
    title: "Find Smallest Letter Greater Than Target",
    difficulty: "Easy",
    folder: "solutions/January/31-January/744-Find-Smallest-Letter-Greater-Than-Target",
    tech: "Binary Search Upper Bound",
    keyTopics: "Binary Search & Array",
    p1: "We are given a non-decreasing sorted character array letters and a target character. We must find the smallest character in letters that is lexicographically greater than target, wrapping around to letters[0] if none exists.",
    p2: "Because letters is sorted, we perform an upper bound binary search in O(log N) time. If letters[mid] <= target, we move right (left = mid + 1); otherwise right = mid. Upon termination, returning letters[left % letters.length] seamlessly handles the wrap-around case to letters[0] in O(log N) time and O(1) space.",
    h1: "Given array is already sorted in non-decreasing order",
    h2: "Problem directly translates to an Upper Bound binary search",
    h3: "Eliminates linear search overhead by halving search space in O(log N)",
    h4: "Gracefully handles duplicate characters in the sorted array",
    h5: "Modulo arithmetic (left % n) effortlessly implements wrap-around",
    h6: "Time Complexity: O(log N) | Auxiliary Space Complexity: O(1)",
    patterns: ["Binary Search", "Upper Bound", "Modulo Wrap-Around"],
    q: "Why does letters[left % letters.length] correctly handle the wrap-around condition when no character is strictly greater than target?",
    options: [
      "When no element is greater, left equals letters.length, and letters.length % letters.length evaluates to 0, returning letters[0]",
      "The modulo operator returns the median element when left equals n",
      "Binary search forces left to be -1 when target is not found",
      "Modulo arithmetic reverses the sorted character array"
    ],
    hashtags: ["FindSmallestLetterGreaterThanTarget", "BinarySearch", "Array", "UpperBound"],
    primaryTags: ["Array", "Binary Search"],
    secondaryTags: ["Upper Bound", "Two Pointers", "Sorted Array"]
  }
];

function generateMarkdown(p) {
  const camelCase = p.title.replace(/[^a-zA-Z0-9]/g, '');
  const dayNum = p.day.split(' ')[0];
  
  return `## 📅 ${p.day} — LeetCode ${p.id}: ${p.title} (${p.difficulty})

### 1️⃣ Direct GitHub Links
- 📂 **Problem Folder & Detailed Documentation:** https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/tree/main/${p.folder}
- ☕ **Java Solution:** https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/Solution.java
- 🐍 **Python Solution:** https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.py
- ⚡ **C++ Solution:** https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.cpp
- 🌐 **JavaScript Solution:** https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.js

### 2️⃣ YouTube Video Title (NO EMOJIS)
\`\`\`text
LeetCode ${p.id} | ${p.title} | Java | ${p.difficulty} | ${p.tech} | CodeByTushu
\`\`\`

### 3️⃣ YouTube Video Description
\`\`\`text
🚀 Welcome Back to CodeByTushu!

In today’s video, we solve LeetCode ${p.id} — ${p.title} using ${p.keyTopics} in Java.

${p.p1}

${p.p2}

🔥 Problem Highlights

✅ ${p.h1}
✅ ${p.h2}
✅ ${p.h3}
✅ ${p.h4}
✅ ${p.h5}
✅ ${p.h6}

⏱️ TIMESTAMPS

00:00 Introduction
00:50 CodeByTush & GitHub Information 
01:12 Problem Understanding
01:48 Observation
02:32 Approach
03:15 Start Java Code
04:15 Run & Dry Run
04:34 All Cases
04:49 Time Complexity
05:06 Space Complexity
05:20 Final Summary

📂 Problem Folder & Detailed Documentation:
https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/tree/main/${p.folder}

☕ Java Solution:
https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/Solution.java

🐍 Python Solution:
https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.py

⚡ C++ Solution:
https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.cpp

🌐 JavaScript Solution:
https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions/blob/main/${p.folder}/solution.js

🔗 LeetCode Source Code

📌 Admin type the link 

🌐 All LeetCode Solutions

📌 https://codebytushu.com/Leetcode/

📱 Join CodeByTushu on WhatsApp

Get coding updates, LeetCode solutions, daily questions and more.

https://whatsapp.com/channel/0029Vb8k5mCDeON2Xwlkxe40

❤️ Donate

📌 https://codebytushu.com/Leetcode/donate.php

🔥 Perfect For

LeetCode ${p.difficulty} Problems
Java DSA Preparation
${p.patterns.map(pat => pat).join('\n')}
Time Complexity Optimization
Coding Interview Preparation
Problem Solving

🌐 Follow CodeByTushu

▶️ YouTube: https://www.youtube.com/@codebytushu

📸 Instagram: https://instagram.com/codebytushu/

💼 LinkedIn: https://www.linkedin.com/company/codebytushu/

🌍 Website: https://codebytushu.com

🐙 GitHub: https://github.com/CodeByTushu

❤️ Don’t Forget To

👍 Like | 💬 Comment | 🔔 Subscribe

💬 Question of the Day

${p.q}

1️⃣ ${p.options[0]}
2️⃣ ${p.options[1]}
3️⃣ ${p.options[2]}
4️⃣ ${p.options[3]}

#LeetCode${p.id} #LeetCode #${camelCase} #Java #JavaDSA ${p.hashtags.map(t => '#' + t).join(' ')} #DSA #CodingInterview #ProblemSolving #LeetCode${p.difficulty} #DailyLeetCode #JavaProgramming #CodeByTushu

👇 Comment the answer below! 🔥
\`\`\`

### 4️⃣ Relevant Tags (CodeByTushu Admin Platform)
- **Primary Tags:** ${p.primaryTags.map(t => '`' + t + '`').join(', ')}
- **Secondary / Supporting Tags:** ${p.secondaryTags.map(t => '`' + t + '`').join(', ')}

---
`;
}

let fullMarkdown = `# CodeByTushu — January 2026 Complete YouTube Deliverables (Days 01 – 31) ❄️

This document contains the complete, production-grade YouTube Titles, YouTube Video Descriptions, Direct GitHub Solution Links (Java, Python, C++, JavaScript), Problem Documentation Links, and CodeByTushu Admin Tags for all **31 daily problems** of January 2026.

---

`;

janData.forEach(p => {
  fullMarkdown += generateMarkdown(p) + '\n';
});

fs.writeFileSync('solutions/January/YOUTUBE_DELIVERABLES.md', fullMarkdown, 'utf8');
console.log('Successfully written solutions/January/YOUTUBE_DELIVERABLES.md with', janData.length, 'days!');
