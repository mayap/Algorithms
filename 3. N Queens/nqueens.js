process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

console.log("Please enter a number:");

process.stdin.on('data', function (data) {
    main(data);
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function generateBoard(number) {
    let board = [];

    for (let i = 0; i < number; i++) {
        board[i] = [];

        for (let j = 0; j < number; j++) {
            board[i][j] = '_';
        }
    }

    return board;
}

function generateRandomNumber(number) {
    return Math.round(Math.random() * (number - 1) + 0);
}

function placeQueens(board, number) {
    for (let j = 0; j < number; j++) {
        var conflicts = [];
        for (let i = 0; i < number; i++) {
            conflicts.push({
                position: {
                    x: i,
                    y: j
                },
                conflicts: findConflictsForQueen({x: i, y: j}, board)
            });
        }
        let minConflicts = Math.min(...conflicts.map(el => el.conflicts));
        let possiblePlaces = conflicts.filter(conf => conf.conflicts == minConflicts);
        
        let pos = possiblePlaces[generateRandomNumber(possiblePlaces.length)];

        board[pos.position.x][pos.position.y] = '*';
    }
    
    return board;
}

function placeQueensRandomly(board, number) {
    for (let i = 0; i < number; i++) {
        let pos = generateRandomNumber(number);

        board[pos][i] = '*';
    }

    return board;
}

function findHorizontalConflicts(position, board) {
    let count = 0;

    for (let i = 0; i < board.length; i++) {
        if (position.x === i) {
            for (let j = 0; j < board.length; j++) {
                if (j !== position.y && board[i][j] === '*') {
                    ++count;
                }
            }
        }
    }

    return count;
}

function findVerticalConflicts(position, board) {
    let count = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (position.y === j && i !== position.x && board[i][j] === '*') {
                ++count;
            }
        }
    }

    return count;
}

function findDiagonalConflictsRecursion(position, board, incrementXBy, incrementYBy) {
    var newX = position.x + incrementXBy;
    var newY = position.y + incrementYBy;
    var conflicts = 0;

    if (board[newX] && board[newX][newY] !== undefined) {
        if (board[newX][newY] == '*') {
            conflicts++;
        }

        conflicts += findDiagonalConflictsRecursion({ x: newX, y: newY }, board, incrementXBy, incrementYBy);
    }

    return conflicts;
}

function findDiagonalConflicts(position, board) {
    var conflicts = findDiagonalConflictsRecursion(position, board, 1, 1) + 
                    findDiagonalConflictsRecursion(position, board, 1, -1) + 
                    findDiagonalConflictsRecursion(position, board, -1, -1) + 
                    findDiagonalConflictsRecursion(position, board, -1, 1);

    return conflicts;
}

function findConflictsForQueen(queenPos, board) {
    let countOfConflicts = 0;

    countOfConflicts = findHorizontalConflicts(queenPos, board) + 
                        findVerticalConflicts(queenPos, board) + 
                        findDiagonalConflicts(queenPos, board);

    return countOfConflicts;
}

function findQueensWithMostConflicts(board) {
    let conflictsNumArray = [];
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === '*') {
                conflictsNumArray.push([{conflicts: findConflictsForQueen({ x: i, y: j }, board)}, { x: i, y: j }]);
            }
        }
    }

    let mostConflicts = Math.max(...conflictsNumArray.map(el => el[0].conflicts));

    return conflictsNumArray.filter(el => (el[0].conflicts === mostConflicts && mostConflicts > 0));
}

function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

function swapElements(board, queen, newPosition) {
    let currentBoard = clone(board);
    let oldPosition = queen[1];

    let temp = currentBoard[newPosition.x][newPosition.y];
    currentBoard[newPosition.x][newPosition.y] = currentBoard[oldPosition.x][oldPosition.y];
    currentBoard[oldPosition.x][oldPosition.y] = temp;
    
    return currentBoard;
}

function findBetterPlace(board, number, queens) {
    let conflicts = [];
    let queen;

    if (queens.length > 1) {
        queen = queens[generateRandomNumber(queens.length)];
    } else {
        queen = queens[0];
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (i !== queen[1].x && j === queen[1].y && board[i][j] !== '*') {
                let newBoard = swapElements(board, queen, { x: i, y: j });
                
                conflicts.push([{conflicts: findConflictsForQueen({x: i, y: j}, newBoard)}, { x: i, y: j }]);
            }
        }
    }
    
    let minConflicts = Math.min(...conflicts.map(el => el[0].conflicts));
    let possiblePositions = conflicts.filter(el => el[0].conflicts === minConflicts);
    let newPosition;

    if (possiblePositions.length > 1) {
        newPosition = possiblePositions[generateRandomNumber(possiblePositions.length)];
    } else {
        newPosition = possiblePositions[0];
    }

    return swapElements(board, queen, newPosition[1]);
}

function findSolution(board, number) {
    for (let i = 0; i < 3 * number; i++) {
        let queens = findQueensWithMostConflicts(board);

        if (!queens.length) {
            return board;
        }
        
        board = findBetterPlace(board, number, queens);
    }

    return false;
}

function main(data) {
    const number = data;
    let board = generateBoard(number);
    let boardWithQueens = placeQueensRandomly(board, number);
    let result = findSolution(boardWithQueens, number);

    if (!result) {
        main(number);
    } else {
        console.log(result);
        return result;
    }
}

// main(number);