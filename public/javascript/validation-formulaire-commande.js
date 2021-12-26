// CONSTANTES propres à la validation du formulaire

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

// Obtenir l'ID de l'input sur lequel on clique
function getInputID(targetedInput) {
    // Répertorier tous les inputs du formulaire dans un tableau
    const inputNodeList = document.querySelectorAll("input");
    const inputTableList = Array.from(inputNodeList);

    // Récupérer l'ID de l'input sur lequel je clique
    for (let input of inputTableList) {
        const inputID = targetedInput.id;
        console.log(inputID);

        return inputID;
    }
}

// Vérifier chaque champ du formulaire avant envoi

function checkFormInputs(inputValue) {

    if (inputValue === '') {
        console.log("ERREUR");
    }
}

// Renvoyer une erreur >>> si INPUT DU FORMULAIRE EST VIDE

/*function setErrorFor(inputID, message) {
    const formBlock = inputID.parentElement;

    return formBlock;    
}

function errorIfEmptyInput2(input) {

    if (input == '') {
        console.log("ERREUR");
    }

    console.log(input);

    return input;
    
}*/

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