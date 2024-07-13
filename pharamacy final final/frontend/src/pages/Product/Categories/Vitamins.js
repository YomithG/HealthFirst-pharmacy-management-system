import React from 'react';
import Img2 from '../Images/v&s2.jpg'
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from '../../../Components/Product/ProductDetails';
import "../Medicine.css"

const Vitamins = ()=> {
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
        (item.category === "Vitamins")
    );
    

    return(
        <div style={{padding : '0px 30px ',}}>
            <br/> <br/> <br/><br/>
            <h1 style={{fontSize:'50px', textAlign:'center',}}>Vitamins & Suppliments</h1>
            <img src= {require= (Img2)} 
            style={{width:'100%', height:'400px', objectFit:'cover'}}/>
            <br/><br/><br/>
            <p className='babypara' style={{ color: 'black', fontSize: '25px', textAlign: 'center', fontFamily: 'Ubuntu' }}>

            "Welcome to the Vitamins & Supplements section of Central Pharmacy! <br/> 
            Here, you'll find a wide range of products designed to support your health and well-being. 
            Explore our selection to find the perfect supplements to meet your needs and help you live your best life."
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
export default Vitamins;