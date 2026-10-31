/**
 * Problem: LeetCode 657 - Robot Return to Origin
 * Language: JavaScript (Node.js)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 * 
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < moves.length; i++) {
        const move = moves.charAt(i);
        if (move === 'U') {
            y++;
        } else if (move === 'D') {
            y--;
        } else if (move === 'R') {
            x++;
        } else if (move === 'L') {
            x--;
        }
    }

    return x === 0 && y === 0;
};
