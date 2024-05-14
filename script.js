//Puntatori e variabili generiche 

let productForm = document.getElementById("product-form");
let newCard = document.getElementById("new-card");
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzAxMzcyYjNlYTAwMTU3MWZjYzAiLCJpYXQiOjE3MTU1ODc2NDIsImV4cCI6MTcxNjc5NzI0Mn0.IWKQLpdY5JxMtmXScv1b-rohz3JWufD30AoBwJqIK9k"
let url = `https://striveschool-api.herokuapp.com/api/product/`


//Funzione che al caricamento della pagina richiama la funzione get prodotti
document.addEventListener("DOMContentLoaded", function () {
  ottieniProdotti ()
})

// Funzione per ottenere un nuovo prodotto dal server
const ottieniProdotti = async() => {
    await fetch(url, {
    headers: {
    "Authorization": token
    }
})
    .then((response) => {return response.json(); }) 
    .then((prodotti) => {
        // Itero i prodotti che ho ricevuto in risposta e precedentemente convertito in json
        prodotti.forEach((prodotto) => aggiungiNuovoProdotto (prodotto))
        console.log("Prodotti Caricati");
    })
        // Gestisco eventuali errori durante la richiesta
    .catch((error) => console.error("Errore:", error));
} 

// Creo la funzione per inserire un nuovo articolo--------- TODO CONTROLLARE IN POST---------
function inserisciNuovoProdotto (prodotto) {
    fetch(url, {
        method: "POST", // Metodo HTTP POST per l'invio dei dati
        headers: {
            "Authorization": token
        },
        body: JSON.stringify(prodotto), // Converto l'oggetto utente in una stringa JSON e lo invio
    })
    // Converto la risposta del server in un formato JSON utilizzabile
    .then((response) => response.json())
    // Aggiungo una scheda per il nuovo prodotto aggiunto e mostro un messaggio di conferma
    .then((nuovoProdotto) => {
      aggiungiNuovoProdotto(nuovoProdotto);
      mostraMessaggio("Prodotto aggiunto con successo!"); // NEW ----------------------------------------------------
      console.log("Prodotto aggiunto con successo!");
    })
    // Gestisco eventuali errori durante la richiesta
    .catch((error) => {
      console.error("Errore:", error);
      mostraMessaggio("Errore nell'aggiunta del prodotto."); // NEW --------------------------------------------------
    });
}

