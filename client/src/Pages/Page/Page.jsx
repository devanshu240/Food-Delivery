import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import AboutP from "../About/AboutP";
import ContactUs from "../ContactUs/ContactUs";
import FeedbackP from "../FeedbackP/FeedbackP";
import Admin from "../Admin/Admin";
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import MenuPage from "../Menu/MenuPage";
import AdminFeedback from "../AdminFeedback/AdminFeedback";
import AdminProductPage from "../AdminProductPage/AdminProductPage";
import BookedTable from "../BookedTable/BookedTable";

const Page = () =>{
    const {user,admin} = useContext(UserContext);
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={user?<Home/>:<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/About" element={user?<AboutP/>:<Login/>}/>
            <Route path='/contact' element={user?<ContactUs/>:<Login/>}/>
            <Route path="/feedback" element={user?<FeedbackP/>:<Login/>}/>
            <Route path="/Menu" element={user?<MenuPage/>:<Login/>} />
            <Route path="/admin" element={admin?<Admin/>:<Login/>} />
            <Route path="/admin/feedback" element={admin?<AdminFeedback/>:<Login/>} />
            <Route path="/admin/products" element={admin?<AdminProductPage/>:<Login/>} />
            <Route path="/admin/Booked/Table" element={admin?<BookedTable/>:<Login/>} />
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default Page;