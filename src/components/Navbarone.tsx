import {Globe, Map, PhoneCall } from "lucide-react"

function Navbar (){
    return (
        <>
    <section >
      <div className="newtopbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <PhoneCall size={14} color="white" />
          </div>
          <div> 
        <p style={{fontWeight:"bold", }}><span style={{color:"goldenrod"}}>Free call</span> +234 906 419 8423 </p>
        <p style={{fontSize:"8px", color:"grey"}}>Call us now 24/7 Customer support</p> 
        </div>
        </div>
         
         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <Map size={14} color="white" />
          </div>
        <div>
        <p style={{fontWeight:"bold", }}>Our Location</p>
        <p style={{fontSize:"8px", color:"grey"}}>Lekki, Lagos State, Nigeria</p>
        </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <Globe size={14} color="white" />
          </div>
        <div>
        <p style={{fontWeight:"bold", }}>Connect with us</p>
        <p style={{fontSize:"8px", color:"grey"}}>Twitter Instagram Whatsapp </p>
        </div>
        </div>
      </div>

    </section>
        </>
    )
}

export default Navbar