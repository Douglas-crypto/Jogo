/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/Coin.ts":
/*!*****************************!*\
  !*** ./src/classes/Coin.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Coin: () => (/* binding */ Coin)\n/* harmony export */ });\nclass Coin {\n    constructor(element) {\n        this.collected = false;\n        this.element = element;\n    }\n    checkCollision(playerPosition, gridSize) {\n        if (this.collected)\n            return false;\n        const coinLeft = this.element.offsetLeft;\n        const coinTop = this.element.offsetTop;\n        const coinRight = coinLeft + gridSize;\n        const coinBottom = coinTop + gridSize;\n        const playerLeft = playerPosition.x * gridSize;\n        const playerTop = playerPosition.y * gridSize;\n        const playerRight = playerLeft + gridSize;\n        const playerBottom = playerTop + gridSize;\n        if (playerRight > coinLeft &&\n            playerLeft < coinRight &&\n            playerBottom > coinTop &&\n            playerTop < coinBottom) {\n            this.collect();\n            return true;\n        }\n        return false;\n    }\n    collect() {\n        this.collected = true;\n        this.element.style.display = 'none';\n    }\n}\n\n\n//# sourceURL=webpack://jogotypescript2/./src/classes/Coin.ts?");

/***/ }),

/***/ "./src/classes/Enemy.ts":
/*!******************************!*\
  !*** ./src/classes/Enemy.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemy: () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\n    constructor(element) {\n        this.element = element;\n        this.position = { x: parseInt(element.style.left) / 20, y: parseInt(element.style.top) / 20 };\n    }\n    getPosition() {\n        return this.position;\n    }\n    setPosition(x, y) {\n        this.position = { x, y };\n        this.element.style.left = `${x * 20}px`; // Atualiza a posição no DOM\n        this.element.style.top = `${y * 20}px`; // Atualiza a posição no DOM\n    }\n}\n\n\n//# sourceURL=webpack://jogotypescript2/./src/classes/Enemy.ts?");

/***/ }),

