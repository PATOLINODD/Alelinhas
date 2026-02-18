function finisheAnimations(animations) {
    if (animations.length == 0) return;

    for (const ani of animations) {
        ani.cancel();
    }

    animations = [];
}