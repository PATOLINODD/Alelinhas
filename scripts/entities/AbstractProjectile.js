class AbstractProjectile extends AbstractBall {
    constructor(x, y, r, color) {
        super(x, y, r, color);
        this.vel = getArbitraryRandom(5, 10);
        this.angle = Math.random() * Math.PI * 2;
        this.dx = Math.cos(this.angle) * this.vel;
        this.dy = Math.sin(this.angle) * this.vel;
        this.alpha = 1;
        this.friction = 0.90;
        this.preRender();
    }

    update(timeScale = 1) {
        this.x += this.dx * timeScale;
        this.y += this.dy * timeScale;
        this.alpha *= Math.pow(this.friction, timeScale);
        if (this.alpha <= 0.01) { // Threshold for cleanup
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