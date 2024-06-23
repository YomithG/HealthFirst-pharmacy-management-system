import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from "../../Components/Product/ProductDetails";
import Navbar from "../../Components/Product/Navbar";
import "./Medicine.css"

const Medicine = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

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
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "" || item.category === selectedCategory)
  );
  // unique categories
  const categories = [...new Set(items.map(item => item.category))]

  return (
    <><br/><br/>
    {/* search field */}
    <div className="navbar navbar-expand-lg navbar-light bg-light nav11"> 
    <Row className="justify-content-center align-items-start">
            <Col className="searchc1">
              <Form className="d-flex align-items-start p-0 m-0 searchf1">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="m-0 p-0 custom-placeholder-padding"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="d-flex align-items-start searchbtngr1" >
                  <Button className="searchbtn1">Search</Button>
                </div>
              </Form>
            </Col>
          </Row></div><br/><br/>
      <div>
        <div className="bannerbc1">
          <img
            src={require('../Product/Images/pexels-alex-green-5692697.jpg')}
            alt="Background" className="bannerimg1"
          />
          <div className="bannertextc1">
            <h1 className="bannertext1">
              Your Health, Delivered
            </h1>
            <br />
            <h2 className="bannertext2" >
              Click, Order & Heal!
            </h2>
          </div>
        </div>
        <div className="categoriesC1"><br/>
        <h3 style={{ padding: '0px 5px', textAlign:'center' }}>Popular Categories</h3><br/>
        <Row xs={1} md={5} className="g-4"style={{ maxWidth: '2000px', margin: '0 auto' }}>
        <br/>

          <Col className="pc-1">
            <img src="https://th.bing.com/th/id/OIP.CyxXA79QfOn2hBRZM_eVTQHaFS?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="vitamins & suppliments" className="imgcs"/>
            <h4>Vitamins &<br/>Suppliments</h4>
          </Col>
          <Col className="pc-1">
            <img src="https://th.bing.com/th/id/OIP.fH6SUvEbko1IhxXz6ns5ewHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Mom & Baby care" className="imgcs"/>
            <h4>Mom &<br/>Baby care</h4>
          </Col>
          <Col className="pc-1">
            <img src="https://th.bing.com/th/id/OIP.ywx-BDJTwqcEW96rveG7hwHaE7?w=224&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="personal care & beauty" className="imgcs"/>
            <h4>Personal care<br/>& Beauty</h4>
          </Col>
          <Col className="pc-1">
            <img src="https://th.bing.com/th/id/OIP.HgsnNqWVU6UcMh5WY6p5ogHaHa?w=150&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="weight loss & fitness" className="imgcs"/>
            <h4>Weight-loss<br/>& Fitness</h4>
          </Col>
          <Col className="pc-1">
            <img src="https://th.bing.com/th/id/OIP.CyxXA79QfOn2hBRZM_eVTQHaFS?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="vitamins & suppliments" className="imgcs"/>
            <h4>Vitamins &<br/>Suppliments</h4>
          </Col>
        </Row ><br/>
          <h3 style={{ padding: '0px 5px',textAlign:'center' }}>Shop Medicines by Categories</h3>
          {categories.map((category) => (
            <button className="btnc m-2 categorybtn1"
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "primary" : "outline-primary"}
            >
              {category}
            </button>
          ))}
          <br></br>
          <Button
            className="btnc m-2 allCategorybtn"
            onClick={() => setSelectedCategory("")}
            variant={selectedCategory === "" ? "primary" : "outline-primary"}
            
          >
            All Categories
          </Button>
        </div>
        <br />
        {/* Display selected category */}
        <h2 className="headerProducts1">
          {selectedCategory === "" ? "More to Explore" : selectedCategory}
        </h2>
        {/* view product details */}

        <Row xs={1} md={4} className="g-4" style={{ maxWidth: '2000px', margin: '0 auto' }}>
          {filteredItems.map((item) => (
            <Col key={item._id}>
              <ItemDetails item={item} />
            </Col>
          ))}
        </Row>
        
      </div>
      <footer style={{ 
        backgroundColor: '#333', 
        color: '#fff', 
        textAlign: 'center', 
        padding: '50px 0' }}>
        <div>
          <h2>Our Pharmacy</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <h2>Follow Us</h2>
          <div>
            <a href="#facebook">Facebook</a> | <a href="#twitter">Twitter</a> | <a href="#instagram">Instagram</a>
          </div>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </footer>
    </>
  );
};

export default Medicine;
