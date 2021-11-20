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
            <div class="row">
                <p class="col-6">${item.productLens}</p>
                <div class="col-6 btn-suppr-article-container"><button class="btn-suppr-article">Supprimer cet article</button></div>
            </div>

        </div>
        <div class="col-2 catégorie-tableau quantité-produits-panier"></div>
        <div class="col-2 catégorie-tableau">${item.productPrice} €</div>
        <div class="ligne-séparation ligne-séparation--page-panier"></div>
    `;

    const $boutonSupprimerArticle = $cartLine.querySelector(".btn-suppr-article");
    console.log($boutonSupprimerArticle);

    $boutonSupprimerArticle.addEventListener("click", function () {
        removeItemFromLS();
    })

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

// Supprimer la ligne de séparation pour le dernier élément  du tableau

function removeLineOfLastCartLine () {
    let lastElementOfLS = getDataFromCartOnLS()[getDataFromCartOnLS().length - 1];
    console.log(lastElementOfLS);

    const ligneSeparation = document.querySelector("ligne-séparation");
    console.log(ligneSeparation);
}

// Supprimer un article dans le panier

function removeItemFromLS () {
    console.log("Coucou");
}

// Gérer le prix total des articles

// EVENT LISTENER - Au chargement de la page --> Afficher les produits du panier

window.addEventListener('load', function () {
    createCartTable();
})