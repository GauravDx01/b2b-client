import React, { useEffect, useState } from 'react'
import { IoIosInformationCircle } from "react-icons/io";
import './style.css'
import axios from 'axios';
import {url} from '../url/url'
function Sec_header() {
let accountId = localStorage.getItem('acc_id')
let manufacturer_name = localStorage.getItem('m_name')
const [margin , setMargin] = useState([])
    const getMargin = async ()=>{
        const response = await axios.get(`${url}/products/margin/${accountId}/${manufacturer_name}`)
        console.log("margin" , response.data.records[0].Margin__c)
        setMargin(response.data.records[0].Margin__c)
    }
    useEffect(()=>{
getMargin()
    },[])
    localStorage.setItem("margin" , margin)
  return (
    <>
    <div className="hero-sec">
    <div className="head">
        <div className="logo"><IoIosInformationCircle /></div>
        <div className="text"> 
        For this manufacturer you have {margin}% discount for the price!
        </div>
    </div>
    </div>
    </>
  )
}

export default Sec_header