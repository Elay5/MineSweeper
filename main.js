'use strict'

const MINE = '🧨'
const FLAG = '⛳'
var gBoard
var gTimer
var gFirstClick = true



var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 3

}
var gMineCounter = 0

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

function onInit() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gLevel.LIVES = 3
    gMineCounter = 0
    gFirstClick = true
    resetTimer()
    gBoard = buildBoard()
    renderBoard(gBoard)
    startGame()
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
                isMarked: false,

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


    // board[0][1].isMine = true
    // board[1][1].isMine = true

    // setMinesNegsCount(board)
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

    if (gGame.shownCount === 0 && gFirstClick) {
        startTimer()
        gFirstClick = false
        firstClick(i, j)
    }
    else {


        if (!gGame.isOn) return
        const currCell = gBoard[i][j]
        if (currCell.isMarked) return
        const elCurrCell = document.querySelector(`.cell-${i}-${j}`)
        if (currCell.isShown) return
        // if (gGame.shownCount === 0 && currCell.isMine) {

        //     for (var k = i - 1; k <= i + 1; k++) {
        //         if (k < 0 || k >= gLevel.SIZE) continue
        //         for (var l = j - 1; l <= j + 1; l++) {  //neighbor loop for first click
        //             if (l < 0 || l >= gLevel.SIZE) continue//check if llegal
        //             if (i === k && j === l) continue//check if llegal
        //             const negCell = gBoard[k][l] // curr neighbor cell
        //             if (negCell.isMine) continue //check if neighbor cell is mine to contiune and place in another cell

        //             if (!firstClick) break //check if llegal 
        //             firstClick = false //change entry statement
        //             negCell.isMine = true 
        //             // const elNegCell= document.querySelector(`.cell-${k}-${l}`)
        //             currCell.isMine = false
        //             currCell.isShown = true
        //             gGame.shownCount++
        //             currCell.minesAroundCount++

        //             elCurrCell.classList.add('clickedCell')
        //             elCurrCell.innerText = currCell.minesAroundCount
        //         }
        //     }
        // }

        else {

            currCell.isShown = true
            gGame.shownCount++
            if (currCell.isMine) {
                elCell.innerText = MINE
                gGame.markedCount++
                gLevel.LIVES--
                const elLives = document.querySelector('.lives')
                const elSpan = document.querySelector('.mines-left')
                elSpan.innerText = gLevel.MINES - gGame.markedCount + ' '
                elLives.innerText = gLevel.LIVES

                elCurrCell.classList.add('clickedCell')
                if (gLevel.LIVES === 0) {
                    const elLose = document.querySelector('.lose')
                    elLose.style.display = 'block'
                    gGame.isOn = false
                    resetTimer()
                    document.getElementById('smiley').src = "img/blownsmiley.png";

                }

            }
            else if (currCell.minesAroundCount > 0) {
                elCell.innerText = currCell.minesAroundCount
                elCurrCell.classList.add('clickedCell')

            }
            else {
                expandShown(gBoard, elCell, i, j)
            }
        }


        console.log('shown count', gGame.shownCount)
        checkWin()
    }
}



function onCellMarked(elCell, i, j) {
    const currCell = gBoard[i][j]

    if (currCell.isShown) return
    const elSpan = document.querySelector('.mines-left')
    // elSpan.innerText = 
    if (currCell.isMarked) {
        if (currCell.isMine) {
            gMineCounter--
        }
        const flag = document.getElementById("flagCheck");
        flag.addEventListener("contextmenu", (e) => { e.preventDefault() });
        gGame.markedCount--
        currCell.isMarked = false
        elCell.innerText = ' '
        elCell.classList.remove('flag')

        console.log('flags marked ', gGame.markedCount)
    }
    else {
        if (currCell.isMine) {
            gMineCounter++
        }
        const flag = document.getElementById("flagCheck");
        flag.addEventListener("contextmenu", (e) => { e.preventDefault() });

        gGame.markedCount++
        currCell.isMarked = true
        elCell.innerText = FLAG
        elCell.classList.add('flag')

        console.log('flags marked ', gGame.markedCount)
    }
    console.log('mines left', gMineCounter)
    var mineRes = gLevel.MINES - gGame.markedCount
    if (mineRes > 0) elSpan.innerText = mineRes + ' '
    else elSpan.innerText = mineRes = 0 + ' '

    checkWin()

}

