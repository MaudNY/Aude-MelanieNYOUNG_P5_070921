// EVENT LISTENER "ONCHANGE" - Identifier un input vide + renvoyer une ERROR

function tagEmptyInput(input, inputValue) {
    
    if (inputValue.trim() != '' && inputValue.trim().length >= input.getAttribute("minlength")) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Ce champ ne peut être vide");
    }

    return input;
}

// EVENT LISTENER "ONCHANGE" - Renvoyer une ERROR si le champ ne respecte pas le format "01234-T"

function checkCityInput(input, inputValue) {
    const cityRegex = /^(F-)?\d{5}\s[A-z]{1,}$/.test(inputValue);

    if (cityRegex === true) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Veuillez respecter le format demandé : 12345 Ville")
    }

    return input;
}


// Renvoyer une ERROR ou un SUCCESS pour X CAS

function setErrorFor(input, message) {
    const formBlock = input.parentElement;
    

    if (formBlock.classList.contains("success")) {
        formBlock.classList.remove("success");
        formBlock.classList.add("error");
    } else {
        formBlock.classList.add("error");
    }

    const errorMessage = formBlock.querySelector(".error-message");
    errorMessage.innerText = message;

    return formBlock;
}

function setSuccessFor(input) {
    const formBlock = input.parentElement;

    if (formBlock.classList.contains("error")) {
        formBlock.classList.remove("error");
        formBlock.classList.add("success");
    } else {
        formBlock.classList.add("success");
    }

    return formBlock;
}

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