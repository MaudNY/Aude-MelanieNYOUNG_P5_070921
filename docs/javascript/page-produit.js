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
            <button type="submit" class="bouton-type bouton-ajout-panier">Ajouter au panier</button>
        </div>
    `;

    const $select = $productInfo.querySelector("#lens");

    for (let value of product.lenses) {
        $select.append(addLensOption(value));
    }

    const $boutonAjoutPanier = $productInfo.querySelector(".bouton-ajout-panier");

    $boutonAjoutPanier.addEventListener("click", function() {
        const selectedLens = $select.value;
        sendToLocalStorage(selectedLens);
        incrementCartVignette();
        alertItemInCart();
    })

    return $productInfo;
}

// (Dans l'élément "div" créé) Ajouter les options de lentilles
function addLensOption(value) {
    const $lensOption = document.createElement("option");
    $lensOption.setAttribute("value", value);
    $lensOption.innerHTML = value;

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

// HEADER - Le nombre d'items dans la vignette du panier s'incrémente de 1 à chaque clic sur le bouton "Ajouter au panier"

function incrementCartVignette() {
    const $cartVignette = document.querySelector("#vignette-panier");
    let currentValue = parseFloat($cartVignette.textContent);

    currentValue++;

    $cartVignette.textContent = currentValue;

    return $cartVignette;
}

// ALERTE - Ajout au panier = OK

function alertItemInCart() {
    swal({
        title: "Votre article a été ajouté au panier !",
        text: "",
        icon: "success",
        button: "Continuer mes achats",
      });
}

// EVENT LISTENER - Au chargement de la page...

window.addEventListener('load',  async function() {
    await showProduct();
});