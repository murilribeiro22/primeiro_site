
// Seleciona o elemento do jogador
const jogador = document.getElementById('jogador');

// Define a posição inicial e a velocidade do movimento
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
const velocidade = 15; // Quantos pixels ele anda por clique

// Atualiza a posição visual na tela
function atualizarPosicao() {
    jogador.style.left = posX + 'px';
    jogador.style.top = posY + 'px';
}

// Inicializa a posição na tela
atualizarPosicao();

// Escuta os eventos do teclado
window.addEventListener('keydown', (event) => {
    const tecla = event.key.toLowerCase();

    // Movimento para a Esquerda
    if (tecla === 'arrowleft' || tecla === 'a') {
        posX -= velocidade;
    }
    // Movimento para a Direita
    if (tecla === 'arrowright' || tecla === 'd') {
        posX += velocidade;
    }
    // Movimento para Cima
    if (tecla === 'arrowup' || tecla === 'w') {
        posY -= velocidade;
    }
    // Movimento para Baixo
    if (tecla === 'arrowdown' || tecla === 's') {
        posY += velocidade;
    }

    // Aplica os novos valores na tela
    atualizarPosicao();
});