import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../Login/Header';
import { url } from '../url/url';
import axios from 'axios';
import { useEffect, useState } from 'react';

function NotPreOrder() {
  const [products, setProducts] = useState([]);

  const manufacturer_name = localStorage.getItem('m_name');

  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}/products/${manufacturer_name}`);
      console.log(response.data.records);
      setProducts(Array.isArray(response.data.records) ? response.data.records : []); // Ensure response.data is an array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Ensure products is an array before reducing
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

  return (
    <>
      <Header />
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
              <TableCell align="right">QUNATITY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedProducts).map(([category, products]) => (
              <React.Fragment key={category}>
                <TableRow>
                  <TableCell colSpan={7} style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">NA</TableCell>
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
