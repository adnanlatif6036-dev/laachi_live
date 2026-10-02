export default function CityFilter({filterCity, setFilterCity}:any){
  const cities = ["All", "Lahore", "Karachi", "Islamabad", "Gujranwala"];
  return (
    <div style={{display:"flex", gap:8, padding:"10px 16px", overflowX:"auto"}}>
      {cities.map((c:any)=><button key={c} onClick={()=>setFilterCity(c)} style={{padding:"6px 14px", borderRadius:20, border:0, whiteSpace:"nowrap", background: filterCity===c ? "linear-gradient(90deg,#ff1493,#8a2be2)" : "#1e1e22", color:"#fff", fontSize:12}}>{c}</button>)}
    </div>
  )
}
