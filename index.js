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
  constructor({x, y}) {
    this.position = {
      x,
      y,
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

// const platform = new Platform();
const platforms = [
  new Platform({ x: 200, y: 100 }),
  new Platform({ x: 500, y: 200 }),
];


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
  platforms.forEach((platform) => {
      platform.draw()
  })

  // Control the player movement using keyboard
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } 
  else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } 
  else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
        platforms.forEach((platform) => {
          platform.position.x -= 5;
        });
        
    }
    else if (keys.left.pressed) {
        platforms.forEach((platform) => {
          platform.position.x += 5;
        });
    }
  }
 
  // Platform Collision Detection
  platforms.forEach((platform) => {
        if (
          player.position.y + player.height <= platform.position.y &&
          player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
          player.position.x + player.width >= platform.position.x &&
          player.position.x < platform.position.x + platform.width
        ) {
          player.velocity.y = 0;
        }
  })

}; // End of animate function

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      player.velocity.x -= 1;  //1 represents 1 step forward
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      player.velocity.x += 1; // 1 represents 1 step forward
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20; // 20 represents 20 steps
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
