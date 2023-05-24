const WIN_CASES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

export function checkWin(board){

    let win = false;
    let winner = null;

    WIN_CASES.forEach(([x, y, z]) => {

        if(!board[x] || !board[y] || !board[z]) return;

        if(board[x] === board[y] && board[y] === board[z]){

            win = true;
            winner = board[x];
        }
    });

    return {win, winner}
}