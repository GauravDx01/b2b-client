import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './style.css';
import { url } from '../url/url';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [accountOptions, setAccountOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null); // New state for selected manufacturer
  const orderOptions = ["Pre order", "Wholesale Numbers"];
  const navigate = useNavigate();

  const getAccounts = async () => {
    try {
      const response = await axios.get(`${url}/accounts`);
      const accounts = response.data.records.map(account => ({
        id: account.Id,
        name: account.Name,
        ownerId: account.OwnerId,
        manufacturers: account.Manufacturers_Names__c ? account.Manufacturers_Names__c.split(';').filter(name => name) : []
      }));
      setAccountOptions(accounts);

      console.log('Accounts', response);
      console.log(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      setManufacturerOptions(selectedAccount.manufacturers);
    } else {
      setManufacturerOptions([]);
    }
  }, [selectedAccount]);

  const handleAccountChange = (event, value) => {
    setSelectedAccount(value);
  };

  const handleManufacturerChange = (event, value) => {
    setSelectedManufacturer(value);
    localStorage.setItem('m_name', value); // Save the selected manufacturer in local storage
  };

  const nextPage = () => {
    navigate('/orders');
  };

  return (
    <>
      <Header />
      <div className="form">
        <div className="autocomplete-wrapper">
          <label htmlFor=""><span>*</span> Account</label>
          <Autocomplete
            className="autocomplete-input"
            options={accountOptions}
            getOptionLabel={(option) => option.name}
            onChange={handleAccountChange}
            renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
          />
        </div>
        <div className="autocomplete-wrapper">
          <label htmlFor=""><span>*</span> Manufacturer</label>
          <Autocomplete
            className="autocomplete-input"
            options={manufacturerOptions}
            onChange={handleManufacturerChange} // Handle manufacturer change
            renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
          />
        </div>
        <div className="autocomplete-wrapper">
          <label htmlFor=""><span>*</span> Order Type</label>
          <Autocomplete
            options={orderOptions}
            className="autocomplete-input"
            renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
          />
        </div>
        <button onClick={nextPage} className="show-products">Show Products</button>
      </div>
    </>
  );
}

export default Login;
