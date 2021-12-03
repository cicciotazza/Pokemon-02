alert('V 1.11 - Click here to check your Pokemon');

//IIFE starts function with an Array
let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //check whether or not the iem is a an objet
  function add(pokemon) {
    //if the type of Pokemon has name and detail
    if 
    //if the type of Pokemon has name and detail
    (typeof pokemon === 'object' &&                          
    'name' in pokemon &&
    'detailsUrl' in pokemon
) {
      //true adds the new item pushing into the repo
      repository.push(pokemon);
    } else {
      //false writes condition
      console.log('Uncorrect - This pokemon is not an object!');
    }
  }

  //Gives back pokemonList array
  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    //assign the list of pokemons to html
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let container = document.createElement('div');
    
    //returns a Pokemon in each iteration
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    //CSS class for the buttong
    container.classList.add('pokeball');
    button.classList.add('name');

    //children to append
    container.appendChild(button);
    pokemonItem.appendChild(container);
    pokemonList.appendChild(pokemonItem);

    //if the "click" happens it will report the specific Pokemon
    onclickEventListener(button, pokemon);
  }

  function onclickEventListener(element, object) {
    element.addEventListener('click', function (){
      showDetails(object);
    });
  }

  const loader = document.querySelector('#loading');

  function showLoadingMessage() {
    loader.classList.add('show');
  }

  function hideLoadingMessage() {
    loader.classList.remove('show');
  }

  //load details function 
  function loadList() {
    showLoadingMessage();
    //promise, fetch the API with the url above
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      //forEach loop, "json" is the array, the "results" come from the url
      json.results.forEach(function (item) {
        //pokenon variable into an object with two keys
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        //comes from the function add(pokemon)
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  //the function takes a parameter which is the "pokemon"
  function loadDetails(pokemon) {
    showLoadingMessage();
    //each url link for each Pokemon
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      //it returns the details from each one of them
      return response.json();
    }).then(function(details) {
      hideLoadingMessage();
      //details added to the item, "sprites" belongs to the url
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      //seatching for types which is actually an array
      pokemon.types = details.types;
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      //print a specific pokemon based on the funtion list
      showModal(pokemon);
    });
  }

  //new Modal function
  function showModal(pokemon) {
    // Clear all existing modal content
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();

    // Create new item
    let nameElement = $('<h1>' + pokemon.name + '</h1>')
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + ' m' + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + ' kg' +'</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    $('#exampleModalLive').modal();
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  }

})();

pokemonRepository.loadList().then(function() {
  //Search
  document.querySelector('.search-pokemon').addEventListener('submit', function (event) {
    event.preventDefault();
    let query = document.querySelector('#myInput').value;
    document.querySelector('.pokemon-list').innerHTML = '';
    if (query === '') {
      pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    } else {
      pokemonRepository.getAll().forEach(function (pokemon) {
        if (pokemon.name.indexOf(query) > -1) {
          pokemonRepository.addListItem(pokemon);
        }
      });
    }
  });

  //display the Pokemon with button and name
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
