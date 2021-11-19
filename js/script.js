//Pokemon task v1.5
let pokemonRepository = (function () {
	let pokemonList = [
{
    name: 'Paras',                                              //used short names to avoid mistakes
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

typeof pokemonList[name]

function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll() {                  
    return pokemonList;
}


return {                                                        //return the list outside the loop                    
    add: add,
    getAll: getAll()
};
})();


 
alert("Click here to chek your Pokemon")                       //let's try the same result on HTML
document.write("<p><h2>Welcome to Task 1.5</h2></p>");         //welcome message visible on the HTML file


pokemonRepository.add({name: 'Weedle', height: 1.1, type: ['bug', 'poison']})              //added a new Pokemon

pokemonRepository.getAll.forEach(function(pokemon) {                                //display the list calling the function
	document.write(pokemon.name + ", its height is " + pokemon.height + "<br>");    //iteration of the previous PokemonList but using the function
	if (pokemon.height > 1) {                                                       //check conditions as done above for height >1
	document.write("<i>" + "Wow that's big" + "</i><br>")
	}
});



/*pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);


/*
let exclamation =" - WOW that's big!"                                                    //to avoid multiple identical texts
let h1 ="'s height is "

for (let i=0; i < pokemonList.length; i++){                                             //declare a value for "i" smaller than the list itself (4) and incremented at steps of 1 (++)
    if (pokemonList[i].height <1.1){                                                    // condition created to have only one "Wow"
       document.write(pokemonList[i].name + h1 + pokemonList[i].height + "<br>");                    //action requested for this task
    }else {                                                                                          //false/alternative
        document.write(pokemonList[i].name + h1 + pokemonList[i].height + exclamation + "<br>");     //same as "if" but with the exclamation added
    }
  };        

  The 1st Old version was with console.log instead of document.write*/
                