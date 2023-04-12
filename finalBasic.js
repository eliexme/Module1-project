window.addEventListener('load', ()=>{
//context
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
//buttons target
const startButton = document.querySelector('#start-button')
const restartButton = document.querySelector('#restart-button')
//intro target
const mainIntro = document.querySelector('.main-intro')
//board target
const boardPage = document.querySelector('.board-page')
boardPage.style.display = 'none'
//game-over target
const endGame = document.querySelector('.game-over')
endGame.style.display = 'none'

//batman image
const batman = new Image()
batman.src = 'images/batman-game-logo.png'
//tile info
const rows = 18
const columns = 40
const tileSize = canvas.height/rows

//snake
let snakeX = 5*tileSize
let snakeY = 10*tileSize
let vectorX = 0
let vectorY = 0
let snakeBody = []

//coin
let coinX
let coinY
const coinImg = new Image()
coinImg.src = 'images/coin.png'

let score = 0
let speed = 10
let level = 1

let gameOver = false
let gameInterval




function drawGame(){
    //draw background
    ctx.fillStyle = 'green'
    ctx.fillRect (0, 0, canvas.width, canvas.height)
    ctx.fillStyle= 'black'
    ctx.fillRect (2, 2, canvas.width -4, canvas.height -4)

    //drawCoin
    ctx.drawImage(coinImg, coinX, coinY, tileSize, tileSize)

    //check collision with coin
    if(snakeX === coinX && snakeY === coinY){
        snakeBody.push([coinX, coinY])
        placeCoin()
        score += 100
        //score-level
    if (score % 500 === 0){
        speed += 10
        level += 1
    }
    //score values
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
        //console.log(score, level, speed)
    }

    for (let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    //draw snake head
    ctx.fillStyle = 'purple'
    snakeX += vectorX * tileSize
    snakeY += vectorY * tileSize
    //ctx.fillRect(snakeX, snakeY, tileSize, tileSize)
    ctx.drawImage(batman, snakeX, snakeY, tileSize, tileSize)

    ctx.fillStyle = 'purple'
    for (let i=0; i<snakeBody.length; i++){
        ctx.fillRect (snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
    }

    //gameOver conditions
    if (snakeX < 0 || snakeX >= columns*tileSize || snakeY < 0 || snakeY >= rows*tileSize){
        gameOver = true
        gameOver = true
        showGameOverScreen();
    }

    for (let i=0; i<snakeBody.length; i++){
        if(snakeX === snakeBody[i][0]&& snakeY === snakeBody[i][1]){
            gameOver = true
            gameOver = true
            showGameOverScreen();
        }
    }    
}

function placeCoin() {
    coinX = Math.floor((Math.random() *columns))*tileSize;
    coinY = Math.floor((Math.random() *rows))*tileSize;
  }

  function changeDirection (event){
    if(event.key === 'ArrowUp' && vectorY !== 1){
        vectorX = 0
        vectorY = -1
    }
    else if(event.key === 'ArrowDown' && vectorY !== -1){
        vectorX = 0
        vectorY = +1
    }
    if(event.key === 'ArrowLeft'&& vectorX !== 1){
        vectorX = -1
        vectorY = 0
    }
    if(event.key === 'ArrowRight' && vectorX !== -1){
        vectorX = 1
        vectorY = 0
    }
  }

  function showGameOverScreen() {
    let snakeX = 5*tileSize
    let snakeY = 10*tileSize
    let vectorX = 0
    let vectorY = 0
    let snakeBody = []
    boardPage.style.display = 'none';
    endGame.style.display = 'block';
    clearInterval(gameInterval)
  }
  
  

startButton.addEventListener('click', ()=>{
    boardPage.style.display = 'block'
    mainIntro.style.display = 'none'
    placeCoin()
    document.addEventListener('keydown', changeDirection)
    gameInterval = setInterval(drawGame, 1000/speed)
})

restartButton.addEventListener('click', ()=>{
    boardPage.style.display = 'block'
    mainIntro.style.display = 'none'
    placeCoin()
    document.addEventListener('keydown', changeDirection)
    setInterval(drawGame, 1000/speed)
})

})