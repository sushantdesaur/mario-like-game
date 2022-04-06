const canvas = document.querySelector("canvas");

// Added 2D context
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

// Player
class Player {
  constructor() {
    // send position on x and y axis
    this.position = {
      x: 100,
      y: 100,
    };
    // Add velocity
    this.velocity = {
      x: 0,
      y: 1, // For positive values player goes downwards
    };

    // Set object width and height
    this.width = 100;
    this.height = 100;
  }
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 150,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();

const platform = new Platform();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();
  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;

  // Platform Collision Detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >= platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x < platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      player.velocity.x -= 1;
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      player.velocity.x += 1;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
    case 83:
      console.log("down");
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      break;
    case 83:
      console.log("down");
      break;
  }
});

// console.log(context)
