class bubble {
    constructor(id, a, x, y, r, c, d) {
        this.id = id;
        this.a = a;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.d = d;
        this.alpha = 255; // Add alpha property
        this.fadeSpeed = 2; // Adjust fade speed as needed
    }
    textplace(x) {
        x = Math.abs(this.id).toString().length;
        if (x == 1) {
            return this.x - this.r * 0.3;
        }
        if (x == 2) {
            return this.x - this.r * 0.6;
        }
        if (x == 3) {
            return this.x - this.r * 0.9;
        }
    }

    show() {
        // Fade out
        if (this.alpha > 0) {
            this.alpha -= this.fadeSpeed;
            // Decrement id by 1 every 0.5 seconds (30 frames at 60fps)
            if (this.lastDecrementFrame === undefined) this.lastDecrementFrame = frameCount;
            if (this.alpha < 200) {
            if (frameCount - this.lastDecrementFrame >= 30/(this.id[0]*1.5)) {
                if (typeof this.id === 'object' && this.id.length > 0) {
                    this.id[0] = Math.max(0, Math.floor(this.id[0]) - 1);
                } else if (typeof this.id === 'number') {
                    this.id = Math.max(0, Math.floor(this.id) - 1);
                }
                this.lastDecrementFrame = frameCount;
            }
        }
        } else {
            this.alpha = 0;
        }
        // Draw with alpha
        noStroke();
        let cWithAlpha = color(red(this.c), green(this.c), blue(this.c), this.alpha);
        fill(cWithAlpha);
        circle(this.x, this.y, this.r * 2);
        fill(255, this.alpha);
        textSize(this.r);
        let idText = (typeof this.id === 'object' && this.id.length > 0) ? Math.floor(this.id[0]) : Math.floor(this.id);
        if (idText < 1) {
            idText = 1;
        }
        text(`${idText}`, this.textplace(idText), this.y + this.r * .3);
    }
    clicked(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r) {
            this.a = false;
            return true;
        }
    }
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
