// Importa as classes
import { Player } from './classes/Player';
import { Coin } from './classes/Coin';
import { Enemy } from './classes/Enemy';
import { Game } from './classes/Game';

// Pega os elementos do DOM
const playerElement = document.getElementById('player') as HTMLElement;
const wallElements = Array.from(document.querySelectorAll('.wall')) as HTMLElement[];
const coinElements = Array.from(document.querySelectorAll('.coin')) as HTMLElement[];
const enemyElements = Array.from(document.querySelectorAll('.enemy')) as HTMLElement[];
const progressBar = document.getElementById('progress-bar') as HTMLElement;
const restartButton = document.getElementById('restart-button');
if (restartButton) {
    restartButton.addEventListener('click', () => {
        player.restart(); // Reinicia o jogador
        location.reload(); // Opcional: recarrega a página, se necessário
    });
}

// Cria os objetos
const player = new Player(playerElement, 20);
const coins = coinElements.map(coin => new Coin(coin));
const enemies = enemyElements.map(enemy => new Enemy(enemy));
const game = new Game(player, coins, enemies, wallElements, progressBar);

// Inicia o jogo
game.start();
