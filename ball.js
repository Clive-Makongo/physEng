class Ball {
  constructor(x, y, r) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 0.000000000000000000000000001;
    this.player = false;
    BALLZ.push(this);
  }

  draw() {
    if (this.pos.x > canvas.clientWidth) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = canvas.clientWidth;
    }
    if (this.pos.y > canvas.clientHeight) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = canvas.clientHeight;
    }
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }

  display() {
    this.acc.unit().drawVec(800, 710, 50, "red");
    this.vel.drawVec(800, 710, 10, "green");
    this.acc.normal().drawVec(800, 710, 50, "white");
    ctx.beginPath();
    ctx.arc(800, 710, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  reposition() {
    this.acc = this.acc.unit();
    this.vel = this.vel.add(this.acc);
    this.vel = this.vel.multiply(1 - friction);
    this.pos = this.pos.add(this.vel);
  }

  //displayStats() {

  //  ctx.fillStyle = 'red';
  // ctx.font = '15px Arial';
  // let ballVel = this.vel.mag()
  //ctx.fillText("Ball Vel : " + Math.floor(ballVel.toString()), 20, 560);

  //  divCount.push(ballVel);

  // ctx.fillText("Percent Done : " + percent.toString(), 430, 35);
  //ctx.fillText("Best  LEX Distance: " + Math.ceil(bestLength), 20, 35);
  //ctx.fillText("Best  DP Distance: " + Math.ceil(best), 440, 560);
  //}
}
