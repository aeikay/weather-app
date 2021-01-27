const city = document.querySelector('.city');
const temp = document.querySelector('.temp')
const desc = document.querySelector('.description')

window.addEventListener('load',()=>{

    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            console.log(data.coords);
            long = data.coords.longitude;
            lat  = data.coords.latitude;
            let api  = `https://api.openweathermap.org/data/2.5/weather?lat=`+lat+ `&lon=` + long + `&appid=` + `56d7df6c2080d7a0c7e9b8a36a901dfc`;

    fetch(api).then((response)=>{

        return response.json()
    }).then((data)=>{
        console.log(data);
            city.textContent = data.name;
            temp.textContent = data.main.temp;
            desc.textContent = data.weather[0].description;
        });

        // if(response.status!==200){
        //     console.log("Error present in the api call, recieved status code" + response.status);
        // }else{
        //     console.log(response);
        // }
        
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

