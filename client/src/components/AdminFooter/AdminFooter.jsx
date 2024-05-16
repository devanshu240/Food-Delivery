// AdminFooter.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import './AdminFooter.css';
import AdminBookTable from '../AdminBookTable/AdminBookTable';
import AdminBookOrder from '../AdminBookOrder/AdminBookOrder';
import UserContext from '../../context/UserContext';

const AdminFooter = () => {
  const {tableBooking, setTableBooking,orderBooking, setOrderBooking} = useContext(UserContext);
  const [reloadTable, setReloadTable] = useState(true);
  const [reloadOrders, setReloadOrders] = useState(true);

  useEffect(() => {
    console.log("hit");
    axios.get("/api/admin/table/booking")
      .then((res) => {
        setTableBooking(res.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }, [reloadTable])

  useEffect(()=>{
    axios.get("/api/admin/order/booking")
    .then((res)=>{
      setOrderBooking(res.data);
    })
    .catch((e)=>{
      console.log(e);
    })
  },[reloadOrders]);

  return (
    <div className="admin-footer">
      <div className="table-booking">
        <h2>Table Booking</h2>
        <button onClick={() => { setReloadTable(!reloadTable) }}>Reload</button>
        {tableBooking.map((ele, index) => {
          console.log(typeof (ele));
          if(ele.Status=="Pending"){
            return <AdminBookTable Name={ele.Name} Email={ele.Email} Phone={ele.Phone} Time={ele.Time} Duration={ele.Duration} id={ele._id}/>
          }
        })}
        {/* Add more horizontal cards for table bookings here */}
      </div>
      <div className="orders">
        <h2>Orders</h2>
        <button onClick={() => { setReloadOrders(!reloadOrders) }}>Reload</button>
        {orderBooking.map((ele)=>{
          return <AdminBookOrder Name={ele.Name} Qnty={ele.Qnty} TableNo={ele.TableNo} Id={ele._id} />
        })}
      </div>
    </div>
  );
};

export default AdminFooter;
