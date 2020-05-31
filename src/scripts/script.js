import  {searchCountries} from './module/api.js'
import  {getDataCountries} from './module/api.js'

let selectEl = document.querySelector('.select-country')

async function getArrayCountries(){

    let arrayContries = await searchCountries()

    arrayContries.forEach(country => {
        let optionEl = document.createElement('option')
        optionEl.value = country
        optionEl.innerHTML = country

        selectEl.appendChild(optionEl)
    })
}
getArrayCountries()

// *************


let update = document.querySelector('.last-update')
let data = document.querySelector('.data')
let showInformations = ['confirmados', 'recuperados', 'mortes']

showInformations.forEach((el, index) => {
    let paragraph1El = document.createElement('p')
    let paragraph2El = document.createElement('p')
    let divEl = document.createElement('div')

    divEl.classList.add(el)
    paragraph2El.innerHTML = el

    paragraph1El.classList.add('quantidades')

    divEl.appendChild(paragraph1El)
    divEl.appendChild(paragraph2El)
    data.appendChild(divEl)

})

// *************

let buttonEl = document.querySelector('.btn-search')
let countrySelected = document.querySelector('.select-country')
let paragraph1El = document.createElement('p')

buttonEl.addEventListener('click', event => {
    let country = countrySelected.value
    
    getData(country)

})

async function getData(country) {
    try {
        let informationsResponse = await getDataCountries(country)
        let result = await informationsResponse

        let { confirmed, recovered, deaths, lastUpdate } = result
        let data = [confirmed.value, recovered.value, deaths.value]

        let day = lastUpdate.slice(0, 10)
        paragraph1El.innerHTML = ''
        paragraph1El.innerHTML = `Última atualização: ${day}`
        update.appendChild(paragraph1El)

        document.querySelectorAll('.quantidades').forEach((item, index) => {
            item.innerHTML = data[index]
        })

        return result
    } catch (error) {
        console.log(error);
    }
}
