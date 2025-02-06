"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let busca = document.querySelector('.busca');
busca.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let input = document.querySelector('#searchInput');
    input.value;
    if (input.value !== '') {
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&appid=e432e9bd3d56758a895f48e9b8acdd49&units=metric&lang=pt_br`;
        let results = yield fetch(url);
        let json = yield results.json();
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }
        else {
            showWarning('Não encontramos esta localização!!!');
        }
    }
}));
function showInfo(json) {
    showWarning('');
    let resultado = document.querySelector('.resultado');
    resultado.classList.remove('hidden');
    resultado.classList.toggle('flex-col');
    let titulo = document.querySelector('.titulo');
    titulo.innerHTML = `${json.name}, ${json.country}`;
    let tempInfo = document.querySelector('.tempInfo');
    tempInfo.innerHTML = `${json.temp} <sup>°C</sup>`;
    let ventoInfo = document.querySelector('.ventoInfo');
    ventoInfo.innerHTML = `${json.windSpeed} <span>km/h</span>`;
    let img = document.querySelector('.temp img');
    img.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`);
    let ventoPonto = document.querySelector('.ventoPonto');
    ventoPonto.style.transform = `rotate(${json.windAngle - 90}deg)`;
}
function showWarning(msg) {
    let aviso = document.querySelector('.aviso');
    aviso.innerHTML = msg;
}
