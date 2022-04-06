import platform from "../img/platform.png";
import background from "../img/background.png";
import hills from "../img/hills.png";


console.log(platform);

const canvas = document.querySelector("canvas");

// Added 2D context
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

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
    this.width = 50;
    this.height = 50;
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
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
  // console.log(image);
}

let platformImage = createImage(platform);
let backgroundImage = createImage(background);
let hillImage = createImage(hills);

let player = new Player();
// let platform = new Platform();
let platforms = [
  new Platform({ x: -1, y: 470, image: platformImage }),
  new Platform({
    x: platformImage.width - 3,
    y: 470,
    image: platformImage,
  }),
  new Platform({
    x: platformImage.width * 2 + 100,
    y: 470,
    image: platformImage,
  }),
];

let genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: backgroundImage,
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: hillImage,
  }),
];

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  // Create Images
  platformImage = createImage(platform);
  backgroundImage = createImage(background);
  hillImage = createImage(hills);

  player = new Player();

  platforms = [
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: backgroundImage,
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: hillImage,
    }),
  ];

scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  // Control the player movement using keyboard
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= 3;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += 3;
      });
    }
  }

  //   console.log(scrollOffset)

  // Platform Collision Detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // win condition
  if (scrollOffset > 20000) {
    console.log("You win");
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init();
  }
} // End of animate function

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      player.velocity.x -= 1; //1 represents 1 step forward
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
