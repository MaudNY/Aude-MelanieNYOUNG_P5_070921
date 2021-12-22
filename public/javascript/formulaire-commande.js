// Créer objet JSON (paire clé-valeur) contenant les données du formulaire

function getFormData() {
    const orderForm = document.querySelector("#tableau-coordonnées");

    let formData = {
        customerFirstName : orderForm.querySelector("#firstName"),
        customerName : orderForm.querySelector("#lastName"),
        customerAddress : orderForm.querySelector("#address"),
        customerCity : orderForm.querySelector("#city"),
        customerEmail : orderForm.querySelector("#email"),
    };

    return formData;
}

// Créer un tableau d'IDs de produits (uniquement, avec initialisation tableau vide) avec un "reducer"

function getIdsFromCartProducts () {
    const lsData = getDataFromCartOnLS();
    const idList = lsData.reduce((acc, product) => [...acc, product.productId], []);
    
    return idList;
}

window.addEventListener('load', function () {
    console.log(getIdsFromCartProducts());
    console.log(getFormData());
})