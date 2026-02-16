class Face extends AbstractBall {
    lastTime = 0;
    constructor(x, y, r, color, canvas) {
        super(x, y, r, color);
        this.r = r;
        this.x = x ? x : Math.random() * (canvas.width - this.r * 2) + this.r;
        this.y = y ? y : Math.random() * (canvas.height - this.r * 2) + this.r;
        this.color = color;
        this.canvas = canvas;
        this.fullCircle = Math.PI * 2;
        this.angle = 0;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.rotationSpeed = Math.random() * 0.1 + 0.01;
        this.friction = 0.99;
        this.gravity = 0.7;
        this.life = 1;
        this.strokeColor = `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;
        this.preRender();
    }

    preRender() {
        const [cx, cy] = [
            this.cacheCanvas.width / 2,
            this.cacheCanvas.height / 2
        ]
        const g = this.cacheG;
        g.translate(cx, cy);
        g.rotate(this.angle);
        //HEAD
        g.beginPath();
        g.strokeStyle = this.strokeColor;//`hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;
        g.lineWidth = this.r / 6;
        g.lineCap = 'round';
        g.fillStyle = this.color;//`hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;//this.color;
        g.arc(0, 0, this.r, 0, this.fullCircle);
        g.fill();
        g.stroke();

        const eyeSize = this.r / 2.6;
        const eyesColor = 'white';
        const [eyesX, eyesY] = [this.r / 2.6, this.r / 3];
        const pupilsColor = 'black';


        // RIGHT EYE
        g.beginPath();
        g.fillStyle = eyesColor;
        g.lineWidth = 1;
        g.strokeStyle = 'black';
        g.arc(0 + eyesX, 0 - eyesY, eyeSize, 0, this.fullCircle);
        g.fill();
        g.stroke();
        //RIGHT PUPIL
        g.beginPath();
        g.fillStyle = pupilsColor;
        g.arc(0 + eyesX, 0 - eyesY, eyeSize / 1.2, 0, this.fullCircle);
        g.fill();

        // LEFT EYE
        g.beginPath();
        g.fillStyle = eyesColor;
        g.lineWidth = 1;
        g.strokeStyle = 'black';
        g.arc(0 - eyesX, 0 - eyesY, eyeSize, 0, this.fullCircle);
        g.fill();
        g.stroke();
        //LEFT PUPIL
        g.beginPath();
        g.fillStyle = pupilsColor;
        g.arc(0 - eyesX, 0 - eyesY, eyeSize / 1.2, 0, this.fullCircle);
        g.fill();

        // SMILE
        g.beginPath();
        g.strokeStyle = 'black';
        g.lineWidth = this.r / 10;
        g.lineCap = 'round';
        g.fillStyle = eyesColor;
        g.arc(0, 0 + this.r * 0.15, this.r / 3, 0, Math.PI);
        g.stroke();
        // g.fill();
    }

    update(timeScale = 1) {
        this.angle += this.rotationSpeed * timeScale;
        this.angle = this.angle % this.fullCircle;
        this.x += this.vx * timeScale;
        this.y += this.vy * timeScale;
        // this.vy *= this.friction;
        // this.vx *= this.friction;

        // this.vy += this.gravity;
        if (this.x > this.canvas.width + this.r || this.x <= -this.r) {
            this.x = this.x <= -this.r ? this.canvas.width + this.r : -this.r;
            // this.vx *= -1;//this.x > this.canvas.width - this.r ? (Math.random() * 4 + 1) * -1 : Math.random() * 4 + 1;
        }
        if (this.y > this.canvas.height + this.r || this.y <= -this.r) {
            this.y = this.y <= -this.r ? this.canvas.height + this.r : -this.r;
            // this.y = this.y < this.r ? this.r : this.canvas.height - this.r;
            // this.vy *= -1;//this.y > this.canvas.height - this.r ? (Math.random() * 4 + 1) * -1 : Math.random() * 4 + 1;
            // this.vx *= this.friction;
        }
        // if (Math.abs(this.vy) < 0.9 && this.y + this.r >= this.canvas.height - 8.5) {
        //     this.vy = 0;
        // }
        if (this.life <= 0) faces.splice(faces.indexOf(this), 1);
    }

    render(g) {
        g.save();
        g.translate(this.x, this.y);
        g.rotate(this.angle);
        g.drawImage(this.cacheCanvas, -this.cacheCanvas.width / 2, -this.cacheCanvas.height / 2);
        g.restore();
    }
}