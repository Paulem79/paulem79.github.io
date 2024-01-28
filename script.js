
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("load", Write());

async function Write(){
    const title = document.querySelector("h1");
    while(true){
        title.innerHTML = "Paulem79<span>.</span>";
        await sleep(800);
        title.innerHTML = "Paulem79<span style=\"visibility: hidden;\">.</span>";
        await sleep(800);
    }
}

document.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var clickableElements = document.querySelectorAll('a');

    var closestElement = null;
    var closestDistance = Number.MAX_VALUE;

    clickableElements.forEach(function(element) {
        var rect = element.getBoundingClientRect();
        var elementX = rect.left + rect.width / 2;
        var elementY = rect.top + rect.height / 2;

        var distance = Math.sqrt(Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = element;
        }
    });

    document.body.style.cursor = "default";
    closestElement.blur();
    if (closestElement && closestDistance < 100) {
        closestElement.focus();
        document.body.style.cursor = 'pointer';
    }
});

// Fonction pour gérer le focus sur un élément
function handleFocus(event) {
    console.log("L'élément a le focus : ", event.target);
    // Ajouter un attribut pour marquer l'élément avec le focus
    event.target.setAttribute("data-focus", "true");
}

// Fonction pour gérer le clic sur un élément
function handleClick(event) {
    var focusedElement = document.querySelector("[data-focus='true']");
    if (focusedElement && focusedElement === event.target) {
        console.log("Clic simultané détecté sur l'élément : ", event.target);
    }
    // Supprimer l'attribut pour éviter les fausses détections
    focusedElement.removeAttribute("data-focus");
}

// Ajouter un écouteur d'événement pour le focus sur tout le document
document.addEventListener("focusin", handleFocus);

// Ajouter un écouteur d'événement pour le clic sur tout le document
document.addEventListener("click", handleClick);
