'use strict'

const MINE = '🧨'
const FLAG = '⛳'
var gBoard
var gTimer



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
    LIVES: 3
}

function onInit() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.LIVES = 3
    gMineCounter = 0
   

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

    var mines = []                   // randomizing mines
    var mineCounter = 0
    while (mineCounter < gLevel.MINES) {

        var randomRow = getRandomInt(0, gLevel.SIZE)
        var randomCol = getRandomInt(0, gLevel.SIZE)

        if (!mines.includes(`${randomRow}-${randomCol}`)) {   // if mine arrays does Not include.

            board[randomRow][randomCol].isMine = true
            mines.push(`${randomRow}-${randomCol}`)
            mineCounter++
        }
        else continue
    }


    // board[0][0].isMine = true
    // board[1][0].isMine = true

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
    if (gGame.shownCount === 0) startTimer()

    if (!gGame.isOn) return
    const currCell = gBoard[i][j]
    if (currCell.isMarked) return
    const elCurrCell = document.querySelector(`.cell-${i}-${j}`)
    if (currCell.isShown) return

    else {
        currCell.isShown = true
        gGame.shownCount++
        if (currCell.isMine) {
            elCell.innerText = MINE
            gGame.markedCount++
            gGame.LIVES--
            const elSpan = document.querySelector('.mines-left')
            elSpan.innerText= gLevel.MINES-gGame.markedCount+' '

            elCurrCell.classList.add('clickedCell')
            if (gGame.LIVES === 0) {
                const elLose = document.querySelector('.lose')
                elLose.style.display = 'block'
                gGame.isOn = false
                resetTimer()
                document.getElementById('smiley').src="img/blownsmiley.png";
                
            }

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
                    if (negCell.isMarked) continue

                    if (!negCell.isShown) gGame.shownCount++
                    negCell.isShown = true
                    const elNegCell = document.querySelector(`.cell-${k}-${l}`)

                    elNegCell.innerText = negCell.minesAroundCount ? negCell.minesAroundCount : '  '
                    elNegCell.classList.add('clickedCell')
                    elCurrCell.classList.add('clickedCell')

                }
            }

        }
    }
    console.log('shown count', gGame.shownCount)
    checkWin()
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
    var mineRes=gLevel.MINES-gGame.markedCount
    if(mineRes>0) elSpan.innerText= mineRes+' '
    else elSpan.innerText= mineRes=0+' '

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
    document.getElementById('smiley').src="img/coolsmiley.png";
    const elWin = document.querySelector('.win')
    const elWinImg = document.querySelector('.winImg')

    elWin.style.display = 'block'
    elWinImg.style.display = 'block'
    console.log('hi')

}

function startGame() {
    gGame.isOn = true
    const elLose = document.querySelector('.lose')
    elLose.style.display = 'none'
    document.getElementById('smiley').src="img/normsmiley.jpg";

    const elSpan = document.querySelector('.mines-left')
    elSpan.innerText = gLevel.MINES


}

function restartGame() {
    gGame.isOn = true
    const elWin = document.querySelector('.win')
    const elLose = document.querySelector('.lose')
    elLose.style.display = 'none'
    elWin.style.display = 'none'
    onInit()

}











