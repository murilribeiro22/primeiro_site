// Grade estática 5x5
// 0 = Espaço vazio, 1 = Obstáculo fixo, 2 = Bloco Destino
const gridMap = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [2, 0, 0, 0, 0]
];

let playerBlock = { r: 0, c: 0 };
let seedBlock = { r: 0, c: 4 };

let hasSeed = false;
let moveCount = 0;
let isFinished = false;

function initGame() {
    playerBlock = { r: 0, c: 0 };
    seedBlock = { r: 0, c: 4 };
    hasSeed = false;
    moveCount = 0;
    isFinished = false;

    document.getElementById('message').innerText = "";
    document.getElementById('moves-display').innerText = moveCount;
    document.getElementById('cargo-display').innerText = "Nenhuma";
    
    drawGrid();
}

function drawGrid() {
    const grid = document.getElementById('farm-grid');
    grid.innerHTML = '';

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Verifica o posicionamento dos blocos com prioridades
            if (playerBlock.r === r && playerBlock.c === c) {
                cell.classList.add('player');
            } else if (seedBlock.r === r && seedBlock.c === c && !hasSeed) {
                cell.classList.add('seed');
            } else if (gridMap[r][c] === 1) {
                cell.classList.add('wall');
            } else if (gridMap[r][c] === 2) {
                cell.classList.add('target');
            }

            grid.appendChild(cell);
        }
    }
}

window.addEventListener('keydown', function(e) {
    if (isFinished) return;

    let nextR = playerBlock.r;
    let nextC = playerBlock.c;
    const key = e.key.toLowerCase();
    let isMoved = false;

    if (key === 'arrowup' || key === 'w') nextR--;
    else if (key === 'arrowdown' || key === 's') nextR++;
    else if (key === 'arrowleft' || key === 'a') nextC--;
    else if (key === 'arrowright' || key === 'd') nextC++;
    else return;

    // Validação física de colisão de blocos
    if (nextR >= 0 && nextR < 5 && nextC >= 0 && nextC < 5) {
        if (gridMap[nextR][nextC] !== 1) {
            playerBlock.r = nextR;
            playerBlock.c = nextC;
            isMoved = true;
        }
    }

    if (isMoved) {
        moveCount++;
        document.getElementById('moves-display').innerText = moveCount;
        checkLogic();
        drawGrid();
    }
});

function checkLogic() {
    const msg = document.getElementById('message');

    // Sobreposição com o Bloco Semente
    if (playerBlock.r === seedBlock.r && playerBlock.c === seedBlock.c && !hasSeed) {
        hasSeed = true;
        document.getElementById('cargo-display').innerText = "Semente [Conectado]";
        msg.innerText = "Bloco de semente acoplado.";
        msg.style.color = "#2196f3";
    }

    // Sobreposição com o Bloco Destino
    if (gridMap[playerBlock.r][playerBlock.c] === 2) {
        if (hasSeed) {
            msg.innerText = "SUCESSO: Conexão concluída!";
            msg.style.color = "#4caf50";
            isFinished = true;
        } else {
            msg.innerText = "AVISO: Destino exige semente.";
            msg.style.color = "#795548";
        }
    }
}

function resetGame() {
    initGame();
}

// Inicialização automática
initGame();