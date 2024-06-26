//inserisco i puntatori
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyOGNkZDU1NjIxYTAwMTVjMTVmYjMiLCJpYXQiOjE3MTU2Mzc0NjksImV4cCI6MTcxNjg0NzA2OX0.A1PT25OTHZdMbdRE5xsIDIrje7GVqacCE6SCleEYS4Y";
const url = 'https://striveschool-api.herokuapp.com/api/product/';
let newCard = document.getElementById("new-card");
document.addEventListener("DOMContentLoaded", function () {
    ottieniProdotti ();
  });
// Funzione per ottenere un nuovo prodotto dal server
const ottieniProdotti = async() => {
    await fetch(url, {headers: {"Authorization": `Bearer ${token}`}})    
            .then((response) => {return response.json();
             }) 
            .then((prodotti) => {
                // Itero i prodotti che ho ricevuto in risposta e precedentemente convertito in json
                prodotti.forEach((prodotto) => aggiungiNuovoProdotto (prodotto))
                console.log("Prodotti Caricati");
                console.log(prodotti);//Controlli vari
            })
            // Gestisco eventuali errori durante la richiesta
            .catch((error) => {return console.error("Errore:", error)});
} 

// Creo la funzione per aggiungere un nuovo prodotto 
function aggiungiNuovoProdotto (prodotto) {
    //creo un div dove inserire il prodotto 
    const newProduct = document.createElement("div");
    newProduct.classList.add('col');

    //inserisco l'immaggine
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const img = document.createElement('img');
    img.setAttribute('src', prodotto.imageUrl);
    imageContainer.appendChild(img);

    //inserirsco le info di  testo del prodotto 
    const textInfoContainer = document.createElement('div');
    textInfoContainer.classList.add('text-info-container');
    const nomeProdotto = document.createElement("h4");
    nomeProdotto.innerText = prodotto.name;
    const descrizioneProdotto = document.createElement("p");
    descrizioneProdotto.innerText = prodotto.description;
    const brandProdotto = document.createElement("span");
    brandProdotto.innerText = prodotto.brand;
    const prezzoProdotto = document.createElement("h5");
    prezzoProdotto.innerText = "euro" + prodotto.price;

    //per utility inserisco un div che conterra i tasti di delete e modifica
    const divContainer = document.createElement("div");
    divContainer.classList.add("button-container");


    //creo il bottone di modifica e lo appendo 
    
    const changeButton = document.createElement("button")
    changeButton.classList.add("btn",  "btn-warning");
   // divContainer.appendChild(changeButton);
    changeButton.innerText = "Modifica";
    
    //cre il bottone di elimina e lo appendo 
    /*const deleteButton = document.createElement("button")
    deleteButton.classList.add("btn",  "btn-danger");
    divContainer.appendChild(deleteButton);
    deleteButton.innerText = "Elimina";
    deleteButton.addEventListener("click", function () {
        const idSend = prodotto._id;
        inviaElimina(idSend);
        
    })*/


    changeButton.addEventListener("click", function(event) {
        //inserisco il tasto utile a modificare i nuovi parametri
        const invioModifica = document.createElement("button");
        invioModifica.classList.add("invio-modifica");
        invioModifica.innerText = "Update";
        invioModifica.id = "update-button"; 
        contenitoreBottoneModifica.innerHTML = "";
        contenitoreBottoneModifica.appendChild(invioModifica);
        invioModuloForm.style.display = "none";
        //evito alla pagina il refresh
        event.preventDefault();
        //faccio partire la funzione di modifica 
        modifyObjects(prodotto);
    })

    //Controllo prima di proseguire
    
    
    //Aggiungo tutto  al div creato prima "newProduct" e dopo appendo in HTML
    newProduct.appendChild(imageContainer);
    newProduct.appendChild(textInfoContainer);
    textInfoContainer.appendChild(descrizioneProdotto);
    textInfoContainer.appendChild(brandProdotto);
    textInfoContainer.appendChild(prezzoProdotto);
    newProduct.appendChild(divContainer);
    

   // newProduct.appendChild(bottoneElimina); // aggiungo il tatso elimina

    //Appendo infine tutto sulla variabile puntata all'inizio newCard
    newCard.appendChild(newProduct);

    
    const idSend = prodotto._id;
    imageContainer.addEventListener("click", function () {
        const stringhificaID = JSON.stringify(idSend);
        const codedID = encodeURIComponent(stringhificaID)
        window.location.href = './detail.html?dati=' + codedID;

    })
}