// Creo la funzione per aggiungere un nuovo prodotto 
function aggiungiNuovoProdotto (prodotto) {
    //creo un div dove inserire il prodotto 
    const newProduct = document.createElement("div")
    //TO DO DA APPLICARE STILZZAZIONE ASSEGNANDO UNA CLASSE 

    //Inserisco i tasti modifica ed elimina --- TASTO MODIFICA
    const bottoneModifica = document.createElement("div");
    bottoneModifica.classList.add("edit");
    bottoneModifica.textContent = "Modifica";
    bottoneModifica.onclick = () => modificaProdotto(prodotto.id, newProduct);

    // TASTO ELIMINA
    const bottoneElimina = document.createElement("div");
    bottoneElimina.classList.add("delete");
    bottoneElimina.textContent = "Elimina";
    bottoneElimina.onclick = () => cancellaProdotto(prodotto.id, card);
  

    // Creo i tag per il nome, la descrizione, il brand e il prezzo del prodotto
    const nomeProdotto = creaElementoConTesto("h3", prodotto.name);
    const descrizioneProdotto = creaElementoConTesto("p", "descrizione: " + prodotto.description);
    const brandProdotto = creaElementoConTesto("p", "brand: " + prodotto.brand);
    const prezzoProdotto = creaElementoConTesto("p", "prezzo: " + prodotto.price);
    
    //Aggiungo tutto  al div creato prima "newProduct" e dopo appendo in HTML
    newProduct.appendChild(nomeProdotto);
    newProduct.appendChild(descrizioneProdotto);
    newProduct.appendChild(brandProdotto);
    newProduct.appendChild(prezzoProdotto);
    newProduct.appendChild(bottoneModifica); //aggiungo il tasto modifica
    newProduct.appendChild(bottoneElimina); // aggiungo il tatso elimina

    //Appendo infine tutto sulla variabile puntata all'inizio newCard
    newCard.appendChild(newProduct)
}
//----------------------------------------INSERITO IN HOME.JS FINO A QUI
// AL CARICAMENTO DELLA PAGINA
document.addEventListener("DOMContentLoaded", function () {
    // Aggiungo un gestore dell'evento 'submit' al modulo per gestire l'invio dei dati
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Previene il comportamento predefinito del modulo (ricaricamento della pagina)
      // Ottengo i dati de nuovo oggetto dal cliente e ne creo le variaili
      let nomeProdottoDaForm = document.getElementById("name").value;
      let descrizioneDaForm = document.getElementById("description").value;
      let brandDaForm = document.getElementById("brand").value;
      let prezzoDaForm = document.getElementById("price").value;
      let imageFileDaForm = document.getElementById("image").files[0];

      //Parde dei controlli da aggiungere in seguito 

      //Creo un oggetto con dentro i dati obbligatori da mandare al server
      const productToServer = {
        name: nomeProdottoDaForm,
        description: descrizioneDaForm,
        brand: brandDaForm,
        price:  prezzoDaForm,
        imageUrl: imageFileDaForm,
      };

      //Invio i dati del nuovo prodotto al server
      inserisciNuovoProdotto(productToServer);
      //Resetto il modulo dopo l'invio dei dati 
      form.reset();
    });

    // Chiamo la funzione per ottenere gli utenti e visualizzarli
    ottieniProdotti();
});

//Funzioni per validare l'indirizzo mail 


// Creo un nuovo tag HTML con il testo fornito
function creaElementoConTesto(tipoDiTag, testo) {
    const tag = document.createElement(tipoDiTag);
    tag.textContent = testo;
    return tag;
}

//Creo le funzioni usate in precedenza gia per modificare e/o eliminare un prodotto 
function modificaProdotto(productID, newProduct) {
    // Chiede all'utente di inserire un nuovo nome del suo prodotto, mostrando il nome attuale come valore predefinito
    const nuovoNome = prompt(
    "Nuovo nome:",
    card.querySelector("h3").innerText // Inserisco già il valore del nome precedente nel prompt
  );
  // Chiede all'utente di inserire una nuova descrizione, mostrando quella attuale come valore predefinito
  const nuovaDescrizione = prompt(
    "Nuova descrizione:",
    card.querySelector("p").innerText // Inserisco già il valore della descrizione precedente nel prompt
  );
  const nuovoBrand = prompt(
    "Nuovo Brand:",
    card.querySelector("p").innerText // Inserisco già il valore del brand precedente nel prompt
  );
  const nuovoPrezzo = prompt(
    "Nuova Prezzo:",
    card.querySelector("p").innerText // Inserisco già il valore del prezzo precedente nel prompt
  );

  //Controllo se i campi necessari sono stati riempiti come richiesto:
  if (nuovoNome && nuovaDescrizione && nuovoBrand && nuovoPrezzo) {
     // Invia una richiesta PUT all'API per aggiornare i dati dell'utente
     fetch (`https://striveschool-api.herokuapp.com/api/product/${productID}`, {
        method: "PUT", // Metodo HTTP per aggiornamenti
        headers: {
            "Content-Type": "application/json" , // Specifica che il corpo della richiesta è in JSON
            "Authorization": token
        },
        body: JSON.stringify({ name: nuovoNome, description:nuovaDescrizione, brand: nuovoBrand, price: nuovoPrezzo }), // Converte l'oggetto dati in una stringa JSON
     })
     .then((response) => response.json()) // Converte la risposta in JSON
        .then((data) => {
        // Aggiorna la visualizzazione della card con i nuovi dati
        console.log("Prodotto aggiornato:", data); // Log del prodotto aggiornato
        newProduct.querySelector("h3").innerText = data.name; // Aggiorna il nome nella card
        newProduct.querySelector("p").innerText = `Description: ${data.description}`; // Aggiorna la descrizione nella card
        newProduct.querySelector("p").innerText = `Brand: ${data.brand}`; // Aggiorna la descrizione nella card
        newProduct.querySelector("p").innerText = `Prezzo: ${data.price}`; // Aggiorna la descrizione nella card
      })
      .catch((error) => console.error("Errore:", error)); // Cattura e logga eventuali errori
  }
}

