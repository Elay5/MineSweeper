'use strict'

const MINE ='🧨'
const FLAG ='⛳'
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

function onInit(){
    
    gBoard= buildBoard()
    renderBoard(gBoard)

}


function gameLevel(level){
    gLevel.SIZE *=level
    onInit()

}







