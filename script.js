let starPlatinumActivated = false;
let isActivating = false;

const htmlElement = document.querySelector(".filter");

const registeredDrops = [];

async function starPlatinum() {
    if(!starPlatinumActivated){
        isActivating = true;

        await playAudioAndWait(new Audio('sounds/activation.mp3'));

        isActivating = false;

        starPlatinumActivated = true;

        registeredDrops.forEach(tween => {
          tween.pause();
        });
    } else {
        isActivating = true;

        await playAudioAndWait(new Audio('sounds/desactivation.mp3'));

        isActivating = false;

        starPlatinumActivated = false;

        registeredDrops.forEach(tween => {
          tween.play();
        });
    }

    htmlElement.classList.forEach(className => {
      if(className.startsWith("jojo")) {
        htmlElement.classList.remove(className);
      }
    });
    

    if(starPlatinumActivated) {
      htmlElement.style.opacity = 0.4;
      htmlElement.classList.add("big-index");
      htmlElement.classList.toggle("jojo-" + randomIntFromInterval(1, 5)); // html -> .jojo
    } else {
      htmlElement.style.opacity = 0;
      htmlElement.classList.remove("big-index");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playAudioAndWait(audio){
  return new Promise(res=>{
    audio.play()
    audio.onended = res
  });
}

/* RAIN */
const slowTimeScale = 0.4;
const baseDelayRain = 50;
let delayRain = baseDelayRain;
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

  let tween = gsap.fromTo(
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
  );

  registeredDrops.push(tween);

  registeredDrops.forEach(tween => {
    if(!starPlatinumActivated && isActivating) {
      // Activating
      delayRain = baseDelayRain/(1/slowTimeScale);
      tween.timeScale(slowTimeScale);
  
    } else {
      // On re enable / Rest of time not activating
      delayRain = baseDelayRain;
      tween.timeScale(1);

    }
  })
}

// Periodically create raindrops & lightning
setInterval(() => {
  if(delayRain != 50) {
    if(random(0, 1) <= slowTimeScale) {
      if(!starPlatinumActivated) createRaindrop();
    }
  } else if(!starPlatinumActivated) createRaindrop();
}, delayRain);