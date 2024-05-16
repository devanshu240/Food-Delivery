import React, { useContext } from 'react';
import './AdminMiddle.css';
import UserContext from '../../context/UserContext';

const AdminMiddle = () => {
  const { tableBooking, setTableBooking } = useContext(UserContext);
  return (
    <div className="admin-middle">
      <div className="row">
        <div className="card">
          <h3>Today's Total Orders</h3>
          <p>Numeric Value 1</p>
        </div>
        <div className="card">
          <h3>Current Total Booking</h3>
          <p>Current Booking <b>{tableBooking.length}</b></p>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <h3>Empty Tables</h3>
          <p>Numeric Value <b>{20-tableBooking.length}</b></p>
        </div>
        <div className="card">
          <h3>Today's Total Money</h3>
          <p>Numeric Value 4</p>
        </div>
      </div>
    </div>
  );
};

export default AdminMiddle;
