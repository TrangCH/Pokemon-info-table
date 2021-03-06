let currentPokemon;

let pokemons = [];

/**
 * It loads the Pokemons that are between the two borders.
 */
async function loadPokemons(limit, offset) {
    // Pokemon von x bis y
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    let response = await fetch(url);
    let pokemonList = await response.json();
    console.log(pokemonList);

    for (let i = 0; i < pokemonList.results.length; i++) {
        const element = pokemonList.results[i];
        let url = element.url; // url results: Array(20)
        let response = await fetch(url);
        let pokemon = await response.json(); // Wandelt Text in JSON um
        pokemons.push(pokemon); // Push in das globale Array pokemons (siehe Zeile 3)

        if (i == 38 || i == 75 || i == 113 || i == 150) {
            let pokeList = pokemonList.results.length - 1;
            let percent = i / pokeList;
            percent = Math.round(percent * 100); // aufrunden

           updateProgressBar(percent);
           
            if (i == 150) {
                addDNoneProgressBarAfterWork();
            }
        }
    }

    console.log(pokemons);
    loadPokemon();
}

/**
 * Update progress-bar
 */
function updateProgressBar(percent) {
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`; // Breite ändern
}

function addDNoneProgressBarAfterWork() {
    setTimeout(() => {
        document.getElementById('progress').classList.add("d-none");
    }, 15000);
}

/**
 * Load pokemon´s from REST-API
 */
// Asynchrone FUnktion läuft nacheinander ab und wartet jedes Mal bis der aktuelle Befehl
// ausgeführt ist.
async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon', currentPokemon);

    renderPokemonInfo();
}


/**
 * It creates the maps with the information of the pokemons.
 */
function renderPokemonInfo() {
    let list = document.getElementById('list');

    for (let i = 0; i < pokemons.length; i++) {
        let colorType = pokemons[i]['types'][0]['type']['name'];
        list.innerHTML += `

        <li class="pokemonCard">
            <div id="pokedex" class="${colorType}">
                <div class="pokemonNameId">
                    <h2 id="pokemonName">${pokemons[i]['name']}</h2>
                    <h2>${pokemons[i]['id']}</h2>
                </div>
                <div id="pokemonType" class="pokemonType ${colorType}">
                   
                    ${printTypes(pokemons[i]['types'])}
                   
                </div>
                <div class="imgArea">
                    <img src="${pokemons[i]['sprites']['other']['dream_world']['front_default']}" id="pokemonImage" class="pokemonImage">
                </div> 
            </div>

            <div class="info-container">
                <div class="infoArea" id="infoArea">
                    <h3>Information</h3>
                    <div class="info" id="info">
                        <table class="table">
                            <tr>
                                <td><b>height</b></td>
                                <td>${pokemons[i]['height'] * 10 + ' cm'}</td>
                            </tr>
                            <tr>
                                <td><b>weight</b></td>
                                <td>${pokemons[i]['weight'] / 10 + ' kg'}</td>
                            </tr>
                            <tr>
                                <td><b>abilities</b></td>
                                <td>${printAbilities(pokemons[i]['abilities'])}</td>
                            </tr>
                        </table>

                        <table class="table">
                            <tr>
                                <td><b>${pokemons[i]['stats'][0]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][0]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][1]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][1]['base_stat']}</td>
                            <tr>
                                <td><b>${pokemons[i]['stats'][2]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][2]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][3]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][3]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][4]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][4]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][5]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][5]['base_stat']}</td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </li>
    
    `;

    }

}


// pokemons[i]['types'] = types
function printTypes(types) {
    let typesCollection = [];

    for (let i = 0; i < types.length; i++) {
        const type = types[i]['type']['name'];
        // hier result erweitern
        typesCollection.push(type);
    }
    return typesCollection.join('<br> ');
}

function printAbilities(abilities) {
    let abilitiesCollection = [];

    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i]['ability']['name'];
        // hier result erweitern
        abilitiesCollection.push(ability);
    }
    return abilitiesCollection.join('<br> ');
}

/**
 * It filters out what you are looking for.
 */

function filterRenderPokemonInfo() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase(); // Nur kleine Buchstaben

    let list = document.getElementById('list');
    list.innerHTML = '';

    for (let i = 0; i < pokemons.length; i++) {
        let colorType = pokemons[i]['types'][0]['type']['name'];
        let pokemonName = pokemons[i]['name'];

        if (pokemonName.toLowerCase().includes(search)) {

            list.innerHTML += `

        <li class="pokemonCard">
            <div id="pokedex" class="${colorType}">
                <div class="pokemonNameId">
                    <h2 id="pokemonName">${pokemons[i]['name']}</h2>
                    <h2>${pokemons[i]['id']}</h2>
                </div>
                <div id="pokemonType" class="pokemonType ${colorType}">
                   
                    ${printTypes(pokemons[i]['types'])}
                   
                </div>
                <div class="imgArea">
                    <img src="${pokemons[i]['sprites']['other']['dream_world']['front_default']}" id="pokemonImage" class="pokemonImage">
                </div> 
            </div>

            <div class="info-container">
                <div class="infoArea" id="infoArea">
                    <h3>Information</h3>
                    <div class="info" id="info">
                        <table class="table">
                            <tr>
                                <td><b>height</b></td>
                                <td>${pokemons[i]['height'] * 10 + ' cm'}</td>
                            </tr>
                            <tr>
                                <td><b>weight</b></td>
                                <td>${pokemons[i]['weight'] / 10 + ' kg'}</td>
                            </tr>
                            <tr>
                                <td><b>abilities</b></td>
                                <td>${printAbilities(pokemons[i]['abilities'])}</td>
                            </tr>
                        </table>

                        <table class="table">
                            <tr>
                                <td><b>${pokemons[i]['stats'][0]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][0]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][1]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][1]['base_stat']}</td>
                            <tr>
                                <td><b>${pokemons[i]['stats'][2]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][2]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][3]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][3]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][4]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][4]['base_stat']}</td>
                            </tr>
                            <tr>
                                <td><b>${pokemons[i]['stats'][5]['stat']['name']}</b></td>
                                <td>${pokemons[i]['stats'][5]['base_stat']}</td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </li>`;
        }
    }

}
