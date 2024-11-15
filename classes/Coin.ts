export class Coin {
    private element: HTMLElement;
    private collected: boolean = false;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    checkCollision(playerPosition: { x: number; y: number }, gridSize: number): boolean {
        if (this.collected) return false;

        const coinLeft = this.element.offsetLeft;
        const coinTop = this.element.offsetTop;
        const coinRight = coinLeft + gridSize;
        const coinBottom = coinTop + gridSize;

        const playerLeft = playerPosition.x * gridSize;
        const playerTop = playerPosition.y * gridSize;
        const playerRight = playerLeft + gridSize;
        const playerBottom = playerTop + gridSize;

        if (
            playerRight > coinLeft &&
            playerLeft < coinRight &&
            playerBottom > coinTop &&
            playerTop < coinBottom
        ) {
            this.collect();
            return true;
        }

        return false;
    }

    collect() {
        this.collected = true;
        this.element.style.display = 'none';
    }
}
