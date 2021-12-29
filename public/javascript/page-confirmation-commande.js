// Récupérer l'ID de commande dans l'URL

async function urlOrderID() {
    const params = (new URL(document.location)).searchParams;
    const urlOrderID = params.get("order");

    return urlOrderID;
}

// Faire apparaître le texte de confirmation de commande

async function orderConfirmationAppears() {
    
    const orderID = await urlOrderID();
    const orderAmount = JSON.parse(localStorage.getItem("order-final-amount"));
    const contactDetails = JSON.parse(localStorage.getItem("order-contact-details"));
      
    const $orderConfirmationTable = document.querySelector("#tableau-confirmation-commande");

    $orderConfirmationTable.innerHTML = `
        <div class="row tableau-ligne tableau-ligne--1">
            <div class="col commande-confirmée">VOTRE COMMANDE EST CONFIRMÉE.</div>
        </div>
        <div class="row message-commande-confirmée">
            <span>${contactDetails.firstName},</span><br /><br />

            <span>Nous vous remercions pour votre commande n° <strong>${orderID}</strong> d'un montal total de <strong>${orderAmount}</strong> qui vous parviendra très prochainement à l'adresse ci-dessous :</span><br /><br /><br />

            <strong>${contactDetails.firstName} ${contactDetails.lastName}</strong>
            <strong>${contactDetails.address}</strong>
            <strong>${contactDetails.city}</strong><br /><br />


            <span>Nous espérons vous retrouver bientôt sur notre site,</span><br />
            <span>L'équipe Orinoco.</span>
        </div>
        <div class="ligne-séparation"></div>
    `;

    return $orderConfirmationTable;
}

window.addEventListener('load', function() {
    orderConfirmationAppears();
})