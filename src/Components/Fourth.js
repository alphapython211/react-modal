import React, { useContext, useEffect, useRef, useState } from 'react';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

import { Bar,getElementAtEvent } from 'react-chartjs-2'
import axios from 'axios';
import NoteContext from '../Context/NoteContext';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

function Fourth() {

    const fourth = useContext(NoteContext);

useEffect(()=>{
   
    fourth.change1["PrintGroupBy"] = "ItemName,a.ItemID";
    fourth.setchange1(fourth.change1)
    getData();
},[fourth.change1])

    const[Sales,setSales]=useState([]);
    const[Total,setTotal]=useState([]);
    const[Name,setName]=useState([]);
    const [newID,setNewID]= useState([]);

  
    let sales=[];
    let total=[];
    let name=[];
    let ID= [];

    const data = {
        labels: Name,
        datasets: [
            {
                label: 'Sales',
                data:Sales,
                borderColor: 'yellow',
                backgroundColor: 'blue',
            },
            {
                label: 'Total',
                data: Total,
                borderColor: 'pink',
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
                text: 'ItemName-ItemID',
            },
        },
    };
   
const token= localStorage.getItem('token');

    // const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJzYWdhcjFAZ21haWwuY29tIiwiZXhwaXJ5IjoxNzEwMzM3OTI0Ljk2MDAxMX0.Oe4htXsBi3Tf9EMaTX5V7lCm0CrDxX2yd8Hdpxqa5aI';
  const authAxios = axios.create({
    baseURL:'http://192.168.1.208:2024/StockToSales/GetStockToSales',
    headers:{
      Authorization:`Bearer ${token}`,
    },
  });


    function getData() {
        // console.log('fiveinput', change)
        authAxios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',fourth.change1)
            .then((response) => {
                //  console.log("res",response)
             for(let i=0; i<response.data.lstResult.length;i++){
              sales.push(response.data.lstResult[i].ItemID)
              total.push(response.data.lstResult[i].Total)   
              name.push(response.data.lstResult[i].ItemName)
              ID.push(response.data.lstResult[i].BranchID)   
             }
             setSales(sales)
             setTotal(total)
             setName(name)
             setNewID(ID)
            }).catch(err=>console.log("4th chart -- error occured",err))
            
    }
    const onClick =(event) =>{
    const dataIndex = getElementAtEvent(chartRef.current, event)[0].index;
    console.log(dataIndex)
    // fourth.setchange1({...fourth.change1, ["strItemID"]:newID[getElementAtEvent(chartRef.current,event)[0].index]});
    }
    const chartRef= useRef();

    return (
        <div className='row' style={{ height: "90%", width: "100%" }}>
            <Bar 
                data={data}
                ref ={chartRef}
                onClick={onClick}
                options={options}
            />

        </div>
    )
}

export default Fourth;
