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

    const $boutonSupprimerArticle = $cartLine.querySelector(".btn-suppr-article-container");

    $boutonSupprimerArticle.addEventListener("click", function(event) {
        const targetedRemBtn = event.target;
        removeCartItem(targetedRemBtn);
        window.location.reload();
    })

    return $cartLine;
}

// Créer un texte de remplacement si le panier est vide

function createAltText () {
    const $altText = document.createElement("div");
    $altText.className = "row tableau-ligne tableau-ligne--x";
    $altText.innerHTML = `
        <div class="col alt-text">Votre panier est encore vide... pour l'instant !</br>
        Nous vous invitons à parcourir <a href="index.html" class="alt-text-link">notre sélection de produits</a> afin de le remplir.</div>
    `;

    return $altText;
}

/* Faire apparaître le prix, prix total, nombre d'articles du panier et le formulaire
== UNIQUEMENT s'il y a quelque chose dans le LS*/

function cartAndFormAppear() {
    const $cartPrice = document.querySelector(".prix-panier");
    const $cartNumberOfItems = document.querySelector(".nbre-articles-panier");
    const $cartTotalAmount = document.querySelector(".prix-total-panier");

    const $form = document.querySelector("#saisie-coordonnées");

    if (getDataFromCartOnLS().length == 0) {

    } else {
        $cartPrice.textContent = "PRIX";
        $cartNumberOfItems.textContent = "Nombre d'articles";
        $cartTotalAmount.textContent = "MONTANT TOTAL";

        $form.innerHTML = `
        <div class="contact-details-block">
            <div class="tableau-ligne tableau-ligne--1 tableau-ligne--coordonnées">MES COORDONNÉES</div>
        </div>

        <form id="form-commande" method="post" action="à-définir">
            <div class="form-container">
                <div class="prenom-nom">
                    <div class="form-block form-block--small">
                        <label for="firstName">Prénom</label>
                        <input type="text" name="prenom" id="firstName" minlength="2" placeholder="Prénom" class="success" required/>
                        <i class="fas fa-check-circle"></i>
                        <i class="fas fa-exclamation-circle"></i>
                        <p class="error-message">Error message</p>
                    </div>
                    <div class="form-block form-block--small">
                        <label for="lastName">Nom de famille</label>
                        <input type="text" name="nom" id="lastName" minlength="2" placeholder="Nom" class="error" required/>
                        <i class="fas fa-check-circle"></i>
                        <i class="fas fa-exclamation-circle"></i>
                        <p class="error-message">Error message</p>
                    </div>
                </div>
                <div class="address form-block form-block--long">
                    <label for="address">Adresse postale</label>
                    <input type="text" name="adresse" id="address" placeholder="Numéro, nom de rue (Ex : 8, avenue Charles Fitte)" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message">Error message</p>
                </div>
                <div class="city form-block form-block--long">
                    <label for="city">Code postal et Ville</label>
                    <input type="text" name="ville" id="city" placeholder="Ex : 78000 Versailles" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message">Error message</p>
                </div>
                <div class="email form-block form-block--long">
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Email (Ex : alexandre.rouvain@gmail.com)" required/>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <p class="error-message">Error message</p>
                </div>
            </div>
        </form>

        <div class="row">
            <div class="col-9"></div>
            <button type="submit" class="col-2 bouton-type bouton-type--commander">COMMANDER</button>
            <div class="col-1"></div>
        </div>
            `;

        const $orderButton = document.querySelector(".bouton-type--commander");

        $orderButton.addEventListener("click", () => {
            sendOrder();
        })
    }
}

/* Pour chaque élément du tableau "Produit" dans le LS, créer une ligne HTML de panier 
    >> si pas de données dans le LS : faire apparaître texte de remplacement */

function createCartTable () {
    const $tableauPremiereLigne = document.querySelector(".tableau-premiere-ligne");

    if (getDataFromCartOnLS().length == 0) {
        $tableauPremiereLigne.append(createAltText());
    } else {
        for (let item of getDataFromCartOnLS()) {
            $tableauPremiereLigne.append(createCartLine(item));
        }
    }

    return $tableauPremiereLigne;
}

// Afficher le nombre total d'articles dans le panier

function showTotalNumberOfItems () {
    const $sommeArticles = document.querySelector("#somme-articles");

    if (getDataFromCartOnLS() == 0) {

    } else {
        $sommeArticles.innerHTML = getDataFromCartOnLS().length;
    }

    return $sommeArticles;
}

// Afficher le prix total des articles du panier

function showTotalAmount () {
    const totalAmoutTable = [];

    for (let element of getDataFromCartOnLS()) {
        let priceProductsInTheCart = element.productPrice;

        totalAmoutTable.push(priceProductsInTheCart);
    }

    const $sommePanier = document.querySelector("#somme-panier");

    if (getDataFromCartOnLS().length == 0) {
        
    } else {
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalAmoutOfCart = totalAmoutTable.reduce(reducer);
        $sommePanier.innerHTML = `${totalAmoutOfCart.toFixed(2)} €`;
    }
    
    return $sommePanier;
}

// Supprimer un article DU PANIER...

function removeCartItem (targetedRemBtn) {
    // Répertorier les boutons "Supprimer cet article" dans un tableau
    const remBtnList = document.querySelectorAll(".btn-suppr-article");
    const remBtnTable = Array.from(remBtnList);

    // Je sélectionne l'index du bouton sur lequel je clique
    const index = remBtnTable.indexOf(targetedRemBtn);

    removeLsItem(index);
}

// ...et supprimer un objet du Local Storage

function removeLsItem (index) {
    const itemsInLs = getDataFromCartOnLS();
    itemsInLs.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(itemsInLs));
}

// EVENT LISTENER - Au chargement de la page --> Afficher les produits du panier, le nombre d'items dans le panier et le montant total du panier

window.addEventListener('load', function () {
    createCartTable();
    cartAndFormAppear();
    showTotalNumberOfItems();
    showTotalAmount();
})