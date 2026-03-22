const board = document.querySelector('.board');
const boardwidth = 30;
const boardheight = 30;

const cols = Math.floor(board?.clientWidth / boardwidth);
const rows = Math.floor(board?.clientHeight / boardheight);

for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board?.appendChild(block);
    }
}