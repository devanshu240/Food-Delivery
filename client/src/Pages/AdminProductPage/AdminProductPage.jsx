// AdminProductPage.js
import React, { useContext, useEffect, useState } from 'react';
import './AdminProductPage.css';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import axios from "axios"
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminProductPage = () => {
  const {admin, setAdmin} = useContext(UserContext);
  const Navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [Img, setImg] = useState();
  const [search, setSearch] = useState('');
  const [find, setFind] = useState('');

  const { productArray, setProductArray } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/admin/product/list")
      .then((res) => { setProductArray(res.data) })
      .catch((e) => { console.log(e) })
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    console.log("this is string ", value);
    setSearch(value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', { name, price, description, type, Img });
    const form = new FormData();
    form.append("Name", name);
    form.append("Price", price);
    form.append("Description", description);
    form.append("Type", type);
    form.append("Image", Img);
    form.append("role", "admin");
    try {
      const res = await axios.post("/api/admin/product/add", form, {
        headers: {
          'Content-Type': "multipart/form-data",
        }
      });
      if(res.data.success===false){
        alert(`${res.data.msg}`)
        setAdmin(null);
        Navigate("/admin");
      }
      setProductArray([...productArray, res.data]);
      setName('');
      setPrice('');
      setDescription('');
      setType('');
      setShowForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-product-page">
        <div className="controls">
          <select
            value={find}
            onChange={(e) => setFind(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Snacks">Snacks</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Desserts">Desserts</option>
            <option value="beverages">beverages</option>
            <option value="Thali">Thali</option>
            <option value="South Indian">South Indian</option>
          </select>
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <button onClick={() => setShowForm(!showForm)}>Add Product</button>
        </div>
        {showForm && (
          <div className="product-form-container">
            <form onSubmit={handleFormSubmit} className="product-form">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              ></textarea>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="Snacks">Snacks</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Desserts">Desserts</option>
                <option value="beverages">beverages</option>
                <option value="Thali">Thali</option>
                <option value="South Indian">South Indian</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <div className="product-cards">
          {productArray.map((ele) => {
            if (search || find) {
              if (search && find) {
                if (ele.name.toLowerCase().includes(search.toLowerCase()) && ele.type.toLowerCase() === find.toLowerCase()) {
                  return <ProductCard name={ele.name} price={ele.price} description={ele.desc} type={ele.type} img={ele.Img} id={ele._id} />
                }
              }
              else if (search) {
                if (ele.name.toLowerCase().includes(search.toLowerCase())) {
                  return <ProductCard name={ele.name} price={ele.price} description={ele.desc} type={ele.type} img={ele.Img} id={ele._id} />
                }
              }
              else if (find) {
                if (ele.type.toLowerCase() === find.toLowerCase()) {
                  return <ProductCard name={ele.name} price={ele.price} description={ele.desc} type={ele.type} img={ele.Img} id={ele._id} />
                }
              }
            }
            else {
              return <ProductCard name={ele.name} price={ele.price} description={ele.desc} type={ele.type} img={ele.Img} id={ele._id} />
            }
          })}
        </div>
      </div>
    </>
  );
};

export default AdminProductPage;
