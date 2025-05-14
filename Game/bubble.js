class bubble {
    constructor(a,x,y,r,c) {
        this.a = a;
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    show() {
        noStroke();
        fill(this.c);
        circle(this.x, this.y, this.r*2);
    }
    clicked(x,y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r) {
            this.a = false;
            return true;
        }
        
    }

}
