const animations = []; //store the animations to manage them later

/**
 * Function to start the whoosh animation.
 * @param {*} el The element to animate.
 * @param {*} delay The delay before the animation starts.
 * @returns The animation object.
 */
function whooshAnimation(el, delay) {
    const animation = el.animate(
        {
            transform: ['translateY(400px)', 'translateY(-10px)', 'translateY(0)'],
            opacity: [0, 0.5, 1]
        },
        {
            duration: 810,
            easing: 'ease-in-out',
            delay: delay * 1000
        }
    );
    animation.onfinish = () => {
        animation.commitStyles();
    }
    return animation;
}