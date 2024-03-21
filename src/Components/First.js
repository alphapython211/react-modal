import React, { useContext, useEffect, useReducer, useState,useRef } from 'react';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, elements } from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2'
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

function First() {
      
    const first = useContext(NoteContext);
    const [searchParams, setSearchParams]= useSearchParams();
    useEffect(()=>{
        first.change1["PrintGroupBy"] = "BranchName,br.BranchID";
        first.setchange1(first.change1)
        getData();
    },[first.change1])

    const[Sales,setSales]=useState([]);
    const[Total,setTotal]=useState([]);
    const[Name,setName]=useState([]);
    const [newID, setNewID]= useState([]);

    let sales=[];
    let total=[];
    let name=[];
    let id= [];
    
    const Data = {
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
                borderColor: 'red',
                backgroundColor: 'green',
            },
        ],
        plugins: {
            stacked100: { enable: true }
          }
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
                text: 'Branch Name-BranchID',
            },
        },
        plugins: {
            stacked100: { enable: true }
          }
    };

const token= localStorage.getItem('token');
// console.log("token",token)
    // const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJzYWdhcjFAZ21haWwuY29tIiwiZXhwaXJ5IjoxNzEwMzM3OTI0Ljk2MDAxMX0.Oe4htXsBi3Tf9EMaTX5V7lCm0CrDxX2yd8Hdpxqa5aI';
    const authAxios = axios.create({
      baseURL:'http://192.168.1.208:2024/StockToSales/GetStockToSales',
      headers:{
        Authorization:`Bearer ${token}`,
      },
    });
// const dd= 'acsess token'
//   const authAxios = axios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',
//   {
//     headers:{
//         Authorization:`Bearer ${dd}`,
//         Authorization:`Bearer ${localStorage.getItem('access_token')}`
//     }
//   })

    function getData() {
        authAxios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',first.change1)
            .then((response) => {
                
             for(let i=0; i<response.data.lstResult.length;i++){
              sales.push(response.data.lstResult[i].sales)
              total.push(response.data.lstResult[i].Total)   
              name.push(response.data.lstResult[i].BranchName)
              id.push(response.data.lstResult[i].BranchID)
            //   console.log('response', response.data.lstResult[i].BranchID)
             }
             setSales(sales)
             setTotal(total)
             setName(name)
             setNewID(id)
             
            }).catch(err=>console.log(err))   
    }
    
    // query string in react has get 
    // useEffect(()=>{
    //     if(Flag!=false){
    //           setSearchParams({})
    //     }
    //     else{
    //          setFlag(Flag)
    //     }
    //   },[])  
    // if (search.change2.length === props.newInput["id"].length) {
    //     for (let i = 0; i < search.change2.length; i++) {
    //       if (search.change2[i] !== props.newInput["id"]) {
    //         search.setchecklst({...search.checklst, [props.newInput.label]:pjl})   
    //         return true;
    //       }
    //     }
    //   } else {
    //      search.setchange2({...search.change2, [props.newInput.label]:pjl})
    //     return true;
    //   }
      
  const onClick  =(event)=>{
    
    setSearchParams({
        FromDate:first.change1.FromDate,
        ToDate:first.change1.ToDate,
        TotalRow:first.change1.TotalRow,
        strCompanyID:first.change1.strCompanyID,
        strBranchID:first.change1.strBranchID,
        strItemGroupID:first.change1.strItemGroupID,
        strItemID:first.change1.strItemID,
        Unit:first.change1.Unit,
    })

    console.log(chartRef)
    const dataset= getElementAtEvent(chartRef.current,event)[0].datasetIndex;
    const dataindex= getElementAtEvent(chartRef.current,event)[0].index;
    console.log(dataset)
    console.log(dataindex)
    first.setchange1({...first.change1, ["strBranchID"]:newID[getElementAtEvent(chartRef.current,event, 'nearest', {intersect: true})[0].index].toString()});
   
  }

  const chartRef = useRef();
    return (
        <div className='row' style={{ height: "80%", width: "90%" }}>
            <Bar 
                data={Data}
                options={options}
                onClick={onClick}
                ref= {chartRef}   
                
                                 
            />
        
        </div>
    )
}

export default First;


/*
import React, { useState } from 'react';

function FilterComponent() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const filterData = (data) => {
    if (isChecked) {
      return data.filter((item) => item.status === 'active');
    } else {
      return data;
    }
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <label>Filter by active users</label>
      <SomeComponent data={filterData(data)} />
    </div>
  );
}

export default FilterComponent;
*/