//Creo la funzione per eliminare un prodotto 
function cancellaProdotto(productID, newProduct) {
    // Chiede conferma all'utente prima di procedere con l'eliminazione
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      // Invia una richiesta DELETE all'API per eliminare l'utente specificato
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productID}`, {
        method: "DELETE", // Metodo HTTP DELETE per eliminare risorse
        headers: {
            "Authorization": token
        }
      })
        .then(() => {
          // Se la richiesta ha successo, logga un messaggio e rimuove la card dell'utente dall'interfaccia
          console.log("Prodotto eliminato");
          newProduct.remove(); // Rimuove l'elemento della card dal DOM
        })
        .catch((error) => {
          // Se ci sono errori nella richiesta, logga l'errore nella console
          console.error("Errore:", error);
        });
    }
  }

  //funzione 2
  function cancellaProdotto(productID, newProduct) {
  /**
   *
   * confirm():
   * Questa funzione mostra una finestra di dialogo
   * con un messaggio e due pulsanti:
   * - Ok
   * - Annulla
   *
   * Restituisce TRUE se l'utente clicca OK,
   *
   */

  // Chiede conferma all'utente prima di procedere con l'eliminazione
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    // Invia una richiesta DELETE all'API per eliminare l'utente specificato
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productID}`, {
      method: "DELETE", // Metodo HTTP DELETE per eliminare risorse
      headers: {
        "Authorization": token
    }
    })
      .then(() => {
        // Se la richiesta ha successo, logga un messaggio e rimuove la card dell'utente dall'interfaccia
        console.log("Prodotto eliminato");
        newProduct.remove(); // Rimuove l'elemento della card dal DOM
      })
      .catch((error) => {
        // Se ci sono errori nella richiesta, logga l'errore nella console
        console.error("Errore:", error);
      });
  }
}


// FUNZIONE PER ELIMINARE UN PRODOTTO
function cancellaUser(productID, newProduct) {
    /**
     *
     * confirm():
     * Questa funzione mostra una finestra di dialogo
     * con un messaggio e due pulsanti:
     * - Ok
     * - Annulla
     *
     * Restituisce TRUE se l'utente clicca OK,
     *
     */
  
    // Chiede conferma all'utente prima di procedere con l'eliminazione
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      // Invia una richiesta DELETE all'API per eliminare l'utente specificato
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productID}`, {
        method: "DELETE", // Metodo HTTP DELETE per eliminare risorse
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNlMzAxMzcyYjNlYTAwMTU3MWZjYzAiLCJpYXQiOjE3MTUzNTE1NzEsImV4cCI6MTcxNjU2MTE3MX0.iZSQXCKDU4osmRgCF9DGeOezro78IuDw_Ouj9DrF_p8"
        }
      })
        .then(() => {
          // Se la richiesta ha successo, logga un messaggio e rimuove la card dell'utente dall'interfaccia
          console.log("Prodotto eliminato");
          card.remove(); // Rimuove l'elemento della card dal DOM
        })
        .catch((error) => {
          // Se ci sono errori nella richiesta, logga l'errore nella console
          console.error("Errore:", error);
        });
    }
  }
  
  