import { useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

function logout(){

localStorage.removeItem("user");
navigate("/");

}

return(

<div style={styles.navbar}>

<h2 style={styles.logo}>🌾 KisanMitra</h2>

<div style={styles.right}>

<span style={styles.username}>
👤 {user?.name}
</span>

<button style={styles.logout} onClick={logout}>
Logout
</button>

</div>

</div>

);

}

const styles = {

navbar:{
position:"fixed",
top:0,
left:"240px",
right:0,
height:"70px",
background:"rgba(0,0,0,0.6)",
backdropFilter:"blur(10px)",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 30px",
color:"white",
zIndex:100
},

logo:{
fontSize:"22px"
},

right:{
display:"flex",
alignItems:"center",
gap:"20px"
},

username:{
fontWeight:"bold"
},

logout:{
padding:"8px 15px",
background:"#e53935",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}

};

export default Navbar;