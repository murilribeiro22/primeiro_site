// Elementos do HTML
const nave = document.getElementById('nave');
const estrela = document.getElementById('estrela');
const pontosValor = document.getElementById('pontos-valor');
const cenario = document.getElementById('cenario');

// Dimensões do cenário
const larguraCenario = cenario.clientWidth;
const alturaCenario = cenario.clientHeight;

// Posição inicial da nave (no centro)
let naveX = larguraCenario / 2 - 20;
let naveY = alturaCenario / 2 - 20;
const velocidade = 20; // Quantos pixels a nave anda por passo

// Pontuação inicial
let pontos = 0;

// Posições da estrela
let estrelaX = 0;
let estrelaY = 0;

// Atualiza a posição visual da nave
function atualizarNave() {
    nave.style.left = naveX + 'px';
    nave.style.top = naveY + 'px';
}

// Move a estrela para um lugar aleatório dentro do cenário
function moverEstrela Aleatoria() {
    // Garante que a estrela fique totalmente dentro dos limites
    estrelaX = Math.floor(Math.random() * (larguraCenario - 40));
    estrelaY = Math.floor(Math.random() * (alturaCenario - 40));
    
    estrela.style.left = estrelaX + 'px';
    estrela.style.top = estrelaY + 'px';
}

// Função que checa se a nave encostou na estrela (Colisão)
function checarColisao() {
    // Cria caixas virtuais em volta dos objetos para calcular a distância
    const distX = Math.abs((naveX + 20) - (estrelaX + 15));
    const distY = Math.abs((naveY + 20) - (estrelaY + 15));

    // Se estiverem muito próximos, houve colisão
    if (distX < 35 && distY < 35) {
        pontos++;
        pontosValor.textContent = pontos; // Atualiza o placar
        moverEstrelaAleatoria(); // Muda a estrela de lugar
    }
}

// Escuta os comandos do teclado
window.addEventListener('keydown', (event) => {
    const tecla = event.key.toLowerCase();

    // Movimentos e barreiras para não sair do cenário
    if ((tecla === 'arrowleft' || tecla === 'a') && naveX > 0) {
        naveX -= velocidade;
    }
    if ((tecla === 'arrowright' || tecla === 'd') && naveX < larguraCenario - 40) {
        naveX += velocidade;
    }
    if ((tecla === 'arrowup' || tecla === 'w') && naveY > 0) {
        naveY -= velocidade;
    }
    if ((tecla === 'arrowdown' || tecla === 's') && naveY < alturaCenario - 45) {
        naveY += velocidade;
    }

    atualizarNave();
    checarColisao();
});

// Inicializa o jogo posicionando os elementos
atualizarNave();
moverEstrelaAleatoria();