import { useState } from 'react'
const mock=[{id:1,n:"Laachi Queen",v:"2.1k",t:"Desi",c:"#ff2e88"},{id:2,n:"Jalalpur Doll",v:"1.8k",t:"Punjabi",c:"#7c3aed"},{id:3,n:"Gujrat Rose",v:"890",t:"New",c:"#06b6d4"},{id:4,n:"Pari",v:"3.2k",t:"Trending",c:"#f59e0b"},{id:5,n:"Noor",v:"1.2k",t:"Desi",c:"#10b981"},{id:6,n:"Sana",v:"2.5k",t:"Live Now",c:"#ef4444"}]
export default function App(){
const [a,setA]=useState("All")
const cats=["All","Desi","Punjabi","Live Now","New","Trending"]
return(<div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',fontFamily:'system-ui'}}>
<div style={{padding:'16px',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between',alignItems:'center'}}><h1 style={{fontSize:'22px',fontWeight:800,color:'#ff2e88'}}>Laachi<span style={{color:'white'}}>Live</span></h1></div>
<div style={{display:'flex',gap:'8px',padding:'14px',overflowX:'auto'}}>{cats.map(x=>(<button key={x} onClick={()=>setA(x)} style={{padding:'6px 16px',borderRadius:'20px',border:'none',background:a===x?'#ff2e88':'#1e1e1e',color:'white',fontWeight:600,fontSize:'13px'}}>{x}</button>))}</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',padding:'12px'}}>
{mock.filter(m=>a==="All"||m.t===a).map(m=>(<div key={m.id} style={{background:'#151515',borderRadius:'16px',overflow:'hidden',border:'1px solid #222'}}><div style={{height:'160px',background:m.c,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px'}}>{m.n[0]}<span style={{position:'absolute',top:'8px',left:'8px',background:'red',fontSize:'10px',padding:'3px 8px',borderRadius:'10px',fontWeight:700}}>● LIVE</span><span style={{position:'absolute',bottom:'8px',right:'8px',background:'rgba(0,0,0,0.7)',fontSize:'11px',padding:'3px 8px',borderRadius:'10px'}}>{m.v} watching</span></div><div style={{padding:'10px'}}><div style={{fontWeight:700,fontSize:'14px'}}>{m.n}</div><div style={{fontSize:'12px',color:'#aaa'}}>{m.t} • Online</div></div></div>))}</div>
<div style={{textAlign:'center',padding:'30px',color:'#555',fontSize:'12px'}}>laachilive.vercel.app</div></div>)}
