// Récupérer le produit à envoyer dans le Local Storage :

async function getSelectedProduct() {
    const product = await getJSONObject();
    let selectedProduct = {
        productImage : product.imageUrl,
        productName : product.name,
        productDescription : product.description,
        productLens : "A CONFIGURER",
        productPrice : (product.price/100).toFixed(2),
    };

    return selectedProduct;
}

//Déclarer la variable dans laquelle on va stocker les différents produits
let cartLine = JSON.parse(localStorage.getItem("product"));

/* Fonction envoi classe produit :
Si storage.length = 0 --> création de tableau
Sinon ajout d'une classe produit au tableau */

async function sendToLocalStorage() {
    if (localStorage.length === 0) {
        cartLine = [];
        cartLine.push(await getSelectedProduct());
        localStorage.setItem("product", JSON.stringify(cartLine));
    } else {
        cartLine.push(await getSelectedProduct());
        localStorage.setItem("product", JSON.stringify(cartLine));
    }
}

sendToLocalStorage();

// Au clic sur le bouton "Ajouter au panier" --> envoi Classe Produit dans localStorage
