// Redirect the user to the page that the button is pointing to.
function redirectTo(buttons) {
    if (!buttons || buttons.length === 0) return;
    for (const btn of buttons) {
        if (btn.id === 'close') continue;
        const redirect = btn.dataset.redirect;
        btn.addEventListener('click', () => {
            window.location.href = redirect;
        })
    }
}