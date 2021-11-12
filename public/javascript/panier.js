// Récupérer l'ID de l'URL

async function URLId () {
    const params = (new URL(document.location)).searchParams;
    const URLId = params.get("ID");

    return URLId;
}

// Récupérer l'objet JSON du produit concerné (via l'ID de l'URL)

async function getJSONObject () {
    const ID = await URLId();
    const response = await fetch(`http://localhost:3000/api/cameras/${ID}`);
    const productData = await response.json();

    return productData;
}

//Mettre l'option "lentille" choisie par l'utilisateur dans une variable
function selectedLens() {
    const $singleProduct = document.querySelector("#single-product");
    console.log($singleProduct);
}

window.addEventListener('load', function() {
    selectedLens();
});


//Mettre les caractéristiques "produit ajouté au panier" à envoyer dans le panier dans une variable

/*Si 0 clé panier --> init tableau vide
Sinoon --> ajout d'une nouvelle clé*/