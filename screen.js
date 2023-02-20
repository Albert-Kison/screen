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

const drawLine = function(x1, y1, x2, y2) {
    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;
    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    // The line is X-axis dominant
    if (dy1 <= dx1) {
        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }
        pixel(x, y); // Draw first pixel
        // Rasterize the line
        for (i = 0; x < xe; i++) {
            x = x + 1;
            // Deal with octants...
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }
            // Draw pixel from line span at
            // currently rasterized position
            pixel_map[y][x] = 'green';
        }
    } else { // The line is Y-axis dominant
        // Line is drawn bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }
        pixel_map[y][x] = 'green'; // Draw first pixel
        // Rasterize the line
        for (i = 0; y < ye; i++) {
            y = y + 1;
            // Deal with octants...
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            // Draw pixel from line span at
            // currently rasterized position
            pixel_map[y][x] = 'green';
        }
    }
 }

 drawLine(3, 3, 6, 7);


function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScreen(pixel_map);
}

animate();