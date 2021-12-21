// Créer objet JSON (paire clé-valeur) contenant les données du formulaire

// Créer un tableau d'IDs de produits (uniquement, avec initialisation tableau vide) avec un "reducer"

function getIdsFromCartProducts () {
    const lsData = getDataFromCartOnLS();
    const idList = lsData.reduce((acc, product) => [...acc, product.productId], []);
    
    return idList;
}

window.addEventListener('load', function () {
    console.log(getIdsFromCartProducts())
})