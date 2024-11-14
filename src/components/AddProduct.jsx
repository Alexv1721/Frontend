import React, { useState } from 'react';
import '../styles/addproduct.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const nav=useNavigate('')
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    imageUrl: '',
    price: '',
    title: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required.';
    if (!formData.price) newErrors.price = 'Price is required.';
    if (!formData.title) newErrors.title = 'Title is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validateForm()) {
  try{
    const data=await axios.post('http://localhost:5000/products/addproduct',formData,{headers:{Authorization:localStorage.getItem('token')}})
    console.log('newpro',data.data);
    
  nav('/admin')
}
catch(err){
    console.log(err);    
}

    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select category</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
