function loadImage(path) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.src = path;
        img.onload = () => res(img);
        img.onerror = () => rej(new Error(`Failed to load image at ${path}`));
    });
}