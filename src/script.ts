interface WeatherInfo {
    name: string;
    country: string;
    temp: number;
    tempIcon: string;
    windSpeed: number;
    windAngle: number; 
}

let busca = document.querySelector('.busca') as HTMLInputElement 
let resultado = document.querySelector('.resultado') as HTMLElement

busca.addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput') as HTMLInputElement
    
    input.value

    if(input.value !== '') {
        clearInfo()
        showWarning('Loading...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&appid=e432e9bd3d56758a895f48e9b8acdd49&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()

            showWarning("We couldn't find this location!")
        }
    } else {
        clearInfo()
    }
})

function showInfo(json: WeatherInfo) {
  
    showWarning('')

   let titulo = document.querySelector('.titulo') as HTMLElement
   titulo.innerHTML = `${json.name}, ${json.country}`
   let tempInfo = document.querySelector('.tempInfo') as HTMLElement
   tempInfo.innerHTML = `${json.temp} <sup>°C</sup>`
   let ventoInfo = document.querySelector('.ventoInfo') as HTMLElement 
   ventoInfo.innerHTML = `${json.windSpeed} <span>km/h</span>`
   
   let img = document.querySelector('.temp img') as HTMLImageElement 
   img.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`)
   
   let ventoPonto = document.querySelector('.ventoPonto') as HTMLElement
   ventoPonto.style.transform = `rotate(${json.windAngle -90}deg)`

   resultado.classList.remove('hidden')
   resultado.classList.toggle('flex-col')
}

function clearInfo() {
    showWarning('')

    resultado.classList.remove('flex-col')
    resultado.classList.add('hidden')
}

function showWarning(msg: string) {
    let aviso = document.querySelector('.aviso') as HTMLInputElement
    
    aviso.innerHTML = msg
}