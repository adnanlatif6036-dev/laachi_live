export default function CityFilter({filterCity, setFilterCity}:any){
  const cities = ["All","Lahore","Karachi","Islamabad","Faisalabad","Multan","Gujranwala","Sialkot","Rawalpindi"];
  return (
    <div style={{display:"flex", gap:8, padding:"0 16px", overflowX:"auto"}}>
      {cities.map(c=><span key={c} onClick={()=>setFilterCity(c)} style={{background: filterCity===c? "linear-gradient(90deg,#ff1493,#8a2be2)" : "#1e1e22", padding:"6px 12px", borderRadius:20, fontSize:11, whiteSpace:"nowrap", cursor:"pointer", color:"#fff"}}>{c}</span>)}
    </div>
  )
}
