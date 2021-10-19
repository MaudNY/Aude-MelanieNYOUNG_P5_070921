// HEADER - Ajout item panier //


// LISTE PRODUITS //

async function fetchProduits() {
    const response = await fetch(`http://localhost:3000/api/cameras/`);
    const produits = await response.json();

    return produits;
}

async function recupererProduits() {
    const produits = await fetchProduits();
    console.log(produits);
    const $listeProduits = document.querySelector('#liste-produits');

    for (produit of produits) {
        const $card = creerCarteAPartirDeProduit(produit);
        $listeProduits.append($card);
    }
}

function creerCarteAPartirDeProduit(produit) {
    console.log(produit);
    const prix = produit.price / 100;

    const $card = document.createElement('div');
    $card.className = 'col-3';

    $card.innerHTML = `
        <div class="card">
            <a href="fiche-produit.html?productId=${produit._id}" class="stretched-link">
                <img class="card-img-top" src="${produit.imageUrl}" alt="Appareil photo ${produit.name}"/>
                <div class="card-body">
                    <h3 class="card-title">${produit.name}</h3>
                    <p class="card-price">${prix.toFixed(2)} €</p>
                </div>
            </a>
        </div>
    `;

    return $card;
}

window.addEventListener('load', function () {
    recupererProduits();
});