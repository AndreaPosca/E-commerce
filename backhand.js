//Puntatori e variabili generiche 

let contenitoreBottoneModifica = document.getElementById("contenitore-bottone-modifica");
let productForm = document.getElementById("product-form");
let newCard = document.getElementById("new-card");
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMjRmYjBiM2IyNTAwMTUxYjU0MzkiLCJpYXQiOjE3MTUwODY3NjAsImV4cCI6MTcxNjI5NjM2MH0.tRa62s9gug_d79Gkyhqtjuom2FK46USw_JKaSQ2e0Vw"
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyOGNkZDU1NjIxYTAwMTVjMTVmYjMiLCJpYXQiOjE3MTU2Mzc0NjksImV4cCI6MTcxNjg0NzA2OX0.A1PT25OTHZdMbdRE5xsIDIrje7GVqacCE6SCleEYS4Y";
const url = 'https://striveschool-api.herokuapp.com/api/product/';


//Funzione che al caricamento della pagina richiama la funzione get prodotti
document.addEventListener("DOMContentLoaded", function () {
    ottieniProdotti ()
})

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


    //cre il bottone di modifica e lo appendo 
    const changeButton = document.createElement("button")
    changeButton.classList.add("btn",  "btn-warning");
    divContainer.appendChild(changeButton);
    changeButton.innerText = "Modifica";
    
    //cre il bottone di elimina e lo appendo 
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("btn",  "btn-danger");
    divContainer.appendChild(deleteButton);
    deleteButton.innerText = "Elimina";
    deleteButton.addEventListener("click", function () {
        const idSend = prodotto._id;
        inviaElimina(idSend);
        
    })


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
    newProduct.appendChild(img);
    newProduct.appendChild(textInfoContainer);
    textInfoContainer.appendChild(descrizioneProdotto);
    textInfoContainer.appendChild(brandProdotto);
    textInfoContainer.appendChild(prezzoProdotto);
    newProduct.appendChild(divContainer);

   // newProduct.appendChild(bottoneElimina); // aggiungo il tatso elimina

    //Appendo infine tutto sulla variabile puntata all'inizio newCard
    newCard.appendChild(newProduct);
}

// Puntatore del bottone invia
const invioModuloForm = document.getElementById("invio-modulo-form");
//aggiungo l'event listener
//al click sul bottone "invia"
//con preventDefault evito di aggiornare la pagina
//creo l'oggetto nuovoOggettoServer, ricavo i dati da inserire al suo interno dai campi del form
invioModuloForm.addEventListener('click', function(event) {
    console.log('Click su Add');
    event.preventDefault();

    //faccio delle verifiche sul prezzo inserito, converto la stringa in numero decimale
    const correctPrice = parseFloat(document.getElementById('price').value);
    //così posso verificare se è stato inserito un numero e se è maggiore di zero
    if (isNaN(correctPrice) || correctPrice <= 0 || !(/^\d+(\.\d{1,2})?$/.test(correctPrice))) {
        alert('Il prezzo non è un numero valido o è inferiore o uguale a 0, riprova con un numero maggiore di 0');
    }    
  const nuovoProdotto = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    imageUrl: document.getElementById('image').value,
    brand: document.getElementById('brand').value,
    price: correctPrice
}

//infine faccio un controllo con il console.log
//mando come parametro l'oggetto appena creato alla funzione mandaProdotto
console.log(nuovoProdotto);
mandaProdotto(nuovoProdotto);
});

//inviato l'oggetto in questa funzione, ulitizzo il metodo POST per creare un nuovo elemento da caricate sul server
const mandaProdotto = async(nuovoInserimento) =>  {
        console.log(nuovoInserimento);
    await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`},
        body: JSON.stringify(nuovoInserimento)
      }
    )
   .then(response => {
    if (response.ok) {
        window.location.reload();
        console.log("Prodotto aggiunto con successo!", nuovoInserimento);
        return response.json();
    } else if (response.status === 404) {
        throw new Error('Risorsa non trovata' + response.status);
    } else if (response.status === 500) {
        throw new Error('Errore del server' + response.status);
    } else {
        throw new Error('Errore durante la aggiunta del prodotto' + response.status);
    }
})
    

    //se non va a buon fine stampra messaggio di errore in console


}

//Funzioni per il bottone di modifica
function modifyObjects (object) {
    console.log("modifico l'articolo");
    document.getElementById('name').value = object.name
    document.getElementById('description').value = object.description
    document.getElementById('image').value = object.imageUrl
    document.getElementById('brand').value = object.brand
    document.getElementById('price').value = object.price
    //Al tasto di "Update" ahhiungo l'event listener
    //creo una nuova const per puntare il bottone update e aggiungo l'evento al click
    const invioBtnModifica = document.getElementById("update-button");
    invioBtnModifica.addEventListener("click", function(event) {
    //evito il refresh della pagina
    event.preventDefault();
    preparaProdottiCaricati (object)
})
}

function preparaProdottiCaricati (prodotto) {
    const id = prodotto._id;
    console.log(id);
    const correctPrice = parseFloat(document.getElementById('price').value);
    //così posso verificare se è stato inserito un numero e se è maggiore di zero
    if (isNaN(correctPrice) || correctPrice <= 0 || !(/^\d+(\.\d{1,2})?$/.test(correctPrice))) {
        alert('Il prezzo non è un numero valido o è inferiore o uguale a 0, riprova con un numero maggiore di 0');
    }  
    const cambioProdotto = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('image').value,
        brand: document.getElementById('brand').value,
        price: correctPrice
    }  
    //funzione che ci sarà utile ad inviare le modifiche al server 
    inviaProdottiCaricati(cambioProdotto, id);
}

//preparo il PUT da inviare al server 
const inviaProdottiCaricati = async(object, id) => {
    await fetch (url + id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`},
        body: JSON.stringify(object),
    })
    .then(response => {
    if (response.ok) {
        window.location.reload();
        console.log("Prodotto aggiunto con successo!", nuovoInserimento);
        return response.json();
    } else if (response.status === 404) {
        throw new Error('Risorsa non trovata' + response.status);
    } else if (response.status === 500) {
        throw new Error('Errore del server' + response.status);
    } else {
        throw new Error('Errore durante la aggiunta del prodotto' + response.status);
    }
    });
}

//Fetch di Delite che parte alla pressione del tasto elimina creato precedentemente
const inviaElimina = async (id) => {
    //faccio parttire la fatch
    await fetch(url + id, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`},
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
            console.log("Prodotto aggiunto con successo!", nuovoInserimento);
            return response.json();
        } else if (response.status === 404) {
            throw new Error('Risorsa non trovata' + response.status);
        } else if (response.status === 500) {
            throw new Error('Errore del server' + response.status);
        } else {
            throw new Error('Errore durante la aggiunta del prodotto' + response.status);
        }
        });
}
