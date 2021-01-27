const city = document.querySelector('.city');
const temp = document.querySelector('.temp')
const desc = document.querySelector('.description')
const date = document.querySelector('.date')
const element = document.body;
const button = document.getElementById('darkmode');

let dat = new Date();
let hours = dat.getHours();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.textContent = dat.toLocaleString('en-GB', options);

button.addEventListener('click',()=>{
    element.classList.toggle("dark");
    console.log(element.classList);
    if(element.classList.value === "dark"){
        button.textContent= 'Light theme';
    }
    else{
        button.textContent ="Dark theme";
        button.classList.toggle('btn btn-light')
    }
})


window.addEventListener('load',()=>{

    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            // console.log(data.coords);
            long = data.coords.longitude;
            lat  = data.coords.latitude;
            let api  = `https://api.openweathermap.org/data/2.5/weather?lat=`+lat+ `&lon=` + long + `&appid=` + `56d7df6c2080d7a0c7e9b8a36a901dfc`;

    fetch(api).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data);
            city.textContent = data.name;
            temp.textContent = data.main.temp + ' K';
            let tempinC = data.main.temp-273.15 ;
            temp.addEventListener('click',()=>{
                temp.textContent = tempinC + ' C';
            })
            // temp.addEventListener('click',()=>{
            //     temp.textContent = data.main.temp + ' K'; 
            // })

            desc.textContent = data.weather[0].description;
        });        
    })
}}
)
   
//     var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

