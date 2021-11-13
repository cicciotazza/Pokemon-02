//Pokemon task v1.3
let pokemonList = [
{
    name: 'Paras',              //used short names to avoid mistakes
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

console.log("Welcome to Task 1.3");

let exclamation =" - WOW that's big!"                //to avoid multiple identical texts
let h1 ="'s height is "

for (let i=0; i < pokemonList.length; i++){         //declare a value for "i" which will be minor of the list itself (4) and is incremented at steps of 1
    if (pokemonList[i].height <1.1){       // condition created to have only one "Wow"
       console.log(pokemonList[i].name + h1 + pokemonList[i].height);                       //action requested for this task
    }else {                                                                                 //false/alternative
        console.log(pokemonList[i].name + h1 + pokemonList[i].height + exclamation);        //same as if but with the exclamation added
    }
  };        

                    // Task 1.3
                    //ceate a loop to iterares the pokemonList 
                    //write their name
                    //string to write "name(height: x)"
                    //conditional to check if the height is above a certain value, if yes writes "Wow, that's big" but make it only for one 