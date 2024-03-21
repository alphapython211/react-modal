import React, { useContext, useEffect, useState } from 'react';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import NoteContext from '../Context/NoteContext';
import { useSearchParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

function Third() {
    const third = useContext(NoteContext);
    const [searchParams,setSearchParams]= useSearchParams();

useEffect(() => {
   
     third.change1["PrintGroupBy"]= "ProductName,D.ProductID"
    third.setchange1(third.change1)
    fetchData();
}, [third.change1])
   

    const[Sales,setSales]=useState([]);
    const[Total,setTotal]=useState([]);
    const[Name,setName]=useState([]);

  
    let sales=[];
    let total=[];
    let name=[" "];

    const data = {
        labels: Name,
        datasets: [
            {
                label: 'Sales',
                data:Sales,
                borderColor: 'red',
                backgroundColor: 'blue',
            },
            {
                label: 'Total',
                data: Total,
                borderColor: 'blue',
                backgroundColor: 'green',
            },
        ],
    };
  

    const options = {
        indexAxis: '',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Product Name- ProductID',
            },
        },
    };
    
    // const dd= localStorage.getItem('token')
    // console.log(dd)

    const token= localStorage.getItem('token');
    // const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJzYWdhcjFAZ21haWwuY29tIiwiZXhwaXJ5IjoxNzEwMzM3OTI0Ljk2MDAxMX0.Oe4htXsBi3Tf9EMaTX5V7lCm0CrDxX2yd8Hdpxqa5aI';
  const authAxios = axios.create({
    baseURL:'http://192.168.1.208:2024/StockToSales/GetStockToSales',
    headers:{
      Authorization:`Bearer ${token}`,
    },
  });


    function fetchData() {
        // console.log('fourinput', change)
        authAxios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',third.change1)
            .then((response) => {
                // console.log( response.data)
             for(let i=0; i<response.data.lstResult.length;i++){
              sales.push(response.data.lstResult[i].ProductID)
              total.push(response.data.lstResult[i].Total)   
              name.push(response.data.lstResult[i].ProductName)   
             }
             setSales(sales)
             setTotal(total)
             setName(name)  
            }).catch(err=>console.log("3rd chart -- Error Generate:",err))
            
    }
    function onClick(){
        setSearchParams({
            FromDate:third.change1,
            ToDate:third.change1.ToDate,
            TotalRow:third.change1.TotalRow,
            strCompanyID:third.change1.strCompanyID,
            strBranchID:third.change1.strBranchID,
            strItemGroupID:third.change1.strItemGroupID,
            strItemID:third.change1.strItemID,
             Unit:third.change1.Unit,
          })
    }

    return (
        <div className='row' style={{ height: "90%", width: "100%" }}>
            <Bar 
                data={data}
                onClick={onClick}
                options={options}
            />

        </div>
    )
}

export default Third;
