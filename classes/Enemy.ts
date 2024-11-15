export class Enemy {
    public element: HTMLElement;
    private position: { x: number; y: number };

    constructor(element: HTMLElement) {
        this.element = element;
        this.position = { x: parseInt(element.style.left) / 20, y: parseInt(element.style.top) / 20 };
    }

    public getPosition() {
        return this.position;
    }

    public setPosition(x: number, y: number) {
        this.position = { x, y };
        this.element.style.left = `${x * 20}px`; // Atualiza a posição no DOM
        this.element.style.top = `${y * 20}px`; // Atualiza a posição no DOM
    }
}
