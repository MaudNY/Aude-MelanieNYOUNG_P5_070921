// 1 Fonction récupérant l'ID depuis les paramètres GET de l'URL de la page

async function getURLId() {
    const params = await (new URL(document.location)).searchParams;
    const URLId = params.get("productId");

    return URLId;
}

// 2 Fonction prenant en paramètre un id de produit, récupère le détail d'un produit du backend et retourne le produit, en format JSON

async function fetchProductById(productId) {
    const ID = await getURLId();
    const response = await fetch(`http://localhost:3000/api/cameras/${ID}`);
    const productById = await response.json;

    return productById;
}

// 3 Fonction qui prend en paramètre un produit (en format JSON) et génère le DOM du produit, et l'injecte dans le DOM du site

const createPageProduct = (singleProduct) => {
    console.log(singleProduct);
    const price = singleProduct.price/100;

    const $productSheet = document.createElement('div');
    $productSheet.className = 'row';
    $productSheet.innerHTML = `
        <div class="col-6 img-produit"><img src="${singleProduct.imageUrl}" alt="Appareil photo ${singleProduct.name}" /></div>
        <div class="col-4 desc-produit">
            <h2>${singleProduct.name}</h2>
            <p>${singleProduct.description}</p>
            <form method="post" action="a-définir" class="form-option-lentille">
                <p>
                    <label for="lens">Type de lentille</label><br />
                    <select name="lens" id="lens" class="form-control">
                        <option value="0">35mm 1.4</option>
                        <option value="1">50mm 1.6</option>
                    </select>
                </p>
                </form>
        </div>
        <div class="col-2 achat-produit">
            <p class="prix">${price.toFixed(2)}</p>
            <div class="bouton-type"><input type="submit" value="Ajouter au panier"></div>
        </div>
    `;

    return $productSheet;
}

// 4 Créer une fonction qui 1) Récupère l'id du produit depuis l'URL (en utilisant la fonction 1) 2) Récupère les détails du produit depuis le backend (en exécutant la fonction 2 avec l'id du produit récupéré juste avant) 3) Génère et injecte le DOM du produit dans la page (en utilisant la fonction 3, avec le produit sous format JSON récupérer juste avant)
