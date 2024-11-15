import { Player } from '../classes/Player';
import { Coin } from '../classes/Coin';
import { Enemy } from '../classes/Enemy';

export class Game {
    private player: Player;
    private coins: Coin[];  
    private enemies: Enemy[];
    private progressBar: HTMLElement;
    private walls: HTMLElement[];
    private totalCoins: number;
    private coinsCollected: number = 0;

    constructor(
        player: Player,
        coins: Coin[],
        enemies: Enemy[],
        walls: HTMLElement[],
        progressBar: HTMLElement
    ) {
        this.player = player;
        this.coins = coins;
        this.enemies = enemies;
        this.walls = walls;
        this.progressBar = progressBar;
        this.totalCoins = coins.length;

        // Inicia o movimento dos inimigos
        this.moveEnemies();
    }

    start() {
        window.addEventListener('keydown', (event) => {
            let direction = { x: 0, y: 0 };
            switch (event.key) {
                case 'ArrowUp':
                    direction.y = -1;
                    break;
                case 'ArrowDown':
                    direction.y = 1;
                    break;
                case 'ArrowLeft':
                    direction.x = -1;
                    break;
                case 'ArrowRight':
                    direction.x = 1;
                    break;
            }
            this.player.move(direction, this.walls);
            this.checkCoinCollision();
            this.checkEnemyCollision();
        });
    }


    // Método para mover os inimigos
    private moveEnemies() {
        this.enemies.forEach(enemy => {
            let enemyDirection = 1; // 1 para baixo, -1 para cima
            const moveInterval = setInterval(() => {
                const currentPosition = enemy.getPosition(); // Obtemos a posição atual do inimigo
                const newTop = currentPosition.y + enemyDirection; // Adicionamos a direção

                // Cria uma nova posição para checar a colisão
                const potentialNewPosition = { x: currentPosition.x, y: newTop };

                // Checa se a nova posição resultará em uma colisão
                if (this.checkForWallCollision(potentialNewPosition)) {
                    enemyDirection *= -1; // Inverte a direção ao colidir
                    // Atualiza a nova posição para refletir a direção invertida
                    const newTopAfterCollision = currentPosition.y + enemyDirection;
                    enemy.setPosition(currentPosition.x, newTopAfterCollision); // Atualiza a posição lógica
                    enemy.element.style.top = `${newTopAfterCollision * 20}px`; // Atualiza a posição visual
                } else {
                    enemy.setPosition(currentPosition.x, newTop); // Atualiza a posição lógica
                    enemy.element.style.top = `${newTop * 20}px`; // Atualiza a posição visual
                }

                this.checkEnemyCollision(); // Verifica colisões com o jogador
            }, 500); // Intervalo de movimentação
        });
    }




    // Verifica colisão com paredes
    private checkForWallCollision(newPosition: { x: number; y: number }): boolean {
        let collision = false;

        const enemyLeft = newPosition.x * 20; // Ajustar para o tamanho da célula
        const enemyTop = newPosition.y * 20;   // Ajustar para o tamanho da célula
        const enemyRight = enemyLeft + 20;
        const enemyBottom = enemyTop + 20;

        this.walls.forEach(wall => {
            if (wall.classList.contains('no-collision')) return;

            const wallLeft = wall.offsetLeft;
            const wallTop = wall.offsetTop;
            const wallRight = wallLeft + wall.offsetWidth;
            const wallBottom = wallTop + wall.offsetHeight;

            if (
                enemyRight > wallLeft &&
                enemyLeft < wallRight &&
                enemyBottom > wallTop &&
                enemyTop < wallBottom
            ) {
                collision = true; // Colisão detectada
            }
        });

        return collision;
    }


    checkCoinCollision() {
        this.coins.forEach(coin => {
            if (coin.checkCollision(this.player.getPosition(), this.player.getGridSize())) {
                this.coinsCollected++;
                this.updateProgress();
            }
        });
    }

    checkEnemyCollision() {
        this.enemies.forEach(enemy => {
            const playerPosition = this.player.getPosition();
            const gridSize = this.player.getGridSize();

            const playerLeft = playerPosition.x * gridSize;
            const playerTop = playerPosition.y * gridSize;
            const playerRight = playerLeft + gridSize;
            const playerBottom = playerTop + gridSize;

            const enemyPosition = enemy.getPosition();

            const enemyLeft = enemyPosition.x * gridSize;
            const enemyTop = enemyPosition.y * gridSize;
            const enemyRight = enemyLeft + gridSize;
            const enemyBottom = enemyTop + gridSize;

            // Verifica se há colisão
            if (
                playerRight > enemyLeft &&
                playerLeft < enemyRight &&
                playerBottom > enemyTop &&
                playerTop < enemyBottom
            ) {
                this.playerDied(); // Chama o método para o evento de morte do jogador
            }
        });
    }

    playerDied() {
        const main = document.getElementById('main') as HTMLElement;
        const finalMessage = document.getElementById('final-message') as HTMLElement;

        // Exibe mensagem de morte
        main.style.display = "none";
        finalMessage.style.display = "flex";
        finalMessage.querySelector("p")!.textContent = "Você foi pego!";
        finalMessage.querySelector("img")!.src = "./morte.png";

        // Salva a posição do jogador (supondo que exista uma função para isso)
        this.player.savePosition();
    }

    updateProgress() {
        const way = document.getElementById('way') as HTMLElement;
        const msg = document.getElementById('msg')as HTMLElement;

        const progress = (this.coinsCollected / this.totalCoins) * 100;
        this.progressBar.style.width = progress + '%';
        if (progress === 100) {
            way.classList.remove("error");
            way.classList.add("success");
            way.classList.add("no-collision");
            msg.textContent = "Ache a saída do labirinto";
        }
    }
}
