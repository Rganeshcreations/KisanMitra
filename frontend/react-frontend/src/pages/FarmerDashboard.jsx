import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FarmerDashboard(){

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
if(!user){
navigate("/");
}
},[navigate,user]);

return(

<div style={styles.body}>

{/* SIDEBAR */}

<div style={styles.sidebar}>

<h3 style={styles.logo}>🌾 Farmer Panel</h3>

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


{/* MAIN CONTENT */}

<div style={styles.content}>

<h2 style={styles.title}>Welcome to KisanMitra Dashboard 🚜</h2>

<div style={styles.cards}>

<div style={styles.card} onClick={()=>navigate("/crop")}>
🌱 Crop Data
<p>Manage your crop information</p>
</div>

<div style={styles.card} onClick={()=>navigate("/weather")}>
☁ Weather
<p>Check latest weather updates</p>
</div>

<div style={styles.card} onClick={()=>navigate("/experts")}>
👨‍🌾 Ask Expert
<p>Consult agriculture experts</p>
</div>

<div style={styles.card} onClick={()=>navigate("/ai-chat")}>
🤖 AI Expert
<p>Get AI farming advice</p>
</div>

<div style={styles.card} onClick={()=>navigate("/my-questions")}>
📩 My Questions
<p>View expert answers</p>
</div>

<div style={styles.card} onClick={()=>alert("Coming soon")}>
🛒 Buy Fertilizers
<p>Purchase fertilizers online</p>
</div>

</div>

</div>


{/* PROFILE */}

<div style={styles.profile}>

<img
src="/images/user.png"
style={styles.profileImg}
onClick={()=>navigate("/farmer-view")}
/>

<p style={styles.profileName}>{user?.name}</p>

</div>

</div>

);

}

const styles = {

body:{
margin:0,
fontFamily:"Arial",
background:
"linear-gradient(rgba(34,139,34,0.6), rgba(0,0,0,0.7)), url('/images/farmer-bg.jpg')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundAttachment:"fixed",
color:"white",
minHeight:"100vh"
},

logo:{
marginBottom:"30px",
fontSize:"22px"
},

sidebar:{
width:"240px",
height:"100vh",
background:"rgba(0,100,0,0.95)",
position:"fixed",
paddingTop:"30px",
textAlign:"center",
boxShadow:"4px 0px 20px rgba(0,0,0,0.4)"
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
},

content:{
marginLeft:"260px",
padding:"40px"
},

title:{
marginBottom:"30px"
},

cards:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))",
gap:"25px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"25px",
borderRadius:"15px",
backdropFilter:"blur(12px)",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
cursor:"pointer",
transition:"0.3s",
textAlign:"center",
fontSize:"20px"
},

profile:{
position:"absolute",
top:"20px",
right:"30px",
textAlign:"center"
},

profileImg:{
width:"85px",
height:"85px",
borderRadius:"50%",
border:"3px solid white",
cursor:"pointer",
objectFit:"cover",
background:"white",
transition:"0.3s"
},

profileName:{
marginTop:"8px",
fontWeight:"bold"
}

};

export default FarmerDashboard;