/***/ "./src/classes/Game.ts":
/*!*****************************!*\
  !*** ./src/classes/Game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\nclass Game {\n    constructor(player, coins, enemies, walls, progressBar) {\n        this.coinsCollected = 0;\n        this.player = player;\n        this.coins = coins;\n        this.enemies = enemies;\n        this.walls = walls;\n        this.progressBar = progressBar;\n        this.totalCoins = coins.length;\n        // Inicia o movimento dos inimigos\n        this.moveEnemies();\n    }\n    start() {\n        window.addEventListener('keydown', (event) => {\n            let direction = { x: 0, y: 0 };\n            switch (event.key) {\n                case 'ArrowUp':\n                    direction.y = -1;\n                    break;\n                case 'ArrowDown':\n                    direction.y = 1;\n                    break;\n                case 'ArrowLeft':\n                    direction.x = -1;\n                    break;\n                case 'ArrowRight':\n                    direction.x = 1;\n                    break;\n            }\n            this.player.move(direction, this.walls);\n            this.checkCoinCollision();\n            this.checkEnemyCollision();\n        });\n    }\n    // Método para mover os inimigos\n    moveEnemies() {\n        this.enemies.forEach(enemy => {\n            let enemyDirection = 1; // 1 para baixo, -1 para cima\n            const moveInterval = setInterval(() => {\n                const currentPosition = enemy.getPosition(); // Obtemos a posição atual do inimigo\n                const newTop = currentPosition.y + enemyDirection; // Adicionamos a direção\n                // Cria uma nova posição para checar a colisão\n                const potentialNewPosition = { x: currentPosition.x, y: newTop };\n                // Checa se a nova posição resultará em uma colisão\n                if (this.checkForWallCollision(potentialNewPosition)) {\n                    enemyDirection *= -1; // Inverte a direção ao colidir\n                    // Atualiza a nova posição para refletir a direção invertida\n                    const newTopAfterCollision = currentPosition.y + enemyDirection;\n                    enemy.setPosition(currentPosition.x, newTopAfterCollision); // Atualiza a posição lógica\n                    enemy.element.style.top = `${newTopAfterCollision * 20}px`; // Atualiza a posição visual\n                }\n                else {\n                    enemy.setPosition(currentPosition.x, newTop); // Atualiza a posição lógica\n                    enemy.element.style.top = `${newTop * 20}px`; // Atualiza a posição visual\n                }\n                this.checkEnemyCollision(); // Verifica colisões com o jogador\n            }, 500); // Intervalo de movimentação\n        });\n    }\n    // Verifica colisão com paredes\n    checkForWallCollision(newPosition) {\n        let collision = false;\n        const enemyLeft = newPosition.x * 20; // Ajustar para o tamanho da célula\n        const enemyTop = newPosition.y * 20; // Ajustar para o tamanho da célula\n        const enemyRight = enemyLeft + 20;\n        const enemyBottom = enemyTop + 20;\n        this.walls.forEach(wall => {\n            if (wall.classList.contains('no-collision'))\n                return;\n            const wallLeft = wall.offsetLeft;\n            const wallTop = wall.offsetTop;\n            const wallRight = wallLeft + wall.offsetWidth;\n            const wallBottom = wallTop + wall.offsetHeight;\n            if (enemyRight > wallLeft &&\n                enemyLeft < wallRight &&\n                enemyBottom > wallTop &&\n                enemyTop < wallBottom) {\n                collision = true; // Colisão detectada\n            }\n        });\n        return collision;\n    }\n    checkCoinCollision() {\n        this.coins.forEach(coin => {\n            if (coin.checkCollision(this.player.getPosition(), this.player.getGridSize())) {\n                this.coinsCollected++;\n                this.updateProgress();\n            }\n        });\n    }\n    checkEnemyCollision() {\n        this.enemies.forEach(enemy => {\n            const playerPosition = this.player.getPosition();\n            const gridSize = this.player.getGridSize();\n            const playerLeft = playerPosition.x * gridSize;\n            const playerTop = playerPosition.y * gridSize;\n            const playerRight = playerLeft + gridSize;\n            const playerBottom = playerTop + gridSize;\n            const enemyPosition = enemy.getPosition();\n            const enemyLeft = enemyPosition.x * gridSize;\n            const enemyTop = enemyPosition.y * gridSize;\n            const enemyRight = enemyLeft + gridSize;\n            const enemyBottom = enemyTop + gridSize;\n            // Verifica se há colisão\n            if (playerRight > enemyLeft &&\n                playerLeft < enemyRight &&\n                playerBottom > enemyTop &&\n                playerTop < enemyBottom) {\n                this.playerDied(); // Chama o método para o evento de morte do jogador\n            }\n        });\n    }\n    playerDied() {\n        const main = document.getElementById('main');\n        const finalMessage = document.getElementById('final-message');\n        // Exibe mensagem de morte\n        main.style.display = \"none\";\n        finalMessage.style.display = \"flex\";\n        finalMessage.querySelector(\"p\").textContent = \"Você foi pego!\";\n        finalMessage.querySelector(\"img\").src = \"./morte.png\";\n        // Salva a posição do jogador (supondo que exista uma função para isso)\n        this.player.savePosition();\n    }\n    updateProgress() {\n        const way = document.getElementById('way');\n        const msg = document.getElementById('msg');\n        const progress = (this.coinsCollected / this.totalCoins) * 100;\n        this.progressBar.style.width = progress + '%';\n        if (progress === 100) {\n            way.classList.remove(\"error\");\n            way.classList.add(\"success\");\n            way.classList.add(\"no-collision\");\n            msg.textContent = \"Ache a saída do labirinto\";\n        }\n    }\n}\n\n\n//# sourceURL=webpack://jogotypescript2/./src/classes/Game.ts?");

/***/ }),

