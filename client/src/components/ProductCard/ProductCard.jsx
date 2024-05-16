// ProductCard.js
import React, { useContext, useState } from 'react';
import axios from "axios";
import './ProductCard.css';
import UserContext from '../../context/UserContext';
import Model from "react-modal"

const ProductCard = ({ name, price, description, type, img, id, onUpdate }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedType, setUpdatedType] = useState(type);

  const { productArray, setProductArray } = useContext(UserContext);

  const handleUpdateFormSubmit = async(e) => {
    e.preventDefault();
    const data={
      Name:updatedName,
      Price:updatedPrice,
      Type:updatedType,
      Description:updatedDescription
    }
    const res=await axios.post("/api/admin/product/update/"+id,data);
    console.log(res);
    const newArr = productArray;
    newArr.forEach((ele)=>{
      if(ele._id===id){
        ele.name=updatedName;
        ele.price=updatedPrice;
        ele.type=updatedType;
        ele.desc=updatedDescription;
      }
    })
    setProductArray([...newArr])
    console.log('Updated Data:', { updatedName, updatedPrice, updatedDescription, updatedType, name ,id });
    setUpdatedName(name);
    setUpdatedPrice(price);
    setUpdatedDescription(description);
    setUpdatedType(type);
    setShowUpdateForm(false);
  };

  const handleDeleteButton = async (e) => {
    e.preventDefault();
    const data = {
      name: img
    }
    const newArr = productArray;
    newArr.splice(newArr.findIndex(ele => ele._id === id), 1);
    const res = await axios.post("/api/admin/product/" + id, data);
    console.log(newArr)
    setProductArray([...newArr]);
    console.log(productArray)
  }

  return (
    <div className="product-card">
      <div className="product-info">
        <img src={"/api/upload/" + img} alt="Food Pic" className="food-pic" />
        <div>
          <h3>{name}</h3>
          <p><strong>Price: </strong> Rs {price}</p>
          <p><strong>Type: </strong> {type}</p>
          <p><strong>Desc: </strong>{description}</p>
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={handleDeleteButton}>Delete</button>
        <button onClick={() => setShowUpdateForm(!showUpdateForm)}>Update</button>
      </div>
      <Model isOpen={showUpdateForm} onRequestClose={() => setShowUpdateForm(false)} style={{
        overlay: {
          background: "light grey",
          opacity: ""
        },
        content: {
          width: "500px",
          height: "400px",
          // position: "fixed",
          top: "15%",
          left: "35%",
          backgroundColor: "white",
          borderRadius: "8px",
          // padding: "20px",
        }
      }}>
        <div className="update-form">
          <h3>Update Product</h3>
          <form onSubmit={handleUpdateFormSubmit}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              placeholder="Price"
              required
            />
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Description"
              required
            ></textarea>
            <select
              value={updatedType}
              onChange={(e) => setUpdatedType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
      </Model>
    </div >
  );
};

export default ProductCard;
