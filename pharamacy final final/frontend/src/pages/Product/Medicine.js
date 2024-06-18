import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ItemDetails from "../../Components/Product/ProductDetails";
import Navbar from "../../Components/Product/Navbar";

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
  //unique categories
  const categories = [...new Set(items.map(item => item.category))]

  return (
    <>
     <div >
      <div style={{alignItems: 'center', height:'500px',display:'flex',backgroundColor:'#75a79f'}}>
          <img src={require('../Product/Pharmacist-cuate.png')}
        style={{width: '1000px',height:'550px' }}/>
        <div style={{ marginRight: '50px', paddingLeft: '100px', textAlign:'center' , width:'30%'}}>
          {/* <img src={require('../Product/introducing-healthfirst-the-friendly-and-approacha-igGtJ2HnTK2Xmx8sIK36wg-ehGR2NHFRI2M0v6kyJgxcQ.jpeg')}
          style={{width:'100px'}}/> */}
          <h1 style={{textDecorationLine:'underline',fontSize:'60px'}}>Your Health, Delivered</h1><br/><br/>
          <h2 style={{fontStyle:'italic', fontSize:'35px'}}>Click, Order & Heal!</h2>
        </div>
        </div>
        <br />
      {/* search field */}
        <Row className="justify-content-center align-items-start">
          <Col sm={4}>
            
            <Form className="d-flex align-items-start p-0 m-0" style={{width:'500px', padding:'0px 10px'}}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="m-0 p-0 custom-placeholder-padding"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div  className="d-flex align-items-start" style={{padding:'0px 5px'}}>
              <Button style={{height:'40px', padding:'0px 10px'}}>Search</Button>
              </div>
              <style jsx>{`.custom-placeholder-padding::placeholder {
              padding-left: 10px; }`}</style>
            </Form>
          </Col>
        </Row>
        {/* https://storyset.com/illustration/pharmacist/cuate#FFC100FF&hide=&hide=complete 
        https://i.pinimg.com/originals/23/35/84/233584c2f6b5b680fb1f3a6a53589138.jpg*/}

      <h3 style={{padding:'0px 20px'}}>Popular Categories</h3>
      {categories.map((category) => (
        <button className="btnc m-2"
          key={category}
          onClick={() => setSelectedCategory(category)}
          variant = {selectedCategory === category? "primary": "outline-primary"}
          style={{padding: '8px 8px', color: 'black', backgroundColor: '#effff2',
          border: 'none', borderRadius: '5px',cursor: 'pointer'}}>
          {category}
        </button>
        ))}
      <br></br>
      <Button
          className="btnc m-2"
          onClick={() => setSelectedCategory("")}
          variant={selectedCategory === "" ? "primary" : "outline-primary"}
          style={{padding: '8px 8px', color: 'black', backgroundColor: '#fef6de',
          border: 'none', borderRadius: '5px',cursor: 'pointer'}}
        >
          All Categories
        </Button>
      <br /><br />
      {/* view product details */}
      <Row xs={1} md={3} className="g-4">
        {filteredItems.map((item) => (
          <Col key={item._id}>
            <ItemDetails item={item} />
          </Col>
        ))}
      </Row>
      {/* Add a button or link to open another webpage inside the iframe */}
      <Button onClick={() => setIframeUrl("http://127.0.0.1:1880/ui/#!/0?socketid=JXTmUNQoDvEFbNBUAAAB")}>Open Example.com</Button>
      {/* Conditionally render the iframe */}
      {iframeUrl && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
          <iframe src={iframeUrl} style={{ width: '100%', height: '500px' }} title="Embedded Page"></iframe>
        </div>
      )}
      </div>
    </>
  );
};

export default Medicine;
