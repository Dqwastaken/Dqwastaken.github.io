

class bubble {
    constructor(id,a,x,y,r,c,d) {
        this.id = id;
        this.a = a;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.d = d;
    }
    textplace(x) {
        x = Math.abs(this.id).toString().length;
        console.log(x);
        if (x == 1) {
            return this.x - this.r*0.3;
        }
        if (x == 2) {
            return this.x - this.r*0.6;
        }
        if (x == 3) {
            return this.x - this.r*0.9;
        }
    }

    show() {
        noStroke();
        fill(this.c);
        circle(this.x, this.y, this.r*2);
        stroke(0);
        fill(0);
        for (let i = 0; i < 255; i++) {
            setTimeout(this.die,10)
        }
        textSize(this.r);
        text(`${this.id}`, this.textplace(this.id), this.y+this.r*.3);

        
    }
    clicked(x,y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r) {
            this.a = false;
            return true;
        }
        
    }
    die() {
        fill(this.c+20);
        }
    


}
