import { useState,useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({children})=>{
    const [user, setUser ]=useState(null);
    const [admin, setAdmin] = useState(null);
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [productArray, setProductArray] = useState([]);
    const [tableBooking, setTableBooking] = useState([]);
    const [orderBooking, setOrderBooking] = useState([]);
    return(
        <>
        {/* In your code, there is an issue with how you are destructuring the Children prop.
         In JSX, props are case-sensitive, so it should be {children} instead of {Children}. */}
        <UserContext.Provider value={{user, setUser, feedbackArray, setFeedbackArray, productArray, setProductArray,tableBooking, setTableBooking, orderBooking, setOrderBooking, admin, setAdmin}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export default UserContextProvider;