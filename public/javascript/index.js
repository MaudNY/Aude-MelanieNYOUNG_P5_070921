// LISTE PRODUITS //

async function fetchProducts() {
    const response = await fetch(`http://localhost:3000/api/cameras/`);
    const products = await response.json();

    return products;  
}

const createProduct = (product) => {
    const price = product.price/100;

    const $card = document.createElement('div');
    $card.className = 'col-3';
    $card.innerHTML = `
        <div class="card">
            <a href="page-produit.html?ID=${product._id}" class="stretched-link">
                <img class="card-img-top" src="${product.imageUrl}" alt="Appareil photo ${product.name}"/>
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-price">${price.toFixed(2)} €</p>
                </div>
            </a>
        </div>
    `;

    return $card;
}

async function getProducts() {
    const products = await fetchProducts();
    const $productList = document.querySelector('#liste-produits');

    for (product of products) {
        const $card = createProduct(product);
        $productList.append($card);
    }
}

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

window.addEventListener ('load', function() {
    getProducts();
})