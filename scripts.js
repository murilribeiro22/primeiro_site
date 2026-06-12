// Seleciona o elemento do fazendeiro
const fazendeiro = document.getElementById('fazendeiro');

// Posição inicial no centro da tela
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
const velocidade = 10; // Pixels por movimento

// Função para atualizar a posição do fazendeiro na tela
function atualizarPosicao() {
    fazendeiro.style.left = posX + 'px';
    fazendeiro.style.top = posY + 'px';
}

// Inicializa a posição
atualizarPosicao();

// Função para checar colisões (evitar que o fazendeiro saia da tela)
function verificarLimites(novaX, novaY) {
    const raio = fazendeiro.offsetWidth / 2;
    // Verifica limites horizontais
    if (novaX - raio < 0) novaX = raio;
    if (novaX + raio > window.innerWidth) novaX = window.innerWidth - raio;
    
    // Verifica limites verticais
    if (novaY - raio < 0) novaY = raio;
    if (novaY + raio > window.innerHeight) novaY = window.innerHeight - raio;

    return { x: novaX, y: novaY };
}

// Escuta o pressionamento de teclas
window.addEventListener('keydown', (event) => {
    const tecla = event.key.toLowerCase();
    
    // Calcula a nova posição pretendida
    let novaX = posX;
    let novaY = posY;

    // Movimento para Cima (W ou Seta Cima)
    if (tecla === 'arrowup' || tecla === 'w') {
        novaY -= velocidade;
    }
    // Movimento para Baixo (S ou Seta Baixo)
    if (tecla === 'arrowdown' || tecla === 's') {
        novaY += velocidade;
    }
    // Movimento para Esquerda (A ou Seta Esquerda)
    if (tecla === 'arrowleft' || tecla === 'a') {
        novaX -= velocidade;
    }
    // Movimento para Direita (D ou Seta Direita)
    if (tecla === 'arrowright' || tecla === 'd') {
        novaX += velocidade;
    }

    // Aplica os limites e atualiza a posição final
    const posicaoLimitada = verificarLimites(novaX, novaY);
    posX = posicaoLimitada.x;
    posY = posicaoLimitada.y;
    atualizarPosicao();
});