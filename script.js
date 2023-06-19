var gameStart = document.getElementById("gameStart");
var gameSpeed = document.getElementById("gameSpeed");
var gameArea = document.getElementById("gameArea");
// The 2D rendering context provides a set of methods and properties for drawing and manipulating graphics on the canvas.
gameAreaContext = gameArea.getContext("2d")
gameAreaWidth = 0
gameAreaHeight = 0
cellWidth = 0
playScore = 0
speed = 0
snake = null
snakeFood = null
snakeDirection = null
timer = null


// document.addEventListener("DOMContentLoaded", function () {
//     // Function to be called at the first render of the page
//     initialize();
// });


//initialize values
function initialize() {
    gameAreaWidth = 400;
    gameAreaHeight = 400;
    cellWidth = 5;
    gameArea.width = gameAreaWidth
    gameArea.height = gameAreaHeight

    gameStart.addEventListener("click", function () {
        this.disabled = true;
        startGame();
    })
}

//start the game
function startGame() {
    playScore = 0;
    snakeDirection = "right"
    speed = parseInt(gameSpeed.value)
    if (speed > 9 || speed < 1) {
        speed = 1;
    }
    snake = []
    snake.push({ x: 0, y: cellWidth })
    // for (var i = 0; i < snake.length; i++) { 
    //     createSquare(snake[i].x,snake[i].y)
    // }
    createFood()
    clearInterval(timer)
    timer = setInterval(createGameArea , 500/speed)
}




function createGameArea() { 
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    gameAreaContext.fillStyle = "white"
    gameAreaContext.fillRect(0, 0, gameAreaWidth, gameAreaHeight)
    gameAreaContext.strokeStyle = "#CCCCCC"
    gameAreaContext.strokeRect(0, 0, gameAreaWidth, gameAreaHeight)

    if (snakeDirection == 'right') {
        snakeX+=5
        
    } else if(snakeDirection == 'left')
    {
        snakeX-=5
    } else if(snakeDirection == 'up')
    {
        snakeY+=5
    }
    else if(snakeDirection == 'down')
    {
        snakeY-=5
    }
    if (snakeX == -1 || snakeY == -1 ||
        snakeX == gameAreaWidth || snakeY == gameAreaHeight ||
        Controll(snakeX, snakeY, snake)) {
        writeScore()
        //used to stop the timer identified by the timer variable. By calling clearInterval(timer)
        clearInterval(timer)
        gameStart.disabled = false
        return;
    }
    if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
        playScore += speed
        var newHead = { x: snakeFood.x, y: snakeFood.y }
        createFood()
    } else {
        var newHead = snake.pop();
        newHead.x = snakeX;
        newHead.y = snakeY;
    }
    snake.unshift(newHead);
    for (var i = 0; i < snake.length; i++){
        createSquare(snake[i].x,snake[i].y)
    }
    createSquare(snakeFood.x,snakeFood.y)
}


















//give the cordination of the food
function createFood() {
    snakeFood = {
        x: Math.ceil(Math.random() * gameAreaWidth / 5)*5,
        y: Math.ceil(Math.random() * gameAreaHeight / 5)*5
    }
    
}
function Controll(x, y, array) {
    for (var i = 0; i < array.length; i++) { 
        if (array[i].x == x && array[i].y == y) return true;
        else return false;
    }
    
}

//display the score
function writeScore() {
    gameAreaContext.font = "50px Arial"
    gameAreaContext.fillStyle = "black"
    gameAreaContext.fillText("Score: " + playScore, gameAreaWidth/2 -100, gameAreaWidth/2)
}

//create the black square in general
function createSquare(x, y) {
    gameAreaContext.fillStyle = "black "
    gameAreaContext.fillRect(x + cellWidth, y + cellWidth, cellWidth, cellWidth)
}
//The purpose of this function is to listen for specific arrow key presses and update the snakeDirection variable accordingly, ensuring that the snake does not change its direction to the opposite direction (e.g., from left to right or from up to down)
function changeDirection(e) {
    //The which property represents the key code of the key that was pressed.
    var keys = e.which;
    //his line checks if the pressed key has a key code of "40" (arrow down key) and if the snakeDirection is not "up"
    if (keys == "40" && snakeDirection != "down") snakeDirection = "up"
    else if (keys == "39" && snakeDirection != "left") snakeDirection = "right"
    else if (keys == "38" && snakeDirection != "up") snakeDirection = "down"
    else if (keys == "37" && snakeDirection != "right") snakeDirection = "left"
    
}
window.onkeydown = changeDirection;
window.onload = initialize;
