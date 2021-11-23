//Task 1.6
alert("Click here to chek your Pokemon");

let pokemonRepository = (function () {                              //IIFE starts function with an Array
	let pokemonList = [
    {
        name: 'Paras',
        height: 0.3,
        type: ['grass', 'bug']
    },
    {
        name: 'Rattata',
        height: 0.3,
        type: ['normal']
    },
    {
        name: 'Zubat',
        height: 0.8,
        type: ['poison', 'flying']
    },
    {
        name: 'Oddish',
        height: 0.5,
        type: ['grass', 'poison']
    },
    {
        name: 'Magnezone',
        height: 1.2,
        type: ['electric', 'steel']
    }	
];

function add(pokemon) {                                         //check whether of not the iem is a an objet
    if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);                              //adds the new item
    } else {
      console.log('This pokemon is not an object!');            //false condition
    }
  }
function getAll() {                                             //Gives back pokemonList array
    return pokemonList;
}
function addListItem(pokemon){          
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");   //returns a Pokemon in each iteration
    button.innerText = pokemon.name;
    button.classList.add("button-class");           //CSS class for the button
    listpokemon.appendChild(button);                //children to append
    pokemonList.appendChild(listpokemon);           
    button.addEventListener('click', function () {  //event listner 
        showDetails(pokemon);
    });
    }

function showDetails(pokemon) {                     //get the information once clicked
    console.log(pokemon);
}
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: 'Weddle', height: 1.1, types: ['bug', 'poison'] });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
});