/***/ "./src/classes/Player.ts":
/*!*******************************!*\
  !*** ./src/classes/Player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(element, gridSize) {\n        this.element = element;\n        this.gridSize = gridSize;\n        this.position = { x: 0, y: 0 };\n        this.coinsCollected = 0; // Inicializa as moedas coletadas\n        this.loadPosition();\n    }\n    // Salva a posição no localStorage\n    savePosition() {\n        localStorage.setItem('playerPositionX', this.position.x.toString());\n        localStorage.setItem('playerPositionY', this.position.y.toString());\n    }\n    // Carrega a posição do localStorage\n    loadPosition() {\n        const savedX = localStorage.getItem('playerPositionX');\n        const savedY = localStorage.getItem('playerPositionY');\n        if (savedX !== null && savedY !== null) {\n            this.position.x = parseInt(savedX);\n            this.position.y = parseInt(savedY);\n        }\n        this.updatePosition();\n    }\n    // Atualiza a posição no DOM\n    updatePosition() {\n        this.element.style.left = this.position.x * this.gridSize + 'px';\n        this.element.style.top = this.position.y * this.gridSize + 'px';\n        this.savePosition();\n        this.checkWayCollision();\n    }\n    // Movimenta o jogador de acordo com a tecla pressionada\n    move(direction, walls) {\n        const newPosition = { x: this.position.x + direction.x, y: this.position.y + direction.y };\n        // Verifica se a nova posição colide com alguma parede\n        if (!this.checkWallCollision(newPosition, walls)) {\n            this.position = newPosition;\n            this.updatePosition();\n        }\n    }\n    // Verifica se colide com paredes\n    checkWallCollision(newPosition, walls) {\n        let collision = false;\n        const playerLeft = newPosition.x * this.gridSize;\n        const playerTop = newPosition.y * this.gridSize;\n        const playerRight = playerLeft + this.gridSize;\n        const playerBottom = playerTop + this.gridSize;\n        walls.forEach(wall => {\n            if (wall.classList.contains('no-collision'))\n                return;\n            const wallLeft = wall.offsetLeft;\n            const wallTop = wall.offsetTop;\n            const wallRight = wallLeft + wall.offsetWidth;\n            const wallBottom = wallTop + wall.offsetHeight;\n            if (playerRight > wallLeft &&\n                playerLeft < wallRight &&\n                playerBottom > wallTop &&\n                playerTop < wallBottom) {\n                collision = true;\n            }\n        });\n        return collision;\n    }\n    checkWayCollision() {\n        const way = document.getElementById('way');\n        const main = document.getElementById('main');\n        const finalMessage = document.getElementById('final-message');\n        const playerPosition = this.getPosition();\n        const playerLeft = playerPosition.x * 20;\n        const playerTop = playerPosition.y * 20;\n        const playerRight = playerLeft + 20;\n        const playerBottom = playerTop + 20;\n        const wayLeft = way.offsetLeft;\n        const wayTop = way.offsetTop;\n        const wayRight = wayLeft + way.offsetWidth;\n        const wayBottom = wayTop + way.offsetHeight;\n        if (playerRight > wayLeft &&\n            playerLeft < wayRight &&\n            playerBottom > wayTop &&\n            playerTop < wayBottom) {\n            main.style.display = \"none\";\n            finalMessage.style.display = \"flex\";\n            finalMessage.querySelector(\"p\").textContent = \"Você concluiu o labirinto! Parabéns!\";\n            finalMessage.querySelector(\"img\").src = \"https://png.pngtree.com/png-clipart/20220404/original/pngtree-trophy-champion-gold-icon-vector-png-image_7509888.png\";\n            // Limpa o progresso do jogador e reinicia o jogo\n            localStorage.removeItem('playerPositionX');\n            localStorage.removeItem('playerPositionY');\n            this.coinsCollected = 0; // Reseta as moedas coletadas\n        }\n    }\n    restart() {\n        this.position = { x: 0, y: 0 }; // Define a posição inicial\n        this.updatePosition(); // Atualiza a posição no DOM\n        localStorage.removeItem('playerPositionX'); // Limpa a posição do localStorage\n        localStorage.removeItem('playerPositionY');\n    }\n    getPosition() {\n        return this.position;\n    }\n    getGridSize() {\n        return this.gridSize;\n    }\n}\n\n\n//# sourceURL=webpack://jogotypescript2/./src/classes/Player.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Player */ \"./src/classes/Player.ts\");\n/* harmony import */ var _classes_Coin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Coin */ \"./src/classes/Coin.ts\");\n/* harmony import */ var _classes_Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Enemy */ \"./src/classes/Enemy.ts\");\n/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Game */ \"./src/classes/Game.ts\");\n// Importa as classes\n\n\n\n\n// Pega os elementos do DOM\nconst playerElement = document.getElementById('player');\nconst wallElements = Array.from(document.querySelectorAll('.wall'));\nconst coinElements = Array.from(document.querySelectorAll('.coin'));\nconst enemyElements = Array.from(document.querySelectorAll('.enemy'));\nconst progressBar = document.getElementById('progress-bar');\nconst restartButton = document.getElementById('restart-button');\nif (restartButton) {\n    restartButton.addEventListener('click', () => {\n        player.restart(); // Reinicia o jogador\n        location.reload(); // Opcional: recarrega a página, se necessário\n    });\n}\n// Cria os objetos\nconst player = new _classes_Player__WEBPACK_IMPORTED_MODULE_0__.Player(playerElement, 20);\nconst coins = coinElements.map(coin => new _classes_Coin__WEBPACK_IMPORTED_MODULE_1__.Coin(coin));\nconst enemies = enemyElements.map(enemy => new _classes_Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(enemy));\nconst game = new _classes_Game__WEBPACK_IMPORTED_MODULE_3__.Game(player, coins, enemies, wallElements, progressBar);\n// Inicia o jogo\ngame.start();\n\n\n//# sourceURL=webpack://jogotypescript2/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;