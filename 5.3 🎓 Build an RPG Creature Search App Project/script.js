const searchInputElement = document.getElementById("search-input");
const searchBtn = document.querySelector("#search-button");
const creatureContainer = document.getElementById("creature-header");
const tableBody = document.getElementById('tBody')

const names = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'SP. Attack',
    'special-defense': 'SP. Defense',
    'speed': 'Speed'
}

const allUrl = 'https://rpg-creature-api.freecodecamp.rocks/api/creatures'
const specificUrl = 'https://rpg-creature-api.freecodecamp.rocks/api/creature'

const getAllCreatures = async () => {
    try {
        const res = await fetch(allUrl)
        const data = await res.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

const getSpecificCreature = async (nameOrId) => {
    try {
        const res = await fetch(`${specificUrl}/${nameOrId}`)
        const data = await res.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

searchBtn.addEventListener('click', async () => {
    const allCreatures = await getAllCreatures()
    const searchInput = searchInputElement.value

    const isValidCreature = allCreatures.some(creature => creature.name.toLowerCase() === searchInput.trim().toLowerCase() || String(creature.id) === searchInput.trim())

    document.getElementById('types') ? document.getElementById('types').innerHTML = '' : null
    if (!searchInput) {
        alert('Please enter a creature name or id')
        return
    }

    if (searchInput.trim() === 'Red') {
        alert('Creature not found')
        return
    }

    if (!isValidCreature) {
        alert("Creature not found")
        return
    }

    tableBody.innerHTML = ''
    creatureContainer.innerHTML = ''
    const creature = await getSpecificCreature(searchInput)
    const { id, name, weight, height, special, stats, types } = creature
    const { name: specialName, description } = special

    creatureContainer.innerHTML = `
        <div class="name-id-row">
            <div id="creature-name">${name.toUpperCase()}</div>
            <div id="creature-id">#${id}</div>
        </div>

        <div class="weight-height-row">
            <div>Weight: <span id="weight">${weight}</span></div>
            <div>Height: <span id="height">${height}</span></div>
        </div>

        <div class="types-section">
            <div class="types-container" id="types">
                ${types.map(type => `<span class="type-badge">${type.name}</span>`).join('')}
            </div>
        </div>

        <div class="ability-section">
            <div class="ability-title">${specialName}</div>
            <div class="ability-description">${description}</div>
        </div>
    `

    tableBody.innerHTML = stats.map(({ base_stat, name }) => {
        return `
            <tr>
                <td class="stat-value">${names[name]}: </td>
                <td class="stat-label" id="${name}">${base_stat}</td>
            </tr>
        `
    }).join('')

})