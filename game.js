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
