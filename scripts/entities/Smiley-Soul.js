class SmileySoul extends AbstractProjectile {
    constructor(x, y, r, color) {
        super(x, y, r, color);
        this.angle = Math.PI / 2;
        this.dy = Math.sin(this.angle) * 12 * -1;
        this.friction = 0.70;
    }

    update() {
        this.alpha *= this.friction;
        if (this.alpha <= 0) {
            this.alpha = 0;
            particles.splice(particles.indexOf(this), 1);
        }
    }

    render(g) {
        g.save();
        g.translate(this.x, this.y);
        g.globalAlpha = this.alpha;
        g.drawImage(this.cacheCanvas, -this.cacheCanvas.width / 2, -this.cacheCanvas.height / 2);
        g.restore();
    }
}