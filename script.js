let starPlatinumActivated = false;
const jojoButton = document.querySelector("trigger-jojo");

const htmlElement = document.querySelector(".filter");

const registeredDrops = [];

async function starPlatinum() {
    if(!starPlatinumActivated){
        const activationSound = new Audio('sounds/activation.mp3');
        activationSound.play();

        await sleep(3850);

        starPlatinumActivated = true;

        registeredDrops.forEach(tween => {
            tween.pause();
        });
    } else {
        const desactivationSound = new Audio('sounds/desactivation.mp3');
        desactivationSound.play();

        await sleep(1330);

        starPlatinumActivated = false;

        registeredDrops.forEach(tween => {
            tween.play();
        });
    }

    htmlElement.classList.forEach(className => {
        if(className.startsWith("jojo")) htmlElement.classList.remove(className);
    });
    

    if(starPlatinumActivated) {
        htmlElement.classList.add("big-index");
        htmlElement.classList.toggle("jojo-" + randomIntFromInterval(1, 5)); // html -> .jojo
    } else {
        htmlElement.classList.remove("big-index");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* RAIN */
const delayRain = 50;
const offset = 10;

const raindrops = document.querySelector(".raindrops");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// Function to create a random number within a given range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to create raindrops
function createRaindrop() {
  const raindrop = document.createElement("div");
  raindrop.className = "raindrop";
  raindrops.appendChild(raindrop);

  const startX = random(offset, window.innerWidth-offset);
  const startY = offset;
  let duration = random(1.5, 4);

  registeredDrops.push(gsap.fromTo(
    raindrop,
    { x: startX, y: startY, opacity: 1 },
    {
      x: startX,
      y: window.innerHeight-offset,
      opacity: 0,
      duration,
      ease: "linear",
      onComplete: () => {
        raindrops.removeChild(raindrop);

        const index = registeredDrops.indexOf(this);
        if (index > -1) {
            registeredDrops.splice(index, 1);
        }
      }
    }
  ));
}

// Periodically create raindrops & lightning
setInterval(() => {
  if(!starPlatinumActivated) createRaindrop();
}, delayRain);