// The array of bubbles
const bubbles = [];

// The scalar field array
const field = [];

// The resolution of the marching square
const resolution = 10;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 15; i++) bubbles.push(new Bubble());
  for (let i = 0; i < width / resolution + 1; i++) {
    field[i] = [];
    for (let j = 0; j < height / resolution + 1; j++) {
      field[i][j] = 0;
    }
  }
}

function draw() {
  background(22);
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      field[i][j] = calculateFieldValueAt(i * resolution, j * resolution);

      // ✔ Debugging stuffs

      // fill(map(field[i][j], 0, 10, 0, 255));
      // stroke(0);
      // rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

  for (let i = 0; i < field.length - 1; i++) {
    for (let j = 0; j < field[i].length - 1; j++) {
      const threshold = 3;

      const x = i * resolution;
      const y = j * resolution;

      const a = field[i][j] < threshold ? 0 : 1;
      const b = field[i + 1][j] < threshold ? 0 : 1;
      const c = field[i + 1][j + 1] < threshold ? 0 : 1;
      const d = field[i][j + 1] < threshold ? 0 : 1;

      const a_val = field[i][j];
      const b_val = field[i + 1][j];
      const c_val = field[i + 1][j + 1];
      const d_val = field[i][j + 1];

      const n = createVector(
        lerp(x, x + resolution, (threshold - a_val) / (b_val - a_val)),
        y,
      );
      const e = createVector(
        x + resolution,
        lerp(y, y + resolution, (threshold - b_val) / (c_val - b_val)),
      );
      const s = createVector(
        lerp(x, x + resolution, (threshold - d_val) / (c_val - d_val)),
        y + resolution,
      );
      const w = createVector(
        x,
        lerp(y, y + resolution, (threshold - a_val) / (d_val - a_val)),
      );

      const state = getState(a, b, c, d);
      stroke(0, 255, 0);
      switch (state) {
        case 1:
          line(w.x, w.y, s.x, s.y);
          break;
        case 2:
          line(e.x, e.y, s.x, s.y);
          break;
        case 3:
          line(w.x, w.y, e.x, e.y);
          break;
        case 4:
          line(n.x, n.y, e.x, e.y);
          break;
        case 5:
          line(n.x, n.y, w.x, w.y);
          line(e.x, e.y, s.x, s.y);
          break;
        case 6:
          line(n.x, n.y, s.x, s.y);
          break;
        case 7:
          line(n.x, n.y, w.x, w.y);
          break;
        case 8:
          line(n.x, n.y, w.x, w.y);
          break;
        case 9:
          line(n.x, n.y, s.x, s.y);
          break;
        case 10:
          line(n.x, n.y, e.x, e.y);
          line(w.x, w.y, s.x, s.y);
          break;
        case 11:
          line(n.x, n.y, e.x, e.y);
          break;
        case 12:
          line(w.x, w.y, e.x, e.y);
          break;
        case 13:
          line(e.x, e.y, s.x, s.y);
          break;
        case 14:
          line(w.x, w.y, s.x, s.y);
          break;
      }
    }
  }

  bubbles.forEach((b) => {
    // b.show();
    b.update();
  });
}

/**
 * Calculate the field value at a certain position
 * @param {Number} x The x axis coordinate
 * @param {Number} y The y axis coordinate
 */
function calculateFieldValueAt(x, y) {
  let sum = 0;
  bubbles.forEach(
    (b) =>
      (sum +=
        b.radius ** 2 / ((b.position.x - x) ** 2 + (b.position.y - y) ** 2)),
  );
  return sum;
}

/**
 * Get the state code of a given cell
 * @param {Number} a The north west corner value
 * @param {Number} b The north east corner value
 * @param {Number} c The south east corner value
 * @param {Number} d The south west corner value
 */
function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d;
}
