document.addEventListener('DOMContentLoaded', function() {
    // Variáveis do jogo
    const gameState = {
        score: 0,
        level: 1,
        correctAnswers: 0,
        totalQuestions: 0,
        levelThreshold: 1000,
        currentWaste: null
    };

    // Elementos da UI
    const uiElements = {
        score: document.getElementById('score'),
        level: document.getElementById('level'),
        correct: document.getElementById('correct'),
        progressBar: document.getElementById('progressBar'),
        leaderboard: document.getElementById('leaderboard'),
        infoModal: document.getElementById('infoModal'),
        categories: document.querySelectorAll('.category'),
        infoButton: document.getElementById('infoButton'),
        closeButton: document.querySelector('.close')
    };

    // Dados de exemplo para o ranking
    const leaderboardData = [
        { position: 1, name: "Bruno", score: 4500, level: 5 },
        { position: 2, name: "João", score: 3800, level: 4 },
        { position: 3, name: "Leandro", score: 3200, level: 3 },
        { position: 4, name: "Gabriel", score: 2500, level: 3 },
        { position: 5, name: "Você", score: gameState.score, level: gameState.level }
    ];

    // Mapeamento de categorias
    const wasteItems = [
        { name: "Garrafa de plástico", correctCategory: "plastic" },
        { name: "Jornal", correctCategory: "paper" },
        { name: "Lata de alumínio", correctCategory: "metal" },
        { name: "Casca de banana", correctCategory: "organic" },
        { name: "Garrafa de vidro", correctCategory: "glass" },
        { name: "Embalagem de isopor", correctCategory: "plastic" }
    ];

    // Inicialização do jogo
    function initGame() {
        updateScore();
        updateLeaderboard();
        setupEventListeners();
        showWasteItem(getRandomWasteItem());
    }

    // Configurar listeners de eventos
    function setupEventListeners() {
        uiElements.categories.forEach(category => {
            category.addEventListener('click', function() {
                classifyWaste(this.dataset.category);
            });
        });

        uiElements.infoButton.addEventListener('click', showInfoModal);
        uiElements.closeButton.addEventListener('click', closeModal);

        window.addEventListener('click', function(event) {
            if (event.target === uiElements.infoModal) {
                closeModal();
            }
        });
    }

    // Classificar resíduo
    function classifyWaste(selectedCategory) {
        gameState.totalQuestions++;
        
        if (selectedCategory === gameState.currentWaste.correctCategory) {
            gameState.correctAnswers++;
            const pointsEarned = 100 * gameState.level;
            gameState.score += pointsEarned;
            alert(`Correto! +${pointsEarned} pontos`);
        } else {
            alert(`Incorreto! Era ${gameState.currentWaste.correctCategory}`);
        }

        // Verificar subida de nível
        if (gameState.score >= gameState.level * gameState.levelThreshold) {
            gameState.level++;
            alert(`Parabéns! Você alcançou o nível ${gameState.level}!`);
        }

        updateScore();
        showWasteItem(getRandomWasteItem());
    }

    // Atualizar a UI com os dados do jogo
    function updateScore() {
        uiElements.score.textContent = gameState.score;
        uiElements.level.textContent = gameState.level;
        uiElements.correct.textContent = `${gameState.correctAnswers}/${gameState.totalQuestions}`;
        
        const progress = (gameState.score % gameState.levelThreshold) / gameState.levelThreshold * 100;
        uiElements.progressBar.style.width = `${progress}%`;
        
        // Atualizar ranking
        leaderboardData[4].score = gameState.score;
        leaderboardData[4].level = gameState.level;
        updateLeaderboard();
    }

    // Atualizar o ranking
    function updateLeaderboard() {
        uiElements.leaderboard.innerHTML = '';
        
        leaderboardData
            .sort((a, b) => b.score - a.score)
            .forEach((player, index) => {
                const row = document.createElement('tr');
                if (player.name === "Você") {
                    row.style.fontWeight = 'bold';
                    row.style.backgroundColor = '#c8e6c9';
                }
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                    <td>${player.level}</td>
                `;
                
                uiElements.leaderboard.appendChild(row);
            });
    }

    // Mostrar um novo resíduo
    function showWasteItem(wasteItem) {
        gameState.currentWaste = wasteItem;
        alert(`Classifique: ${wasteItem.name}`);
    }

    // Obter um resíduo aleatório
    function getRandomWasteItem() {
        return wasteItems[Math.floor(Math.random() * wasteItems.length)];
    }

    // Modal de informações
    function showInfoModal() {
        uiElements.infoModal.style.display = 'block';
    }

    function closeModal() {
        uiElements.infoModal.style.display = 'none';
    }

    // Iniciar o jogo
    initGame();
});