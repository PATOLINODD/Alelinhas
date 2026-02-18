function colorizeButtons(buttons = []) {
    if (buttons.length === 0 || !buttons) return;
    for (const button of buttons) {
        button.style.backgroundColor = `hsl(${getArbitraryRandom(0, 360)}, ${getArbitraryRandom(50, 100)}%, ${getArbitraryRandom(50, 100)}%)`;
        button.style.border = `.5rem solid hsl(${getArbitraryRandom(0, 360)}, ${getArbitraryRandom(50, 100)}%, ${getArbitraryRandom(50, 100)}%)`;
    }
}

function clickAnimation(buttons = []) {
    if (buttons.length === 0 || !buttons) return;

    for (const button of buttons) {
        button.addEventListener('click', (e) => {
            button.animate(
                {
                    transform: ['scale(1.1)', 'scale(.9)', 'scale(1)']
                },
                {
                    duration: 250, easing: 'ease-out'
                }
            )
        })
    }
}

function coinAnimation(coins = []) {
    if (coins.length === 0 || !coins) return;
    for (const coin of coins) {
        coin.animate({ transform: ['scale(1,1)', 'scale(0,1)', 'scale(1,1)'] }, { duration: 1000, direction: 'alternate', iterations: Infinity });
    }
}