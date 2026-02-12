let listArray = [];
let x = 10;
// sorry i couldnt think of a better solution for spacing them out
// well actually i probably could but minimum viable product yknow

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  x = 10;
  for (const each of listArray) {
    each.show(x);
    x += 410
  }
}
