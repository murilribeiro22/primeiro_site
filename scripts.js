// A ordem correta dos IDs que o jogador deve clicar
const correctOrder = [1, 2, 3];
let playerOrder = [];

function waterPlant(element) {
    // Se a planta já foi regada, não faz nada
    if (element.classList.contains('watered')) return;

    const plantId = parseInt(element.getAttribute('data-id'));
    
    // Adiciona o ID do clique do jogador na lista
    playerOrder.push(plantId);
    
    // Visualmente marca a planta como regada
    element.classList.add('watered');

    // Verifica se o clique atual foi correto
    const currentStep = playerOrder.length - 1;
    if (playerOrder[currentStep] !== correctOrder[currentStep]) {
        document.getElementById('message').innerText = "❌ Ordem errada! A planta murchou. Tente de novo!";
        document.getElementById('message').style.color = "#d32f2f";
        disableAllPlots();
        return;
    }

    // Se acertou a ordem e completou todas
    if (playerOrder.length === correctOrder.length) {
        document.getElementById('message').innerText = "🎉 Parabéns! Você resolveu o enigma e a colheita foi um sucesso! 🌾🍅🌻";
        document.getElementById('message').style.color = "#388e3c";
    }
}

function disableAllPlots() {
    // Impede mais cliques adicionando a classe em tudo caso erre
    const plots = document.querySelectorAll('.plot');
    plots.forEach(plot => plot.style.pointerEvents = 'none');
}

function resetGame() {
    // Reseta a lógica do jogo
    playerOrder = [];
    document.getElementById('message').innerText = "";
    
    // Reseta o visual do cenário
    const plots = document.querySelectorAll('.plot');
    plots.forEach(plot => {
        plot.classList.remove('watered');
        plot.style.pointerEvents = 'auto';
    });
}