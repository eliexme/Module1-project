window.addEventListener('load', ()=>{
    //context
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'block'

    //tile info
    const rows = 28
    const columns = 40
    const tileSize = 15
    canvas.height = rows*tileSize
    canvas.width = columns*tileSize

    //bgImage
    const bgImage = new Image ()
    bgImage.src = 'images/background.jpg'
    
    //snake
    let snakeX = tileSize * 5
    let snakeY = tileSize * 10
    let speedX = 0
    let speedY = 0
    let snakeBody = []

    //coin
    let coinX
    let coinY

    let gameOver = false


    function drawGame(){
        if (gameOver){
            clearInterval(intervalId)
        }
        //draw bg Image
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'yellow'
        ctx.fillRect (coinX, coinY, tileSize, tileSize)

        //check collision with coin
        if(snakeX === coinX && snakeY === coinY){
            snakeBody.push([coinX, coinY])
            placeCoin()
        }

        for (let i=snakeBody.length-1; i>0; i--){
            snakeBody[i] = snakeBody[i-1]
        }

        if (snakeBody.length){
            snakeBody[0] = [snakeX, snakeY]
        }

        ctx.fillStyle = 'green'
        snakeX += speedX * tileSize
        snakeY += speedY * tileSize
        ctx.fillRect (snakeX, snakeY, tileSize, tileSize)

        ctx.fillStyle = 'purple'
        for (let i=0; i<snakeBody.length; i++){
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
        }

        //gameOver conditions
        if (snakeX < 0 || snakeX >= columns*tileSize || snakeY < 0 || snakeY >= rows*tileSize){
            gameOver = true
            console.log('gameOver')
        }

        for (let i=0; i<snakeBody.length; i++){
            if(snakeX === snakeBody[i][0]&& snakeY === snakeBody[i][1]){
                gameOver = true
                console.log('gameOver')
            }
        }
    }

    function placeCoin (){
        coinX = (Math.floor(Math.random()*columns)*tileSize)
        coinY = (Math.floor(Math.random()*rows)*tileSize)
    }

    placeCoin()
    const intervalId = setInterval(drawGame, 100)

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowUp' && speedY !== 1){
            speedX = 0
            speedY = -1
        }
        else if(event.key === 'ArrowDown' && speedY !== -1){
            speedX = 0
            speedY = 1
                
        }
        else if(event.key === 'ArrowRight' && speedX !== -1){
            speedX = 1
            speedY = 0
        }
        else if(event.key === 'ArrowLeft' && speedX !== 1){
            speedX = -1
            speedY = 0
        }
    })

})
