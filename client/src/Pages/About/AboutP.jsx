import "./AboutP.css";
import About from "../../components/About/About";
import Chefs from "../../components/Chefs/Chefs";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const AboutP = () =>{
    return(
        <>
        <Navbar/>
        <About/>
        <Chefs/>
        <Footer/>
        </>
    )
}
export default AboutP;