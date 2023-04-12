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
    const snakeBody = []
    let tailLength = 0

    //direction variable
    let isMovingUp = false
    let isMovingDown = false
    let isMovingRight = false
    let isMovingLeft = false

    //coins variables
    let coinX = 5*tileSize
    let coinY = 5*tileSize

    //coins variables
    let assetX = 10*tileSize
    let assetY = 10*tileSize

    //score variables
    let score = 0
    

    function drawGame(){
        canvas.style.display = 'block'
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        clearScreen()
        checkCoinCollision()
        checkAssetCollision()
        drawCoin()
        drawAsset()
        drawSnake()
        snakeMove()
        requestAnimationFrame(drawGame)
    }

    function clearScreen(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    }

    function drawSnake(){
        //head
        ctx.fillStyle = 'purple'
        ctx.fillRect (headX, headY, tileSize, tileSize)
        //array
        
        //body
        ctx.fillStyle = 'black'
        for (let i=0; i<snakeBody.length; i++){
            let part = snakeBody[i]
            ctx.fillRect (part.x + headX* i+1 , part.y + headY* i+1, tileSize, tileSize)
        }

        
        
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
            tailLength +=1
            coinX = (Math.floor(Math.random()*tileCountX)*tileSize)%canvas.width
            coinY = (Math.floor(Math.random()*tileCountY)*tileSize)%canvas.height

            snakeBody.push(new SnakeBody(headX+tileSize, headY+tileSize))
            console.log(snakeBody)
        }
    }

    function drawAsset(){
        ctx.fillStyle = 'red'
        ctx.fillRect(assetX, assetY, tileSize, tileSize)
    }

    function checkAssetCollision(){
        if (headX + tileSize > assetX && 
            headX < assetX + tileSize && 
            headY + tileSize > assetY &&
            headY < assetY + tileSize 
            ){
            score += 250
            tailLength +=1
            assetX = (Math.floor(Math.random()*tileCountX)*tileSize)%canvas.width
            assetY = (Math.floor(Math.random()*tileCountY)*tileSize)%canvas.height
        }
    }

    class SnakeBody{
        constructor(x, y){
            this.x = x
            this.y = y
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