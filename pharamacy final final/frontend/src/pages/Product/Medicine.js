import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from "../../Components/Product/ProductDetails";
import Navbar from "../../Components/Product/Navbar";

const Medicine = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter items based on search term , filter using title and category
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <br />
      {/* search field */}
        <Row className="justify-content-center align-items-start">
          <Col sm={3}>
            
            <Form className="d-flex align-items-start p-0 m-0">
              <Form.Control
                type="search"
                placeholder="Search"
                className="m-0 p-0"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div  className="d-flex align-items-start">
              <Button style={{height:'40px'}}>Search</Button>
              </div>
            </Form>
          </Col>
        </Row>

      <br /><br />
      {/* view product details */}
      <Row xs={1} md={2} className="g-4">
        {filteredItems.map((item) => (
          <Col key={item._id}>
            <ItemDetails item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Medicine;
