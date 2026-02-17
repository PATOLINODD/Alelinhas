startApp();
run();
document.addEventListener('DOMContentLoaded', () => {

    const bgMusic = new Audio('./assets/sounds/background-musics/lofi_background.mp3');
    document.body.addEventListener('click', () => {
        bgMusic.play();
        bgMusic.loop = true; // Ensure the music repeats
        bgMusic.volume = 0.051;
    })
    const handleInput = (x, y) => {
        [mx, my] = [x, y];
        for (let i = 0; i < faces.length; i++) {
            const face = faces[i];
            const [dx, dy] = [Math.pow(mx - face.x, 2), Math.pow(my - face.y, 2)];
            const distance = Math.sqrt(dx + dy);

            if (distance <= face.r && !isClicked) {
                const popSound = new Audio('./assets/sounds/sound-effects/pop.mp3');
                const coinSound = new Audio('./assets/sounds/sound-effects/8bit-coin-sound-05.mp3');
                coinSound.volume = 0.05;
                popSound.volume = 0.5;
                isClicked = true;
                face.changeLife(-1);
                if (face.life == 0) {
                    popSound.play();
                    coinSound.play();
                    if (face.r < 30) {
                        renderParticles(face);
                        return;
                    }
                    explode(face);
                }
            }
        }
    }

    document.addEventListener('mousedown', (e) => {
        handleInput(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        // e.preventDefault(); // Prevent default touch actions like scrolling
        handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.body.addEventListener('touchstart', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            bgMusic.loop = true;
            bgMusic.volume = 0.051;
        }
    }, { once: true });
})