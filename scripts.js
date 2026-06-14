// Estados do jogo
let hasKey = false;
let gateOpen = false;
let hasHarvest = false;
let gameOver = false;

const itemDisplay = document.getElementById('item-held');
const msg = document.getElementById('message');

function interact(element) {
    if (gameOver) return;

    // 1. Interação com o Galpão (Pegar a chave)
    if (element === 'shed') {
        if (!hasKey && !gateOpen) {
            hasKey = true;
            itemDisplay.innerText = "Chave do Portão 🔑";
            msg.innerText = "Você encontrou a chave antiga do portão!";
            msg.style.color = "#00796b";
        } else {
            msg.innerText = "Não há mais nada útil no galpão.";
            msg.style.color = "#757575";
        }
    }

    // 2. Interação com o Portão (O obstáculo principal)
    else if (element === 'gate') {
        if (gateOpen) {
            msg.innerText = "O portão já está aberto.";
            msg.style.color = "#757575";
        } else if (hasKey) {
            gateOpen = true;
            hasKey = false;
            itemDisplay.innerText = "Vazio";
            
            // Modifica o estado visual do portão
            document.getElementById('gate-emoji').innerText = '🔓';
            document.getElementById('gate-label').innerText = "Cerca Aberta";
            
            // Remove o bloqueio visual do próximo estágio (Plantação)
            document.getElementById('field').classList.remove('blocked');
            
            msg.innerText = "Você destrancou o portão! O caminho para as plantas está livre.";
            msg.style.color = "#2e7d32";
        } else {
            msg.innerText = "❌ Caminho bloqueado! O portão está trancado. Procure a chave.";
            msg.style.color = "#c62828";
        }
    }

    // 3. Interação com a Plantação (Só funciona se o portão for aberto)
    else if (element === 'field') {
        if (!gateOpen) {
            msg.innerText = "🔒 Obstáculo: Você não consegue alcançar as plantas com o portão fechado!";
            msg.style.color = "#c62828";
        } else if (!hasHarvest) {
            hasHarvest = true;
            itemDisplay.innerText = "Caixa de Vegetais 📦";
            msg.innerText = "Você colheu os vegetais frescos!";
            msg.style.color = "#ef6c00";
            
            // Desbloqueia o caminhão
            document.getElementById('truck').classList.remove('blocked');
        } else {
            msg.innerText = "A área já foi totalmente colhida.";
            msg.style.color = "#757575";
        }
    }

    // 4. Interação com o Caminhão (Fim do Puzzle)
    else if (element === 'truck') {
        if (!hasHarvest) {
            msg.innerText = "🔒 Obstáculo: O caminhão não vai sair sem a carga de vegetais!";
            msg.style.color = "#c62828";
        } else {
            itemDisplay.innerText = "Missão Cumprida!";
            msg.innerText = "🎉 Vitória! Você carregou o caminhão e concluiu a logística da fazenda!";
            msg.style.color = "#2e7d32";
            gameOver = true;
        }
    }
}

function resetGame() {
    hasKey = false;
    gateOpen = false;
    hasHarvest = false;
    gameOver = false;
    
    itemDisplay.innerText = "Vazio";
    msg.innerText = "Progresso reiniciado.";
    msg.style.color = "#000";
    
    document.getElementById('gate-emoji').innerText = '🔒';
    document.getElementById('gate-label').innerText = "Cerca Trancada";
    
    // Readiciona as classes de bloqueio visual
    document.getElementById('field').classList.add('blocked');
    document.getElementById('truck').classList.add('blocked');
}