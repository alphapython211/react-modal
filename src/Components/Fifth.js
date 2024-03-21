import React, { useContext, useEffect, useState } from 'react';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'
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

function Fifth() {
    const fifth = useContext(NoteContext);
    // console.log("fifth",  fifth);
//    const [change, setchange]= useState({
//     "FromDate": "",
//     "ToDate": "",
//     "TotalRow": "",
//     "strCompanyID": "",
//     "strBranchID": "",
//     "strItemGroupID": "",
//     "strItemID": "",
//     "Unit": "KG",
//     "PrintGroupBy": "SubItemName,SubItemID"
//    })



useEffect(()=>{
    fifth.change1["PrintGroupBy"] = "SubItemName,SubItemID";
    fifth.setchange1(fifth.change1)
    getData();
},[fifth.change1])

    const[Sales,setSales]=useState([]);
    const[Total,setTotal]=useState([]);
    const[Name,setName]=useState([]);

  
    let sales=[];
    let total=[];
    let name=[];

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
                text: 'SubItemName-SubItemID',
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

        authAxios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',fifth.change1)
            .then((response) => {
                
             for(let i=0; i<response.data.lstResult.length;i++){
              sales.push(response.data.lstResult[i].sales)
              total.push(response.data.lstResult[i].Total)   
              name.push(response.data.lstResult[i].SubItemName)   
             }
             setSales(sales)
             setTotal(total)
             setName(name)
            }).catch(err=>console.log("5th chart -- error occured",err))
            
    }

    return (
        <div className='row' style={{ height: "90%", width: "100%"}}>
            <Bar 
                data={data}
                options={options}
            />
        </div>
    )
}

export default Fifth;
