import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import OrderTable from '../OrderTable/OrderTable';

function Orders() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <>
    <OrderTable/>
        <Box sx={{ mt: 4, mx: 'auto', maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Create Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* PO Number */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="po-number"
              label="PO Number"
              variant="outlined"
            />
          </Grid>

          {/* Close Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="close-date"
              label="Close Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Shipping Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="shipping-date"
              label="Shipping Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Shipping Street */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="shipping-street"
              label="Shipping Street"
              variant="outlined"
            />
          </Grid>

          {/* Shipping City */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="shipping-city"
              label="Shipping City"
              variant="outlined"
            />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              id="state"
              label="State"
              variant="outlined"
            />
          </Grid>

          {/* Shipping Zip */}
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              id="shipping-zip"
              label="Shipping Zip"
              variant="outlined"
            />
          </Grid>

          {/* Country */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="country"
              label="Country"
              variant="outlined"
            />
          </Grid>

          {/* Additional Info */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="additional-info"
              label="Additional Info"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </>

  );
}

export default Orders;
