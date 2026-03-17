import { useNavigate } from "react-router-dom";

function ExpertDashboard(){

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

return(

<div style={styles.body}>

<h1 style={styles.title}>👨‍🌾 Expert Dashboard</h1>

<h2>Welcome {user?.name}</h2>

<div style={styles.cards}>

<div
style={styles.card}
onClick={()=>navigate("/expert-questions")}
>

<h3>📩 Farmer Questions</h3>

<p>View and answer farmer problems</p>

</div>

<div
style={styles.card}
onClick={()=>navigate("/ai-chat")}
>

<h3>🤖 AI Agriculture Assistant</h3>

<p>Use AI for crop solutions</p>

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

title:{
marginBottom:"20px"
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
width:"260px",
transition:"0.3s"
}

};

export default ExpertDashboard;