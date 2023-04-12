window.addEventListener('load', ()=>{
    //context
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'none'

    //buttons target
    const startButton = document.querySelector('#start-button')

    //tile info
    const tileSize = 15

    //snake variables
    let snakeX = 300
    let snakeY = 100
    let speedX = 0
    let speedY = 0
    let snakeBody = []
    

    //coins variables
    const coinImg = new Image();
    coinImg.src = 'images/coin.png'
    let coinX = 5*tileSize
    let coinY = 5*tileSize

    //direction variable
    let isMovingUp = false
    let isMovingDown = false
    let isMovingRight = false
    let isMovingLeft = false

    //score variables
    let score = 0

    let gameOver = false

    function drawGame(){
        canvas.style.display = 'block'
        //1. draw background
        ctx.fillStyle = 'green'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'black'
        ctx.fillRect(2, 2, canvas.width -5, canvas.height-5)
        
        //2. drawCoin
        ctx.drawImage (coinImg, coinX, coinY, tileSize, tileSize)

        //3. draw snake head
        ctx.fillStyle = 'purple'
        ctx.fillRect (snakeX, snakeY, tileSize, tileSize)

         // draw snake body when collision
        ctx.fillStyle = 'gren'
        for (let i=0; i<snakeBody.length; i++){
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
        }


        
    }
    startButton.addEventListener('click', ()=>{
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