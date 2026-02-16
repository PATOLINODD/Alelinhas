
const faces = [];
const deadFaces = [];
let particles = [];
let bgImg = null;
const bgBuffer = document.createElement('canvas');
bgBuffer.width = window.innerWidth;
bgBuffer.height = window.innerHeight;
const bgBufferG = bgBuffer.getContext('2d');
let isClicked = false;
let [mx, my] = [0, 0]

function run() {
    update();
    checkCollisions();
    render(g);
    requestAnimationFrame(run)
}

let timer = 0;
function update() {
    if (isClicked) {
        timer++;
        if (timer >= 5) {
            timer = 0;
            isClicked = false;
        }
    }
    for (let face of faces) {
        if (face) face.update();
    }

    for (let particle of particles) {
        if (particle) particle.update();
    }
}

function render(g) {
    g.clearRect(0, 0, canvas.width, canvas.height);
    // g.drawImage(bgBuffer, 0, 0);
    for (let face of faces) {
        if (face) face.render(g);
    }
    for (let particle of particles) {
        if (particle) particle.render(g);
    }
}


function explode(face) {
    for (let i = 0; i < 4; i++) {
        faces.push(new Face(face.x, face.y, face.r / 2, `hsl(${Math.random() * 360}, ${Math.random() * (100 - 20) + 20}%, ${Math.random() * (100 - 20) + 20}%)`, canvas));
    }
}


async function startApp() {
    try {
        // bgImg = await loadImage('./assets/imgs/cat.jpg');
        initializeEntities();
    } catch (error) {
        console.error(error);
    }
}

const r = window.innerWidth / 4 <= window.innerHeight / 4 ? window.innerWidth / 4 : window.innerHeight / 4;
function initializeEntities() {
    // bgBufferG.drawImage(bgImg, 0, 0, bgBuffer.width, bgBuffer.height);
    faces.push(new Face(0, 0, r, `hsl(${Math.random() * 360}, 100%, ${getArbitraryRandom(30, 50)}%)`, canvas));
}

function renderParticles(curEntity) {
    for (let i = 0; i < 10; i++) {
        particles.push(new AbstractProjectile(curEntity.x, curEntity.y, getArbitraryRandom(5, 8), curEntity.color));
    }
    addSoul(curEntity);
}

function addSoul(curEntity) {
    particles.push(new SmileySoul(curEntity.x, curEntity.y, curEntity.r, 'white'));
}

function removeFace(face) {
    faces.splice(faces.indexOf(face), 1);
}

function removeFaceByIndex(index) {
    faces.splice(index, 1);
}

const spatialGrid = new Grid(window.innerWidth, window.innerHeight, r * 2 + 30);
function checkCollisions() {
    spatialGrid.clear();

    //first step add the entities to the grid
    for (const face of faces) {
        //only add valid face
        if (face) spatialGrid.addEntity(face);
    }

    for (let i = 0; i < faces.length; i++) {
        const f1 = faces[i];
        f1.id = i;
        const candidates = spatialGrid.getNeighbors(f1);

        for (let j = 0; j < candidates.length; j++) {
            const f2 = candidates[j];
            f2.id = j;
            if (f1 === f2) continue;

            if (f1.id < f2.id) {
                const [dx, dy] = [f2.x - f1.x, f2.y - f1.y];
                const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (distance <= f1.r + f2.r) {
                    const overlap = (f1.r + f2.r - distance) / 2;
                    const [nx, ny] = [
                        dx / distance,
                        dy / distance
                    ]
                    f1.x -= nx * overlap;
                    f1.y -= ny * overlap;
                    f2.x += nx * overlap;
                    f2.y += ny * overlap;

                    const [tempX, tempY] = [f1.vx, f1.vy];
                    f1.vx = f2.vx;
                    f1.vy = f2.vy;
                    f2.vx = tempX;
                    f2.vy = tempY;
                }
            }
        }
    }
}