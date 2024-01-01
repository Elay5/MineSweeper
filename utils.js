'use strict'


function renderBoard(board) {
    var strHtml = '<table><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += `<tr>\n`
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!board[i][j].isMine) {
                strHtml += `
               \t<td>
                    <button class="btn cell cell-${i}-${j}"
                     onclick="onCellClicked(this,${i},${j})"
                     ><span>${board[i][j].minesAroundCount}</span></button>
                </td>\n`
            }
            else {
                strHtml += `
                \t<td>
                     <button class="btn cell cell-${i}-${j}"
                     onclick="onCellClicked(this,${i},${j})"
                     ><span class="hidden">${MINE}</span></button>
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