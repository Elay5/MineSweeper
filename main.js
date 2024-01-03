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

    // var mines = []                   // randomizing mines
    // var mineCounter = 0
    // while (mineCounter < gLevel.MINES) {

    //     var randomRow = getRandomInt(0, gLevel.SIZE)
    //     var randomCol = getRandomInt(0, gLevel.SIZE)

    //     if (!mines.includes(`${randomRow}-${randomCol}`)) {   // if mine arrays does Not include.

    //         board[randomRow][randomCol].isMine = true
    //         mines.push(`${randomRow}-${randomCol}`)
    //         mineCounter++
    //     }
    //     else continue
    // }


    board[getRandomInt(0, gLevel.SIZE)][getRandomInt(0, gLevel.SIZE)].isMine = true
    board[getRandomInt(0, gLevel.SIZE)][getRandomInt(0, gLevel.SIZE)].isMine = true

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


function onCellClicked(elCell, i, j) {
    
if(!gGame.isOn)return
    const currCell = gBoard[i][j]
    const elCurrCell = document.querySelector(`.cell-${i}-${j}`)
    if (currCell.isShown) return

    else {
        currCell.isShown = true
        if (currCell.isMine) {
            elCell.innerText = MINE
            elCurrCell.classList.add('clickedCell')

            const elLose = document.querySelector('.lose')
            const elTable = document.querySelector('table')
            elLose.style.display = 'block'
            gGame.isOn=false
            
        }
        else if (currCell.minesAroundCount > 0) {
            elCell.innerText = currCell.minesAroundCount
            elCurrCell.classList.add('clickedCell')

        }
        else {
            elCell.innerText = ' '

            //negloop if 0 mines
            for (var k = i - 1; k <= i + 1; k++) {
                if (k < 0 || k >= gLevel.SIZE) continue
                for (var l = j - 1; l <= j + 1; l++) {
                    if (l < 0 || l >= gLevel.SIZE) continue
                    if (i === k && j === l) continue
                    const negCell = gBoard[k][l]
                    negCell.isShown = true
                    const elNegCell = document.querySelector(`.cell-${k}-${l}`)

                    elNegCell.innerText = negCell.minesAroundCount ? negCell.minesAroundCount : ' '
                    elNegCell.classList.add('clickedCell')
                    elCurrCell.classList.add('clickedCell')

                }
            }
        }
    }
    checkWin()
}

function gameLevel(level, mineMult) {
    gLevel.SIZE = 4
    gLevel.MINES = 2

    gLevel.SIZE *= level
    gLevel.MINES *= mineMult
    onInit()

}

function onCellMarked(elCell) {

}

function checkWin() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = gBoard[i][j]
            if (!currCell.isShown) return
        }
    }

    const elWin = document.querySelector('.win')
    const elTable = document.querySelector('table')
    elWin.style.display = 'block'
    elTable.style.display = 'none'
    console.log('hi')

}

function startGame(){
    gGame.isOn=true
    const elLose = document.querySelector('.lose')
    elLose.style.display = 'none'

    onInit()

}










