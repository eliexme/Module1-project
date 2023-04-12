window.addEventListener('load', ()=>{
    //context
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.display = 'none'
    //buttons target
    const startButton = document.querySelector('#start-button')
    //tile info
    const tileSize = 15

    //snake
    let snakeX = 300
    let snakeY = 150
    let vectorX = 0
    let vectorY = 0
    let speed = 1
    let snakeBody = []

    //coin
    let coinX
    let coinY
    const coinImg = new Image()
    coinImg.src = 'images/coin.png'

    function drawGame(){
        //draw background
        ctx.fillStyle = 'green'
        ctx.fillRect (0, 0, canvas.width, canvas.height)
        ctx.fillStyle= 'black'
        ctx.fillRect (2, 2, canvas.width -4, canvas.height -4)

        //drawCoin
        ctx.drawImage(coinImg, coinX, coinY, tileSize, tileSize)

        //checkColision
        if (snakeX + tileSize > coinX && 
            snakeX < coinX + tileSize && 
            snakeY + tileSize > coinY &&
            snakeY < coinY + tileSize 
            ){
                //if there's a collision we add(push) a new part to the body with the coordinates of the existing head
                snakeBody.push([snakeX * tileSize, snakeY*tileSize])
                placeCoin()
                console.log(snakeBody)
            }

            //here we make the body move after the head by deleting the last array element and replacing the location of the previous element(starting from the last element)
            for (let i=snakeBody.length-1; i>0; i--){
                snakeBody[i] = snakeBody[i-1]
            }
            if(snakeBody.length){
                snakeBody[0] = [snakeX, snakeY]
            }

            //draw snake head
            ctx.fillStyle = 'purple'
            snakeX += (vectorX*speed)
            snakeY += (vectorY*speed)
            ctx.fillRect (snakeX, snakeY, tileSize, tileSize)

            //here we draw the vody part in the position of the prev coin/snake (before the boding gets moving)
            
            ctx.fillStyle = 'orange'
            for (let i=0; i<snakeBody.length; i++){
                ctx.fillRect (snakeBody[i][0], snakeBody[i][1], tileSize, tileSize)
            }
        
            console.log(snakeX, snakeY)
        
            
            
            
        requestAnimationFrame (drawGame)
    }

    function placeCoin() {
        coinX = 2 + Math.floor(Math.random() * ((canvas.width - 2) - tileSize));
        coinY = 2 + Math.floor(Math.random() * ((canvas.height - 2) - tileSize));
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
      

    startButton.addEventListener('click', ()=>{
        canvas.style.display = 'block'
        placeCoin()
        document.addEventListener('keydown', changeDirection)
        drawGame()
    })
})