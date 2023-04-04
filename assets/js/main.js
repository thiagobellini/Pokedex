// const offset = 0;
// const limit = 10;
// // Lembrar que para passar variável como parâmetro é preciso colocar entre crase.
// const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

// fetch(url)
//     // .then(function (response) {
//     //     return response.json();
//     // })
//     // Pode ser resumido no then abaixo
//     // .then((response) => {
//     //     return response.json();
//     // })
//     // Se for apenas uma linha de função, pode ser resumido no then abaixo
//     .then((response) => response.json())
//     .then((jsonBody) => console.log(jsonBody))
//     .catch((error) => console.error(error))
//     .finally(() => console.log('Deu bom!'));

// function convertPokemonTypesToLi(pokemonTypes) {
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`);
// }

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
let offset = 0;
const limit = 10;

// function convertPokemonToLi(pokemon) {
//     return `
//         <li class="pokemon ${pokemon.type}">
//             <span class="number">${pokemon.number}</span>
//             <span class="name">${pokemon.name}</span>
            
//             <div class="detail">
//                 <ol class="types">
//                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
//                 </ol>


//                 <img src="${pokemon.photo}" 
//                     alt="${pokemon.name}">
//             </div>
//         </li>
//     `;
// }

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>


                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>
    `).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }    
})

// pokeApi.getPokemons().then((pokemons = []) => {
//     // O map traz sempre o value que é cada item da lista com o index e o próprio array
//     // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));

//     // Como o valor que será usado é o mesmo que será passado para o método, pode simplificar a escrita dessa forma
//     // const newList = pokemons.map(convertPokemonToLi);

//     pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
// });
