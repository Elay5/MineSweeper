'use strict'

const MINE = '🧨'
const FLAG = '⛳'
var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2,
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {

    gBoard = buildBoard()
    renderBoard(gBoard)
    
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]) // board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,

            }
            
        }
    }
    board[1][2].isMine = true
    board[3][3].isMine = true
    setMinesNegsCount(board)
    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {

            var currCell = board[i][j]

            for (var k = i - 1; k <= i + 1; k++) {
                if (k < 0 || k >= gLevel.SIZE) continue
                for (var l = j - 1; l <= j + 1; l++) {
                    if (l < 0 || l >= gLevel.SIZE) continue
                    if (i === k && j === l) continue

                    if (board[k][l].isMine) currCell.minesAroundCount++

                }

            }
            

        }
    }
    
    return
   
}


function onCellClicked(elCell, i, j){
const currCell=document.querySelector(`.cell-${i}-${j} span`)

// elCell.innerText=

}


function gameLevel(level) {
    gLevel.SIZE = 4
    gLevel.SIZE *= level
    onInit()

}







