const board = document.querySelector('.board');
const boardwidth = 30;
const boardheight = 30;

const cols = Math.floor(board?.clientWidth / boardwidth);
const rows = Math.floor(board?.clientHeight / boardheight);

for(let i = 0; i < rows * cols; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    board?.appendChild(block);
}