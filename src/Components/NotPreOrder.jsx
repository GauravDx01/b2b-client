import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Header from '../Login/Header';
import { url } from '../url/url';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sec_header from '../Sec_Header/Sec_header';
import './style.css'
function NotPreOrder() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const manufacturer_name = localStorage.getItem('m_name');
  const margin = localStorage.getItem("margin");

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/${manufacturer_name}`);
      console.log(response.data.records);

      // Fetch unit prices for each product
      const productsWithUnitPrice = await Promise.all(
        Array.isArray(response.data.records) ? response.data.records.map(async (product) => {
          try {
            const unitPriceResponse = await axios.get(`${url}/products/unitprice/${product.Name}`);
            const unitPriceData = unitPriceResponse.data.records;

            const unitPrice = Array.isArray(unitPriceData) && unitPriceData.length > 0 ? unitPriceData[0].UnitPrice : 'Price not available';

            // Return product with unit price, no initial quantity set
            return {
              ...product,
              unitPrice: unitPrice,
            };
          } catch (error) {
            console.error(`Error fetching unit price for ${product.Name}:`, error);
            return {
              ...product,
              unitPrice: 'Price not available',
            };
          }
        }) : []
      );

      // Set state with products including their unit prices
      setProducts(productsWithUnitPrice);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Group products by category
  const groupedProducts = Array.isArray(products)
    ? products.reduce((acc, product) => {
        const category = product.Category__c || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {})
    : {};

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
        const currentQuantity = prevQuantities[productId] || product.Min_Order_QTY__c;
        const newQuantity = currentQuantity - product.Min_Order_QTY__c;

        return {
            ...prevQuantities,
            [productId]: newQuantity >= product.Min_Order_QTY__c ? newQuantity : null // Hide if quantity falls below min
        };
    });
  };

  return (
    <>
      <Header />
      <Sec_header />
      <TableContainer component={Paper}>
        <Table>
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
            {Object.entries(groupedProducts).map(([category, products]) => (
              <React.Fragment key={category}>
                <TableRow>
                  <TableCell colSpan={10} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {category}
                  </TableCell>
                </TableRow>
                {products.map((item, index) => (
                  <TableRow key={item.Id}>
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
                      {item.unitPrice !== 'Price not available' ? `$${item.unitPrice}` : item.unitPrice}
                    </TableCell>
                    <TableCell align="right">
                      {item.unitPrice !== 'Price not available' 
                        ? `$${(item.unitPrice * margin / 100).toFixed(2)}` 
                        : item.unitPrice}
                    </TableCell>
                    <TableCell align="right">{item.Min_Order_QTY__c}</TableCell>
                    <TableCell className='qantity' align="right">
                      <Button className='inc-dec' onClick={() => handleDecrement(item.Id)}>-</Button>
                      {quantities[item.Id] > 0 && quantities[item.Id]} {/* Show quantity only if greater than 0 */}
                      <Button className='inc-dec' onClick={() => handleIncrement(item.Id)}>+</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default NotPreOrder;
