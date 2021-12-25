// Créer objet JSON (paire clé-valeur) contenant les données de contact du formulaire

function getFormValues() {
    const $orderForm = document.querySelector("#form-commande");

    let formData = {
        firstName : $orderForm.querySelector("#firstName"),
        lastName : $orderForm.querySelector("#lastName"),
        address : $orderForm.querySelector("#address"),
        city : $orderForm.querySelector("#city"),
        email : $orderForm.querySelector("#email"),
    };

    let formValues = {
        firstName : formData.firstName.value,
        lastName : formData.lastName.value,
        address : formData.address.value,
        city : formData.city.value,
        email : formData.email.value,
    };

    return formValues;
}

// Créer un tableau d'IDs de produits (uniquement, avec initialisation tableau vide) avec un "reducer"

function getIdsFromCartProducts () {
    const lsData = getDataFromCartOnLS();
    const idList = lsData.reduce((acc, product) => [...acc, product.productId], []);
    
    return idList;
}

// Récupérer et conserver le prix total de la commande dans le Local Storage

function getFinalAmoutOfTheOrder() {
    const $cartAmout = document.querySelector("#somme-panier");
    const finalCartAmount = $cartAmout.innerHTML;

    localStorage.setItem("order final amount", JSON.stringify(finalCartAmount));

    return finalCartAmount;
}

// Récupérer et conserver les données du formulaire de commande

function getContactDetails() {
    const formValues = getFormValues();
    
    localStorage.setItem("order contact details", JSON.stringify(formValues));

    return formValues;
}

/* Envoyer l'objet JSON de données de contact et le tableau d'IDs de produits au serveur
+ réceptionner le numéro de commande
+ ouvrir la page de confirmation de commande */

function sendOrder() {

    const contact = getFormValues();
    const products = getIdsFromCartProducts();

    fetch ("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        const orderId = value.orderId;
        const newUrl = location.assign(`page-confirmation-commande.html?order=${orderId}`);

        return newUrl;
    })
}

window.addEventListener('load', function() {
    getFinalAmoutOfTheOrder();
})