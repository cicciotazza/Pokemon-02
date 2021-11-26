alert("V 1.8 - Click here to check your Pokemon");

let pokemonRepository = (function () {                              //IIFE starts function with an Array
    let pokemonList = [];
    let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {                                         //check whether or not the iem is a an objet
        if 
            (typeof pokemon === "object" &&                          //check if the type of Pokemon has name and detail
                "name" in pokemon &&
                "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);                              //if true adds the new item pushing into the repo
        } else {
        console.log("Uncorrect - This pokemon is not an object!");  //false writes condition
        }
    }
    function getAll() {                                             //Gives back pokemonList array
        return pokemonList;                                         
    }

    function addListItem(pokemon){          
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");           //returns a Pokemon in each iteration
        button.innerText = pokemon.name;
        button.classList.add("button-class");                    //CSS class for the button
        listpokemon.appendChild(button);                         //children to append
        pokemonList.appendChild(listpokemon);   
        button.addEventListener('click', function (event) {      //if the "click" happens it will report the specific Pokemon
            showDetails(pokemon);                             
            });                                                   
        }                            

        function loadList () {                                  //load details function 
            return fetch(apiUrl).then(function (response) {     //promise, fetch the API with the url above
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {          //forEach loop, "json" is the array, the "results" come from the url
                    let pokemon = {                             //pokenon variable into an object with two keys
                        name: item.name,
                        detailsUrl: item.url 
                    };
                    add(pokemon);                               //comes from the function add(pokemon)
                    //console.log(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        }
        
        function loadDetails(item) {                                //the function takes a parameter which is the "item"
            let url = item.detailsUrl;                              //each url link for each Pokemon
            return fetch(url).then(function (response) {            
                return response.json();                             //it returns the details from each one of them
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;      //details added to the item, "sprites" belongs to the url
                item.height = details.height;
                item.types = details.types;                         //seatching for types which is actually an array
            }).catch(function (e) {
              console.error(e);
            });
        }

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function  () {
                showModal(pokemon);                                 //print a specific pokemon based on the funtion list
            });
        }    

        function showModal(pokemon){                                                //new Modal function
            let modalContainer = document.querySelector('#modal-container');
            let modal = document.createElement('div');
           
            modal.classList.add('modal');
            let closeButtonElement = document.createElement('button');              //close Button
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'X';
            closeButtonElement.addEventListener('click', hideModal);
            let titleElement = document.createElement('h1');                           //declare the name
            titleElement.innerText = pokemon.name;
            let contentElement = document.createElement('p');
            contentElement.innerText = ('Height: ') + pokemon.height;
            let imgElement = document.createElement('img');                            //declare the image
            imgElement.src = pokemon.imageUrl;

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);

            pokemon.types.forEach(item => {
                let contentElement = document.createElement('p');
                contentElement.innerText = ('Type: ') + item.type.name;
                modal.appendChild(contentElement);
            });

            modal.appendChild(imgElement);
            modalContainer.appendChild(modal);
            modalContainer.classList.add('is-visible');                                 //show up Modal 
            function hideModal() {
              let modalContainer = document.querySelector('#modal-container');
              modalContainer.classList.remove('is-visible');
              }

            window.addEventListener('keydown', (e) => {                                  //click ESC to escape               
              let modalContainer = document.querySelector('#modal-container');
              if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
              }
            });

            modalContainer.addEventListener('click', (e) => {               //activated if clicking inside the modal and closed if clicked on the overlay
              let target = e.target;
              if (target === modalContainer) {
                hideModal();
            }
            });
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails
          };
        })();
        
        pokemonRepository.loadList().then(function () {             //display the Pokemon with button and name
          pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
          });
        });