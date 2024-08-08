import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './style.css';
import { url } from '../url/url';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Login() {
  const [accountOptions, setAccountOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const orderOptions = ["Pre order", "Wholesale Numbers"];

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

  return (
    <>
      <div className="header-img">
        <img src="https://beautyfashionsales.my.site.com/resource/1663582945000/headerLogo" alt="Header Logo" />
      </div>
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
        <button className="show-products">Show Products</button>
      </div>
    </>
  );
}

export default Login;
