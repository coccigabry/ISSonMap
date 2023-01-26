let map = L.map('map').setView([0, 0], 3);
const tilesURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tiles = L.tileLayer( tilesURL, { attribution }).addTo(map);
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [90, 60],
    iconAnchor: [45, 30],
});
let marker = L.marker([ 0, 0], {icon: issIcon}).addTo(map);

let pLat = document.querySelector('.lat')
let pLong = document.querySelector('.long') 
let pAlt = document.querySelector('.alt')
let pVel = document.querySelector('.vel') 

const dataURL = 'https://api.wheretheiss.at/v1/satellites/25544'



const fetchData = async () => {
    const res = await fetch(dataURL)
    data = await res.json()
    //const { latitude, longitude } = data
    console.log(data)
}

const showData = async () => {
    await fetchData()
    // document.getElementById(ID).innerHTML = `${JSON.stringify(data, null, 2)}`
    marker.setLatLng([ data.latitude, data.longitude ])
    map.setView([ data.latitude, data.longitude ])
    pLat.innerHTML = `${(data.latitude).toFixed(6)} °`
    pLong.innerHTML = `${(data.longitude).toFixed(6)} °`
    pAlt.innerHTML = `${Math.round((data.altitude + Number.EPSILON) * 100) / 100} km`
    pVel.innerHTML = `${Math.round(data.velocity)} km/h`
}

showData()

setInterval(showData, 1000);
