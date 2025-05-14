let bubbles = [];
let bubbleCount = 1;
let money = 0;
let b;
let shopOpen = false;

function setup() {
  createCanvas(800, 600);
  background(color(0, 0, 0));
  for (let i = 0; i < bubbleCount; i++) {
    bubbles[i] = new bubble(true,random(0,width), random(0,height), random(10, 50), random(1, 255));
  }
  setInterval(createbubble, 2000);
  b = new button(700,1, 100, 50);
  b.show();
  shop = new shop(false, money);
}

function draw() {
    background(0);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].show();
        
    } 
  textSize(32);
  fill(255);
  stroke(color(200, 160, 0));
  strokeWeight(4);
  text(`Money: ${money}`, 50, 50);
  b.show();
  if (shopOpen) {
    shop.show();
    shop.a = true;
  }
}


function mousePressed() {
    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].clicked(mouseX, mouseY)) {
            bubbles.splice(i, 1);
            money += 1;
        }
    }
    if (b.clicked(mouseX, mouseY)) {
        if (shopOpen) {
            // Close shop
            shopOpen = false;
        }
        // Open shop
        else {
            shopOpen = true;
        }
    }
}

function createbubble() {
    bubbles.push(new bubble(true,random(0,width), random(0,height), random(10, 50), color(random(1, 255), random(1, 255), random(1, 255)))); 
}

class button {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
    show() {
        fill(255);
        stroke(color(0, 160, 255));
        rect(this.x, this.y, this.w, this.h);
        text("Shop", this.x+10, this.y + this.h-15);
    }
    clicked(x,y) {
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
            return true;
        }
        
    }
}


