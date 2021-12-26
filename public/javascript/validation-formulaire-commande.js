// Identifier les inputs vides

function tagEmptyInput(input, inputValue) {
    
    if (inputValue === '') {
        setErrorFor(input, "Ce champ ne peut être vide");
    }

    return input;
}

// Renvoyer une ERROR pour X CAS

function setErrorFor(input, message) {
    const formBlock = input.parentElement;
    formBlock.classList.add("error");

    const errorMessage = formBlock.querySelector(".error-message");
    errorMessage.innerText = message;

    return formBlock;
}

// Renvoyer un SUCCESS pour X CAS

function setSuccessFor(input, message) {
    const formBlock = input.parentElement;
    formBlock.classList.add("success");

    return formBlock;
}

// Renvoyer une erreur >>> si TAILLE MINIMALE dans Prénom-Nom est strictement inférieure à 2

// Renvoyer une erreur >>> si FORMAT du champ "City" est différent de 01234-xxxx

// Renvoyer une erreur >>> si LE CHAMP "Email" ne contient pas une adresse email

// Obtenir l'ID de l'input sur lequel on clique

function getInputID(targetedInput) {
    // Répertorier tous les inputs du formulaire dans un tableau
    const inputNodeList = document.querySelectorAll("input");
    const inputTableList = Array.from(inputNodeList);

    // Récupérer l'ID de l'input sur lequel je clique
    for (let input of inputTableList) {
        const inputID = targetedInput.id;

        return `#${inputID}`;
    }
}

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