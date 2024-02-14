# Object-Collector-Game

#HTML CODE:
<!DOCTYPE html>
<html>
<head>
    <title>Collecting Objects Game</title>
    <link rel="icon" type="image" href="favicon.jpg">
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url(favicon.jpg);
            background-size:71%;
           
            font-family: Arial, Helvetica, sans-serif, sans-serif;

            
        }

        canvas {
            border: 2px solid #333;
            border-radius: 25px;
            box-shadow: 0 0 10px rgba(93, 52, 52, 0.3);
            background-image: url(canvas.jpg);
            background-position: center;
            background-size: 120%;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script src="game.js"></script>
</body>
</html>

This HTML document defines a webpage for a "Collecting Objects Game." It includes a head section with a title and favicon, while the body contains a canvas element for game rendering and a linked JavaScript file ("game.js") for game logic. The CSS styles specify the appearance of the body and canvas, with background images and various visual properties. The canvas is set to 800x600 pixels and features a border, border-radius, and box shadow. The overall design centers the content, uses a specific font family, and creates an immersive visual experience for the game.


#Javascript code:

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 70,
    height: 15,
    score: 0,
    speed: 15
    
    
};

let fallingObject = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 11.5,
    speed: 1// Increased falling object speed
};

function update() {
    if (player.x < fallingObject.x + fallingObject.width &&
        player.x + player.width > fallingObject.x &&
        player.y < fallingObject.y + fallingObject.height &&
        player.y + player.height > fallingObject.y) {
        player.score += 10;
        fallingObject.x = Math.random() * (canvas.width - 20);
        fallingObject.y = 0;
    }

    fallingObject.y += fallingObject.speed;

    if (fallingObject.y > canvas.height) {
        showTryAgainMessage();
        return; // Stop updating when "Try Again" message is displayed
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'maroon';
    ctx.fillRect(fallingObject.x, fallingObject.y, fallingObject.width, fallingObject.height);

    ctx.fillStyle = '#03020a';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + player.score, 10, 30);

    requestAnimationFrame(update);
}

function showTryAgainMessage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '29px Arial';
   
    ctx.fillStyle = 'black';
    ctx.fillText('----Object dropped! Press Enter to try again----', canvas.width / 2 - 300, canvas.height / 2);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && fallingObject.y > canvas.height) {
        player.score = 0;
        fallingObject.x = Math.random() * (canvas.width - 20);
        fallingObject.y = 0;
        update(); // Start the game loop again
    } else if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

update();


The provided JavaScript code implements a simple browser-based game using the HTML5 canvas element. The game involves a player-controlled rectangular object at the bottom of the canvas that attempts to catch falling objects represented by smaller rectangles. When a collision occurs between the player and a falling object, the player's score increases, and a new falling object is generated. The game continuously updates and renders the elements on the canvas, displaying the player's score and a "Try Again" message when a falling object reaches the bottom. Players can restart the game by pressing the 'Enter' key, and the player object can be moved horizontally using the left and right arrow keys. The code utilizes the canvas 2D context and incorporates event listeners for keyboard input. The game loop is maintained through the use of the `requestAnimationFrame` function.
