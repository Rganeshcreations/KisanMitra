import { useNavigate } from "react-router-dom";

function AdminDashboard(){

const navigate = useNavigate();

return(

<div style={styles.body}>

<h1>⚙ Admin Control Panel</h1>

<div style={styles.cards}>

<div style={styles.card}>
<h3>👥 Manage Users</h3>
</div>

<div style={styles.card}>
<h3>🌾 Experts List</h3>
</div>

<div style={styles.card}>
<h3>📊 System Reports</h3>
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
width:"250px"
}

};

export default AdminDashboard;