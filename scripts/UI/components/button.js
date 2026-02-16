const buttons = document.querySelectorAll('button');


for (const button of buttons) {
    button.style.backgroundColor = `hsl(${getArbitraryRandom(0, 360)}, ${getArbitraryRandom(50, 100)}%, ${getArbitraryRandom(50, 100)}%)`;
    button.style.border = `.5rem solid hsl(${getArbitraryRandom(0, 360)}, ${getArbitraryRandom(50, 100)}%, ${getArbitraryRandom(50, 100)}%)`;

    button.addEventListener('click', (e) => {
        button.animate(
            {
                transform: ['scale(1.1)', 'scale(.9)', 'scale(1)']
            },
            {
                duration: 250, fill: 'forwards', easing: 'ease-out'
            }
        )
    })
}


const currency = document.querySelector('.currency');
if (currency) currency.animate({ transform: ['scale(1,1)', 'scale(0,1)', 'scale(1,1)'] }, { duration: 1000, direction: 'alternate', iterations: Infinity });