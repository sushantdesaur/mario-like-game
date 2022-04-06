const canvas = document.querySelector('canvas')

// Added 2D context
const context =canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight  

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
            y: 1,  // For positive values player goes downwards
        }

        // Set object width and height
        this.width = 100;
        this.height = 100;
    }
    draw () {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update () {
        this.draw(); 
        this.position.y += this.velocity.y;
    }
}

const player = new Player()

player.update()

function animate () {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
}

animate()

console.log(context)