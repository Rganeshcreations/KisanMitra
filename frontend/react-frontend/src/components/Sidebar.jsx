import { useNavigate } from "react-router-dom";

function Sidebar(){

const navigate = useNavigate();

return(

<div style={styles.sidebar}>

<h2 style={styles.logo}>🌾 KisanMitra</h2>

<button style={styles.button} onClick={()=>navigate("/")}>
🏠 Dashboard
</button>

<button style={styles.button} onClick={()=>navigate("/crop")}>
🌱 Crop Data
</button>

<button style={styles.button} onClick={()=>navigate("/weather")}>
☁ Weather
</button>

<button style={styles.button} onClick={()=>navigate("/experts")}>
👨‍🌾 Ask Expert
</button>

<button style={styles.button} onClick={()=>navigate("/my-questions")}>
📩 My Questions
</button>

<button style={styles.button} onClick={()=>navigate("/ai-chat")}>
🤖 AI Expert
</button>

<button style={styles.button} onClick={()=>alert("Coming soon")}>
🛒 Buy Fertilizers
</button>

</div>

);

}

const styles = {

sidebar:{
width:"240px",
height:"100vh",
background:"rgba(0,100,0,0.95)",
position:"fixed",
paddingTop:"30px",
textAlign:"center",
boxShadow:"4px 0px 20px rgba(0,0,0,0.4)"
},

logo:{
color:"white",
marginBottom:"30px"
},

button:{
width:"85%",
margin:"12px 15px",
padding:"12px",
border:"none",
borderRadius:"8px",
background:"white",
color:"#2e7d32",
fontWeight:"bold",
cursor:"pointer",
transition:"0.3s"
}

};

export default Sidebar;