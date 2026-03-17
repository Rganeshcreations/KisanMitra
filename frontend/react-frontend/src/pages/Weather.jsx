import { useState } from "react";

function Weather(){

const [city,setCity] = useState("");
const [weather,setWeather] = useState(null);

async function getWeather(){

if(!city) return;

const apiKey = "b603752cbff56369b28029ca59cc852c";

const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const data = await res.json();

setWeather(data);

}

return(

<div style={styles.body}>

<h1 style={styles.title}>☁ Weather Forecast</h1>

<div style={styles.search}>

<input
placeholder="Enter City"
value={city}
onChange={(e)=>setCity(e.target.value)}
style={styles.input}
/>

<button onClick={getWeather} style={styles.button}>
Check Weather
</button>

</div>


{weather && weather.main && (

<div style={styles.cards}>

<div style={styles.card}>
🌡 Temperature
<h2>{weather.main.temp} °C</h2>
</div>

<div style={styles.card}>
💧 Humidity
<h2>{weather.main.humidity}%</h2>
</div>

<div style={styles.card}>
🌬 Wind Speed
<h2>{weather.wind.speed} m/s</h2>
</div>

<div style={styles.card}>
🌥 Condition
<h2>{weather.weather[0].main}</h2>
</div>

</div>

)}

</div>

);

}

const styles = {

body:{
marginLeft:"260px",
padding:"40px",
color:"white"
},

title:{
marginBottom:"20px"
},

search:{
marginBottom:"30px"
},

input:{
padding:"10px",
borderRadius:"6px",
border:"none",
marginRight:"10px"
},

button:{
padding:"10px 15px",
background:"green",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
},

cards:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"25px",
borderRadius:"12px",
backdropFilter:"blur(10px)",
textAlign:"center",
fontSize:"18px"
}

};

export default Weather;