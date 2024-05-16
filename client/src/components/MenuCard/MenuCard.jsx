// MenuCard.js
import React, { useContext, useState, useEffect } from 'react';
import './MenuCard.css';
import Model from "react-modal"
import UserContext from '../../context/UserContext';
import axios from "axios"

const MenuCard = ({ foodName, price, description, imageUrl, id, list }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [TotalPrice, setTotalPrice] = useState();
  const [isPaymenterror, setIsPaymenterror] = useState();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => { // showing the wrong result in product feedback. Means for every card it is running for 2 times
    if (list.length > 0) {
      list.forEach(async (ele) => {
        console.log(`this is ${foodName}`);
        const res = await axios.post("/api/user/add/product/Feedback/" + ele + "/list");
        setFeedbackList([...feedbackList, res.data]);
      })
    }
  }, [])

  const { user, productArray, setProductArray } = useContext(UserContext);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    console.log("hello");
    if (feedback.trim() !== '') {
      const feed = {
        name: user.name,
        feedback: feedback
      }
      console.log(feed);
      const res = await axios.post("/api/user/add/product/feedback/" + id, feed);

      const newArr = productArray;
      newArr.forEach((ele) => {
        if (ele._id === id) {
          ele.feed.push(res.data._id);
        }
      })
      setProductArray([...newArr]);
      setFeedbackList(prevFeedbackList => [...prevFeedbackList, feedback]);
      setFeedback('');
    }
  };

  // payment gateway
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_Ded3bdocbpducP",
      amount: data.amount,
      description: "Test Transaction",
      order_id: data._id,
      handler: async (response) => {
        try {
          const verifyUrl = "/api/user/payment/verify";
          const data = await axios.post(verifyUrl, response, { withCredentials: true });

          if (data.data.success === true) {

            const obj = response
            obj.product = {
              name:foodName,
              price:quantity*price,
              qnty:quantity
            }
            obj.user_id = user._id

            const res = await axios.post("/api/user/payment/saveorder",
              obj,
              { withCredentials: true }
            )

            if (res.data.success === true) {
              navigate("/payment")
            }
            else {
              console.log("something went wrong")
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src

      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!res) {
        alert("Something Wrong is Happennng")
        return;
      }
      const response = await axios.post("/api/user/payment/orders",
        { amount: quantity * price }
      );
      console.log("okok", response.data.data)
      if (response.data.success) {
        initPayment(response.data.data);
      }
      else {
        setIsPaymenterror(response.data.message)
        setTimeout(() => {
          setIsPaymenterror("")
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyButton = async () => {
    const userId=user._id;
    const check = await axios.post("/api/user/verify/reservation",{userId,role:"user"});
    if(check.data.success===false){
      alert(`${check.data.msg}`);
    }
    else{
      await handlePayment();
    }
  }

  return (
    <>
      <div className="menu-card">
        <img src={"/api/upload/" + imageUrl} alt={foodName} className="menu-card-image" />
        <div className="menu-card-details">
          <h2>{foodName}</h2>
          <p><strong>Price: </strong>Rs:-{price}</p>
          <p><strong>Desc: </strong>{description}</p>
          <button onClick={() => setShowUpdateForm(true)}>Buy</button>
          <Model isOpen={showUpdateForm} onRequestClose={() => setShowUpdateForm(false)} style={{
            overlay: {
              background: "light grey",
            },
            content: {
              marginTop: "100px"
            }
          }}>
            <div className="ModelCard">
              <div className="ModelCard-top">
                <div className="ModelCard-image">
                  <img src={"/api/upload/" + imageUrl} alt={foodName} className="ModelCard-image-inner" />
                </div>
                <div className="ModelCard-details">
                  <h2>{foodName}</h2>
                  <p><strong>Price: </strong>Rs:-{price}</p>
                  <p><strong>Description: </strong> {description}</p>
                  <div className="ModelCard-quantity">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                  </div>
                  <button className='ModelCard-Buy-Button' onClick={handleBuyButton}>Buy Now</button>
                </div>
              </div>
              <div className="ModelCard-bottom">
                <form className="ModelCard-form" onSubmit={handleSubmitFeedback}>
                  <input type="text" placeholder="Leave your feedback..." value={feedback} onChange={handleFeedbackChange} />
                  <button type="submit">Submit</button>
                </form>
                <div className="ModelCard-feedbacks">
                  <h3>Feedbacks:</h3>
                  <div className="ModelCard-feedback-list">
                    {feedbackList.map((item) => (
                      <div className="ModelCard-feedback-item">{item.Feedback}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Model>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
