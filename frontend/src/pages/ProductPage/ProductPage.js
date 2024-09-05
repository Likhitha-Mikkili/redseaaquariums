import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomImage, setZoomImage] = useState('');

    useEffect(() => {
        fetchProduct();
        fetchRelatedProducts();
    }, [id]);

    const fetchProduct = async () => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
    };

    const fetchRelatedProducts = async () => {
        const response = await fetch(`/api/products?category=${product?.category}`);
        const data = await response.json();
        setRelatedProducts(data.filter(p => p.id !== id)); // Exclude current product
    };

    const handleAddToCart = async () => {
        // Add to cart functionality
        await fetch(`/api/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: id, quantity: 1 }),
        });
        alert('Product added to cart');
    };

    const handleImageClick = (image) => {
        setZoomImage(image);
        setShowZoom(true);
    };

    return (
        <div className="product-page">
            {product ? (
                <>
                    <div className="product-details">
                        <div className="product-images">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="main-image" 
                                onClick={() => handleImageClick(product.image)}
                            />
                            <div className="thumbnail-images">
                                {product.images.map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`Thumbnail ${index}`} 
                                        className="thumbnail" 
                                        onClick={() => handleImageClick(img)} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="product-info">
                            <h1>{product.name}</h1>
                            <p className="price">₹{product.price}</p>
                            <p className="description">{product.description}</p>
                            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                    {showZoom && (
                        <div className="zoom-overlay" onClick={() => setShowZoom(false)}>
                            <img src={zoomImage} alt="Zoomed" className="zoomed-image" />
                        </div>
                    )}
                    <div className="related-products">
                        <h2>Related Products</h2>
                        <div className="product-list">
                            {relatedProducts.map(p => (
                                <div key={p.id} className="product-card">
                                    <img src={p.image} alt={p.name} className="product-image" />
                                    <h3>{p.name}</h3>
                                    <p className="price">₹{p.price}</p>
                                    <button className="btn btn-secondary">View Details</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductPage;
