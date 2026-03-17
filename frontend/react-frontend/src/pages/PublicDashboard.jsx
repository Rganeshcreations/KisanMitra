function PublicDashboard(){

return(

<div style={styles.body}>

<h1>🌍 Public Agriculture Portal</h1>

<div style={styles.cards}>

<div style={styles.card}>
<h3>🌾 Agriculture News</h3>
</div>

<div style={styles.card}>
<h3>📊 Crop Market Prices</h3>
</div>

<div style={styles.card}>
<h3>🏛 Government Schemes</h3>
</div>

</div>

</div>

);

}

const styles={

body:{
padding:"40px",
color:"white"
},

cards:{
display:"flex",
gap:"30px"
},

card:{
background:"rgba(255,255,255,0.15)",
padding:"30px",
borderRadius:"12px",
width:"250px"
}

};

export default PublicDashboard;