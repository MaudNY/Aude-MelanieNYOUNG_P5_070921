// Créer une ligne HTML de panier

function createCartLine (item) {
    const $cartLine = document.createElement("div");
    $cartLine.className = "row tableau-ligne tableau-ligne--x";
    $cartLine.innerHTML = `
        <div class="col-3 img-produit-panier"><a href="page-produit.html?ID=${item.productId}"><img src="${item.productImageUrl}" alt="Appareil photo ${item.productName}" /></a></div>
        <div class="col-5 caract-produits">
            <h2><a href="page-produit.html?ID=${item.productId}">${item.productName}</a></h2>
            <p><a href="page-produit.html?ID=${item.productId}">${item.productDescription}</a></p>
            <h3>Type de lentille</h3>
            <p>${item.productLens}</p>
        </div>
        <div class="col-2 catégorie-tableau quantité-produits-panier"></div>
        <div class="col-2 catégorie-tableau">${item.productPrice} €</div>
        <div class="ligne-séparation ligne-séparation--page-panier"></div>
    `;

    return $cartLine;
}

// Pour chaque élément du tableau "Produit" dans le LS, créer une ligne HTML de panier

function createCartTable () {
    const $tableauLigneUn = document.querySelector(".tableau-premiere-ligne");

    for (let item of getDataFromCartOnLS()) {
        $tableauLigneUn.append(createCartLine(item));
    }

    return $tableauLigneUn;
}

// Gérer le nombre d'articles dans le panier

// Gérer le prix total des articles

// EVENT LISTENER - Au chargement de la page --> Afficher les produits du panier

window.addEventListener('load', function () {
    createCartTable();
})