// Récupérer l'ID de l'URL

async function URLId () {
    const params = await (new URL(document.location)).searchParams;
    const URLId = params.get("ID");

    console.log("ID Produit : " + URLId);

    return URLId;
}

// Créer l'objet JSON du produit concerné (via l'ID de l'URL)

async function createJSONObject () {
    const ID = await URLId();
    const response = await fetch(`http://localhost:3000/api/cameras/${ID}`);
    const productData = await response.json();

    console.log(productData);

    return productData;
}

// Créer un élément DIV en fonction de cet objet JSON

function createProductDOM(product) {
    const price = product.price/100;
    
    const $productInfo = document.createElement("div");
    $productInfo.className = "row";
    $productInfo.innerHTML = `
        <div class="col-6 img-produit"><img src="${product.imageUrl}" alt="Appareil photo ${product.name}" /></div>
        <div class="col-4 desc-produit">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <form method="post" action="a-définir" class="form-option-lentille">
                <p>
                    <label for="lens">Type de lentille</label><br />
                    <select name="lens" id="lens" class="form-control">
                        <option value="0">${product.lenses[0]}</option>
                        <option value="1">${product.lenses[1]}</option>
                    </select>
                </p>
            </form>
        </div>
        <div class="col-2 achat-produit">
            <p class="prix">${price.toFixed(2)}€</p>
            <div class="bouton-type"><input type="submit" value="Ajouter au panier"></div>
        </div>
    `;

    return $productInfo;
}

// Afficher le produit...

async function showProduct() {
    const product = await createJSONObject();
    const $productDOM = await createProductDOM(product);

    const $singleProduct = document.querySelector("#single-product");
    $singleProduct.append($productDOM);

    return $singleProduct;
}

// ...au chargement de la page

window.addEventListener('load', function() {
    showProduct();
});