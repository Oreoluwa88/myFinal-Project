import Categories from "../components/Categories";
import Featured from "../components/Featured";
import Featuredabout from "../components/Featuredabout";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function LandingPage () {
  return (
    <>
    <div>
    <Hero/>
    <Categories/>
    <Featured/>
    <Featuredabout/>
    <Footer />
    </div>
    </>
  )
}

export default LandingPage
