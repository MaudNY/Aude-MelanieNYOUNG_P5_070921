// Vider la clé "produit" du Local Storage

function removeProductsInTheLocalStorage() {
    localStorage.removeItem("product");

    return localStorage;
}

// Récupérer l'ID de commande dans l'URL

async function urlOrderID() {
    const params = (new URL(document.location)).searchParams;
    const urlOrderID = params.get("order");

    return urlOrderID;
}

// Faire apparaître le texte de confirmation de commande

async function orderConfirmationAppears() {
    
    const orderID = await urlOrderID();
    const orderAmount = JSON.parse(localStorage.getItem("order final amount"));
      
    const $orderConfirmationTable = document.querySelector("#tableau-confirmation-commande");

    $orderConfirmationTable.innerHTML = `
        <div class="row tableau-ligne tableau-ligne--1">
            <div class="col commande-confirmée">VOTRE COMMANDE EST CONFIRMÉE.</div>
        </div>
        <div class="row message-commande-confirmée">
            <span>Alexandre,</span><br />
            <span>Nous vous remercions pour votre commande n° <strong>${orderID}</strong> d'un montal total de <strong>${orderAmount}</strong> qui vous parviendra très prochainement à l'adresse ci-dessous :</span><br /><br />

            <strong>Prénom Nom</strong>
            <strong>Adresse ligne 1</strong>
            <strong>Complément d'adresse</strong>
            <strong>Code Postal</strong> <strong>Ville</strong><br /><br />


            <span>Nous espérons vous retrouver bientôt sur notre site,</span><br />
            <span>L'équipe Orinoco.</span>
        </div>
        <div class="ligne-séparation"></div>
    `;

    return $orderConfirmationTable;
}

window.addEventListener('load', function() {
    removeProductsInTheLocalStorage();
    orderConfirmationAppears();
})