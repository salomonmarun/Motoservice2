import { useState, useEffect } from "react";

// ═══════════════════════ DATA ═══════════════════════
const BRAND_COLORS = {
  Honda:"#E40521",Yamaha:"#003087",Suzuki:"#004B9B",Kawasaki:"#1B9942",
  KTM:"#FF6600","Royal Enfield":"#2E7D32",Bajaj:"#FF8F00",AKT:"#C62828",
  UM:"#1565C0",Bera:"#7B1FA2",Auteco:"#B71C1C",Multimarcas:"#455A64",
};
const SERVICES_LIST = [
  {id:"oil",name:"Cambio de aceite",icon:"🛢️",basePrice:45000,duration:45},
  {id:"brake",name:"Revisión de frenos",icon:"🔧",basePrice:60000,duration:60},
  {id:"chain",name:"Ajuste de cadena",icon:"⛓️",basePrice:35000,duration:30},
  {id:"carb",name:"Carburación",icon:"⚙️",basePrice:80000,duration:90},
  {id:"electrical",name:"Sistema eléctrico",icon:"⚡",basePrice:70000,duration:75},
  {id:"suspension",name:"Suspensión",icon:"🏍️",basePrice:120000,duration:120},
  {id:"general",name:"Mantenimiento general",icon:"🔩",basePrice:150000,duration:150},
  {id:"tire",name:"Cambio de llanta",icon:"🔄",basePrice:25000,duration:30},
  {id:"scan",name:"Diagnóstico escáner",icon:"💻",basePrice:55000,duration:45},
  {id:"wash",name:"Lavado especializado",icon:"✨",basePrice:30000,duration:40},
];
const TALLERES = [
  {id:1,name:"Honda Motos Cúcuta",brand:"Honda",type:"especializada",city:"Cúcuta",zone:"Av. Libertadores",address:"Av. Libertadores #10-24",phone:"3157890123",rating:4.7,reviews:345,certified:"elite",distance:0.8,services:["oil","brake","chain","carb","electrical","suspension","general","scan"],hours:"Lun-Sáb 8am-6pm",waitTime:15,activeJobs:3,mechanics:4,image:"🔴"},
  {id:2,name:"Yamaha Meyer Motos Cúcuta",brand:"Yamaha",type:"especializada",city:"Cúcuta",zone:"El Centro",address:"Cra 5 #14-32",phone:"3168901234",rating:4.8,reviews:412,certified:"elite",distance:1.2,services:["oil","brake","chain","carb","electrical","general","scan","tire"],hours:"Lun-Sáb 8am-6:30pm",waitTime:20,activeJobs:5,mechanics:6,image:"🔵"},
  {id:3,name:"AKT Motos del Oriente",brand:"AKT",type:"especializada",city:"Cúcuta",zone:"Quinta Oriental",address:"Cra 7 #9-45",phone:"3179012345",rating:4.5,reviews:298,certified:"certificado",distance:1.9,services:["oil","brake","chain","electrical","general","scan"],hours:"Lun-Sáb 8am-6pm",waitTime:10,activeJobs:2,mechanics:3,image:"🔴"},
  {id:4,name:"Bajaj Megatienda Cúcuta",brand:"Bajaj",type:"especializada",city:"Cúcuta",zone:"Caobos",address:"Av. Gran Colombia #8-17",phone:"3180123456",rating:4.6,reviews:387,certified:"elite",distance:2.3,services:["oil","brake","chain","carb","electrical","suspension","general","scan","tire"],hours:"Lun-Sáb 7am-7pm",waitTime:30,activeJobs:7,mechanics:5,image:"🟡"},
  {id:5,name:"Auteco Mobility Cúcuta",brand:"Auteco",type:"especializada",city:"Cúcuta",zone:"Atalaya",address:"Diagonal Santander #5-41",phone:"3191234567",rating:4.6,reviews:221,certified:"certificado",distance:2.7,services:["oil","brake","general","scan","tire","wash"],hours:"Lun-Sáb 8am-6pm",waitTime:25,activeJobs:4,mechanics:4,image:"🟤"},
  {id:6,name:"Mototaller Las Américas",brand:"Multimarcas",type:"multimarcas",city:"Cúcuta",zone:"Las Américas",address:"Av. 4 #8-55",phone:"3102345678",rating:4.4,reviews:278,certified:"verificado",distance:3.1,services:["oil","brake","chain","electrical","general","tire","wash","scan"],hours:"Lun-Dom 7am-9pm",waitTime:5,activeJobs:1,mechanics:3,image:"⚙️"},
  {id:7,name:"Yamaha Meyer Bucaramanga",brand:"Yamaha",type:"especializada",city:"Bucaramanga",zone:"Cabecera",address:"Cll 56 #34-17",phone:"3113456789",rating:4.8,reviews:406,certified:"elite",distance:0.5,services:["oil","brake","chain","carb","electrical","suspension","general","scan"],hours:"Lun-Sáb 8am-6:30pm",waitTime:15,activeJobs:4,mechanics:5,image:"🔵"},
  {id:8,name:"Bajaj Bucaramanga Oficial",brand:"Bajaj",type:"especializada",city:"Bucaramanga",zone:"Cabecera",address:"Cra 15 #53-24",phone:"3124567890",rating:4.5,reviews:198,certified:"certificado",distance:1.1,services:["oil","brake","carb","electrical","general","scan","tire"],hours:"Lun-Sáb 8am-6pm",waitTime:20,activeJobs:3,mechanics:4,image:"🟡"},
];
const PARTS_CATALOG = [
  {id:"p1",name:"Aceite Motul 10W40 4T 1L",brand:"Motul",price:28000,sku:"MOT-10W40-1L",certified:true,stock:48},
  {id:"p2",name:"Filtro de aceite Honda CB190R",brand:"Honda",price:18000,sku:"HON-OIL-F-CB190",certified:true,stock:23},
  {id:"p3",name:"Pastillas de freno Yamaha FZ",brand:"Yamaha",price:42000,sku:"YAM-BRAKE-FZ25",certified:true,stock:15},
  {id:"p4",name:"Kit cadena y piñones AKT NKD",brand:"AKT",price:85000,sku:"AKT-CHN-NKD125",certified:true,stock:8},
  {id:"p5",name:"Bujía NGK CR7HSA universal",brand:"NGK",price:12000,sku:"NGK-CR7HSA",certified:true,stock:62},
  {id:"p6",name:"Filtro aire Bajaj Pulsar NS200",brand:"Bajaj",price:24000,sku:"BAJ-AIR-NS200",certified:true,stock:19},
  {id:"p7",name:"Llanta Pirelli MT 90/90-18",brand:"Pirelli",price:145000,sku:"PIR-MT-90-18",certified:true,stock:7},
  {id:"p8",name:"Kit freno trasero genérico",brand:"Centurion",price:15000,sku:"CEN-BRCBL-U",certified:false,stock:34},
];
const MOCK_HISTORY = [
  {id:"b1",tallerId:1,service:"oil",status:"completed",date:"2025-02-15",km:8500,amount:65000,rating:5,parts:["Aceite Motul 10W40","Filtro aceite Honda"],notes:"Todo OK, sin novedades"},
  {id:"b2",tallerId:2,service:"brake",status:"completed",date:"2025-01-28",km:7200,amount:102000,rating:4,parts:["Pastillas freno Yamaha FZ"],notes:"Frenos delanteros y traseros ajustados"},
  {id:"b3",tallerId:4,service:"general",status:"confirmed",date:"2025-03-08",km:null,amount:185000,parts:[],notes:""},
];
const TALLER_REQUESTS = [
  {id:"r1",userName:"Carlos Pérez",moto:"Honda CB190R 2023",service:"oil",date:"2025-03-05",time:"10:00",status:"pending",phone:"3152345678"},
  {id:"r2",userName:"María González",moto:"Yamaha FZ 25 2022",service:"brake",date:"2025-03-05",time:"14:00",status:"quoted",quote:112000,phone:"3163456789"},
  {id:"r3",userName:"Luis Torres",moto:"Bajaj Pulsar NS200 2024",service:"carb",date:"2025-03-06",time:"09:00",status:"confirmed",quote:98000,phone:"3174567890"},
  {id:"r4",userName:"Andrés Ruiz",moto:"AKT NKD 125 2023",service:"electrical",date:"2025-03-06",time:"11:30",status:"pending",phone:"3185678901"},
  {id:"r5",userName:"Sandra Mejía",moto:"Yamaha MT-03 2024",service:"general",date:"2025-03-07",time:"08:00",status:"in_progress",quote:210000,phone:"3196789012"},
];

