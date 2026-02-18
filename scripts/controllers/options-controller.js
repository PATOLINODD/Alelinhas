const ranges = document.querySelectorAll('input[type="range"]');

for (const range of ranges) {
    range.addEventListener('input', () => {
        const span = document.querySelector(`#${range.dataset.span}`);
        const res = Number(range.value) / Number(range.max) * 100;
        span.textContent = `${Number(res).toFixed(2)}%`;
    })
}