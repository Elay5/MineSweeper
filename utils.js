'use strict'



function renderBoard(board) {



    var strHtml = '<table oncontextmenu="return false"><tbody>'    //oncontextmenu="return false"
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += `<tr>\n`
        for (var j = 0; j < gLevel.SIZE; j++) {
            // if(gGame.shownCount===0&&board[i][j].isMine){
            //     board[i][j].isMine=false
                
            // }
           
            if (!board[i][j].isShown) {
              
                strHtml += `
                \t<td>
                     <button class="cell cell-${i}-${j}"id="flagCheck"
                      onclick="onCellClicked(this,${i},${j}) "oncontextmenu=onCellMarked(this,${i},${j})> </button>
                 </td>\n`
            }
            else {

                if (!board[i][j].isMine) {
                    strHtml += `
                    \t<td>
                         <button class="cell cell-${i}-${j}"id="flagCheck"
                          onclick="onCellClicked(this,${i},${j})"
                          >${board[i][j].minesAroundCount}</button>
                     </td>\n`
                }
                else {
                    strHtml += `
                     \t<td>
                          <button class="cell cell-${i}-${j}"id="flagCheck"
                          onclick="onCellClicked(this,${i},${j})"
                          >${MINE}</button>
                      </td>\n`
                }
            }
        }
        strHtml += `</tr>\n`
    }
    strHtml += '<table><tbody>'
    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHtml
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startTimer() {
	var startTime = Date.now()
	var elTimer = document.querySelector('.time')

	 gTimer = setInterval(() => {
		const elapsedTime = Date.now() - startTime
		const formattedTime = (elapsedTime / 1000).toFixed(3)
		elTimer.textContent = formattedTime
    }, 47)
}
function resetTimer() {
	clearInterval(gTimer)
	
}



// function renderBoard(board) { 
    
//     var strHtml = '<table oncontextmenu="return false"><tbody>'    //oncontextmenu="return false"
//     for (var i = 0; i < gLevel.SIZE; i++) {
//         strHtml += `<tr>\n`
//         for (var j = 0; j < gLevel.SIZE; j++) {
//             if (!board[i][j].isShown) {
//                 strHtml += `
//                 \t<td>
//                      <button class="cell cell-${i}-${j}"id="flagCheck"
//                       onclick="onCellClicked(this,${i},${j}) "oncontextmenu=onCellMarked(this,${i},${j})> </button>
//                  </td>\n`
//             }
//             else {

//                 if (!board[i][j].isMine) {
//                     strHtml += `
//                     \t<td>
//                          <button class="cell cell-${i}-${j}"id="flagCheck"
//                           onclick="onCellClicked(this,${i},${j})"
//                           >${board[i][j].minesAroundCount}</button>
//                      </td>\n`
//                 }
//                 else {
//                     strHtml += `
//                      \t<td>
//                           <button class="cell cell-${i}-${j}"id="flagCheck"
//                           onclick="onCellClicked(this,${i},${j})"
//                           >${MINE}</button>
//                       </td>\n`
//                 }
//             }
//         }
//         strHtml += `</tr>\n`
//     }
//     strHtml += '<table><tbody>'
//     var elBoard = document.querySelector('.board-container')
//     elBoard.innerHTML = strHtml
// }
