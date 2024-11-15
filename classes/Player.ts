import { Game } from "./Game";

export class Player {
    private element: HTMLElement;
    private position: { x: number; y: number };
    private gridSize: number;
    public coinsCollected: number; // Adicione esta linha

    constructor(element: HTMLElement, gridSize: number) {
        this.element = element;
        this.gridSize = gridSize;
        this.position = { x: 0, y: 0 };
        this.coinsCollected = 0; // Inicializa as moedas coletadas
        this.loadPosition();
    }

    // Salva a posição no localStorage
    savePosition() {
        localStorage.setItem('playerPositionX', this.position.x.toString());
        localStorage.setItem('playerPositionY', this.position.y.toString());
    }

    // Carrega a posição do localStorage
    loadPosition() {
        const savedX = localStorage.getItem('playerPositionX');
        const savedY = localStorage.getItem('playerPositionY');
        if (savedX !== null && savedY !== null) {
            this.position.x = parseInt(savedX);
            this.position.y = parseInt(savedY);
        }
        this.updatePosition();
    }

    // Atualiza a posição no DOM
    updatePosition() {
        this.element.style.left = this.position.x * this.gridSize + 'px';
        this.element.style.top = this.position.y * this.gridSize + 'px';
        this.savePosition();
        this.checkWayCollision();
    }

    // Movimenta o jogador de acordo com a tecla pressionada
    move(direction: { x: number; y: number }, walls: HTMLElement[]) {
        const newPosition = { x: this.position.x + direction.x, y: this.position.y + direction.y };

        // Verifica se a nova posição colide com alguma parede
        if (!this.checkWallCollision(newPosition, walls)) {
            this.position = newPosition;
            this.updatePosition();
        }
    }

    // Verifica se colide com paredes
    checkWallCollision(newPosition: { x: number; y: number }, walls: HTMLElement[]): boolean {
        let collision = false;
        const playerLeft = newPosition.x * this.gridSize;
        const playerTop = newPosition.y * this.gridSize;
        const playerRight = playerLeft + this.gridSize;
        const playerBottom = playerTop + this.gridSize;

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

    checkWayCollision() {
        const way = document.getElementById('way') as HTMLElement;
        const main = document.getElementById('main') as HTMLElement;
        const finalMessage = document.getElementById('final-message') as HTMLElement;

        const playerPosition = this.getPosition();
        const playerLeft = playerPosition.x * 20;
        const playerTop = playerPosition.y * 20;
        const playerRight = playerLeft + 20;
        const playerBottom = playerTop + 20;

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
            finalMessage.querySelector("p").textContent = "Você concluiu o labirinto! Parabéns!";
            finalMessage.querySelector("img").src = "https://png.pngtree.com/png-clipart/20220404/original/pngtree-trophy-champion-gold-icon-vector-png-image_7509888.png";

            // Limpa o progresso do jogador e reinicia o jogo
            localStorage.removeItem('playerPositionX');
            localStorage.removeItem('playerPositionY');
            this.coinsCollected = 0; // Reseta as moedas coletadas
        }
    }

    restart() {
        this.position = { x: 0, y: 0 }; // Define a posição inicial
        this.updatePosition(); // Atualiza a posição no DOM
        localStorage.removeItem('playerPositionX'); // Limpa a posição do localStorage
        localStorage.removeItem('playerPositionY');
    }

    getPosition() {
        return this.position;
    }

    getGridSize() {
        return this.gridSize;
    }
}
