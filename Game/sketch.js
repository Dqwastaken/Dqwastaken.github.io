let bubbles = [];
let bubbleCount = 1;
let money = 0;
let b;
let shopOpen = false;
let bubbleinterval;
let speed = 2000;
let id = [];
let level = 1;


function setup() {
  createCanvas(800, 600);
  background(color(0, 0, 0));
  for (let i = 0; i < bubbleCount; i++) {
    bubbles[i] = new bubble(id,true,random(0,width), random(0,height), random(10, 50), random(1, 255));
  }
  bubbleinterval = setInterval(createbubble, speed);
  b = new button(698,2, 100, 50);
//   setinterval(b.die,500);
  b.show();
  shop = new shop(false, money);
  button2 = new button2(false,300, 390, 200, 50,5);
}

function draw() {
    background(0);
    // Loop backwards to safely remove faded bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].show();
        if (bubbles[i].alpha <= 0) {
            bubbles.splice(i, 1);
        }
    }
    textSize(32);
    fill(255);
    stroke(color(200, 160, 0));
    strokeWeight(4);
    text(`Money: ${money}`, 50, 50);
    text(`Production Rate: ${speed/1000}/s`, 50, 100);
    b.show();
    if (shopOpen) {
        shop.show();
        button2.show();
        button2.a = true;
        shop.a = true;
    } else {
        button2.a = false;
        shop.a = false;
    }
}
function underone(x) {
    if (x < 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function mousePressed() {
    // bubble clicked
    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].clicked(mouseX, mouseY)) {
            // money += int(bubbles[i].id[0] + (underdone(parseInt(bubbles[i].id[0]))));
            let value = bubbles[i].id[0];
            if (value < 1) {
                value = 1;
            }
            money += (typeof value === "undefined" ? 1 : int(value));
            bubbles.splice(i, 1);
            level += 0.3;
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
    //production rate
    if (button2.clicked(mouseX,mouseY) && button2.a) {
        if (money >= button2.m) {
                money -= button2.m;
                button2.m *= 1.5;
                button2.m = Math.ceil(button2.m);
                speed *= 0.6;
                
                console.log("Bought production rate");
                clearInterval(bubbleinterval);
                bubbleinterval = setInterval(createbubble, speed);
            }
            else {
                console.log("Not enough money");
            }
    }
}

function createbubble() {
    id = [];
    let radius = random(10, 50);

    id.push(int(random(3, level/(radius/10))));
    if (id[0] < 1) {
        id[0] = 1;
    }

    bubbles.push(new bubble(id,true,random(0,width), random(0,height), radius, color(random(1, 255), random(1, 255), random(1, 255)))); 
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

class button2 {
    constructor(a,x,y,w,h,m) {
        this.a = a;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.m = m;
    }
    show() {
        fill(200);
        stroke(color(0, 160, 255));
        rect(this.x, this.y, this.w, this.h);
        textSize(20);
        stroke(color(120, 120,120));
        fill(color(0, 0, 0));
        text(`Production Rate: ${this.m}$`, this.x+7, this.y + this.h-15);
    }
    clicked(mx, my) {
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
            
            return true;
        }
        return false;
    }
}

// class button3 {
//     constructor(a,x,y,w,h) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//     }
//     show() {
//         fill(255);
//         stroke(color(0, 160, 255));
//         rect(this.x, this.y, this.w, this.h);
//     }
//     clicked(mx, my) {
//         if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
//             return true;
//         }
//         return false;
//     }
// }

