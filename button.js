let count = 0;
//et divCount = [];

function Custom() {
  function addNewBall() {
    let newBall = new Ball(
      Math.random() * 1000,
      Math.random() * 800,
      Math.random() * 70
    );

    BALLZ[0].player = true;
    BALLZ[0].draw;
    BALLZ[0].display;
    BALLZ[0].reposition;

    console.log(BALLZ);

    //requestAnimationFrame(mainLoop);
  }

  function displayStats() {
    let newDiv = document.getElementById("stats");

    let ballStats = document.createElement("p");
    ballStats.setAttribute("id", "stat" + count);
    ballStats.textContent = "Ball: " + count++;
    newDiv.appendChild(ballStats);
    divCount.push(newDiv);
    console.log(divCount);
    vel.push(ballStats);
  }

  addNewBall();
  //updateVel(divCount, BALLZ);
  displayStats();
  console.log(vel);
}
