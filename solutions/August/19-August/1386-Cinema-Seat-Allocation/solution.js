/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const rowMask = new Map();

    for (let i = 0; i < reservedSeats.length; i++) {
        const [row, seat] = reservedSeats[i];
        rowMask.set(row, (rowMask.get(row) || 0) | (1 << seat));
    }

    const leftBlock = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);  // seats 2,3,4,5
    const midBlock = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);   // seats 4,5,6,7
    const rightBlock = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9); // seats 6,7,8,9

    let total = 0;

    for (const mask of rowMask.values()) {
        if ((mask & leftBlock) === 0 && (mask & rightBlock) === 0) {
            total += 2;
        } else if ((mask & leftBlock) === 0 || (mask & midBlock) === 0 || (mask & rightBlock) === 0) {
            total += 1;
        }
    }

    const emptyRows = n - rowMask.size;
    total += emptyRows * 2;

    return total;
};