function gameLevel(level, mineMult) {
    
    gLevel.SIZE = 4
    gLevel.MINES = 2

    gLevel.SIZE *= level
    gLevel.MINES *= mineMult
    onInit()

}

function checkWin() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = gBoard[i][j]
            if (gGame.markedCount > gLevel.MINES) return
            if (!currCell.isShown && !currCell.isMarked) return
        }
    }
    console.log('win')
    document.getElementById('smiley').src = "img/coolsmiley.png";
    const elWin = document.querySelector('.win')
    const elWinImg = document.querySelector('.winImg')

    elWin.style.display = 'block'
    elWinImg.style.display = 'block'
    resetTimer()
    console.log('hi')

}

function startGame() {
    
    gGame.isOn = true
    const elLose = document.querySelector('.lose')
    elLose.style.display = 'none'
    document.getElementById('smiley').src = "img/normsmiley.jpg";

    const elSpan = document.querySelector('.mines-left')
    elSpan.innerText = gLevel.MINES


}

function restartGame() {
    gLevel.LIVES=3
    gGame.isOn = true
    const elWin = document.querySelector('.win')
    const elLose = document.querySelector('.lose')
    const elWinImg = document.querySelector('.winImg')
    elWinImg.style.display = 'none'
    elLose.style.display = 'none'
    elWin.style.display = 'none'
    var elTimer = document.querySelector('.time')
    elTimer.innerText = '0.000'
    onInit()

}

function firstClick(i, j) {
    const currCell = gBoard[i][j]
    const elCurrCell = document.querySelector(`.cell-${i}-${j}`)

    var mines = []                   // randomizing mines
    var mineCounter = 0
    while (mineCounter < gLevel.MINES) {

        var randomRow = getRandomInt(0, gLevel.SIZE)
        var randomCol = getRandomInt(0, gLevel.SIZE)
        if (gBoard[i][j] === gBoard[randomRow][randomCol]) continue
        if (!mines.includes(`${randomRow}-${randomCol}`)) {   // if mine arrays does Not include.

            gBoard[randomRow][randomCol].isMine = true
            mines.push(`${randomRow}-${randomCol}`)
            mineCounter++
        }
        else continue
    }

    setMinesNegsCount(gBoard)

    elCurrCell.classList.add('clickedCell')
    if (currCell.minesAroundCount > 0) {
        elCurrCell.innerText = currCell.minesAroundCount
    } else {
        expandShown(gBoard, elCurrCell, i, j)
    }

}


// function expandShown(board, elCell, i, j) {
//     elCell.innerText = ' '
//     console.log('hi seal')

//     for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
//         if (rowIdx < 0 || rowIdx >= gLevel.SIZE) continue
//         for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
//             if (colIdx < 0 || colIdx >= gLevel.SIZE) continue
//             if (i === rowIdx && j === colIdx) continue
//             const negCell = board[rowIdx][colIdx]
//             if (negCell.isMarked) continue

//             if (!negCell.isShown) gGame.shownCount++
//             negCell.isShown = true
//             const elNegCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)

//             elNegCell.innerText = negCell.minesAroundCount ? negCell.minesAroundCount : '  '
//             elNegCell.classList.add('clickedCell')
//             elCell.classList.add('clickedCell')
//         }
//     }
// }

function expandShown(board, elCell, i, j) {
    elCell.innerText = ' '

    for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
        if (rowIdx < 0 || rowIdx >= gLevel.SIZE) continue
        for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
            if (colIdx < 0 || colIdx >= gLevel.SIZE) continue
            if (i === rowIdx && j === colIdx) continue
            const negCell = board[rowIdx][colIdx]
            if (negCell.isMarked) continue
            const elNegCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
            elNegCell.classList.add('clickedCell')
            if (!negCell.isShown) {
                gGame.shownCount++
                negCell.isShown = true
                
                elNegCell.innerText = negCell.minesAroundCount ? negCell.minesAroundCount : ' '
    
                
                
                // Recursively open cells with no mines around them
                if (negCell.minesAroundCount === 0) {
                    expandShown(board, elNegCell, rowIdx, colIdx)
            
                }
            }
        }
    }
}













