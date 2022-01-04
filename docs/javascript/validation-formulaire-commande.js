/* EVENT LISTENER "ONCHANGE" - Renvoyer une ERROR si les champs "firstName" et "lastName"...
...ne respectent pas le format "Jean-Pierre" ou "Jean Pierre"*/

function checkNameInputs(input, inputValue) {
    const nameRegex = /^([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})$/.test(inputValue);
    
    if (nameRegex === true) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Veuillez correctement renseigner ce champ");
    }

    return input;
}

// "ONCHANGE" - Renvoyer une ERROR si le champ "address" contient autre chose que des lettres, chiffres et espaces

function checkAddressInput(input, inputValue) {
    const addressRegex = /^[A-ZÉÈÊËÎÏa-zéèëîïüßäö0-9\ \',-]{8,}$/.test(inputValue);

    if (addressRegex === true) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Veuillez renseigner une adresse valide")
    }

    return input;
}

// "ONCHANGE" - Renvoyer une ERROR si le champ "city" ne respecte pas le format "01234-T"

function checkCityInput(input, inputValue) {
    const cityRegex = /^(F-)?\d{5}\ ([A-ZÉÈÊËÎÏa-zéèëîïüßäö0\ '-]{1,50})$/.test(inputValue);

    if (cityRegex === true) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Veuillez respecter le format demandé : 12345 Ville")
    }

    return input;
}

// "ONCHANGE" - Renvoyer une ERROR si le champ "email" ne contient pas d'adresse email

function checkEmailInput(input, inputValue) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputValue);
    
    if (emailRegex === true) {
        setSuccessFor(input);
    } else {
        setErrorFor(input, "Veuillez renseigner une adresse email correcte")
    }
}


// Renvoyer une ERROR ou un SUCCESS pour X CAS

function setErrorFor(input, message) {
    const $formBlock = input.parentElement;
    

    if ($formBlock.classList.contains("success")) {
        $formBlock.classList.remove("success");
        $formBlock.classList.add("error");
    } else {
        $formBlock.classList.add("error");
    }

    const errorMessage = $formBlock.querySelector(".error-message");
    errorMessage.innerText = message;

    return $formBlock;
}

function setSuccessFor(input) {
    const $formBlock = input.parentElement;

    if ($formBlock.classList.contains("error")) {
        $formBlock.classList.remove("error");
        $formBlock.classList.add("success");
    } else {
        $formBlock.classList.add("success");
    }

    return $formBlock;
}

// "ONCHANGE" - Faire apparaître le bouton "COMMANDER" quand tous les "form-block" contiennent la classe "success"

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