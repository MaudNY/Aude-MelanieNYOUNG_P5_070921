// Récupérer le produit à envoyer dans le Local Storage

async function getSelectedProduct(selectedLens) {
    const product = await getJSONObject();

    let selectedProduct = {
        productId : product._id,
        productImageUrl : product.imageUrl,
        productName : product.name,
        productDescription : product.description,
        productLens : selectedLens,
        productPrice : (product.price/100).toFixed(2),
    };

    return selectedProduct;
}

// Fonction qui récupère le contenu du panier dans le Local Storage

function getDataFromCartOnLS() {
    const dataFromLS = JSON.parse(localStorage.getItem("product"));

    if (dataFromLS === null) {
        const initialCart = [];
        localStorage.setItem("product", JSON.stringify(initialCart));
        return initialCart;
    }

    return dataFromLS;
}

/* Fonction envoi classe produit :
Si storage.length = 0 --> création de tableau
Sinon ajout d'une classe produit au tableau */

async function sendToLocalStorage(selectedLens) {    
    let keyProduct = JSON.parse(localStorage.getItem("product"));

    if (keyProduct == null) {
        keyProduct = [];
        keyProduct.push(await getSelectedProduct(selectedLens));
        localStorage.setItem("product", JSON.stringify(keyProduct));
    } else {
        keyProduct.push(await getSelectedProduct(selectedLens));
        localStorage.setItem("product", JSON.stringify(keyProduct));
    }
}
