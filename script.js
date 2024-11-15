const way = document.getElementById('way');
const main = document.getElementById('main');
const finalMessage = document.getElementById('final-message');
const player = document.getElementById('player');
const walls = document.querySelectorAll('.wall');
const coins = document.querySelectorAll('.coin');
const progressBar = document.getElementById('progress-bar');
const enemies = document.querySelectorAll('.enemy');

let playerPosition = { x: 0, y: 0 };
const gridSize = 20;
let coinsCollected = 0;
const totalCoins = coins.length;

// Função para salvar a posição do jogador no localStorage
function savePlayerPosition() {
    localStorage.setItem('playerPositionX', playerPosition.x);
    localStorage.setItem('playerPositionY', playerPosition.y);
}

// Função para carregar a posição do jogador do localStorage
function loadPlayerPosition() {
    const savedX = localStorage.getItem('playerPositionX');
    const savedY = localStorage.getItem('playerPositionY');

    console.log(`X:${savedX}, Y:${savedY}`)

    if (savedX !== null && savedY !== null) {
        playerPosition.x = parseInt(savedX);
        playerPosition.y = parseInt(savedY);
    }
}

// Função para atualizar a posição do jogador
function updatePlayerPosition() {
    player.style.left = playerPosition.x * gridSize + 'px';
    player.style.top = playerPosition.y * gridSize + 'px';
    savePlayerPosition(); // Salva a posição após atualizar
    loadPlayerPosition()
    checkCoinCollision();
    checkWayCollision();
    checkEnemyCollision();
}

function checkEnemyCollision() {
    enemies.forEach(enemy => {
        checkPlayerEnemyCollision(enemy);
    });
}

let keyPressed = false;

// Captura eventos de movimento com as teclas
window.addEventListener('keydown', (event) => {
    if (!keyPressed) {
        keyPressed = true;

        let newPosition = { ...playerPosition };

        switch (event.key) {
            case 'ArrowUp':
                newPosition.y--;
                break;
            case 'ArrowDown':
                newPosition.y++;
                break;
            case 'ArrowLeft':
                newPosition.x--;
                break;
            case 'ArrowRight':
                newPosition.x++;
                break;
        }

        if (!checkForWallCollision(newPosition)) {
            playerPosition = newPosition;
            updatePlayerPosition();
        }
    }
});

window.addEventListener('keyup', () => {
    keyPressed = false;
});

// Verifica colisão com a saída
function checkWayCollision() {
    const playerLeft = playerPosition.x * gridSize;
    const playerTop = playerPosition.y * gridSize;
    const playerRight = playerLeft + gridSize;
    const playerBottom = playerTop + gridSize;

    const wayLeft = way.offsetLeft;
    const wayTop = way.offsetTop;
    const wayRight = wayLeft + way.offsetWidth;
    const wayBottom = wayTop + way.offsetHeight;

    if (
        playerRight > wayLeft &&
        playerLeft < wayRight &&
        playerBottom > wayTop &&
        playerTop < wayBottom
    ) {
        main.style.display = "none";
        finalMessage.style.display = "flex";
        finalMessage.querySelector("p").textContent = "Você concluiu o labirinto parabéns!";
        finalMessage.querySelector("img").src = "https://png.pngtree.com/png-clipart/20220404/original/pngtree-trophy-champion-gold-icon-vector-png-image_7509888.png";

        // Limpa o progresso do jogador e reinicia o jogo
        localStorage.removeItem('playerPositionX');
        localStorage.removeItem('playerPositionY');
        coinsCollected = 0; // Reseta as moedas coletadas

    }
}

// Verifica colisão com as paredes
function checkForWallCollision(newPosition) {
    let collision = false;

    const playerLeft = newPosition.x * gridSize;
    const playerTop = newPosition.y * gridSize;
    const playerRight = playerLeft + gridSize;
    const playerBottom = playerTop + gridSize;

    walls.forEach(wall => {
        if (wall.classList.contains('no-collision')) return;

        const wallLeft = wall.offsetLeft;
        const wallTop = wall.offsetTop;
        const wallRight = wallLeft + wall.offsetWidth;
        const wallBottom = wallTop + wall.offsetHeight;

        if (
            playerRight > wallLeft &&
            playerLeft < wallRight &&
            playerBottom > wallTop &&
            playerTop < wallBottom
        ) {
            collision = true;
        }
    });

    return collision;
}

// Verifica colisão com as moedas
function checkCoinCollision() {
    coins.forEach(coin => {
        const coinLeft = coin.offsetLeft;
        const coinTop = coin.offsetTop;
        const coinRight = coinLeft + coin.offsetWidth;
        const coinBottom = coinTop + coin.offsetHeight;

        const playerLeft = playerPosition.x * gridSize;
        const playerTop = playerPosition.y * gridSize;
        const playerRight = playerLeft + gridSize;
        const playerBottom = playerTop + gridSize;

        if (
            playerRight > coinLeft &&
            playerLeft < coinRight &&
            playerBottom > coinTop &&
            playerTop < coinBottom &&
            !coin.classList.contains('collected')
        ) {
            coin.classList.add('collected');
            coin.style.display = 'none';
            coinsCollected++;
            updateProgressBar();
        }
    });
}

function updateProgressBar() {
    const msg = document.getElementById('msg');
    const progress = (coinsCollected / totalCoins) * 100;
    progressBar.style.width = progress + '%';

    if (progress === 100) {
        way.classList.remove("error");
        way.classList.add("success");
        way.classList.add("no-collision");
        msg.textContent = "Ache a saída do labirinto";
    }
}

// Função para mover os inimigos
function moveEnemies() {
    enemies.forEach(enemy => {
        let enemyDirection = 1;
        const moveInterval = setInterval(() => {
            let currentTop = parseInt(enemy.style.top) || 0;
            let newTop = currentTop + (gridSize * enemyDirection);

            if (checkForWallCollision({ x: parseInt(enemy.style.left) / gridSize, y: newTop / gridSize })) {
                enemyDirection *= -1;
            } else {
                enemy.style.top = newTop + 'px';
            }

            checkPlayerEnemyCollision(enemy);
        }, 500);
    });
}

// Verifica colisão com inimigos
function checkPlayerEnemyCollision(enemy) {
    const playerLeft = playerPosition.x * gridSize;
    const playerTop = playerPosition.y * gridSize;
    const playerRight = playerLeft + gridSize;
    const playerBottom = playerTop + gridSize;

    const enemyLeft = parseInt(enemy.style.left);
    const enemyTop = parseInt(enemy.style.top);
    const enemyRight = enemyLeft + gridSize;
    const enemyBottom = enemyTop + gridSize;

    if (
        playerRight > enemyLeft &&
        playerLeft < enemyRight &&
        playerBottom > enemyTop &&
        playerTop < enemyBottom
    ) {
        playerPosition.x += 1
        main.style.display = "none";
        finalMessage.style.display = "flex";
        finalMessage.querySelector("p").textContent = "Você foi pego!";
        finalMessage.querySelector("img").src = "./morte.png";
        savePlayerPosition();
    }
}

function restart() {
    location.reload();

    loadPlayerPosition();
}

moveEnemies();

loadPlayerPosition();
updatePlayerPosition();