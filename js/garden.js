// Vector class - handles 2D vector operations
function Vector(a, b) {
    this.x = a;
    this.y = b;
}

Vector.prototype = {
    rotate: function(angle) {
        const x = this.x;
        const y = this.y;
        this.x = Math.cos(angle) * x - Math.sin(angle) * y;
        this.y = Math.sin(angle) * x + Math.cos(angle) * y;
        return this;
    },
    
    mult: function(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    },
    
    clone: function() {
        return new Vector(this.x, this.y);
    },
    
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    
    subtract: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },
    
    set: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
};

// Petal class - represents a single flower petal
function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.stretchA = stretchA;
    this.stretchB = stretchB;
    this.startAngle = startAngle;
    this.angle = angle;
    this.bloom = bloom;
    this.growFactor = growFactor;
    this.r = 1;
    this.isfinished = false;
}

Petal.prototype = {
    draw: function() {
        const ctx = this.bloom.garden.ctx;
        const start = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
        const end = start.clone().rotate(Garden.degrad(this.angle));
        const controlPoint1 = start.clone().mult(this.stretchA);
        const controlPoint2 = end.clone().mult(this.stretchB);
        
        ctx.strokeStyle = this.bloom.c;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, 
                         controlPoint2.x, controlPoint2.y, 
                         end.x, end.y);
        ctx.stroke();
    },
    
    render: function() {
        if (this.r <= this.bloom.r) {
            this.r += this.growFactor;
            this.draw();
        } else {
            this.isfinished = true;
        }
    }
};

// Bloom class - represents a complete flower
function Bloom(p, r, c, pc, garden) {
    this.p = p;          // position
    this.r = r;          // radius
    this.c = c;          // color
    this.pc = pc;        // petal count
    this.petals = [];
    this.garden = garden;
    this.init();
    this.garden.addBloom(this);
}

Bloom.prototype = {
    draw: function() {
        let petal;
        let allFinished = true;
        
        this.garden.ctx.save();
        this.garden.ctx.translate(this.p.x, this.p.y);
        
        for (let i = 0; i < this.petals.length; i++) {
            petal = this.petals[i];
            petal.render();
            allFinished *= petal.isfinished;
        }
        
        this.garden.ctx.restore();
        
        if (allFinished) {
            this.garden.removeBloom(this);
        }
    },
    
    init: function() {
        const angle = 360 / this.pc;
        const startAngle = Garden.randomInt(0, 90);
        
        for (let i = 0; i < this.pc; i++) {
            this.petals.push(new Petal(
                Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max),
                Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max),
                startAngle + i * angle,
                angle,
                Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max),
                this
            ));
        }
    }
};

// Garden class - manages the overall animation
function Garden(ctx, element) {
    this.blooms = [];
    this.element = element;
    this.ctx = ctx;
}

Garden.prototype = {
    render: function() {
        for (let i = 0; i < this.blooms.length; i++) {
            this.blooms[i].draw();
        }
    },
    
    addBloom: function(bloom) {
        this.blooms.push(bloom);
    },
    
    removeBloom: function(bloom) {
        for (let i = 0; i < this.blooms.length; i++) {
            if (this.blooms[i] === bloom) {
                this.blooms.splice(i, 1);
                return this;
            }
        }
    },
    
    createRandomBloom: function(x, y) {
        this.createBloom(
            x, y,
            Garden.randomInt(Garden.options.bloomRadius.min, Garden.options.bloomRadius.max),
            Garden.randomrgba(
                Garden.options.color.rmin, Garden.options.color.rmax,
                Garden.options.color.gmin, Garden.options.color.gmax,
                Garden.options.color.bmin, Garden.options.color.bmax,
                Garden.options.color.opacity
            ),
            Garden.randomInt(Garden.options.petalCount.min, Garden.options.petalCount.max)
        );
    },
    
    createBloom: function(x, y, r, c, pc) {
        new Bloom(new Vector(x, y), r, c, pc, this);
    },
    
    clear: function() {
        this.blooms = [];
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
};

// Garden static properties and utility functions
Garden.options = {
    petalCount: {
        min: 8,
        max: 15
    },
    petalStretch: {
        min: 0.1,
        max: 3
    },
    growFactor: {
        min: 0.1,
        max: 1
    },
    bloomRadius: {
        min: 8,
        max: 10
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
        rmin: 128,
        rmax: 255,
        gmin: 0,
        gmax: 128,
        bmin: 0,
        bmax: 128,
        opacity: 0.1
    },
    tanAngle: 60
};

Garden.random = function(min, max) {
    return Math.random() * (max - min) + min;
};

Garden.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Garden.circle = 2 * Math.PI;
Garden.degrad = function(angle) {
    return Garden.circle / 360 * angle;
};

Garden.raddeg = function(angle) {
    return angle / Garden.circle * 360;
};

Garden.rgba = function(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

Garden.randomrgba = function(rmin, rmax, gmin, gmax, bmin, bmax, a) {
    const r = Math.round(Garden.random(rmin, rmax));
    const g = Math.round(Garden.random(gmin, gmax));
    const b = Math.round(Garden.random(bmin, bmax));
    const deltaE = 5;
    
    if (Math.abs(r - g) <= deltaE && Math.abs(g - b) <= deltaE && Math.abs(b - r) <= deltaE) {
        return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
    }
    
    return Garden.rgba(r, g, b, a);
};