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
        <div class="col-2 catégorie-tableau">${item.productPrice.toFixed(2)} €</div>
        <div class="ligne-séparation ligne-séparation--page-panier"></div>
    `;

    const $boutonSupprimerArticle = $cartLine.querySelector(".btn-suppr-article");

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

/*function removeLineOfLastCartLine () {
    let lastElementOfLS = getDataFromCartOnLS()[getDataFromCartOnLS().length - 1];
    console.log(lastElementOfLS);

    const ligneSeparation = document.querySelector("ligne-séparation");
    console.log(ligneSeparation);
}*/

// Supprimer un article dans le panier

function removeItemFromLS () {
    console.log("Coucou");
    const remArticleBtn = document.querySelectorAll(".btn-suppr-article");
    const remArticleBtnTable = Array.from(remArticleBtn);
    console.log(remArticleBtnTable);
}

// Afficher le prix total des articles du panier

function showTotalAmount () {
    const totalAmoutTable = [];

    for (let element of getDataFromCartOnLS()) {
        let priceProductsInTheCart = element.productPrice;

        totalAmoutTable.push(priceProductsInTheCart);
    }

    const $sommePanier = document.querySelector("#somme-panier");

    if (localStorage.length == 0) {
        $sommePanier.innerHTML = 0;
    } else {
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalAmoutOfCart = totalAmoutTable.reduce(reducer);
        $sommePanier.innerHTML = `${totalAmoutOfCart.toFixed(2)} €`;
    }
    
    return $sommePanier;
}

// Afficher le nombre total d'articles dans le panier

function showTotalNumberOfItems () {
    const $sommeArticles = document.querySelector("#somme-articles");
    $sommeArticles.innerHTML = getDataFromCartOnLS().length;

    return $sommeArticles;
}

// EVENT LISTENER - Au chargement de la page --> Afficher les produits du panier

window.addEventListener('load', function () {
    createCartTable();
    showTotalNumberOfItems();
    showTotalAmount();
})