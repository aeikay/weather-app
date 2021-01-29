const city = document.querySelector('.city');
const temp = document.querySelector('.temp')
const desc = document.querySelector('.description')
const date = document.querySelector('.date')
const element = document.body;
const button = document.getElementById('darkmode');

const table = document.querySelector('.table');

const forecast1 = document.querySelector('.forecast1');
const forecast2 = document.querySelector('.forecast2');
const forecast3 = document.querySelector('.forecast3');
const temp1 = document.querySelector('.temp1');
const temp2 = document.querySelector('.temp2');
const temp3 = document.querySelector('.temp3');

const tempE1 = document.querySelector('.tempE1')
const tempE2= document.querySelector('.tempE2')
const tempE3 = document.querySelector('.tempE3')

const tempN1 = document.querySelector('.tempN1');
const tempN2 = document.querySelector('.tempN2');
const tempN3 = document.querySelector('.tempN3');

const desc1 = document.querySelector('.desc1');
const desc2 = document.querySelector('.desc2');
const desc3 = document.querySelector('.desc3');

const forecastbutton = document.getElementById('forecastbutton')


let forecast = [forecast1,forecast2,forecast3];
let temperature = [temp1,temp2,temp3];
let temperatureE = [tempE1,tempE2,tempE3];
let temperatureN = [tempN1,tempN2,tempN3];
let descriptionW = [desc1,desc2,desc3];

let dat = new Date();
let hours = dat.getDate();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.textContent = dat.toLocaleString('en-GB', options);




button.addEventListener('click',()=>{
    element.classList.toggle("dark");
    console.log(element.classList);
    if(element.classList.value === "dark"){
        button.textContent= 'Light theme';
        button.classList.value =  "btn btn-light"
    }
    else{
        button.textContent ="Dark theme";
        console.log(button.classList);
        button.classList.value = "btn btn-dark";
    }
})

window.addEventListener('load',()=>{
    
    table.style.display = "none";
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            // console.log(data.coords);
            long = data.coords.longitude;
            lat  = data.coords.latitude;
            let api  = `https://api.openweathermap.org/data/2.5/onecall?lat=`+lat+ `&lon=` + long + `&exclude=minutely,hourly&appid=56d7df6c2080d7a0c7e9b8a36a901dfc`;

    fetch(api).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data.current);
            city.textContent = data.timezone;
            temp.textContent = data.current.temp +' K';
            let tempC = data.current.temp-273.15;
            let tempinC = Math.round(tempC*10)/10;

            for(let i=1;i<4;i++){     
            let nd = new Date(data.daily[i].dt * 1000);
            forecast[i-1].textContent = nd.toLocaleString('en-GB',options);

            let tempC = data.daily[i].temp.day-273.15;
            let tempinC = Math.round(tempC*10)/10;
            temperature[i-1].textContent = tempinC;

            let tempEC = data.daily[i].temp.eve - 273.15;
            let tempECinC = Math.round(tempEC*10)/10;
            temperatureE[i-1].textContent = tempECinC;

            let tempNC = data.daily[i].temp.night - 273.15;
            let tempNCinC = Math.round(tempNC*10)/10;
            temperatureN[i-1].textContent = tempNCinC;

            descriptionW[i-1].textContent = data.daily[i].weather[0].description;


            }
            temp.addEventListener('click',()=>{
                let str = temp.textContent;                
                if(str.charAt(str.length-1) === 'C' ){
                    temp.textContent = data.current.temp + ' K' ;
                }else{
                    temp.textContent = tempinC + 'C';
                }
            })
            desc.textContent = data.current.weather[0].description;
        }); 
        
        forecastbutton.addEventListener('click',()=>{
            if(table.style.display=="none"){
                   table.style.display = "table";
                }
            else{
               console.log(table.style.display);
            
               table.style.display = "none";
           }
        })
        

        //tooltip

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
        // let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=`+ long + `&exclude=minutely,hourly&appid=56d7df6c2080d7a0c7e9b8a36a901dfc`
    }
    )
}
else{
    alert('Allow location to get weather forecast')
}}
)
// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

