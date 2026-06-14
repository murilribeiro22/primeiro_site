// Mapa da Fazenda (5x5)
// 0 = Vazio, X = Cerca (Bloqueado)
const mapObstacles = [
    [0, 0, 0, 0, 0],
    [0, 'X', 'X', 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 'X', 'X', 0],
    [0, 0, 0, 0, 0]
];

// Posições fixas dos elementos no mapa (linha, coluna)
const positions = {
    hoe: { r: 0, c: 4 },
    watercan: { r: 4, c: 0 },
    gate: { r: 4, c: 4 }
};

let playerPos = { r: 0, c: 0 };
let hasHoe = false;
let hasWatercan = false;
let gameOver = false;

function initGame() {
    playerPos = { r: 0, c: 0 };
    hasHoe = false;
    hasWatercan = false;
    gameOver = false;
    document.getElementById('message').innerText = "";
    document.getElementById('inv-hoe').classList.add('grayed');
    document.getElementById('inv-water').classList.add('grayed');
    drawMap();
}

function drawMap() {
    const grid = document.getElementById('farm-grid');
    grid.innerHTML = '';

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Desenha com base no que está na célula
            if (r === playerPos.r && c === playerPos.c) {
                cell.innerText = '👨‍🌾'; // Fazendeiro se sobrepõe visualmente
            } else if (mapObstacles[r][c] === 'X') {
                cell.innerText = '🪵'; // Cerca
                cell.classList.add('obstacle');
            } else if (r === positions.hoe.r && c === positions.hoe.c && !hasHoe) {
                cell.innerText = '⛏️';
            } else if (r === positions.watercan.r && c === positions.watercan.c && !hasWatercan) {
                cell.innerText = '💧';
            } else if (r === positions.gate.r && c === positions.gate.c) {
                cell.innerText = '🚧';
            }

            grid.appendChild(cell);
        }
    }
}

// Movimentação
window.addEventListener('keydown', function(event) {
    if (gameOver) return;

    let targetR = playerPos.r;
    let targetC = playerPos.c;
    const key = event.key.toLowerCase();
    let moved = false;

    if (key === 'arrowup' || key === 'w') targetR--;
    else if (key === 'arrowdown' || key === 's') targetR++;
    else if (key === 'arrowleft' || key === 'a') targetC--;
    else if (key === 'arrowright' || key === 'd') targetC++;
    
    // Sistema de Interação (Barra de Espaço)
    else if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault(); // Evita rolar a página
        interact();
        return;
    } else {
        return; // Ignora outras teclas
    }

    // Validação se o movimento está dentro do mapa e não bate na cerca
    if (targetR >= 0 && targetR < 5 && targetC >= 0 && targetC < 5) {
        if (mapObstacles[targetR][targetC] !== 'X') {
            playerPos.r = targetR;
            playerPos.c = targetC;
            moved = true;
        }
    }

    if (moved) {
        drawMap();
    }
});

// Lógica de Interação
function interact() {
    const msg = document.getElementById('message');

    // Interagir com a Enxada
    if (playerPos.r === positions.hoe.r && playerPos.c === positions.hoe.c && !hasHoe) {
        hasHoe = true;
        document.getElementById('inv-hoe').classList.remove('grayed');
        msg.innerText = "⛏️ Você coletou a Enxada!";
        msg.style.color = "#3e2723";
        drawMap();
        return;
    }

    // Interagir com o Regador
    if (playerPos.r === positions.watercan.r && playerPos.c === positions.watercan.c && !hasWatercan) {
        if (!hasHoe) {
            msg.innerText = "❌ Ordem errada! Você precisa da Enxada para abrir caminho até o Regador!";
            msg.style.color = "#d32f2f";
            gameOver = true;
        } else {
            hasWatercan = true;
            document.getElementById('inv-water').classList.remove('grayed');
            msg.innerText = "💧 Você coletou o Regador! Vá para o portão.";
            msg.style.color = "#3e2723";
            drawMap();
        }
        return;
    }

    // Interagir com o Portão
    if (playerPos.r === positions.gate.r && playerPos.c === positions.gate.c) {
        if (hasHoe && hasWatercan) {
            msg.innerText = "🎉 Incrível! Você usou as ferramentas na ordem certa e liberou a fazenda!";
            msg.style.color = "#388e3c";
            gameOver = true;
        } else {
            msg.innerText = "🚧 O portão exige ferramentas específicas e interação em ordem para abrir!";
            msg.style.color = "#d32f2f";
        }
        return;
    }

    // Clicou espaço no vazio
    msg.innerText = "Nada aqui para interagir... 🤔";
    msg.style.color = "#757575";
}

function resetGame() {
    initGame();
}

// Inicializa ao carregar
initGame();