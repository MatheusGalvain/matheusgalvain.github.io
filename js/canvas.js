const TWO_PI = Math.PI * 2;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Application {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = 300;
        this.height = this.canvas.height = 500;

        this.mousePosition = { x: this.width / 2, y: this.height / 2 };
        this.ghosts = [];
        this.numberOfGhosts = 4;

        this.initializeGhosts();
        this.loop();
        
        window.addEventListener('mousemove', (e) => this.mouseMove(e));
    }

    mouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    initializeGhosts() {
        while (this.ghosts.length < this.numberOfGhosts) {
            const newX = getRandomInt(50, 250);
            const newY = getRandomInt(50, 350);
            
            let tooClose = false;
            for (const ghost of this.ghosts) {
                const dx = ghost.position.x - newX;
                const dy = ghost.position.y - newY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < ghost.radius * 2 + 20) {
                    tooClose = true;
                    break;
                }
            }

            if (!tooClose) {
                this.ghosts.push(new Ghost(newX, newY, this.context));
            }
        }
    }

    update() {
        this.ghosts.forEach(ghost => ghost.update(this.mousePosition));
    }

    render() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.ghosts.forEach(ghost => ghost.render());
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.loop());
    }
}

class Ghost {
    constructor(x, y, context) {
        this.position = { x, y };
        this.context = context;
        this.radius = 22;
        this.eyes = [];
        this.eyeDistance = 10;
        this.flotationAmplitude = 0.5;
        this.flotationSpeed = 0.05; 
        this.flotationOffset = 0;
        this.initializeEyes();
    }

    initializeEyes() {
        this.eyes.push({ offsetX: -this.eyeDistance, offsetY: -10 });
        this.eyes.push({ offsetX: this.eyeDistance, offsetY: -10 });
    }

    update(mousePosition) {
        const dx = mousePosition.x - this.position.x;
        const dy = mousePosition.y - this.position.y;

        this.flotationOffset += this.flotationSpeed; 
        this.position.y += Math.sin(this.flotationOffset) * this.flotationAmplitude;

        this.eyes.forEach(eye => {
            eye.angle = Math.atan2(dy, dx);
        });
    }

    render() {
        this.context.fillStyle = "#ffffff";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, TWO_PI);
        this.context.fill();

        this.context.strokeStyle = "#141414";
        this.context.lineWidth = 0.5;
        this.context.stroke();

        // Desenhar os olhos
        this.eyes.forEach(eye => {
            const eyeX = this.position.x + eye.offsetX;
            const eyeY = this.position.y + eye.offsetY;

            this.context.fillStyle = "#263080"; // Cor dos olhos
            this.context.beginPath();
            this.context.arc(
                eyeX + Math.cos(eye.angle) * 5,
                eyeY + Math.sin(eye.angle) * 5,
                3,
                0,
                TWO_PI
            );
            this.context.fill();
        });

        // Desenhar as mãozinhas
        this.drawArms();
    }

    drawArms() {
        this.context.fillStyle = "#ffffff";
        const armLength = 10;
        const leftArmX = this.position.x - this.radius - 3;
        const rightArmX = this.position.x + this.radius + 3;
        const armY = this.position.y;

        // Braço esquerdo
        this.context.beginPath();
        this.context.arc(leftArmX, armY, 5, 0, TWO_PI);
        this.context.strokeStyle = "#141414";
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.fill();

        // Braço direito
        this.context.beginPath();
        this.context.arc(rightArmX, armY, 5, 0, TWO_PI);
        this.context.strokeStyle = "#141414";
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.fill();
    }
}

window.onload = function () {
    new Application();
};
