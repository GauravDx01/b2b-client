import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './style.css'
import  {url} from '../url/url'
import axios from 'axios'
function Login() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const get_account = async()=>{
    const response = await axios.get(`${url}/accounts`);
    console.log("response"  , response)
  }
  return (

    <>
      <div className="header-img">
        <img src="https://beautyfashionsales.my.site.com/resource/1663582945000/headerLogo" alt="Header Logo" />
      </div>
<div className="form">
      <div className="autocomplete-wrapper">
        <label htmlFor=""> <span>*</span> Account</label>
        <Autocomplete
        className='autcomplete-input'
          options={options}
          renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
        />
      </div>
      <div className="autocomplete-wrapper">
      <label htmlFor=""> <span>*</span> Manufacturer</label>
        <Autocomplete
        className='autcomplete-input'
          options={options}
          renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
        />
      </div>
      <div className="autocomplete-wrapper">
      <label htmlFor=""> <span>*</span> Order Type</label>
        <Autocomplete
        className='autcomplete-input'
          options={options}
          renderInput={(params) => <TextField {...params} placeholder="Choose an option" variant="outlined" />}
        />
      </div>
      <button onClick={get_account} className='show-products'>Show Products</button>
      </div>
    </>
  );
}

export default Login;
