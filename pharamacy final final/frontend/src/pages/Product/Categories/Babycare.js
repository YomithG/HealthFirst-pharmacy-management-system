import React from 'react';
import Img1 from '../Images/pexels-sarah-chai-7282722.jpg'
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from '../../../Components/Product/ProductDetails';
import "../Medicine.css"

const Babycare = ()=> {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch("http://localhost:8070/api/product");
            if (!response.ok) {
              throw new Error("Failed to fetch items");
            }
            const json = await response.json();
            setItems(json);
          } catch (error) {
            console.error("Error fetching items:", error);
          }
        };
        fetchItems();
      }, []);

      const filteredItems = items.filter(item => 
        (item.category === "Baby care")
    );
    

    return(
        <div style={{padding : '0px 30px ',}}>
            <br/> <br/> <br/><br/>
            <h1 style={{fontSize:'50px', textAlign:'center',}}>Babycare Products</h1>
            <img src= {require= (Img1)} 
            style={{width:'100%', height:'260px', objectFit:'cover'}}/>
            <br/><br/><br/>
            <p className='babypara' style={{ color: 'black', fontSize: '25px', textAlign: 'center', fontFamily: 'Ubuntu' }}>

            Welcome to the Baby Care section of Central Pharmacy, 
            your trusted partner in nurturing the health and well-being of your little ones. 
            At Central Pharmacy, we understand the unique needs of both parents and babies, 
            and we are committed to providing top-quality products and exceptional service to support your family's journey.
            </p>
            <br/><br/>
            <h3 style={{textAlign:'center', }}>Explore items...</h3><br/>
            {/* view product details */}
            <Row xs={1} md={4} className="g-4" style={{ maxWidth: '2000px', margin: '0 auto' }}>
            {filteredItems.map((item) => (
            <Col key={item._id}>
              <ItemDetails item={item} />
            </Col>
            ))}
            </Row>
        </div>
    )
}
export default Babycare;