// ═══════════════════════ UTILS ═══════════════════════
const fmt = n => n ? new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n) : "—";
const svc = id => SERVICES_LIST.find(s=>s.id===id)||{name:id,icon:"🔧"};
const taller = id => TALLERES.find(t=>t.id===id);
const certBadge = c => ({elite:{label:"ÉLITE ⭐",bg:"#7C3AED",color:"#EDE9FE"},certificado:{label:"CERTIFICADO",bg:"#065F46",color:"#6EE7B7"},verificado:{label:"VERIFICADO",bg:"#1E3A5F",color:"#93C5FD"}}[c]||{label:"—",bg:"#374151",color:"#9CA3AF"});
const statusBadge = s => ({completed:{label:"Completado",bg:"#065F46",color:"#6EE7B7"},confirmed:{label:"Confirmado",bg:"#1E3A5F",color:"#93C5FD"},pending_quote:{label:"Esperando cotización",bg:"#78350F",color:"#FCD34D"},pending:{label:"Pendiente",bg:"#78350F",color:"#FCD34D"},quoted:{label:"Cotización enviada",bg:"#6B21A8",color:"#E9D5FF"},in_progress:{label:"En progreso",bg:"#1D4ED8",color:"#BFDBFE"}}[s]||{label:s,bg:"#374151",color:"#9CA3AF"});

// ═══════════════════════ STYLES ═══════════════════════
const S = {
  app:{fontFamily:"'Barlow', sans-serif",background:"#07070F",minHeight:"100vh",color:"#E2E8F0",maxWidth:430,margin:"0 auto",position:"relative",overflow:"hidden"},
  screen:{minHeight:"100vh",display:"flex",flexDirection:"column",overflowY:"auto"},
  header:{background:"rgba(7,7,15,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(249,115,22,0.15)",padding:"14px 20px",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:12},
  card:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:10},
  cardActive:{background:"rgba(249,115,22,0.08)",border:"1px solid rgba(249,115,22,0.4)",borderRadius:12,padding:16,marginBottom:10},
  btn:{background:"#F97316",border:"none",color:"#fff",borderRadius:10,padding:"12px 20px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,cursor:"pointer",width:"100%",letterSpacing:0.5},
  btnOutline:{background:"rgba(249,115,22,0.1)",border:"1px solid rgba(249,115,22,0.4)",color:"#F97316",borderRadius:10,padding:"10px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"},
  btnGhost:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"#94A3B8",borderRadius:8,padding:"8px 14px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer"},
  input:{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"11px 14px",color:"#E2E8F0",fontSize:14,fontFamily:"'Barlow',sans-serif",outline:"none",boxSizing:"border-box"},
  label:{color:"#64748B",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:6,display:"block",textTransform:"uppercase"},
  h1:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,color:"#F1F5F9",margin:0},
  h2:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#F1F5F9",margin:"0 0 4px"},
  h3:{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,color:"#E2E8F0",margin:"0 0 4px"},
  small:{color:"#64748B",fontSize:12},
  orange:{color:"#F97316"},
  badge:(bg,color)=>({background:bg,color,fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:700,fontFamily:"monospace",whiteSpace:"nowrap"}),
  tabBar:{position:"sticky",bottom:0,background:"rgba(7,7,15,0.98)",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",padding:"8px 0 12px",zIndex:50},
  tab:(active)=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",background:"none",border:"none",color:active?"#F97316":"#475569",padding:"4px 0"}),
};

// ═══════════════════════ SHARED COMPONENTS ═══════════════════════
function Badge({cert}){const b=certBadge(cert);return <span style={S.badge(b.bg,b.color)}>{b.label}</span>}
function StatusBadge({status}){const b=statusBadge(status);return <span style={S.badge(b.bg,b.color)}>{b.label}</span>}
function Stars({rating}){return <span style={{color:"#F59E0B",fontSize:13}}>{"★".repeat(Math.floor(rating))}{"☆".repeat(5-Math.floor(rating))}</span>}
function Divider(){return <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"14px 0"}}/>}
function Avatar({name,size=36}){return <div style={{width:size,height:size,borderRadius:"50%",background:"linear-gradient(135deg,#F97316,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.4,fontWeight:700,color:"white",flexShrink:0}}>{name[0]}</div>}

function TallerCard({t, onClick, compact=false}){
  const bc = BRAND_COLORS[t.brand]||"#455A64";
  return (
    <div onClick={onClick} style={{...S.card,cursor:"pointer",position:"relative",overflow:"hidden",paddingLeft:20}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:bc}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:5}}>
            <Badge cert={t.certified}/>
            {t.type==="multimarcas"?<span style={S.badge("#374151","#94A3B8")}>MULTIMARCAS</span>:<span style={S.badge(bc+"22",bc)}>{t.brand.toUpperCase()}</span>}
          </div>
          <div style={S.h3}>{t.name}</div>
          <div style={{...S.small,marginTop:2}}>📍 {t.zone}, {t.city}</div>
          {!compact && <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
            {t.services.slice(0,3).map(sv=><span key={sv} style={{...S.badge("rgba(255,255,255,0.05)","#94A3B8"),fontSize:10}}>{svc(sv).icon} {svc(sv).name}</span>)}
            {t.services.length>3&&<span style={{...S.small,padding:"2px 4px"}}>+{t.services.length-3}</span>}
          </div>}
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{color:"#F97316",fontFamily:"monospace",fontWeight:700,fontSize:14}}>{t.distance}km</div>
          <Stars rating={t.rating}/><br/>
          <span style={{...S.small}}>{t.rating} ({t.reviews})</span>
        </div>
      </div>
      {!compact && <div style={{display:"flex",gap:8,marginTop:10}}>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px",textAlign:"center"}}>
          <div style={{color:"#10B981",fontWeight:700,fontSize:13}}>{t.waitTime}min</div>
          <div style={{...S.small,fontSize:10}}>Espera actual</div>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px",textAlign:"center"}}>
          <div style={{color:"#60A5FA",fontWeight:700,fontSize:13}}>{t.mechanics}</div>
          <div style={{...S.small,fontSize:10}}>Mecánicos</div>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px",textAlign:"center"}}>
          <div style={{color:"#F59E0B",fontWeight:700,fontSize:13}}>{t.activeJobs}</div>
          <div style={{...S.small,fontSize:10}}>En servicio</div>
        </div>
      </div>}
    </div>
  );
}

// ═══════════════════════ SCREENS - MOTOCICLISTA ═══════════════════════
function HomeScreen({user,moto,bookings,navigate}){
  const upcoming = bookings.find(b=>b.status==="confirmed"||b.status==="pending_quote");
  const nearbyTalleres = TALLERES.slice(0,3);
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0D0D1A 0%,#12122A 100%)",padding:"20px 20px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(249,115,22,0.08)"}}/>
        <div style={{position:"absolute",bottom:-30,left:-10,width:80,height:80,borderRadius:"50%",background:"rgba(124,58,237,0.06)"}}/>
        <div style={{...S.small,marginBottom:4,letterSpacing:2,textTransform:"uppercase"}}>Buenos días 👋</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,color:"#F1F5F9",marginBottom:12}}>
          {user.name.split(" ")[0]}
        </div>
        {moto ? (
          <div style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:32}}>🏍️</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:17,color:"#F1F5F9"}}>{moto.brand} {moto.model}</div>
              <div style={{...S.small}}>{moto.year} · {moto.plate} · {moto.km?.toLocaleString()} km</div>
            </div>
            <div style={{background:"rgba(249,115,22,0.15)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:8,padding:"4px 10px",cursor:"pointer"}} onClick={()=>navigate("moto")}>
              <span style={{color:"#F97316",fontSize:12,fontWeight:700}}>Ver →</span>
            </div>
          </div>
        ):(
          <button onClick={()=>navigate("addMoto")} style={{...S.btnOutline,width:"100%",marginTop:4}}>+ Agregar tu moto</button>
        )}
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* Upcoming service alert */}
        {upcoming && (
          <div onClick={()=>navigate("booking",{booking:upcoming})} style={{background:"rgba(249,115,22,0.1)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:12,padding:14,marginBottom:16,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:"#F97316",fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:3}}>📅 SERVICIO PRÓXIMO</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,color:"#F1F5F9"}}>{svc(upcoming.service).icon} {svc(upcoming.service).name}</div>
                <div style={{...S.small}}>{taller(upcoming.tallerId)?.name} · {upcoming.date}</div>
              </div>
              <StatusBadge status={upcoming.status}/>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,color:"#94A3B8",letterSpacing:1,marginBottom:10}}>ACCIONES RÁPIDAS</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {icon:"🔍",label:"Buscar taller",sub:"Cerca de ti",action:"search",color:"#F97316"},
            {icon:"📋",label:"Mi historial",sub:"Servicios pasados",action:"history",color:"#7C3AED"},
            {icon:"🏍️",label:"Mi moto",sub:"Hoja de vida",action:"moto",color:"#10B981"},
            {icon:"🔔",label:"Recordatorios",sub:"Próx. mantenimiento",action:"reminders",color:"#F59E0B"},
          ].map(a=>(
            <div key={a.action} onClick={()=>navigate(a.action)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:14,cursor:"pointer",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-8,right:-8,width:40,height:40,borderRadius:"50%",background:a.color+"15"}}/>
              <div style={{fontSize:24,marginBottom:6}}>{a.icon}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"#F1F5F9"}}>{a.label}</div>
              <div style={{...S.small,fontSize:11}}>{a.sub}</div>
            </div>
          ))}
        </div>

        {/* Nearby talleres */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,color:"#94A3B8",letterSpacing:1,marginBottom:10}}>TALLERES CERCANOS</div>
        {nearbyTalleres.map(t=><TallerCard key={t.id} t={t} compact onClick={()=>navigate("tallerDetail",{taller:t})}/>)}
        <button onClick={()=>navigate("search")} style={{...S.btnOutline,marginTop:4}}>Ver todos los talleres →</button>
      </div>
    </div>
  );
}

