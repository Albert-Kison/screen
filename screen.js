canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const PIXEL_SIZE = 30;
const HEIGHT = 20;
const WIDTH = 30;

let pixel_map = [];


for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
        // let r = Math.random() * 256;
        // let g = Math.random() * 256;
        // let b = Math.random() * 256;
        row.push(`rgb(0, 0, 0)`);
    }
    pixel_map.push(row);
}

const drawScreen = function(pixel_map) {
    let y = 0;
    for (let i = 0; i < pixel_map.length; i++) {
        let x = 0;
        for (let j = 0; j < pixel_map[i].length; j++) {
            ctx.beginPath();
            ctx.rect(x, y, PIXEL_SIZE, PIXEL_SIZE);
            ctx.fillStyle = pixel_map[i][j];
            ctx.fill();
    
            x += PIXEL_SIZE;
        }
        y += PIXEL_SIZE;
    }
};

setTimeout(function() {
    pixel_map[3][4] = `rgb(0, 255, 0)`;
}, 3000);


function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScreen(pixel_map);
}

animate();