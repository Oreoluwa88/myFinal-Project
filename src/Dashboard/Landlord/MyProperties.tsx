import { useContext } from "react";
import PropertyCard from "../../Features/PropertyCards";
import { PropertyContext } from "../../pages/PropertyContext";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";

function MyProperties() {
  const { properties, deleteProperty } = useContext(PropertyContext);

  return (
    <>
      <Navbarone />

      <div className="about-hero myproperties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} />
              Properties
              <ChevronRight size={12} />
            </p>
            <h1>Properties</h1>
          </div>
        </div>
      </div>

      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "-20px",
          }}
        >
          My Properties
        </h2>

        {properties.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No properties yet
          </p>
        )}

        <div className="property-cont">
          <div className="property-grid">
            {properties.map((prop: any) => (
              <div key={prop.id}>
                <PropertyCard {...prop} />

                <button onClick={() => deleteProperty(prop.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyProperties;