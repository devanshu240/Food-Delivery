import React, { useContext, useEffect } from 'react';
import './BookedTable.css';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

const BookedTable = () => {
    const { tableBooking, setTableBooking } = useContext(UserContext);
    const handleLeaveButton = async (TableNo, id) => {
        try {
            const res = await axios.post("/api/admin/reject/table/booking/" + id, { role: "admin" });
            if (res.status === 200) {
                const newArr = tableBooking;
                newArr.splice(newArr.findIndex(ele => ele._id === id), 1);
                setTableBooking([...newArr]);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        axios.get("/api/admin/table/booking")
            .then((res) => {
                setTableBooking(res.data);
                console.log(res.data);
                console.log(...res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    return (
        <>
            <AdminNavbar />
            <div className="booked-table-container">
                <div className='booked-table-left-side'>
                    {Array.from({ length: 20 }, (_, index) => (
                        <div className={`booked-table-animation ${tableBooking && tableBooking.some(item => item.TableNo === index + 1 && item.Status === "Resolve") ? 'booked-table-animation-green' : ''}`} key={index + 1}>{index + 1}</div>
                    ))}
                </div>
                <div className='booked-table-right-side'>
                    {tableBooking.map((ele) => {
                        if (ele.Status == "Resolve") {
                            return <>
                                <div className="booked-table-card">
                                    <div className="booked-table-info">
                                        <p>Table No: {ele.TableNo}</p>
                                        <p>Name: {ele.Name}</p>
                                        <p>Persons: {ele.Persons}</p>
                                    </div>
                                    <div className="booked-table-buttons">
                                        <button className="reject" onClick={() => { handleLeaveButton(ele.TableNo, ele._id) }}>Leave</button>
                                    </div>
                                </div>
                            </>
                        } 
                    })}
                </div>
            </div>
        </>
    );
}

export default BookedTable;
