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
                    <select name="lens" id="lens" class="form-control"></select>
                </p>
            </form>
        </div>
        <div class="col-2 achat-produit">
            <p class="prix">${price.toFixed(2)}€</p>
            <div class="bouton-type bouton-ajout-panier"><input type="submit" value="Ajouter au panier"></div>
        </div>
    `;

    const $select = $productInfo.querySelector("#lens");

    for (let value of product.lenses) {
        $select.append(addLensOption(value));
    }

    return $productInfo;
}

// (Dans l'élément "div" créé) Ajouter les options de lentilles
async function addLensOption(value) {
    const product = await getJSONObject();
    const lenses = await product.lenses;

    const index = await lenses.indexOf(value);

    const $lensOption = document.createElement("option");
    $lensOption.setAttribute("value", index);
    $lensOption.innerHTML = value;
    console.log($lensOption);

    return $lensOption;
}

// Afficher le produit

async function showProduct() {
    const product = await getJSONObject();
    const $productDOM = createProductDOM(product);

    const $singleProduct = document.querySelector("#single-product");
    $singleProduct.append($productDOM);

    return $singleProduct;
}

// Afficher le produit au chargement de la page

window.addEventListener('load', function() {
    showProduct();
});


// HEADER - Créer la vignette du panier (élément "span")

function createCartVignette() {
    const $cartVignette = document.createElement("span");
    $cartVignette.className = "nombre-items-panier";
    $cartVignette.setAttribute("id", "vignette-panier");
    $cartVignette.textContent = "0";

    const $panier = document.querySelector("#panier");
    $panier.append($cartVignette);

    return $cartVignette;
}

createCartVignette();

// HEADER - Au clic sur Bouton "Ajout panier", n++

const cartButton = document.getElementsByClassName("bouton-ajout-panier");



// Déclencheur 1 : A chaque clic sur bouton "Ajouter au panier", 




