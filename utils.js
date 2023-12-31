'use strict'
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
    console.log(board)

    return board
}

function renderBoard(board) {
    var strHtml = '<table><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += `<tr>\n`
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!board[i][j].isMine) {
                strHtml += `
               \t<td>
                    <button class="btn"></button>
                </td>\n`
            }
            else {
                strHtml += `
                \t<td>
                     <button class="btn">${MINE}</button>
                 </td>\n`
            }
        }
            
        
        strHtml += `</tr>\n`
    }
    strHtml += '<table><tbody>'
    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHtml
}






// onclick="cellClicked(this,${num})"> ${num} 