import About from "../../components/About/About";
import BookTable from "../../components/BookTable/BookTable";
import Chefs from "../../components/Chefs/Chefs";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const Home = ()=>{
    return(
        <>
        <Navbar/>
        <Header/>
        <About/>
        <Chefs/>
        <BookTable/>
        <Footer/>
        </>
    )
}

export default Home;