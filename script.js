window.addEventListener('load', ()=>{
    //context
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'none'

    //bgImage
    const bgImage = new Image ()
    bgImage.src = './images/background.jpg'

    //buttons target
    const startButton = document.querySelector('#start-button')

    //tile info
    const tileCountX = 40
    const tileCountY = 28
    const tileSize = canvas.width/tileCountX

    //snake variables
    let headX = 20 *tileSize
    let headY = 14 *tileSize
    let snakeSpeed = 1

    //direction variable
    let isMovingUp = false
    let isMovingDown = false
    let isMovingRight = false
    let isMovingLeft = false

    //coins variables
    let coinX = 5*tileSize
    let coinY = 5*tileSize

    //score variables
    let score = 0
    

    function drawGame(){
        canvas.style.display = 'block'
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        clearScreen()
        drawSnake()
        drawCoin()
        snakeMove()
        checkCoinCollision()
        requestAnimationFrame(drawGame)
    }

    function clearScreen(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    }

    function drawSnake(){
        ctx.fillStyle = 'purple'
        //por que *tile count en lugar de *tile size?
        ctx.fillRect (headX, headY, tileSize, tileSize)
    }

    function snakeMove(){
        if (isMovingUp) {
            headY -= snakeSpeed
        } else if (isMovingDown) {
            headY += snakeSpeed
        } else if (isMovingLeft) {
            headX -= snakeSpeed
        } else if (isMovingRight) {
            headX += snakeSpeed
        }
    }

    function drawCoin(){
        ctx.fillStyle = 'yellow'
        ctx.fillRect(coinX, coinY, tileSize, tileSize)
    }

    function checkCoinCollision(){
        if (headX + tileSize > coinX && 
            headX < coinX + tileSize && 
            headY + tileSize > coinY &&
            headY < coinY + tileSize 
            ){
            score += 100
            coinX = (Math.floor(Math.random()*tileCountX)*tileSize)%canvas.width
            coinY = (Math.floor(Math.random()*tileCountY)*tileSize)%canvas.height
        }
    }
    
    


    

    startButton.addEventListener ('click', ()=>{
        drawGame()
    })

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowUp' && !isMovingDown){
            isMovingUp = true
            isMovingDown = false
            isMovingLeft = false
            isMovingRight = false
        }
        else if(event.key === 'ArrowDown' && !isMovingUp){
            isMovingUp = false
            isMovingDown = true
            isMovingLeft = false
            isMovingRight = false
                
        }
        else if(event.key === 'ArrowRight' && !isMovingLeft){
            isMovingRight = true
            isMovingLeft = false
            isMovingUp = false
            isMovingDown = false
        }
        else if(event.key === 'ArrowLeft' && !isMovingRight){
            isMovingRight = false
            isMovingLeft = true
            isMovingUp = false
            isMovingDown = false
        }
    })
    


})