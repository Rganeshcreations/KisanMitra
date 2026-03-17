import { useNavigate } from "react-router-dom";

function GovernmentDashboard(){

const navigate = useNavigate();

return(

<div style={styles.body}>

<h1>🏛 Government Agriculture Panel</h1>

<div style={styles.cards}>

<div style={styles.card}>
<h3>📢 Publish Scheme</h3>
<p>Announce agriculture schemes</p>
</div>

<div style={styles.card}>
<h3>🌾 Crop Advisory</h3>
<p>Provide farming guidance</p>
</div>

<div style={styles.card}>
<h3>☁ Weather Alerts</h3>
<p>Send weather warnings</p>
</div>

</div>

</div>

);

}

const styles = {

body:{
padding:"40px",
background:
"linear-gradient(rgba(34,139,34,0.6), rgba(0,0,0,0.7)), url('/images/farm-bg.jpg')",
backgroundSize:"cover",
height:"100vh",
color:"white"
},

cards:{
display:"flex",
gap:"30px",
marginTop:"40px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"30px",
borderRadius:"15px",
cursor:"pointer",
backdropFilter:"blur(10px)",
width:"250px",
transition:"0.3s"
}

};

export default GovernmentDashboard;