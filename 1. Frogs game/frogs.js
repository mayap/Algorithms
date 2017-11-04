// N = 2
let frogsArray = ['L', 'L', '_', 'R', 'R'];
const solution = ['R', 'R', '_', 'L', 'L'];

// N = 3

// let frogsArray = ['L', 'L', 'L', '_', 'R', 'R', 'R'];
// const solution = ['R', 'R', 'R', '_', 'L', 'L', 'L'];

// N = 6

// let frogsArray = ['L', 'L', 'L', 'L', 'L', 'L', '_', 'R', 'R', 'R', 'R', 'R', 'R'];
// const solution = ['R', 'R', 'R', 'R', 'R', 'R', '_', 'L', 'L', 'L', 'L', 'L', 'L'];

let movesTried = [];
const zeroPosition = 0;
let frogsStack = [];

function isSolution(frogs) {
    const areEqual = (frogs.length == solution.length) && frogs.every(function(element, index) {
        return element === solution[index]; 
    });

    return areEqual;
}

function isMoveOnePossible(frogs) {
    let isPossible = false;

    for (let i = 0; i < frogs.length; i++) {
        if (frogs[i] === 'L' && frogs[i + 1] === '_') {
            isPossible = true;
        }
    }

    return isPossible;
}

function isMoveTwoPossible(frogs) {
    let isPossible = false;
    
    for (let i = 0; i < frogs.length; i++) {
        if (frogs[i] === 'L' && frogs[i + 2] === '_') {
            isPossible = true;
        }
    }

    return isPossible;
}

function isMoveThreePossible(frogs) {
    let isPossible = false;
    
    for (let i = 0; i < frogs.length; i++) {
        if (frogs[i] === 'R' && frogs[i - 1] === '_') {
            isPossible = true;            
        }
    }

    return isPossible;
}

function isMoveFourPossible(frogs) {
    let isPossible = false;
    
    for (let i = 0; i < frogs.length; i++) {
        if (frogs[i] === 'R' && frogs[i - 2] === '_') {
            isPossible = true;
        }
    }

    return isPossible;    
}

function doFirstMove(frogs) {
    let newState = Object.assign([], frogs);

    for (let i = 0; i < newState.length; i++) {
        if (newState[i] === 'L' && newState[i + 1] === '_') {
            newState[i] = '_';
            newState[i+1] = 'L';
            break;
        }
    }

    return newState;
}

function doSecondMove(frogs) {
    let newState = Object.assign([], frogs);
    
    for (let i = 0; i < newState.length; i++) {
        if (newState[i] === 'L' && newState[i + 2] === '_') { 
            newState[i] = '_';
            newState[i + 2] = 'L';
            break;
        }
    }

    return newState;
}

function doThirdMove(frogs) {
    let newState = Object.assign([], frogs);
    
    for (let i = 0; i < newState.length; i++) {
        if (newState[i] === 'R' && newState[i - 1] === '_') {
            newState[i] = '_';
            newState[i - 1] = 'R';
            break;
        }
    }

    return newState;
}

function doFourthMove(frogs) {
    let newState = Object.assign([], frogs);
    
    for (let i = 0; i < newState.length; i++) {
        if (newState[i] === 'R' && newState[i - 2] === '_') {
            newState[i] = '_';
            newState[i - 2] = 'R';
            break;
        }
    }

    return newState;
}

function dfs(frogs, zeroPos) {
    frogsStack.push(frogs);

    if (isSolution(frogs)) {
        return true;
    }

    if (isMoveOnePossible(frogs)) {
        let newState = doFirstMove(frogs);
        let newPosition = ++zeroPos;

        if (dfs(newState, newPosition)) {

            return true;
        }
    }

    if (isMoveTwoPossible(frogs)) {
        let newState = doSecondMove(frogs);
        let newPosition = ++zeroPos;        

        if (dfs(newState, newPosition)) {

            return true;
        }
    }

    if (isMoveThreePossible(frogs)) {
        let newState = doThirdMove(frogs);
        let newPosition = ++zeroPos;
        
        if (dfs(newState, newPosition)) {

            return true;
        }
    }

    if (isMoveFourPossible(frogs)) {
        let newState = doFourthMove(frogs);
        let newPosition = ++zeroPos;
        
        if (dfs(newState, newPosition)) {

            return true;
        }
    }

    frogsStack.pop();
    return false;
}

dfs(frogsArray, zeroPosition);
const allMoves = frogsStack;
console.log(allMoves);
console.log(allMoves.length);
