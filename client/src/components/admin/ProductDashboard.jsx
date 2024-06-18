import React, { useEffect, useState } from 'react'
import './Dashboard.scss'
import { GetProduct, AddProduct, DeleteProduct, EditProduct, UploadProduct } from '../function/Product';

export const ProductDashboard = ({ selectedSection }) => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await GetProduct();
            if (Array.isArray(productsData)) {
                setProducts(productsData);
            } else {
                console.log('Unexpected data format:', productsData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const ImageHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setNewProduct(prev => ({ ...prev, image: file.name }));
        console.log(e.target.files[0].name)
    }

    const handleAddProduct = async () => {
        try {
            await AddProduct(newProduct);
            if (file) {
                const formData = new FormData();
                formData.append('product', file);
                await UploadProduct(formData);
            }
            setShowAddProduct(false);
            fetchProducts();
            setNewProduct({ title: '', description: '', price: '' });
            setFile(null);
        } catch (error) {
            console.log(error);
        }
    };


    const handleDeleteProduct = async (productId) => {
        try {
            await DeleteProduct(productId);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    const handleSaveProduct = async () => {
        try {
            await EditProduct(editingProduct);
            setIsEditing(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setEditingProduct(null);
    };

    const handleAddProductClick = () => {
        setShowAddProduct(true);
    };

    const handleCloseProduct = () => {
        setShowAddProduct(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    return (
        <>
            <div className='dashboard-table'>
                <div>
                    <button onClick={handleAddProductClick}>Add Product</button>
                </div>
                {showAddProduct && (
                    <div className='add-product'>
                        <button onClick={handleCloseProduct} className='close-mark'><i className="fa-solid fa-xmark"></i></button>
                        <div>
                            <label>Title:</label>
                            <input type='text' value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                        </div>
                        <div>
                            <label>Price:</label>
                            <input type='text' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </div>
                        <div>
                            <input type='file' onChange={(e) => ImageHandler(e)} />
                        </div>
                        <div>
                            <button onClick={handleAddProduct}>Add Product</button>
                        </div>
                    </div>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td className='action-button'>
                                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isEditing && (
                <div className='add-product edit-product'>
                    <button onClick={handleCloseEdit} className='close-mark'><i className="fa-solid fa-xmark"></i></button>
                    <div>
                        <label>Title:</label>
                        <input type='text' name='title' value={editingProduct.title} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name='description' value={editingProduct.description} onChange={handleInputChange}></textarea>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type='text' name='price' value={editingProduct.price} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button onClick={handleSaveProduct}>Save</button>
                    </div>
                </div>
            )}
        </>
    )
}
