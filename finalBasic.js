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
//grid image
const grid = new Image()
grid.src = 'images/grid.png'
//audio
const coinSound = new Audio('sounds/coin (online-audio-converter.com).mp3')
const musicMain = new Audio('sounds/09. Scum, Criminals, and Worse.mp3')
musicMain.volume = 0.1
const endSound = new Audio ('sounds/mixkit-arcade-game-over-1949.mp3')
const muteButton = document.querySelector('.mute')

const gameScore = document.getElementById("score")
const gameLevel = document.getElementById("level")
const scoreFinal = document.querySelector('#scoreFinal')
const levelFinal = document.querySelector('#levelFinal')


//batman image
const batman = new Image()
batman.src = 'images/batman-face.png'
const batBody = new Image()
batBody.src = 'images/batman-body.png'

//tile info
const rows = 18
const columns = 40
const tileSize = canvas.height/rows

//snake
let snakeX = 5*tileSize
let snakeY = 10*tileSize
let vectorX = 0
let vectorY = 0
let snakeBody = [[4*tileSize, 10*tileSize],[3*tileSize, 10*tileSize]]

  

//coin
let coinX
let coinY
const coinImg = new Image()
coinImg.src = 'images/coin2.png'

let score = 0
let speed = 10
let level = 1

let gameOver = false
let gameInterval




function drawGame(){
    musicMain.play()
    //draw background
    ctx.drawImage (grid, 0, 0, canvas.width, canvas.height)
    ctx.shadowBlur = 10;
    ctx.shadowColor = "purple";
    ctx.beginPath()
    ctx.lineWidth = "5";
    ctx.strokeStyle = 'green'
    ctx.rect(0,0,canvas.width, canvas.height)
    ctx.stroke()
    ctx.closePath()
    //ctx.fillStyle= 'black'
    //ctx.fillRect (2, 2, canvas.width -4, canvas.height -4)

    

    //drawCoin
    ctx.drawImage(coinImg, coinX, coinY, tileSize, tileSize)

    //check collision with coin
    if(snakeX === coinX && snakeY === coinY){
        snakeBody.push([coinX, coinY])
        placeCoin()
        coinSound.play()
        score += 100
        //score-level
    if (score % 500 === 0 && score > 0){
        speed += 2.5
        level += 1
        fasterInterval()
    }
    //score values
    gameScore.innerText = score;
    gameLevel.innerText = level;
        //console.log(score, level, speed)
    }

    for (let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    //ctx.fillStyle = 'purple'
    for (let i=0; i<snakeBody.length; i++){
        ctx.drawImage (batBody, snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
        //ctx.fillRect (snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
    }

    //draw snake head
    //ctx.fillStyle = 'purple'
    snakeX += vectorX * tileSize
    snakeY += vectorY * tileSize
    //ctx.fillRect(snakeX, snakeY, tileSize, tileSize)
    ctx.drawImage(batman, snakeX, snakeY, tileSize, tileSize)


    //gameOver conditions
    if (snakeX < 0 || snakeX >= columns*tileSize || snakeY < 0 || snakeY >= rows*tileSize){
        gameOver = true
        showGameOverScreen();
    }

    for (let i=4; i<snakeBody.length; i++){
        if(snakeX === snakeBody[i][0]&& snakeY === snakeBody[i][1]){
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

  function fasterInterval(){
    clearInterval(gameInterval)
    gameInterval = setInterval(drawGame, 1000/speed)
  }

  function showGameOverScreen() {
    musicMain.pause()
    musicMain.currentTime = 0
    endSound.play()
    snakeX = 5*tileSize
    snakeY = 10*tileSize
    vectorX = 0
    vectorY = 0
    snakeBody = [[4*tileSize, 10*tileSize],[3*tileSize, 10*tileSize]]
    scoreFinal.innerText = score
    levelFinal.innerText = level
    boardPage.style.display = 'none';
    endGame.style.display = 'block';
    score = 0
    speed = 10
    level = 1
    gameScore.innerText = score;
    gameLevel.innerText = level;
    clearInterval(gameInterval)
  }
  
  

startButton.addEventListener('click', ()=>{
    boardPage.style.display = 'block'
    mainIntro.style.display = 'none'
    placeCoin()
    gameInterval = setInterval(drawGame, 1000/speed)
    document.addEventListener('keydown', changeDirection)
    
})

muteButton.addEventListener('click', () => {
    //mutea o desmutea los sonidos
    coinSound.muted = !coinSound.muted
    musicMain.muted = !musicMain.muted
    endSound.muted = !endSound.muted
  })

restartButton.addEventListener('click', ()=>{
    boardPage.style.display = 'block'
    mainIntro.style.display = 'none'
    endGame.style.display = 'none'
    gameOver = false
    placeCoin()
    score = 0
    speed = 10
    vectorX = 0
    vectorY = 0
    clearInterval(gameInterval)
    gameInterval = setInterval(drawGame, 1000/speed)
    document.addEventListener('keydown', changeDirection)
})
})