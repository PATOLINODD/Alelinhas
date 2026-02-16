const lists = document.querySelectorAll('li');

class Animations {
    constructor(ele) {
        this.ele = document.querySelector(ele);
        this.currentAnimation = null;
    }

    play() {
        this.ele.style.backgroundColor = `hsl(${getArbitraryRandom(0, 360)}, ${getArbitraryRandom(100, 100)}%, ${getArbitraryRandom(30, 50)}%)`;
        this.currentAnimation = this.ele.animate({
            transform: [
                'scale(0, 1)', 'scale(1, 1)'
            ]
        }, {
            duration: 180,
            easing: 'ease-out',
            fill: 'forwards'
        })
    }

    stop() {
        this.currentAnimation.reverse();
    }
}

lists.forEach(list => {
    const animation = new Animations(`.${list.dataset.slide}`);
    list.addEventListener('mouseenter', () => {
        animation.play();
    });

    list.addEventListener("mouseleave", () => {
        animation.stop();
    });
});