const PriorityQueue = require('./priorityQueue');

process.stdin.resume();
process.stdin.setEncoding('ascii');

let input_stdin = "";
let input_stdin_array = "";
let input_currentline = 0;

let numberOfCounts = null;
let matrix = [];

function shouldIAskForAnotherRow(currentCount, numberOfCounts) {
    let result = false;

    if (currentCount !== numberOfCounts) {
        result = true;
    }

    return result;
}

let currentCount = 0;

console.log("Enter a number:");

process.stdin.on('data', function (data) {
    if (!numberOfCounts) {
        numberOfCounts = parseInt(data) + 1;
        console.log('Enter row in a matrix:');
    } else {
        data = data.replace('\r\n', '');
        let arr = data.split(" ").map(item => parseInt(item, 10));
        matrix.push(arr);
        currentCount += arr.length;
        if (shouldIAskForAnotherRow(currentCount, numberOfCounts)) {
            console.log("Enter next row:");
        } else {
            process.stdin.pause();
            main(matrix, numberOfCounts);
        }
    }
});

function main(startState, count) {
    console.log("\n Starting to analize data. \n");

    let goalState = [];
    let currentNumber = 1;

    for (let i = 0; i < startState.length; i++) {
        let innerArr = [];

        for (let j = 0; j < startState[i].length; j++) {
            innerArr.push(currentNumber);
            currentNumber++;
        }

        if (i == startState.length - 1) {
            innerArr.pop();
            innerArr.push(0);
        }

        goalState.push(innerArr);
    }

    console.log('goalState', goalState);

    Direction = {
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        DOWN: "down"
    };

    let queue = new PriorityQueue();
    let visitedStates = [];
    let distance = 1;
    
    function getBlankSpacePosition(arr) {
        let searchValue = 0;
    
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j] === searchValue) {
    
                    return {
                        value: arr[i][j],
                        x: i,
                        y: j
                    };
                }
            }
        }
    }

    function getPossibleMoves(state) {
        let possibleDirections = [];
        let blankSpace = getBlankSpacePosition(state);
    
        if (blankSpace.x > 0) {
            possibleDirections.push(Direction.DOWN);
        }
    
        if (blankSpace.x < state.length - 1) {
            possibleDirections.push(Direction.UP);
        }
    
        if (blankSpace.y > 0) {
            possibleDirections.push(Direction.RIGHT);
        }
    
        if (blankSpace.y < state.length - 1) {
            possibleDirections.push(Direction.LEFT);
        }
    
        return possibleDirections;
    }
    
    function clone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function swapElements(state, blankSpace, elementToMove) {
        let currentState = clone(state);
    
        let temp = currentState[blankSpace.x][blankSpace.y];
        currentState[blankSpace.x][blankSpace.y] = currentState[elementToMove.x][elementToMove.y];
        currentState[elementToMove.x][elementToMove.y] = temp;
    
        return currentState;
    }

    function arrayToString(arr) {
        let resultStr = '';
    
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                resultStr += arr[i][j].toString();
            }
        }
    
        return resultStr;
    }

    function hFunc(startState, goalState) {
        let sum = 0;
    
        for (let k = 0; k < goalState.length; k++) {
            for (let j = 0; j < goalState.length; j++) {
                let searchValue = goalState[k][j];
                let searchValueX = k;
                let searchValueY = j;
    
                for (let i = 0; i < startState.length; i++) {
                    for (let p = 0; p < startState.length; p++) {
                        if (startState[i][p] === searchValue) {
                            let xCoordinate = i;
                            let yCoordinate = p;
    
                            sum += Math.abs(searchValueX - xCoordinate) + Math.abs(searchValueY - yCoordinate);
    
                            break;
                        }
                    }
                }
            }
        }
    
        return sum;
    }
    
    function distanceFunc() {
        return distance;
    }

    function evaluateFunc(startState, goalState) {
        let result = hFunc(startState, goalState) + distanceFunc();
        return result;
    }

    function doMove(state, blankSpace, element, goalState) {
        let newState = swapElements(state, blankSpace, element);
        let newStateStr = arrayToString(newState);
    
        if (visitedStates.find(el => el === newStateStr) !== undefined) {
            return false;
        } else {
            priority = evaluateFunc(newState, goalState);
            queue.push(newState, priority);
            visitedStates.push(newStateStr);
    
            return true;        
        }
    }
    
    function makePossibleMoves(state, move) {
        let blankSpace = getBlankSpacePosition(state);
        let priority = null;
    
        let elementAbove = null;
        let elementAboveX = blankSpace.x - 1;
        let elementAboveY = blankSpace.y;
    
        let elementBelow = null;
        let elementBelowX = blankSpace.x + 1;
        let elementBelowY = blankSpace.y;
    
        let elementOnRight = null;
        let elementOnRightX = blankSpace.x;
        let elementOnRightY = blankSpace.y + 1;
    
        let elementOnLeft = null;
        let elementOnLeftX = blankSpace.x;
        let elementOnLeftY = blankSpace.y - 1;
    
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (elementAboveX === i && elementAboveY === j) {
                    elementAbove = {
                        value: state[i][j],
                        x: i,
                        y: j
                    };
                }
    
                if (elementBelowX === i && elementBelowY === j) {
                    elementBelow =  {
                        value: state[i][j],
                        x: i,
                        y: j
                    };
                }
    
                if (elementOnRightX === i && elementOnRightY === j) {
                    elementOnRight =  {
                        value: state[i][j],
                        x: i,
                        y: j
                    };
                }
    
                if (elementOnLeftX === i && elementOnLeftY === j) {
                    elementOnLeft =  {
                        value: state[i][j],
                        x: i,
                        y: j
                    };
                }
            }
        }
        for (let i = 0; i < move.length; i++) {
            if (move[i] === 'down' && elementAbove) {
                doMove(state, blankSpace, elementAbove, goalState)
            } else if (move[i] === 'up' && elementBelow) {
                doMove(state, blankSpace, elementBelow, goalState)
            } else if (move[i] === 'right' && elementOnLeft) {
                doMove(state, blankSpace, elementOnLeft, goalState)
            } else if (move[i] === 'left' && elementOnRight) {
                doMove(state, blankSpace, elementOnRight, goalState)
            }
        }
    
        while (queue.size() > 1) {
            let poped = queue.pop();
            let index = visitedStates.indexOf(arrayToString(poped));
            visitedStates.splice(index, 1);
        }
    
        distance++;
        return queue;
    }
    
    function isGoalState(startState, goalState) {
        return JSON.stringify(startState) === JSON.stringify(goalState);
    }
    
    function solvePuzzle(state, goalState) {
        let possibleMoves = getPossibleMoves(state);
        let newState = makePossibleMoves(state, possibleMoves);
    
        if (isGoalState(state, goalState)) {
            console.log('result ', state);
            return;
        }
    
        let newStateArr = newState.pop();
    
        solvePuzzle(newStateArr, goalState);
    }
    
    solvePuzzle(startState, goalState);
}
