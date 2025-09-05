import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config';


const CartManager = () => {
  const [carts, setCarts] = useState([]);
  const [cart, setCart] = useState({
    id: '',
    productName: '',
    quantity: '',
    price: '',
    category: '',
    userId: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedCart, setFetchedCart] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/cartapi`;

  useEffect(() => {
    fetchAllCarts();
  }, []);

  const fetchAllCarts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setCarts(res.data);
    } catch (error) {
      setMessage('Failed to fetch carts.');
    }
  };

  const handleChange = (e) => {
    setCart({ ...cart, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in cart) {
      if (!cart[key] || cart[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addCart = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, cart);
      setMessage('Cart added successfully.');
      fetchAllCarts();
      resetForm();
    } catch (error) {
      setMessage('Error adding cart.');
    }
  };

  const updateCart = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, cart);
      setMessage('Cart updated successfully.');
      fetchAllCarts();
      resetForm();
    } catch (error) {
      setMessage('Error updating cart.');
    }
  };

  const deleteCart = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllCarts();
    } catch (error) {
      setMessage('Error deleting cart.');
    }
  };

  const getCartById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedCart(res.data);
      setMessage('');
    } catch (error) {
      setFetchedCart(null);
      setMessage('Cart not found.');
    }
  };

  const handleEdit = (c) => {
    setCart(c);
    setEditMode(true);
    setMessage(`Editing cart with ID ${c.id}`);
  };

  const resetForm = () => {
    setCart({
      id: '',
      productName: '',
      quantity: '',
      price: '',
      category: '',
      userId: ''
    });
    setEditMode(false);
  };

  return (
    <div className="cart-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Cart Management</h2>

      <div>
        <h3>{editMode ? 'Edit Cart' : 'Add Cart'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={cart.id} onChange={handleChange} />
          <input type="text" name="productName" placeholder="Product Name" value={cart.productName} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={cart.quantity} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={cart.price} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={cart.category} onChange={handleChange} />
          <input type="text" name="userId" placeholder="User ID" value={cart.userId} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addCart}>Add Cart</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateCart}>Update Cart</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Cart By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getCartById}>Fetch</button>

        {fetchedCart && (
          <div>
            <h4>Cart Found:</h4>
            <pre>{JSON.stringify(fetchedCart, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Carts</h3>
        {carts.length === 0 ? (
          <p>No carts found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(cart).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((c) => (
                  <tr key={c.id}>
                    {Object.keys(cart).map((key) => (
                      <td key={key}>{c[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(c)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteCart(c.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default CartManager;
