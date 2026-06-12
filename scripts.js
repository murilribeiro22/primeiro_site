
function emitirSom(animal) {
    if (animal === 'vaca') {
        alert("A vaca Mumu diz: Múúúúú! 🐄");
    } else if (animal === 'galinha') {
        alert("A galinha Giselda diz: Có-có-ri-có! 🐓");
    } else if (animal === 'porco') {
        alert("O porquinho Torresmo diz: Oinc-oinc! 🐖");
    }
}

// Função para mudar o status da fazenda
function alimentarAnimais() {
    const statusText = document.getElementById("status-fazenda");
    const botao = document.getElementById("btn-alimentar");
    
    statusText.innerText = "🌾 Nhac-nhac! Todos os animais foram alimentados e estão felizes!";
    statusText.style.color = "#4f772d";
    
    // Desativa o botão temporariamente
    botao.disabled = true;
    botao.innerText = "Alimentados!";
    botao.style.backgroundColor = "#90a955";
    botao.style.cursor = "default";
}