// Renvoyer une erreur >>> si INPUT DU FORMULAIRE EST VIDE

// Renvoyer une erreur >>> si TAILLE MINIMALE dans Prénom-Nom est strictement inférieure à 2

// Renvoyer une erreur >>> si FORMAT du champ "City" est différent de 01234-xxxx

// Renvoyer une erreur >>> si LE CHAMP "Email" ne contient pas une adresse email

// Faire apparaître le bouton "COMMANDER" quand tous les "form-block" contiennent la classe "success"

function makeOrderButtonAppear() {
    const $orderButton = document.querySelector(".bouton-type--commander");
    
    const formBlockList = document.querySelectorAll(".form-block");
    const formBlockTable = Array.from(formBlockList);

    let numberOfSuccess = 0;

    for (let formBlock of formBlockTable) {

        if (formBlock.classList.contains("success")) {
            numberOfSuccess++;
        }
    }

    if (numberOfSuccess === 5) {
        $orderButton.removeAttribute("disabled");
        $orderButton.classList.remove("disabled");
    }
    
    return $orderButton;
}

window.addEventListener('load', function() {
    makeOrderButtonAppear();
})