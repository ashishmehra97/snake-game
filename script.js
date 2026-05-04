const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const highScoreElement = document.querySelector('#high-score-value');
const scoreElement = document.querySelector('#score-value');
const timeElement = document.querySelector('#time');

const boardwidth = 50;
const boardheight = 50;
let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let time = `00:00`;

highScoreElement.innerText = highScore;

const cols = Math.floor(board?.clientWidth / boardwidth);
const rows = Math.floor(board?.clientHeight / boardheight);
let intervalId = null;
let timeIntervalId = null;
let food = {x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

const blocks = [];
let snake = [
    {
        x: 1, y: 3
    }, {
        x: 1, y: 4
    }, {
        x: 1, y: 5
    }
];

let direction = 'left';

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function renderSnake() {
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add('food');
    if (direction === 'left') {
        head = { x: snake[0].x, y: snake[0].y - 1}
    }else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1}
    }else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);
        modal.style.display = 'flex';
        startGameModal.style.display = 'none';
        gameOverModal.style.display = 'flex';
        return;
    }

    if(head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = {x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
        blocks[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);
        score += 10;
        scoreElement.textContent = score;

        if(score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
        }
    }


    snake.forEach(segment => {
        const block = blocks[`${segment.x}-${segment.y}`];
        if (block) {
            block.classList.remove('fill');
        }
    });

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => {
        const block = blocks[`${segment.x}-${segment.y}`];
        if (block) {
            block.classList.add('fill');
        }
    });
}

startButton.addEventListener('click', () => {
    modal.style.display = 'none';
    intervalId = setInterval(() => {
        renderSnake();
    }, 300);
    // timeIntervalId = setInterval(() => {
    //     let [minutes, seconds] = time.split(':').map(Number);
    //     seconds += 1;
    // });
});

restartButton.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    blocks[`${food.x}-${food.y}`].classList.remove('food');
    snake.forEach(segment => {
        const block = blocks[`${segment.x}-${segment.y}`];
        if (block) {
            block.classList.remove('fill');
        }
    });
    score = 0;
    time = `00:00`;
    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;
    modal.style.display = 'none';
    direction = 'down';
    snake = [
        { x: 1, y: 3 }, 
        { x: 1, y: 4 }, 
        { x: 1, y: 5 }
    ];

    food = {x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
}

addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        direction = 'left';
    }else if (e.key === 'ArrowRight') {
        direction = 'right';
    }else if (e.key === 'ArrowUp') {
        direction = 'up';
    }else if (e.key === 'ArrowDown') {
        direction = 'down';
    }
});