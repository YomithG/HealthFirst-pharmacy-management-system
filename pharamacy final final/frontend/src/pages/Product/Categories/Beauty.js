import React from 'react';
import Img3 from '../Images/b1.jpg'
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from '../../../Components/Product/ProductDetails';
import "../Medicine.css"

const Beauty = ()=> {
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
        (item.category === "Beauty Care")
    );
    

    return(
        <div style={{padding : '0px 30px ',}}>
            <br/> <br/> <br/><br/>
            <h1 style={{fontSize:'50px', textAlign:'center',}}>Beauty Care</h1>
            <img src= {require= (Img3)} 
            style={{width:'100%', height:'400px', objectFit:'cover'}}/>
            <br/><br/><br/>
            <p className='babypara' style={{ color: 'black', fontSize: '25px', textAlign: 'center', fontFamily: 'Ubuntu' }}>

            "Welcome to our Beauty Care section! <br/>
            Discover a variety of products designed to enhance your natural beauty and keep your skin, hair, and nails looking their best. 
            Explore our selection and find the perfect beauty solutions to fit your routine."
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
export default Beauty;