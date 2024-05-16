import axios from "axios"
import { useContext } from "react"
import UserContext from "../../context/UserContext"

const AdminBookOrder = ({ Name, Qnty, TableNo, Id }) => {
    const { orderBooking, setOrderBooking } = useContext(UserContext);
    const handleAcceptButton = async () => {
        const res = await axios.delete(`/api/admin/delete/order/${Id}`);
        if (res.data.success === false) {
            alert(`${res.data.msg}`);
        }
        else {
            const newArr = orderBooking;
            newArr.splice(newArr.findIndex(ele => ele._id === Id), 1);
            setOrderBooking([...newArr]);
        }
    }
    return (
        <>
            <div className="horizontal-card">
                <div className="info">
                    <p>Name:{Name}</p>
                    <p>Qnty:{Qnty}</p>
                    <p>TableNo:{TableNo}</p>
                </div>
                <div className="buttons">
                    <button className="accept" onClick={handleAcceptButton}>Accept</button>
                </div>
            </div>
        </>
    )
}

export default AdminBookOrder;