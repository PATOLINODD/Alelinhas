class AbstractBall extends AbstractEntity {
    constructor(x, y, r, color) {
        super(x, y, r, r);
        this.color = color;
        this.r = r;
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCanvas.width = this.r * 2 + 30;
        this.cacheCanvas.height = this.r * 2 + 30;
        this.cacheG = this.cacheCanvas.getContext('2d');
    }

    preRender() {
        this.cacheG.beginPath();
        this.cacheG.translate(this.cacheCanvas.width / 2, this.cacheCanvas.height / 2);
        this.cacheG.fillStyle = this.color;
        this.cacheG.arc(0, 0, this.r, 0, Math.PI * 2);
        this.cacheG.fill();
        this.cacheG.closePath();
    }

    update() { }

    render(g) { }
}