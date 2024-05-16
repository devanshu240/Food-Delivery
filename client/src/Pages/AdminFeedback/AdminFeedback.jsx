import { useContext, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import UserContext from "../../context/UserContext";
import axios from "axios"
import "./AdminFeedback.css";

const AdminFeedback = () =>{
    const {feedbackArray,setFeedbackArray} = useContext(UserContext);
    
    useEffect(()=>{
        axios.get("/api/feedback/list")
        .then((res)=>{setFeedbackArray(res.data)})
        .catch((e)=>{console.log(e)})
    },[])

    return(
        <>
        <AdminNavbar/>
        <div className="AdminFeedback-Container">
            <div className="AdminFeedback-Feedback-Container">
                {feedbackArray.map((ele,i)=>{
                    return <FeedbackCard key={i} name={ele.Name} feedback={ele.Feedback} experience={ele.Experience} />
                })}
            </div>
        </div>
        </>
    )
}

export default AdminFeedback;