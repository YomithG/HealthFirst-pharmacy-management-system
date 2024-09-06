import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ItemDetails from "../../Components/Product/ProductDetails";
import "./Medicine.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Medicine = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // 10 rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8070/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const json = await response.json();
        setItems(json);
        setCurrentPage(1); // Reset currentPage whenever items change
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [selectedCategory]); // Dependency updated to selectedCategory only

  // Filter items based on search term and selected category
  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || item.category === selectedCategory)
  );

  // Unique categories
  const categories = [...new Set(items.map((item) => item.category))];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleMCategoryClick = (route) => {
    navigate(route);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment currentPage correctly
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement currentPage correctly
    }
  };

  return (
    <>
      {/* Search field */}
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
              <div className="d-flex align-items-start searchbtngr1">
                <Button className="searchbtn1">Search</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <div className="body1">
        <div className="bannerbc1">
          <img
            src={require("../Product/Images/pexels-alex-green-5692697.jpg")}
            alt="Background"
            className="bannerimg1"
          />
          <div className="bannertextc1">
            <h1 className="bannertext1">Your Health, Delivered</h1>
            <br />
            <h2 className="bannertext2">Click, Order & Heal!</h2>
          </div>
        </div>
        <div className="categoriesC1">
          <br />
          <h2 style={{ padding: "0px 5px", textAlign: "center" }}>
            Shop Our Top Categories
          </h2>
          <br />
          <div style={{ padding: "0px 160px", alignItems: "center" }}>
            <Box sx={{ width: 1500, height: 400 }}>
              <ImageList variant="masonry" cols={5} gap={20}>
                <ImageListItem>
                  <div style={{ fontWeight: "bold" }}>
                    <img
                      className="imgcc1"
                      style={{ height: "300px", width: "200px" }}
                      src={require("../Product/Images/Vitamins-Feature.jpg")}
                      loading="lazy"
                      onClick={() => handleMCategoryClick('/vitamins')}
                    />
                    <ImageListItemBar
                      position="below"
                      title="Vitamins & Suppliments"
                    />
                  </div>
                </ImageListItem>
                <ImageListItem>
                  <div style={{ fontWeight: "bold" }}>
                    <img
                      className="imgcc1"
                      style={{ height: "300px", width: "200px" }}
                      src={require("../Product/Images/baby.jpeg")}
                      loading="lazy"
                      onClick={() => handleMCategoryClick("/babycare")}
                    />
                    <ImageListItemBar
                      position="below"
                      title="Mom & BabyCare"
                    />
                  </div>
                </ImageListItem>
                <ImageListItem>
                  <div style={{ fontWeight: "bold" }}>
                    <img
                      className="imgcc1"
                      style={{ height: "300px", width: "200px" }}
                      src={require("../Product/Images/beauty.jpeg")}
                      loading="lazy"
                      onClick={() => handleMCategoryClick("/beauty")}
                    />
                    <ImageListItemBar
                      position="below"
                      title="Personal care & Beauty"
                    />
                  </div>
                </ImageListItem>
                <ImageListItem>
                  <div style={{ fontWeight: "bold" }}>
                    <img
                      className="imgcc1"
                      style={{ height: "300px", width: "200px" }}
                      src={require("../Product/Images/weight.jpg")}
                      loading="lazy"
                      onClick={() => handleMCategoryClick("/fitness")}
                    />
                    <ImageListItemBar
                      position="below"
                      title="Weight-loss & fitness"
                    />
                  </div>
                </ImageListItem>
              </ImageList>
            </Box>
          </div>
          <br />
          <div className="categoriesM" style={{ padding: "0px 30px" }}>
            <h2 style={{ padding: "0px 5px", textAlign: "center" }}>
              Choose Medicines by Categories
            </h2>
            <br />
            {categories.map((category) => (
              <button
                className="btnc m-2 categorybtn1"
                key={category}
                onClick={() => handleCategoryClick(category)}
                variant={
                  selectedCategory === category
                    ? "primary"
                    : "outline-primary"
                }
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
            {selectedCategory === "" ? "More to Explore..." : selectedCategory}
          </h2>
          {/* View product details */}
          <Row
            xs={2}
            md={4}
            className="g-4"
            style={{ maxWidth: "2000px", margin: "0 auto" }}
          >
            {currentItems.map((item) => (
              <Col key={item._id}>
                <ItemDetails item={item} />
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <footer style={{
  backgroundColor: '#394b3b', // Dark green background
  color: '#ecf0f1', // Light text color
  textAlign: 'center',
  padding: '50px 0',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
}}>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Our Pharmacy</b></h3>
    <p><small>Central Pharmacy is committed to providing high-quality healthcare solutions. Trusted by the community since 2001.</small></p>
  </div>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Follow Us</b></h3>
    <div>
      <a href="#facebook" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Facebook</small></a>
      <a href="#twitter" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Twitter</small></a>
      <a href="#instagram" style={{
        color: '#ecf0f1',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s'
      }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} // Brighter green on hover
        onMouseOut={(e) => e.target.style.color = '#ecf0f1'}><small>Instagram</small></a>
    </div>
  </div>
  <div style={{ flex: '1 1 300px', margin: '20px' }}>
    <h3 style={{
      borderBottom: '2px solid #ecf0f1',
      display: 'inline-block',
      paddingBottom: '10px',
      color: '#8FCB81' // Brighter green for the headings
    }}><b>Contact Us</b></h3>
    <p><small>Email: <a href="mailto:info@centralpharmacy.lk" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>info@centralpharmacy.lk</a></small></p>
    <p><small>Phone: <a href="tel:+94123456789" style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#8FCB81'} onMouseOut={(e) => e.target.style.color = '#ecf0f1'}>+94 123 456 789</a></small></p>
    <p><small>Address: 123 Main Street, Pokunuwita, Sri Lanka</small></p>
  </div>
</footer>
    </>
  );
};

export default Medicine;
