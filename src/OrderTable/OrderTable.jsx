import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import {url} from '../url/url'
import { useEffect } from 'react';
function OrderTable() {
  const manufacturer_name = localStorage.getItem('m_name');
  const storedQuantities = localStorage.getItem('productQuantities');

  // Step 2: Parse the JSON string into a JavaScript object
  if (storedQuantities) {
      const quantitiesObject = JSON.parse(storedQuantities);
  
      // Step 3: Iterate through the object to log the keys (IDs) and values (quantities) separately
      for (const productId in quantitiesObject) {
          if (quantitiesObject.hasOwnProperty(productId)) {
              const quantity = quantitiesObject[productId];
              console.log('Product ID:', productId);
              console.log('Quantity:', quantity);
          }
      }
  }
  const getOrderedProduct = async (productId) => {
    try {
        const response = await axios.get(`${url}/products/preOrder/${manufacturer_name}`);
        const products = Array.isArray(response.data.records) ? response.data.records : [];
        console.log("ppppppppppppppppppppp" , products[0].Id)
        /// Filter the products by the specified productId
        const filteredProducts = products.filter(product => product.Id === productId);

        console.log('Filtered Products:', filteredProducts);
        
        // Continue with further processing if needed
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

  useEffect(()=>{
    getOrderedProduct()
  },[])
  return (
    <>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow
           
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default OrderTable
