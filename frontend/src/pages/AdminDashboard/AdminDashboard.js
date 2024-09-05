import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [productForm, setProductForm] = useState({ id: '', name: '', category: '', price: '' });

    useEffect(() => {
        // Fetch initial product data
        fetchProducts();
    }, []);

    const toggleProductForm = () => {
      setShowProductForm(!showProductForm); // Toggle form visibility
    };
  
    const fetchProducts = async () => {
        // Example fetch; replace with actual API call
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (productForm.id) {
            // Update existing product
            await fetch(`/api/products/${productForm.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productForm),
            });
        } else {
            // Add new product
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productForm),
            });
        }
        setShowProductForm(false);
        fetchProducts();
    };

    const handleEditProduct = (product) => {
        setProductForm(product);
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return <ProductsTab
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onAddProduct={() => setShowProductForm(true)} // Pass this function as a prop
                />;
            case 'orders':
                return <OrdersTab />;
            case 'users':
                return <UsersTab />;
            default:
                return <ProductsTab />;
        }
    };

    return (
        <div className="admin-dashboard">
            <nav className="dashboard-nav">
                <ul>
                    <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
                    <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</li>
                </ul>
            </nav>
            <div className="dashboard-content">
                {renderContent()}
                {showProductForm && (
                    <ProductForm
                        form={productForm}
                        onChange={handleFormChange}
                        onSubmit={handleFormSubmit}
                        onClose={() => setShowProductForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

const ProductsTab = ({ products, onEdit, onDelete, onAddProduct }) => (
  <div className="products-tab">
      <h2>Manage Products</h2>
      <button className="btn btn-primary" onClick={onAddProduct}>Add New Product</button>
      <table className="table">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {products.map(product => (
                  <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>
                          <button className="btn btn-sm btn-warning" onClick={() => onEdit(product)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
                      </td>
                  </tr>
              ))}cd..
          </tbody>
      </table>
  </div>
);


const ProductForm = ({ form, onChange, onSubmit, onClose }) => (
    <div className="product-form">
        <h3>{form.id ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>ID:</label>
                <input type="text" name="id" value={form.id || ''} onChange={onChange} readOnly={!!form.id} />
            </div>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <input type="text" name="category" value={form.category} onChange={onChange} required />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input type="number" name="price" value={form.price} onChange={onChange} required />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
);

const OrdersTab = () => (
    <div className="orders-tab">
        <h2>Manage Orders</h2>
        {/* Content for managing orders */}
    </div>
);

const UsersTab = () => (
    <div className="users-tab">
        <h2>Manage Users</h2>
        {/* Content for managing users */}
    </div>
);

export default AdminDashboard;
