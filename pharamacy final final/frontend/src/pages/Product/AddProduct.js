import { useState } from "react";
import { handleUpload } from "../../utils/HandleUpload";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();
  //
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [error, setError] = useState(null);

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Handle image upload
  const handleImageUpload = (e) => {
    setFile(file);
    handleUpload({ file, setPercent, setFunc: setImage });
  };

  // Handle image change
  function handleImageChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if image is empty
    if (!image) {
      setError("Please upload an image");
      return; // Stop further execution
    }
  
    const product = {
      image,
      title,
      description,
      category,
      price,
      countInStock,
    };
  
    const response = await fetch("http://localhost:8070/api/product", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
  
    if (!response.ok) {
      setError(json.error);
    }
    //after submitting set all the fields to null again
    if (response.ok) {
      setImage("");
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCountInStock("");
      setError(null);
      console.log("new product added", json);
      navigate("/");
    }
  };
  ;

  return (
    // align the form in the center with a width of 50%
    <form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit}>
      <br/><br/><br/><br/>
      <h3>Add a new Product</h3>
      <br/><br/>
      {/* //upload image */}
      <div className="form-group">
        <label className="my-2" htmlFor="image">
          Product Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          placeholder="Upload image"
          onChange={handleImageChange}
          required
        />
        <button
        type="button"
        onClick={handleImageUpload}
        disabled={!file || percent === 100}
        style={{ backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold' }}
        className={`btn mt-2 btn-sm`}
        >
        Upload
        </button>

        <div className="progress mt-2">
          <div
            className={`progress-bar bg-success ${
              percent < 100 ? "progress-bar-animated progress-bar-striped" : ""
            }`}
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percent < 100 ? `Uploading ${percent}%` : `Uploaded ${percent}%`}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="form-group">
        <label className="my-2" htmlFor="title">  
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      {/* description */}
      <div className="form-group">
        <label className="my-2" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      {/* Category */}
      <div className="form-group">
        <label className="my-2" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          id="category"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
      <label className="my-2" htmlFor="price">
      Price
      </label>
      <input
        type="number"
        className="form-control"
        id="price"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0" //cannot enter values for price less than 0
  />
      </div>

      <div className="form-group">
      <label className="my-2" htmlFor="countInStock">
      Count in Stock
      </label>
      <input
        type="number"
        className="form-control"
        id="countInStock"
        placeholder="Enter count in stock"
        value={countInStock}
        onChange={(e) => setCountInStock(e.target.value)}
        required
        min="0" //cannot enter values less than 0 for stock
        step="1" //enter only whole numbers for stock
      />
      </div>

      {/* submit button */}
      <button type="submit" className="btn btn-primary mt-2">
        Add Product
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddProductForm;