function SearchScreen({navigate}){
  const [query,setQuery]=useState("");
  const [filterBrand,setFilterBrand]=useState("Todas");
  const [filterType,setFilterType]=useState("todos");
  const [filterService,setFilterService]=useState("todos");
  const [sortBy,setSortBy]=useState("distance");
  const brands=["Todas",...Object.keys(BRAND_COLORS)];
  const filtered = TALLERES.filter(t=>{
    if(filterBrand!=="Todas"&&t.brand!==filterBrand)return false;
    if(filterType==="multimarcas"&&t.type!=="multimarcas")return false;
    if(filterType==="especializada"&&t.type!=="especializada")return false;
    if(filterService!=="todos"&&!t.services.includes(filterService))return false;
    if(query&&!t.name.toLowerCase().includes(query.toLowerCase())&&!t.city.toLowerCase().includes(query.toLowerCase()))return false;
    return true;
  }).sort((a,b)=>sortBy==="distance"?a.distance-b.distance:sortBy==="rating"?b.rating-a.rating:b.reviews-a.reviews);

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}>
        <div style={{flex:1}}>
          <div style={{...S.h1,fontSize:20}}>🔍 Buscar Taller</div>
        </div>
      </div>
      <div style={{padding:"12px 16px",background:"#0A0A14",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nombre, ciudad, zona..." style={S.input}/>
        <div style={{display:"flex",gap:6,marginTop:8,overflowX:"auto",paddingBottom:4}}>
          {["todos","multimarcas","especializada"].map(t=>(
            <button key={t} onClick={()=>setFilterType(t)} style={{...S.badge(filterType===t?"rgba(249,115,22,0.2)":"rgba(255,255,255,0.04)",filterType===t?"#F97316":"#64748B"),padding:"5px 12px",cursor:"pointer",border:filterType===t?"1px solid #F97316":"1px solid rgba(255,255,255,0.06)",borderRadius:20,whiteSpace:"nowrap",fontSize:11,fontWeight:700}}>
              {t==="todos"?"Todos":t==="multimarcas"?"⚙️ Multimarcas":"🎯 Especializado"}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:6,marginTop:6,overflowX:"auto",paddingBottom:4}}>
          {brands.slice(0,8).map(b=>{
            const bc=BRAND_COLORS[b]||"#F97316";
            const active=filterBrand===b;
            return <button key={b} onClick={()=>setFilterBrand(b)} style={{background:active?bc+"22":"rgba(255,255,255,0.03)",border:active?`1px solid ${bc}`:"1px solid rgba(255,255,255,0.06)",color:active?bc:"#64748B",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{b}</button>
          })}
        </div>
        <div style={{display:"flex",gap:6,marginTop:6,overflowX:"auto",paddingBottom:2}}>
          <span style={{...S.small,lineHeight:"28px",flexShrink:0}}>Servicio:</span>
          {["todos",...SERVICES_LIST.slice(0,5).map(s=>s.id)].map(sv=>(
            <button key={sv} onClick={()=>setFilterService(sv)} style={{background:filterService===sv?"rgba(249,115,22,0.15)":"rgba(255,255,255,0.03)",border:filterService===sv?"1px solid #F97316":"1px solid rgba(255,255,255,0.06)",color:filterService===sv?"#F97316":"#64748B",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:11,whiteSpace:"nowrap"}}>
              {sv==="todos"?"Todos":svc(sv).icon+" "+svc(sv).name}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"8px 16px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{...S.small}}><span style={{color:"#F97316",fontWeight:700}}>{filtered.length}</span> talleres</span>
        <div style={{display:"flex",gap:4}}>
          {[["distance","📍"],["rating","⭐"],["reviews","💬"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSortBy(v)} style={{...S.badge(sortBy===v?"rgba(249,115,22,0.12)":"transparent",sortBy===v?"#F97316":"#64748B"),padding:"3px 8px",cursor:"pointer",border:sortBy===v?"1px solid rgba(249,115,22,0.3)":"1px solid transparent",borderRadius:6,fontSize:10}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"0 16px",flex:1}}>
        {filtered.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#64748B"}}><div style={{fontSize:40,marginBottom:8}}>🔍</div>Sin resultados</div>:
          filtered.map(t=><TallerCard key={t.id} t={t} onClick={()=>navigate("tallerDetail",{taller:t})}/>)
        }
      </div>
    </div>
  );
}

function TallerDetailScreen({t, navigate}){
  const [selectedService, setSelectedService] = useState(null);
  const bc = BRAND_COLORS[t.brand]||"#455A64";
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:90}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${bc}18 0%,#0D0D1A 100%)`,padding:"16px 20px",borderBottom:`1px solid ${bc}30`}}>
        <button onClick={()=>navigate("search")} style={{...S.btnGhost,marginBottom:14,padding:"6px 12px",fontSize:12}}>← Volver</button>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          <Badge cert={t.certified}/>
          <span style={S.badge(bc+"22",bc)}>{t.brand.toUpperCase()}</span>
          {t.type==="multimarcas"&&<span style={S.badge("#374151","#94A3B8")}>MULTIMARCAS</span>}
        </div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,color:"#F1F5F9",marginBottom:4}}>{t.name}</div>
        <div style={{...S.small}}>📍 {t.address}, {t.city}</div>
        <div style={{display:"flex",gap:3,marginTop:6,alignItems:"center"}}>
          <Stars rating={t.rating}/>
          <span style={{color:"#F1F5F9",fontWeight:700,fontSize:14,marginLeft:4}}>{t.rating}</span>
          <span style={{...S.small}}>({t.reviews} reseñas)</span>
        </div>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
          {[["⏱️",t.waitTime+"min","Espera","#10B981"],["👨‍🔧",t.mechanics,"Mecánicos","#60A5FA"],["🔧",t.activeJobs,"En servicio","#F59E0B"]].map(([icon,val,label,color])=>(
            <div key={label} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
              <div style={{color,fontWeight:700,fontSize:16,fontFamily:"'Barlow Condensed',sans-serif"}}>{val}</div>
              <div style={{...S.small,fontSize:10}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{...S.card,padding:"12px 14px",marginBottom:14}}>
          <div style={{...S.small,marginBottom:2}}>🕐 Horario</div>
          <div style={{color:"#E2E8F0",fontSize:14,fontWeight:600}}>{t.hours}</div>
          <div style={{...S.small,marginTop:6}}>📞 {t.phone}</div>
        </div>
        {/* Services */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"#94A3B8",letterSpacing:1,marginBottom:10}}>SELECCIONA UN SERVICIO</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
          {t.services.map(sv=>{
            const s=svc(sv);
            const active=selectedService===sv;
            return (
              <div key={sv} onClick={()=>setSelectedService(active?null:sv)} style={{background:active?"rgba(249,115,22,0.1)":"rgba(255,255,255,0.04)",border:active?"1px solid #F97316":"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 10px",cursor:"pointer"}}>
                <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,color:"#F1F5F9",marginBottom:2}}>{s.name}</div>
                <div style={{color:"#F97316",fontSize:12,fontWeight:700}}>{fmt(s.basePrice)}</div>
                <div style={{...S.small,fontSize:10}}>{s.duration} min aprox</div>
              </div>
            );
          })}
        </div>
        {/* Book button */}
        <div style={{position:"sticky",bottom:72,background:"linear-gradient(transparent,#07070F 30%)",paddingTop:20}}>
          <button onClick={()=>selectedService&&navigate("booking",{taller:t,service:selectedService})} style={{...S.btn,opacity:selectedService?1:0.4}}>
            {selectedService?`Reservar: ${svc(selectedService).name}`:"Selecciona un servicio"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingScreen({params, navigate, addBooking}){
  const {taller:t, service:svcId, booking:existingBooking} = params||{};
  const [step, setStep] = useState(existingBooking?3:1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuote, setAiQuote] = useState(null);
  const s = svc(svcId);
  const tallerData = t || taller(existingBooking?.tallerId);

  const getAIQuote = async () => {
    setAiLoading(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:500,
          messages:[{role:"user",content:`Eres el sistema de cotización de MotoService Colombia. El cliente pide "${s.name}" en el taller "${tallerData?.name}" en Cúcuta. 
Responde SOLO en JSON con: {"labor": número en COP, "parts": [{"name": "...","price": número}], "total": número, "estimatedTime": "X min", "warranty": "X días", "notes": "observación breve en español"}.
Usa precios reales del mercado colombiano 2025. Máximo 2 partes.`}]
        })
      });
      const data = await resp.json();
      const text = data.content?.[0]?.text||"{}";
      const clean = text.replace(/```json|```/g,"").trim();
      setAiQuote(JSON.parse(clean));
    } catch(e){ setAiQuote({labor:s.basePrice,parts:[],total:s.basePrice,estimatedTime:s.duration+"min",warranty:"30 días",notes:"Cotización estándar"}); }
    setAiLoading(false);
  };

  if(existingBooking){
    const b=existingBooking;
    const td=taller(b.tallerId);
    return (
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={S.header}>
          <button onClick={()=>navigate("history")} style={{...S.btnGhost,padding:"6px 12px",fontSize:12}}>← Volver</button>
          <div style={{flex:1,...S.h2}}>Detalle del servicio</div>
        </div>
        <div style={{padding:16}}>
          <div style={{...S.card,borderColor:b.status==="completed"?"rgba(16,185,129,0.3)":"rgba(249,115,22,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20}}>{svc(b.service).icon} {svc(b.service).name}</div>
              <StatusBadge status={b.status}/>
            </div>
            <div style={{...S.small,marginBottom:4}}>🏪 {td?.name}</div>
            <div style={{...S.small,marginBottom:4}}>📅 {b.date}</div>
            {b.km&&<div style={{...S.small,marginBottom:4}}>🏍️ {b.km.toLocaleString()} km</div>}
            {b.parts?.length>0&&<><Divider/><div style={{...S.label}}>Repuestos usados</div>{b.parts.map((p,i)=><div key={i} style={{...S.small,marginBottom:3}}>✓ {p}</div>)}</>}
            {b.amount&&<><Divider/><div style={{display:"flex",justifyContent:"space-between"}}><span style={{...S.small}}>Total pagado</span><span style={{color:"#F97316",fontWeight:700,fontSize:16}}>{fmt(b.amount)}</span></div></>}
            {b.notes&&<><Divider/><div style={{...S.small,fontStyle:"italic"}}>{b.notes}</div></>}
            {b.status==="completed"&&b.rating&&<><Divider/><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{...S.small}}>Tu calificación:</span><Stars rating={b.rating}/></div></>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}>
        <button onClick={()=>step>1?setStep(step-1):navigate("tallerDetail",{taller:t})} style={{...S.btnGhost,padding:"6px 12px",fontSize:12}}>← {step>1?"Atrás":"Volver"}</button>
        <div style={{flex:1,...S.h2,fontSize:16}}>Reservar servicio</div>
        <div style={{...S.small}}>{step}/3</div>
      </div>
      {/* Step indicators */}
      <div style={{padding:"12px 16px",background:"#0A0A14",display:"flex",gap:6}}>
        {["Fecha y hora","Cotización IA","Confirmar"].map((label,i)=>(
          <div key={i} style={{flex:1,textAlign:"center"}}>
            <div style={{height:3,borderRadius:2,background:step>i+1?"#10B981":step===i+1?"#F97316":"rgba(255,255,255,0.1)",marginBottom:4}}/>
            <div style={{fontSize:10,color:step===i+1?"#F97316":step>i+1?"#10B981":"#64748B",fontWeight:step===i+1?700:400}}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{padding:16}}>
        {/* Service summary */}
        <div style={{...S.card,display:"flex",gap:12,alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:28}}>{s.icon}</div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18,color:"#F1F5F9"}}>{s.name}</div>
            <div style={{...S.small}}>📍 {tallerData?.name}</div>
          </div>
          <div style={{marginLeft:"auto",color:"#F97316",fontWeight:700,fontSize:16}}>{fmt(s.basePrice)}</div>
        </div>

        {step===1 && (
          <>
            <label style={S.label}>Fecha preferida</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...S.input,marginBottom:14}} min={new Date().toISOString().split("T")[0]}/>
            <label style={S.label}>Hora</label>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
              {["8:00","9:00","10:00","11:00","14:00","15:00","16:00","17:00"].map(h=>(
                <button key={h} onClick={()=>setTime(h)} style={{background:time===h?"rgba(249,115,22,0.2)":"rgba(255,255,255,0.04)",border:time===h?"1px solid #F97316":"1px solid rgba(255,255,255,0.07)",color:time===h?"#F97316":"#94A3B8",borderRadius:8,padding:"8px 4px",cursor:"pointer",fontWeight:700,fontSize:13}}>{h}</button>
              ))}
            </div>
            <label style={S.label}>Observaciones (opcional)</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Describe el problema o síntoma que tiene tu moto..." style={{...S.input,height:80,resize:"none",marginBottom:16}}/>
            <button onClick={()=>{if(date&&time){setStep(2);getAIQuote();}}} style={{...S.btn,opacity:(date&&time)?1:0.4}}>Continuar → Obtener cotización</button>
          </>
        )}
        {step===2 && (
          <>
            <div style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.3)",borderRadius:12,padding:14,marginBottom:16,textAlign:"center"}}>
              <div style={{color:"#A78BFA",fontWeight:700,fontSize:13,marginBottom:4}}>🤖 COTIZACIÓN INTELIGENTE</div>
              <div style={{...S.small,fontSize:11}}>Generada por IA con precios del mercado colombiano 2025</div>
            </div>
            {aiLoading?(
              <div style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:32,marginBottom:12,animation:"spin 1s linear infinite"}}>⚙️</div>
                <div style={{color:"#94A3B8"}}>Calculando cotización...</div>
              </div>
            ):aiQuote?(
              <>
                <div style={S.card}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{...S.small}}>Mano de obra</span>
                    <span style={{color:"#F1F5F9",fontWeight:700}}>{fmt(aiQuote.labor)}</span>
                  </div>
                  {aiQuote.parts?.map((p,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                      <span style={{...S.small,flex:1,marginRight:8}}>🔩 {p.name}</span>
                      <span style={{...S.badge("#065F46","#6EE7B7"),marginRight:6,padding:"1px 6px"}}>ORIGINAL</span>
                      <span style={{color:"#F1F5F9",fontWeight:700}}>{fmt(p.price)}</span>
                    </div>
                  ))}
                  <Divider/>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:"#F1F5F9",fontWeight:700}}>Total</span>
                    <span style={{color:"#F97316",fontWeight:900,fontSize:20,fontFamily:"'Barlow Condensed',sans-serif"}}>{fmt(aiQuote.total)}</span>
                  </div>
                </div>
                <div style={{...S.card,display:"flex",gap:16}}>
                  <div style={{textAlign:"center",flex:1}}><div style={{color:"#60A5FA",fontWeight:700}}>{aiQuote.estimatedTime}</div><div style={{...S.small,fontSize:10}}>Tiempo est.</div></div>
                  <div style={{textAlign:"center",flex:1}}><div style={{color:"#10B981",fontWeight:700}}>✓ {aiQuote.warranty}</div><div style={{...S.small,fontSize:10}}>Garantía</div></div>
                </div>
                {aiQuote.notes&&<div style={{...S.card,fontStyle:"italic",color:"#94A3B8",fontSize:13}}>💡 {aiQuote.notes}</div>}
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button onClick={()=>setStep(1)} style={{...S.btnOutline,flex:1}}>Cambiar fecha</button>
                  <button onClick={()=>setStep(3)} style={{...S.btn,flex:2}}>Aceptar cotización →</button>
                </div>
              </>
            ):null}
          </>
        )}
        {step===3 && !confirmed && (
          <>
            <div style={{...S.card,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)"}}>
              <div style={{color:"#10B981",fontWeight:700,fontSize:14,marginBottom:12}}>✅ RESUMEN DE TU RESERVA</div>
              {[["Servicio",`${s.icon} ${s.name}`],["Taller",tallerData?.name],["Dirección",tallerData?.address],["Fecha",date],["Hora",time],["Total estimado",fmt(aiQuote?.total||s.basePrice)],["Garantía",aiQuote?.warranty||"30 días"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{...S.small}}>{k}</span>
                  <span style={{color:"#F1F5F9",fontSize:13,fontWeight:600,textAlign:"right",maxWidth:"55%"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{...S.card,marginBottom:16}}>
              <div style={{...S.label,marginBottom:8}}>Método de pago</div>
              {["💵 Efectivo en taller","📱 Nequi / Daviplata","🏦 PSE","💳 Tarjeta débito/crédito"].map(p=>(
                <div key={p} style={{padding:"10px 12px",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,marginBottom:6,cursor:"pointer",color:"#E2E8F0",fontSize:13}}>
                  {p}
                </div>
              ))}
            </div>
            <button onClick={()=>{addBooking&&addBooking({service:svcId,tallerId:t?.id,date,time,status:"confirmed",amount:aiQuote?.total||s.basePrice});setConfirmed(true);}} style={S.btn}>
              🎯 Confirmar reserva
            </button>
          </>
        )}
        {step===3 && confirmed && (
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:60,marginBottom:16}}>🎉</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,color:"#10B981",marginBottom:8}}>¡Reserva confirmada!</div>
            <div style={{color:"#94A3B8",marginBottom:24,lineHeight:1.5}}>El taller recibirá tu solicitud y te notificará por WhatsApp en los próximos 15 minutos.</div>
            <div style={{...S.card,marginBottom:16}}>
              <div style={{color:"#F97316",fontWeight:700,marginBottom:4}}>📍 {tallerData?.name}</div>
              <div style={{...S.small}}>{date} a las {time}</div>
              <div style={{...S.small}}>📞 {tallerData?.phone}</div>
            </div>
            <button onClick={()=>navigate("home")} style={S.btn}>Volver al inicio</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MotoScreen({moto, setMoto, navigate, history}){
  const [adding, setAdding] = useState(!moto);
  const [form, setForm] = useState({brand:"Honda",model:"CB190R",year:"2023",plate:"",km:"",color:""});
  if(adding||!moto) return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}>
        <div style={{...S.h1,fontSize:20}}>🏍️ Mi Moto</div>
      </div>
      <div style={{padding:16}}>
        <div style={{textAlign:"center",padding:"20px 0 24px"}}>
          <div style={{fontSize:48,marginBottom:8}}>🏍️</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:20,marginBottom:4}}>Agrega tu moto</div>
          <div style={{...S.small}}>Lleva el historial completo de mantenimiento</div>
        </div>
        <label style={S.label}>Marca</label>
        <select value={form.brand} onChange={e=>setForm({...form,brand:e.target.value,model:""})} style={{...S.input,marginBottom:12}}>
          {Object.keys(BRAND_COLORS).map(b=><option key={b} value={b}>{b}</option>)}
        </select>
        <label style={S.label}>Modelo</label>
        <input value={form.model} onChange={e=>setForm({...form,model:e.target.value})} placeholder="Ej: CB190R" style={{...S.input,marginBottom:12}}/>
        <label style={S.label}>Año</label>
        <input value={form.year} onChange={e=>setForm({...form,year:e.target.value})} placeholder="2024" style={{...S.input,marginBottom:12}}/>
        <label style={S.label}>Placa</label>
        <input value={form.plate} onChange={e=>setForm({...form,plate:e.target.value.toUpperCase()})} placeholder="ABC123" style={{...S.input,marginBottom:12}}/>
        <label style={S.label}>Kilometraje actual</label>
        <input value={form.km} onChange={e=>setForm({...form,km:e.target.value})} placeholder="8500" type="number" style={{...S.input,marginBottom:20}}/>
        <button onClick={()=>{if(form.brand&&form.model&&form.plate){setMoto({...form,km:parseInt(form.km)||0});setAdding(false);}}} style={{...S.btn,opacity:form.plate?1:0.4}}>Guardar mi moto</button>
      </div>
    </div>
  );

  const completedServices = history?.filter(b=>b.status==="completed")||[];
  const nextService = moto.km+3000;
  const progress = Math.min(((moto.km%3000)/3000)*100,100);
  const bc = BRAND_COLORS[moto.brand]||"#F97316";

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}>
        <div style={{...S.h1,fontSize:20}}>🏍️ Mi Moto</div>
        <button onClick={()=>setAdding(true)} style={{...S.btnGhost,padding:"5px 10px",fontSize:11}}>Editar</button>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        {/* Moto card */}
        <div style={{background:`linear-gradient(135deg,${bc}18,#0D0D1A)`,border:`1px solid ${bc}30`,borderRadius:16,padding:20,marginBottom:16,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:-10,top:-10,fontSize:80,opacity:0.08}}>🏍️</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            <span style={S.badge(bc+"22",bc)}>{moto.brand.toUpperCase()}</span>
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,color:"#F1F5F9",marginBottom:2}}>{moto.brand} {moto.model}</div>
          <div style={{...S.small,marginBottom:14}}>Año {moto.year} · Placa {moto.plate}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[[moto.km?.toLocaleString()+" km","Kilometraje","#F97316"],[completedServices.length+" servicios","Historial","#7C3AED"],["30 días","Garantía activa","#10B981"]].map(([v,l,c])=>(
              <div key={l} style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                <div style={{color:c,fontWeight:700,fontSize:15,fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</div>
                <div style={{...S.small,fontSize:10}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Next maintenance */}
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"#F97316",marginBottom:8}}>🔔 PRÓXIMO MANTENIMIENTO</div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{color:"#E2E8F0",fontSize:14}}>Cambio de aceite</span>
            <span style={{color:"#F97316",fontWeight:700}}>{nextService.toLocaleString()} km</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:6,height:8,overflow:"hidden",marginBottom:6}}>
            <div style={{height:"100%",width:progress+"%",background:`linear-gradient(90deg,#10B981,${progress>70?"#F97316":"#10B981"})`,borderRadius:6,transition:"width 0.5s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{...S.small,fontSize:11}}>Último: {moto.km?.toLocaleString()} km</span>
            <span style={{...S.small,fontSize:11}}>Faltan: {(nextService-moto.km).toLocaleString()} km</span>
          </div>
        </div>
        {/* History */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"#94A3B8",letterSpacing:1,marginBottom:10}}>HOJA DE VIDA</div>
        {MOCK_HISTORY.map(b=>(
          <div key={b.id} onClick={()=>navigate("booking",{booking:b})} style={{...S.card,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{svc(b.service).icon} {svc(b.service).name}</div>
                <div style={{...S.small}}>{taller(b.tallerId)?.name} · {b.date}</div>
                {b.km&&<div style={{...S.small,fontSize:11}}>{b.km.toLocaleString()} km</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <StatusBadge status={b.status}/>
                {b.amount&&<div style={{color:"#F97316",fontWeight:700,fontSize:14,marginTop:4}}>{fmt(b.amount)}</div>}
              </div>
            </div>
          </div>
        ))}
        <button onClick={()=>navigate("booking",{taller:TALLERES[0],service:"oil"})} style={{...S.btn,marginTop:8}}>🔧 Agendar servicio</button>
      </div>
    </div>
  );
}

function HistoryScreen({navigate}){
  const all = MOCK_HISTORY;
  const total = all.filter(b=>b.status==="completed").reduce((s,b)=>s+(b.amount||0),0);
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}><div style={{...S.h1,fontSize:20}}>📋 Historial</div></div>
      <div style={{padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[[all.filter(b=>b.status==="completed").length,"Completados","#10B981"],[fmt(total),"Total invertido","#F97316"]].map(([v,l,c])=>(
            <div key={l} style={{...S.card,textAlign:"center"}}>
              <div style={{color:c,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22}}>{v}</div>
              <div style={{...S.small,fontSize:11}}>{l}</div>
            </div>
          ))}
        </div>
        {all.map(b=>(
          <div key={b.id} onClick={()=>navigate("booking",{booking:b})} style={{...S.card,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{svc(b.service).icon} {svc(b.service).name}</div>
                <div style={{...S.small}}>{taller(b.tallerId)?.name}</div>
                <div style={{...S.small,fontSize:11,marginTop:2}}>{b.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <StatusBadge status={b.status}/>
                {b.amount&&<div style={{color:"#F97316",fontWeight:700,fontSize:15,marginTop:4}}>{fmt(b.amount)}</div>}
                {b.rating&&<div style={{marginTop:2}}><Stars rating={b.rating}/></div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════ TALLER APP ═══════════════════════
function TallerApp({user, onLogout}){
  const [tab,setTab]=useState("dashboard");
  const [requests,setRequests]=useState(TALLER_REQUESTS);
  const [selectedReq,setSelectedReq]=useState(null);
  const [quoteAmount,setQuoteAmount]=useState("");
  const [cartParts,setCartParts]=useState([]);

  const updateReq=(id,data)=>setRequests(r=>r.map(req=>req.id===id?{...req,...data}:req));
  const pending=requests.filter(r=>r.status==="pending");
  const active=requests.filter(r=>["confirmed","in_progress","quoted"].includes(r.status));
  const completed=requests.filter(r=>r.status==="completed");

  const renderDashboard=()=>(
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#0D1A0D,#0D0D1A)",padding:"20px 16px 16px"}}>
        <div style={{...S.small,marginBottom:4,letterSpacing:1}}>PANEL DE TALLER</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:24,color:"#F1F5F9",marginBottom:2}}>{user.tallerName||"Mi Taller"}</div>
        <div style={{display:"flex",gap:6}}><Badge cert="certificado"/><span style={S.badge("#1E3A5F","#93C5FD")}>CÚCUTA</span></div>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
          {[[pending.length,"Nuevas","#F59E0B","🔔"],[active.length,"Activas","#60A5FA","⚙️"],[completed.length,"Completadas","#10B981","✅"]].map(([v,l,c,icon])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
              <div style={{color:c,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:24}}>{v}</div>
              <div style={{...S.small,fontSize:10}}>{l}</div>
            </div>
          ))}
        </div>
        {/* New requests */}
        {pending.length>0&&<>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"#F59E0B",letterSpacing:1,marginBottom:8}}>🔔 SOLICITUDES NUEVAS ({pending.length})</div>
          {pending.map(r=>(
            <div key={r.id} style={{...S.card,borderColor:"rgba(245,158,11,0.25)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{r.userName}</div>
                  <div style={{...S.small}}>{r.moto}</div>
                  <div style={{...S.small,marginTop:2}}>📅 {r.date} a las {r.time}</div>
                  <div style={{color:"#F97316",fontWeight:700,fontSize:13,marginTop:2}}>{svc(r.service).icon} {svc(r.service).name}</div>
                </div>
                <button onClick={()=>{setSelectedReq(r);setTab("quoteDetail");}} style={{...S.btnOutline,padding:"6px 10px",fontSize:12}}>Ver</button>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>updateReq(r.id,{status:"confirmed"})} style={{...S.btn,flex:1,padding:"8px",fontSize:13}}>✓ Aceptar</button>
                <button onClick={()=>updateReq(r.id,{status:"cancelled"})} style={{...S.btnGhost,flex:1,padding:"8px",fontSize:13}}>✗ Rechazar</button>
              </div>
            </div>
          ))}
        </>}
        {/* Active */}
        {active.length>0&&<>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"#60A5FA",letterSpacing:1,marginBottom:8,marginTop:8}}>⚙️ SERVICIOS ACTIVOS</div>
          {active.map(r=>(
            <div key={r.id} style={{...S.card,cursor:"pointer"}} onClick={()=>{setSelectedReq(r);setTab("quoteDetail");}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{r.userName}</div>
                  <div style={{...S.small}}>{r.moto} · {svc(r.service).name}</div>
                  <div style={{...S.small,fontSize:11}}>{r.date} {r.time}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <StatusBadge status={r.status}/>
                  {r.quote&&<div style={{color:"#F97316",fontWeight:700,fontSize:14,marginTop:4}}>{fmt(r.quote)}</div>}
                </div>
              </div>
            </div>
          ))}
        </>}
        {/* Revenue */}
        <div style={{...S.card,marginTop:8,background:"rgba(249,115,22,0.06)",borderColor:"rgba(249,115,22,0.2)"}}>
          <div style={{...S.small,marginBottom:4,color:"#F97316",fontWeight:700}}>💰 INGRESOS HOY</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,color:"#F97316"}}>{fmt(620000)}</div>
          <div style={{...S.small,fontSize:11,marginTop:2}}>3 servicios completados · Rating promedio: ⭐ 4.7</div>
        </div>
      </div>
    </div>
  );

  const renderAgenda=()=>(
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={S.header}><div style={{...S.h1,fontSize:20}}>📅 Agenda</div></div>
      <div style={{padding:16}}>
        {requests.filter(r=>!["cancelled"].includes(r.status)).map(r=>(
          <div key={r.id} style={{...S.card,cursor:"pointer"}} onClick={()=>{setSelectedReq(r);setTab("quoteDetail");}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{color:"#64748B",fontSize:11,fontWeight:700,letterSpacing:1}}>{r.date} · {r.time}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,marginTop:2}}>{r.userName}</div>
                <div style={{...S.small}}>{r.moto}</div>
                <div style={{color:"#F97316",fontSize:13,marginTop:3}}>{svc(r.service).icon} {svc(r.service).name}</div>
              </div>
              <StatusBadge status={r.status}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPartes=()=>{
    const total=cartParts.reduce((s,p)=>s+p.price,0);
    return (
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={S.header}>
          <div style={{...S.h1,fontSize:20}}>🔩 Repuestos</div>
          {cartParts.length>0&&<div style={{background:"#F97316",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{cartParts.length}</div>}
        </div>
        <div style={{padding:16}}>
          <div style={{...S.card,background:"rgba(16,185,129,0.06)",borderColor:"rgba(16,185,129,0.2)",marginBottom:16}}>
            <div style={{color:"#10B981",fontWeight:700,fontSize:12,marginBottom:4}}>✓ ACCESO A DISTRIBUIDOR OFICIAL</div>
            <div style={{...S.small}}>Precios mayoristas. Repuestos certificados con trazabilidad para el cliente.</div>
          </div>
          {PARTS_CATALOG.map(p=>(
            <div key={p.id} style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:4,marginBottom:4}}>
                    {p.certified&&<span style={S.badge("#065F46","#6EE7B7")}>ORIGINAL</span>}
                    <span style={{...S.small,fontSize:10}}>SKU: {p.sku}</span>
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"#F1F5F9"}}>{p.name}</div>
                  <div style={{...S.small,marginTop:2}}>{p.brand} · Stock: {p.stock} uds</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{color:"#F97316",fontWeight:900,fontSize:16,fontFamily:"'Barlow Condensed',sans-serif"}}>{fmt(p.price)}</div>
                  <button onClick={()=>cartParts.find(c=>c.id===p.id)?setCartParts(cp=>cp.filter(c=>c.id!==p.id)):setCartParts(cp=>[...cp,p])} style={{...S.badge(cartParts.find(c=>c.id===p.id)?"rgba(16,185,129,0.2)":"rgba(249,115,22,0.15)",cartParts.find(c=>c.id===p.id)?"#10B981":"#F97316"),padding:"4px 10px",cursor:"pointer",marginTop:4,border:"none"}}>
                    {cartParts.find(c=>c.id===p.id)?"✓ Agregado":"+ Pedir"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cartParts.length>0&&(
            <div style={{position:"sticky",bottom:72,background:"linear-gradient(transparent,#07070F 30%)",paddingTop:20}}>
              <button onClick={()=>alert(`Pedido enviado: ${cartParts.length} repuestos · Total: ${fmt(total)}`)} style={S.btn}>
                📦 Pedir {cartParts.length} repuesto{cartParts.length>1?"s":""} · {fmt(total)}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuoteDetail=()=>{
    if(!selectedReq) return null;
    const r=selectedReq;
    return (
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={S.header}>
          <button onClick={()=>{setSelectedReq(null);setTab("dashboard");}} style={{...S.btnGhost,padding:"6px 12px",fontSize:12}}>← Volver</button>
          <div style={{flex:1,...S.h2,fontSize:16}}>Solicitud de servicio</div>
        </div>
        <div style={{padding:16}}>
          <div style={S.card}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <Avatar name={r.userName}/>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18}}>{r.userName}</div>
                <div style={{...S.small}}>📞 {r.phone}</div>
              </div>
              <StatusBadge status={r.status}/>
            </div>
            <Divider/>
            {[["Moto",r.moto],["Servicio",`${svc(r.service).icon} ${svc(r.service).name}`],["Fecha",r.date+" a las "+r.time]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{...S.small}}>{k}</span>
                <span style={{color:"#E2E8F0",fontSize:13,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          {r.status==="pending"&&(
            <div style={S.card}>
              <div style={{...S.label,marginBottom:8}}>ENVIAR COTIZACIÓN</div>
              <input value={quoteAmount} onChange={e=>setQuoteAmount(e.target.value)} type="number" placeholder="Valor total COP (ej: 95000)" style={{...S.input,marginBottom:12}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{updateReq(r.id,{status:"quoted",quote:parseInt(quoteAmount)});setSelectedReq(null);setTab("dashboard");}} style={{...S.btn,flex:2,padding:"10px"}}>📤 Enviar cotización</button>
                <button onClick={()=>{updateReq(r.id,{status:"confirmed"});setSelectedReq(null);setTab("dashboard");}} style={{...S.btnOutline,flex:1,padding:"10px"}}>Aceptar directo</button>
              </div>
            </div>
          )}
          {r.status==="confirmed"&&(
            <button onClick={()=>{updateReq(r.id,{status:"in_progress"});setSelectedReq(null);setTab("dashboard");}} style={{...S.btn,marginTop:4}}>🔧 Iniciar servicio</button>
          )}
          {r.status==="in_progress"&&(
            <button onClick={()=>{updateReq(r.id,{status:"completed"});setSelectedReq(null);setTab("dashboard");}} style={{...S.btn,marginTop:4,background:"#10B981"}}>✅ Marcar como completado</button>
          )}
        </div>
      </div>
    );
  };

  const tabItems=[["dashboard","🏠","Inicio"],["agenda","📅","Agenda"],["partes","🔩","Repuestos"],["perfil","📊","Métricas"]];
  return (
    <div style={{...S.app,display:"flex",flexDirection:"column"}}>
      {tab==="dashboard"&&renderDashboard()}
      {tab==="agenda"&&renderAgenda()}
      {tab==="partes"&&renderPartes()}
      {tab==="quoteDetail"&&renderQuoteDetail()}
      {tab==="perfil"&&(
        <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
          <div style={S.header}><div style={{...S.h1,fontSize:20}}>📊 Métricas</div></div>
          <div style={{padding:16}}>
            {[["Servicios este mes","47","↑ 12%","#10B981"],["Ingreso del mes",fmt(4230000),"↑ 8%","#F97316"],["Rating promedio","4.7 ⭐","↑ 0.2","#F59E0B"],["Ticket promedio",fmt(89000),"+5k","#60A5FA"],["Tasa de retención","68%","↑ 3%","#A78BFA"],["Repuestos pedidos","23 uds","-","#94A3B8"]].map(([l,v,trend,c])=>(
              <div key={l} style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{...S.small}}>{l}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:c}}>{v}</div></div>
                <span style={{...S.badge("rgba(16,185,129,0.1)","#10B981"),fontSize:11}}>{trend}</span>
              </div>
            ))}
            <button onClick={onLogout} style={{...S.btnGhost,width:"100%",marginTop:8}}>Cerrar sesión</button>
          </div>
        </div>
      )}
      {tab!=="quoteDetail"&&<div style={S.tabBar}>
        {tabItems.map(([id,icon,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={S.tab(tab===id)}>
            <span style={{fontSize:20}}>{icon}</span>
            <span style={{fontSize:10,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>{label}</span>
          </button>
        ))}
      </div>}
    </div>
  );
}

// ═══════════════════════ ADMIN APP ═══════════════════════
function AdminApp({onLogout}){
  const [tab,setTab]=useState("dashboard");
  const workshops=[
    {id:1,name:"Honda Motos Cúcuta",status:"active",cert:"elite",services:345,revenue:31050000,rating:4.7},
    {id:2,name:"Yamaha Meyer Motos",status:"active",cert:"elite",services:412,revenue:36680000,rating:4.8},
    {id:3,name:"MotoGarage Express",status:"pending",cert:null,services:0,revenue:0,rating:null},
    {id:4,name:"Taller Rápido Km0",status:"suspended",cert:"verificado",services:23,revenue:1870000,rating:2.8},
  ];
  return (
    <div style={{...S.app,display:"flex",flexDirection:"column"}}>
      {tab==="dashboard"&&(
        <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
          <div style={{background:"linear-gradient(135deg,#0D1A2D,#07070F)",padding:"20px 16px"}}>
            <div style={{...S.small,marginBottom:4,letterSpacing:2}}>PANEL ADMINISTRADOR</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,color:"#F1F5F9"}}>MotoService Admin</div>
            <div style={{...S.small}}>Cúcuta · Bucaramanga · Valledupar</div>
          </div>
          <div style={{padding:"16px 16px 0"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[["Talleres activos","8","🏪","#10B981"],["Servicios/mes","623","🔧","#F97316"],["Ingresos/mes",fmt(56070000),"💰","#F59E0B"],["Usuarios activos","1.847","👥","#60A5FA"]].map(([l,v,icon,c])=>(
                <div key={l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"14px 12px"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
                  <div style={{color:c,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22}}>{v}</div>
                  <div style={{...S.small,fontSize:11}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"#94A3B8",letterSpacing:1,marginBottom:10}}>TALLERES</div>
            {workshops.map(w=>(
              <div key={w.id} style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",gap:4,marginBottom:4}}>
                      {w.cert&&<Badge cert={w.cert}/>}
                      <span style={S.badge(w.status==="active"?"rgba(16,185,129,0.15)":w.status==="pending"?"rgba(245,158,11,0.15)":"rgba(239,68,68,0.15)",w.status==="active"?"#10B981":w.status==="pending"?"#F59E0B":"#EF4444")}>{w.status.toUpperCase()}</span>
                    </div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{w.name}</div>
                    {w.rating&&<div style={{...S.small,marginTop:2}}>⭐ {w.rating} · {w.services} servicios</div>}
                    {w.revenue>0&&<div style={{color:"#F97316",fontSize:13,fontWeight:700,marginTop:2}}>{fmt(w.revenue)}</div>}
                  </div>
                  {w.status==="pending"&&<button style={{...S.btn,width:"auto",padding:"6px 12px",fontSize:12,background:"#10B981"}}>Certificar</button>}
                  {w.status==="suspended"&&<button style={{...S.btnOutline,fontSize:12,padding:"6px 12px"}}>Revisar</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="talleres"&&(
        <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
          <div style={S.header}><div style={{...S.h1,fontSize:20}}>🏪 Certificación</div></div>
          <div style={{padding:16}}>
            <div style={{...S.card,background:"rgba(245,158,11,0.08)",borderColor:"rgba(245,158,11,0.2)",marginBottom:16}}>
              <div style={{color:"#F59E0B",fontWeight:700,marginBottom:4}}>⏳ SOLICITUD PENDIENTE</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18,marginBottom:4}}>MotoGarage Express</div>
              <div style={{...S.small,marginBottom:10}}>Cúcuta, Av. Demetrio Mendoza #34-21 · Solicitado: 28 Feb 2025</div>
              {[["NIT","900.234.567-1"],["Mecánico principal","Pedro Castellanos — 7 años exp"],["Servicios solicitados","Aceite, frenos, carburación, eléctrico"],["Herramientas","Escáner OBD ✓, Torquímetro ✓, Elevador ✓"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{...S.small,width:80,flexShrink:0}}>{k}</span>
                  <span style={{color:"#E2E8F0",fontSize:13}}>{v}</span>
                </div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:12}}>
                <button style={{...S.btn,flex:2,padding:"10px",background:"#10B981"}}>✓ Aprobar Verificado</button>
                <button style={{...S.btnGhost,flex:1,padding:"10px"}}>✗ Rechazar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab==="reportes"&&(
        <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
          <div style={S.header}><div style={{...S.h1,fontSize:20}}>📈 Reportes</div></div>
          <div style={{padding:16}}>
            {[["Servicio más solicitado","Cambio de aceite (34%)"],["Taller con mayor rating","Yamaha Meyer (4.8)"],["Ciudad líder","Cúcuta (67% del volumen)"],["Ticket promedio plataforma",fmt(89000)],["Repuestos vendidos/mes","847 unidades"],["Comisiones generadas",fmt(5600000)],["NPS plataforma","58 (Promotor)"],["Talleres en riesgo","1 (rating < 3.5)"]].map(([k,v])=>(
              <div key={k} style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...S.small,flex:1}}>{k}</span>
                <span style={{color:"#F97316",fontWeight:700,fontSize:14,textAlign:"right"}}>{v}</span>
              </div>
            ))}
            <button onClick={onLogout} style={{...S.btnGhost,width:"100%",marginTop:8}}>Cerrar sesión</button>
          </div>
        </div>
      )}
      <div style={S.tabBar}>
        {[["dashboard","📊","Resumen"],["talleres","🏪","Talleres"],["reportes","📈","Reportes"]].map(([id,icon,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={S.tab(tab===id)}>
            <span style={{fontSize:20}}>{icon}</span>
            <span style={{fontSize:10,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════ AUTH ═══════════════════════
function AuthScreen({onLogin}){
  const [mode,setMode]=useState("login");
  const [role,setRole]=useState("motociclista");
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const [otp,setOtp]=useState("");
  const [otpSent,setOtpSent]=useState(false);
  const [loading,setLoading]=useState(false);

  const demoUsers={
    motociclista:{name:"Alejandro Durán",phone:"3151234567",role:"motociclista"},
    taller:{name:"Mecánico García",phone:"3162345678",role:"taller",tallerName:"Honda Motos Cúcuta"},
    admin:{name:"Admin MotoService",phone:"3173456789",role:"admin"},
  };

  const handleSendOtp=()=>{if(phone.length>=10){setOtpSent(true);setLoading(false);}};
  const handleVerify=()=>{if(otp==="1234"||otp.length>3){setLoading(true);setTimeout(()=>{onLogin(mode==="demo"?demoUsers[role]:{name:name||"Usuario",phone,role});setLoading(false);},800);}};

  return (
    <div style={{...S.app,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:24,background:"linear-gradient(180deg,#0D0D1A 0%,#07070F 100%)"}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:56,marginBottom:8}}>🏍️</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:40,color:"#F97316",letterSpacing:1}}>MOTOSERVICE</div>
          <div style={{color:"#64748B",fontSize:13,letterSpacing:3,marginTop:4}}>COLOMBIA · RED CERTIFICADA</div>
        </div>

        {/* Demo mode */}
        <div style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.3)",borderRadius:12,padding:16,marginBottom:20}}>
          <div style={{color:"#A78BFA",fontWeight:700,fontSize:13,marginBottom:10}}>⚡ DEMO RÁPIDO — Elige tu rol</div>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {["motociclista","taller","admin"].map(r=>(
              <button key={r} onClick={()=>setRole(r)} style={{flex:1,background:role===r?"rgba(249,115,22,0.2)":"rgba(255,255,255,0.04)",border:role===r?"1px solid #F97316":"1px solid rgba(255,255,255,0.07)",color:role===r?"#F97316":"#64748B",borderRadius:8,padding:"8px 4px",cursor:"pointer",fontSize:11,fontWeight:700,textTransform:"uppercase"}}>
                {r==="motociclista"?"🏍️ Moto":r==="taller"?"🔧 Taller":"⚙️ Admin"}
              </button>
            ))}
          </div>
          <button onClick={()=>onLogin(demoUsers[role])} style={S.btn}>Entrar como {role==="motociclista"?"Motociclista":role==="taller"?"Taller Afiliado":"Administrador"}</button>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
          <span style={{...S.small,fontSize:11}}>o inicia sesión real</span>
          <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
        </div>

        {!otpSent?(
          <>
            <label style={S.label}>Número de celular</label>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <div style={{...S.input,width:60,padding:"11px 10px",textAlign:"center",color:"#94A3B8"}}>🇨🇴</div>
              <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="3xx xxx xxxx" maxLength={10} style={{...S.input,flex:1}}/>
            </div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre completo" style={{...S.input,marginBottom:16}}/>
            <button onClick={handleSendOtp} style={{...S.btn,opacity:phone.length>=10?1:0.4}}>Enviar código SMS</button>
          </>
        ):(
          <>
            <div style={{...S.card,textAlign:"center",marginBottom:16}}>
              <div style={{color:"#10B981",fontWeight:700,marginBottom:4}}>✓ Código enviado</div>
              <div style={{...S.small}}>Ingresa el código de 4 dígitos enviado a +57 {phone}</div>
              <div style={{...S.small,fontSize:11,color:"#F97316",marginTop:4}}>Demo: usa "1234"</div>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
              {[0,1,2,3].map(i=>(
                <input key={i} maxLength={1} style={{...S.input,width:56,height:56,textAlign:"center",fontSize:24,fontWeight:700,padding:0}} value={otp[i]||""} onChange={e=>{const v=otp.split("");v[i]=e.target.value;setOtp(v.join(""));}}/>
              ))}
            </div>
            <button onClick={handleVerify} style={{...S.btn,opacity:otp.length>=4?1:0.4}}>
              {loading?"Verificando...":"Verificar y entrar →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════ MOTOCICLISTA APP ═══════════════════════
function MotoApp({user, onLogout}){
  const [screen, setScreen] = useState("home");
  const [screenParams, setScreenParams] = useState({});
  const [moto, setMoto] = useState({brand:"Honda",model:"CB190R",year:"2023",plate:"KGF456",km:8750,color:"Rojo"});
  const [bookings, setBookings] = useState(MOCK_HISTORY);
  const navigate = (sc, params={}) => { setScreen(sc); setScreenParams(params); };
  const addBooking = (b) => setBookings(prev=>[...prev,{id:"b"+(prev.length+1),...b}]);

  const tabs=[["home","🏠","Inicio"],["search","🔍","Buscar"],["moto","🏍️","Mi Moto"],["history","📋","Historial"]];

  return (
    <div style={{...S.app,display:"flex",flexDirection:"column"}}>
      {screen==="home"&&<HomeScreen user={user} moto={moto} bookings={bookings} navigate={navigate}/>}
      {screen==="search"&&<SearchScreen navigate={navigate}/>}
      {(screen==="tallerDetail"&&screenParams.taller)&&<TallerDetailScreen t={screenParams.taller} navigate={navigate}/>}
      {screen==="booking"&&<BookingScreen params={screenParams} navigate={navigate} addBooking={addBooking}/>}
      {screen==="moto"&&<MotoScreen moto={moto} setMoto={setMoto} navigate={navigate} history={bookings}/>}
      {screen==="addMoto"&&<MotoScreen moto={null} setMoto={(m)=>{setMoto(m);navigate("moto");}} navigate={navigate} history={bookings}/>}
      {screen==="history"&&<HistoryScreen navigate={navigate}/>}
      {!["tallerDetail","booking"].includes(screen)&&(
        <div style={S.tabBar}>
          {tabs.map(([id,icon,label])=>(
            <button key={id} onClick={()=>navigate(id)} style={S.tab(screen===id)}>
              <span style={{fontSize:20}}>{icon}</span>
              <span style={{fontSize:10,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>{label}</span>
            </button>
          ))}
          <button onClick={onLogout} style={{...S.tab(false),flex:0.6}}>
            <span style={{fontSize:18}}>⏻</span>
            <span style={{fontSize:9,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>Salir</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════ ROOT ═══════════════════════
export default function App(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  },[]);
  if(!user) return <AuthScreen onLogin={setUser}/>;
  if(user.role==="taller") return <TallerApp user={user} onLogout={()=>setUser(null)}/>;
  if(user.role==="admin") return <AdminApp onLogout={()=>setUser(null)}/>;
  return <MotoApp user={user} onLogout={()=>setUser(null)}/>;
}
