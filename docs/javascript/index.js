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

window.addEventListener ('load', function() {
    getProducts();
})