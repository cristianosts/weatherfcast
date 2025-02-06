let busca = document.querySelector('.busca') as HTMLInputElement 

busca.addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput') as HTMLInputElement
    
    input.value

    if(input.value !== '') {
        showWarning('Carregando...')

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
            showWarning('Não encontramos esta localização!!!')
        }
    }
})

function showInfo(json: any) {
   showWarning('')

   let resultado = document.querySelector('.resultado') as HTMLInputElement
   resultado.classList.remove('hidden')
   resultado.classList.toggle('flex-col')

   let titulo = document.querySelector('.titulo') as HTMLInputElement
   titulo.innerHTML = `${json.name}, ${json.country}`
   let tempInfo = document.querySelector('.tempInfo') as HTMLInputElement
   tempInfo.innerHTML = `${json.temp} <sup>°C</sup>`
   let ventoInfo = document.querySelector('.ventoInfo') as HTMLInputElement 
   ventoInfo.innerHTML = `${json.windSpeed} <span>km/h</span>`

   let img = document.querySelector('.temp img') as HTMLInputElement 
   img.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    let ventoPonto = document.querySelector('.ventoPonto') as HTMLInputElement
    ventoPonto.style.transform = `rotate(${json.windAngle -90}deg)`
}

function showWarning(msg: string) {
    let aviso = document.querySelector('.aviso') as HTMLInputElement
    
    aviso.innerHTML = msg
}