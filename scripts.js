<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vida na Fazenda</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Fazenda Feliz</h1>
        <p>Bem-vindo ao coração da natureza!</p>
    </header>

    <main>
        <section class="galeria">
            <h2>Nossos Animais</h2>
            <div class="cards-container">
                <div class="card" onclick="emitirSom('vaca')">
                    <h3>Mumu a Vaca</h3>
                    <p>Produz o melhor leite da região.</p>
                    <span class="emoji">🐄</span>
                </div>
                <div class="card" onclick="emitirSom('galinha')">
                    <h3>Giselda a Galinha</h3>
                    <p>Bota ovos fresquinhos toda manhã.</p>
                    <span class="emoji">🐓</span>
                </div>
                <div class="card" onclick="emitirSom('porco')">
                    <h3>Torresmo o Porquinho</h3>
                    <p>Adora tomar banho de lama no calor.</p>
                    <span class="emoji">🐖</span>
                </div>
            </div>
        </section>

        <section class="interacao">
            <h2>Atividades do Dia</h2>
            <button id="btn-alimentar" onclick="alimentarAnimais()">Alimentar os Animais</button>
            <p id="status-fazenda">Os animais estão esperando o café da manhã.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 - Feito com ❤️ para quem ama a vida no campo.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>