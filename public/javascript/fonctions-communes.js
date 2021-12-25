// HEADER - Créer la vignette du panier (élément "span")

function createCartVignette() {
    const $cartVignette = document.createElement("span");
    $cartVignette.className = "nombre-items-panier";
    $cartVignette.setAttribute("id", "vignette-panier");

    if (localStorage.length == 0) {
        $cartVignette.innerHTML = 0;
    } else {
        $cartVignette.innerHTML = getDataFromCartOnLS().length;
    }

    return $cartVignette;
}

// HEADER - Lorsque la vignette "nombre d'items" du panier apparaît (n = 0)

function cartVignetteAppears() {
    const $cartVignette = createCartVignette();
    const $panier = document.querySelector("#panier");
    $panier.append($cartVignette);

    return $cartVignette;
}

// Supprimer la clé "order contact details" (si l'on se trouve sur une autre page que page-confirmation-commande.html)

function removeContactDetailsFromLS() {
    if (localStorage.getItem("order contact details")) {
        localStorage.removeItem("order contact details")
    }

    return localStorage;
}

// EVENT LISTENER - Au chargement de la page...

window.addEventListener ('load', function() {
    createCartVignette();
    cartVignetteAppears();
    removeContactDetailsFromLS();
})