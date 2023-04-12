window.addEventListener('load', ()=>{
    //context
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'none'

    //buttons target
    const startButton = document.querySelector('#start-button')

    //tile info
    const tileCountX = 40
    const tileCountY = 28
    const tileSize = canvas.width/tileCountX

    //snake variables
    let headX = 20 *tileSize
    let headY = 14 *tileSize
    let snakeSpeed = 2
    let snakeBody = [[headX, headY]]

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
        ctx.fillStyle = 'green'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'black'
        ctx.fillRect(2, 2, canvas.width -5, canvas.height-5)
        clearScreen()
        checkCoinCollision()
        checkAssetCollision()
        drawCoin()
        drawAsset()
        drawSnake()
        requestAnimationFrame(drawGame)
    }

    function clearScreen(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'green'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'black'
        ctx.fillRect(2, 2, canvas.width -5, canvas.height-5)
    }

    function drawSnake(){
        
        //head
        /*ctx.fillStyle = 'purple'
        ctx.fillRect (headX, headY, tileSize, tileSize)*/
        //head movement
        if (isMovingUp) {
            headY -= snakeSpeed
        } else if (isMovingDown) {
            headY += snakeSpeed
        } else if (isMovingLeft) {
            headX -= snakeSpeed
        } else if (isMovingRight) {
            headX += snakeSpeed
        }

        //draw body
        for (let i=snakeBody.length-1; i>0; i--){
            snakeBody[i] = snakeBody[i-1]
        }

        if (snakeBody.length){
            snakeBody[0] = [headX, headY]
        }

        ctx.fillStyle = 'purple'
        for (let i=0; i<snakeBody.length; i++){
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
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
            if (isMovingDown){
                snakeBody.push([headX, 100-tileSize])
            }

            /*if (snakeBody.length) {
                snakeBody.push([headX, headY]);
              }*/
            console.log(snakeBody, headX, headY)
            
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
            assetX = (Math.floor(Math.random()*tileCountX)*tileSize)%canvas.width
            assetY = (Math.floor(Math.random()*tileCountY)*tileSize)%canvas.height
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