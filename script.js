const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const BALLZ = [];
let vel = [];
let divCount = [];

//let count = 0;

let LEFT, UP, DOWN, RIGHT;
let friction = 0.01;

//Ball1.showStats();

function keyControl(b) {
  canvas.addEventListener("keydown", function (e) {
    //console.log(e.keyCode);
    if (e.keyCode === 37) {
      LEFT = true;
    }
    if (e.keyCode === 38) {
      UP = true;
    }
    if (e.keyCode === 39) {
      RIGHT = true;
    }
    if (e.keyCode === 40) {
      DOWN = true;
    }
  });

  canvas.addEventListener("keyup", function (e) {
    if (e.keyCode === 37) {
      LEFT = false;
    }
    if (e.keyCode === 38) {
      UP = false;
    }

    if (e.keyCode === 39) {
      RIGHT = false;
    }
    if (e.keyCode === 40) {
      DOWN = false;
    }
  });

  if (LEFT) {
    b.acc.x = -b.acceleration;
  }
  if (UP) {
    b.acc.y = -b.acceleration;
  }
  if (RIGHT) {
    b.acc.x = b.acceleration;
  }
  if (DOWN) {
    b.acc.y = b.acceleration;
  }
  if (!UP && !DOWN) {
    b.acc.y = 0;
  }
  if (!RIGHT && !LEFT) {
    b.acc.x = 0;
  }
}

let distanceVec = new Vector(0, 0);

function round(number, prec) {
  let factor = 10 * prec;
  return Math.round(number * factor) / factor;
}

function coll_bb(b1, b2) {
  if (b1.r + b2.r >= b2.pos.subtract(b1.pos).mag()) {
    return true;
  } else {
    return false;
  }
}

function pen_res_bb(b1, b2) {
  let dist = b1.pos.subtract(b2.pos);
  let pen_depth = b1.r + b2.r - dist.mag();
  let pen_res = dist.unit().multiply(pen_depth / 2);
  b1.pos = b1.pos.add(pen_res);
  b2.pos = b2.pos.add(pen_res.multiply(-1));
}

function coll_res_bb(b1, b2) {
  let normal = b1.pos.subtract(b2.pos).unit();
  let relVel = b1.vel.subtract(b2.vel);
  let sepVel = Vector.dot(relVel, normal);
  let new_sepVel = -sepVel;
  let sepVelVec = normal.multiply(new_sepVel);

  b1.vel = b1.vel.add(sepVelVec);
  b2.vel = b2.vel.add(sepVelVec.multiply(-1));
}

// setInterval(function () {
//
// }, 1000 / 50);

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b, index) => {
    if (b.player) {
      keyControl(b);
    }
    b.draw();

    for (let i = index + 1; i < BALLZ.length; i++) {
      if (coll_bb(BALLZ[index], BALLZ[i])) {
        ctx.fillText("Collision", BALLZ[i].pos.x, BALLZ[i].pos.y);
        ctx.fillStyle = "red";
        pen_res_bb(BALLZ[i], BALLZ[index]);
        coll_res_bb(BALLZ[i], BALLZ[index]);
      }

      b.display();
      b.reposition();
      //b.displayStats();

      //showStats(b);
      //newDiv(b);
    }
  });

  requestAnimationFrame(mainLoop);
  updateVel(divCount, BALLZ);
}

requestAnimationFrame(mainLoop);

function updateVel(divCount, BALLZ) {
  for (let i = 0; i < divCount.length; i++) {
    vel[i] = document.getElementById("stat" + i);
    vel[i].innerHTML =
      "Ball " + i + " Velocity: " + Math.floor(BALLZ[i].vel.mag());
    // BALLZ[i].displayStats();
    //console.log(BALLZ, vel[i]);
  }
}

let Ball1 = new Ball(
  Math.random() * 1000,
  Math.random() * 800,
  Math.random() * 70
);
