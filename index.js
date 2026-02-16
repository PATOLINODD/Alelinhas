startApp();
run();
document.addEventListener('DOMContentLoaded', () => {

    const bgMusic = new Audio('./assets/sounds/background-musics/lofi_background.mp3');
    document.body.addEventListener('click', () => {
        bgMusic.play();
        bgMusic.loop = true; // Ensure the music repeats
        bgMusic.volume = 0.051;
    })
    document.addEventListener('mousedown', (e) => {
        [mx, my] = [e.clientX, e.clientY];
        for (let i = 0; i < faces.length; i++) {
            const face = faces[i];
            const [x, y] = [Math.pow(mx - face.x, 2), Math.pow(my - face.y, 2)];
            const distance = Math.sqrt(x + y);

            //I added isClicked here to prevent the click spam when the entities multiply
            //When the entities multiply, the click event is triggered multiple times
            //So an effect that looks like the entities multiply multiple times is 
            //just because the click event is triggered multiple times while the mouse is on the entity
            //using click event, the same effect happens, additionally the click event is triggered only when the 
            //mouse button is down and up while the mouse is on the entity, but if you press the mouse button while on the
            //entity, and release the mouse button after the entity moved away from the cursor, the event is not triggered.
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
    })
})