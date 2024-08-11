import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { url } from '../url/url';
import axios from 'axios';
import Header from '../Login/Header';
import Sec_header from '../Sec_Header/Sec_header';
import './style.css';

function PreOrder() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const manufacturer_name = localStorage.getItem('m_name');

    const getProducts = async () => {
        try {
            const response = await axios.get(`${url}/products/preOrder/${manufacturer_name}`);
            const products = Array.isArray(response.data.records) ? response.data.records : [];
            console.log(products);

            const productsWithUnitPrice = await Promise.all(
                products.map(async (product) => {
                    try {
                        const unitPriceResponse = await axios.get(`${url}/products/unitprice/${product.Name}`);
                        const unitPriceData = unitPriceResponse.data.records;

                        const unitPrice = Array.isArray(unitPriceData) && unitPriceData.length > 0 ? unitPriceData[0].UnitPrice : null;

                        return {
                            ...product,
                            unitPrice: unitPrice !== null ? unitPrice : 'Price not available',
                        };
                    } catch (error) {
                        console.error(`Error fetching unit price for ${product.Name}:`, error);
                        return {
                            ...product,
                            unitPrice: 'Price not available',
                        };
                    }
                })
            );

            setProducts(productsWithUnitPrice);
        } catch (error) {
            console.error('Error fetching products or unit prices:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Handle quantity increment
    const handleIncrement = (productId) => {
        setQuantities(prevQuantities => {
            const product = products.find(product => product.Id === productId);
            const currentQuantity = prevQuantities[productId] || 0;
            const newQuantity = currentQuantity === 0 ? product.Min_Order_QTY__c : currentQuantity + product.Min_Order_QTY__c;

            return {
                ...prevQuantities,
                [productId]: newQuantity
            };
        });
    };

    // Handle quantity decrement
    const handleDecrement = (productId) => {
        setQuantities(prevQuantities => {
            const product = products.find(product => product.Id === productId);
            const currentQuantity = prevQuantities[productId] || 0;
            const newQuantity = currentQuantity - product.Min_Order_QTY__c;

            return {
                ...prevQuantities,
                [productId]: newQuantity >= product.Min_Order_QTY__c ? newQuantity : 0
            };
        });
    };

    // Save quantities to local storage
    const handleSaveToLocalStorage = () => {
        localStorage.setItem('productQuantities', JSON.stringify(quantities));
        alert('Quantities saved to local storage!');
    };

    const margin = localStorage.getItem("margin");

    return (
        <>
            <div>
                <Header />
                <Sec_header />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No</TableCell>
                                <TableCell align="right">Product Code</TableCell>
                                <TableCell align="right">Product UPC</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Product Image</TableCell>
                                <TableCell align="right">List Price</TableCell>
                                <TableCell align="right">Sale Price</TableCell>
                                <TableCell align="right">Min QTY</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={9} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    PRE ORDER
                                </TableCell>
                            </TableRow>
                            {products.map((item, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right">{index + 1}</TableCell>
                                    <TableCell align="right">{item.ProductCode}</TableCell>
                                    <TableCell align="right">{item.ProductUPC__c}</TableCell>
                                    <TableCell align="right">{item.Name}</TableCell>
                                    <TableCell align="right">
                                        {item.webkul_es_mage__Product_image__c ? (
                                            <img
                                                src={item.webkul_es_mage__Product_image__c}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {typeof item.unitPrice === 'number' ? `$${item.unitPrice}` : item.unitPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.unitPrice !== 'Price not available' 
                                            ? `$${(item.unitPrice * margin / 100).toFixed(2)}` 
                                            : item.unitPrice}
                                    </TableCell>
                                    <TableCell align="right">{item.Min_Order_QTY__c}</TableCell>
                                    <TableCell align="right">
                                        <Button className='inc-dec' onClick={() => handleDecrement(item.Id)}>-</Button>
                                        {quantities[item.Id] > 0 && quantities[item.Id]} {/* Show quantity only if greater than 0 */}
                                        <Button className='inc-dec' onClick={() => handleIncrement(item.Id)}>+</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={handleSaveToLocalStorage}>
                    Save to Local Storage
                </Button>
            </div>
        </>
    );
}

export default PreOrder;
