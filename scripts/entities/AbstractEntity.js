class AbstractEntity {
    constructor(x, y, w, h, life) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = life;
    }

    changeLife(life) {
        this.life += life;
    }

    update() { }

    render() { }
}