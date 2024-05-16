// MenuPage.js
import React, { useContext, useEffect, useState } from 'react';
import './MenuPage.css';
import MenuCard from '../../components/MenuCard/MenuCard';
import Navbar from '../../components/Navbar/Navbar';
import UserContext from '../../context/UserContext';
import axios from "axios"

const MenuPage = () => {
  const [type, setType] = useState("");
  const { productArray, setProductArray } = useContext(UserContext);
  const [search, setSearch] = useState();
  useEffect(() => {
    axios.get("/api/admin/product/list")
      .then((res) => { setProductArray(res.data) })
      .catch((e) => { console.log(e) })
  }, [])
  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearch(value);
  }
  return (
    <>
      <Navbar />
      <div className="menu-container">
        <div className="menu-header">
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <select value={type} onChange={(e)=>{setType(e.target.value)}}>
            <option value="">Select Type</option>
            <option value="Snacks">Snacks</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Desserts">Desserts</option>
            <option value="beverages">beverages</option>
            <option value="Thali">Thali</option>
            <option value="South Indian">South Indian</option>
          </select>
        </div>
        <div className="menu-cards">
          {productArray.map((menu, index) => {
            if (search || type) {
              if (search && type) {
                if (menu.name.toLowerCase().includes(search.toLowerCase()) && menu.type.toLowerCase()===type.toLowerCase()) {
                  return <MenuCard
                    key={index}
                    foodName={menu.name}
                    price={menu.price}
                    description={menu.desc}
                    imageUrl={menu.Img}
                    type={menu.type}
                    id={menu._id}
                    list={menu.feed}
                  />
                }
              }
              else if(search){
                if (menu.name.toLowerCase().includes(search.toLowerCase())) {
                  return <MenuCard
                    key={index}
                    foodName={menu.name}
                    price={menu.price}
                    description={menu.desc}
                    imageUrl={menu.Img}
                    type={menu.type}
                    id={menu._id}
                    list={menu.feed}
                  />
                }
              }
              else if(type){
                if (menu.type.toLowerCase()===type.toLowerCase()) {
                  return <MenuCard
                    key={index}
                    foodName={menu.name}
                    price={menu.price}
                    description={menu.desc}
                    imageUrl={menu.Img}
                    type={menu.type}
                    id={menu._id}
                    list={menu.feed}
                  />
                }
              }
            }
            else {
              return <MenuCard
                key={index}
                foodName={menu.name}
                price={menu.price}
                description={menu.desc}
                imageUrl={menu.Img}
                type={menu.type}
                id={menu._id}
                list={menu.feed}
              />
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
