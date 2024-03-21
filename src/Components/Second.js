import React, { useContext, useEffect, useRef, useState } from 'react';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

import { Bar,getElementAtEvent } from 'react-chartjs-2'
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

function Second() {
     const second = useContext(NoteContext);
     const [searchParams,setSearchParams]= useSearchParams();

   useEffect(() => {
    // console.log("barchart2",change)
    second.change1["PrintGroupBy"] = "MonthName,YearNo";
    second.setchange1(second.change1)
    getData();
}, [second.change1])


    const[Sales,setSales]=useState([]);
    const[Total,setTotal]=useState([]);
    const[Name,setName]=useState([]);
    // const [newID,newSetID]= useState([]);
    const [todate, setToDate]= useState("");
    const [fromdate, setFromDate] =useState("");
    const [YearArr, setYearArr] = useState("")
  
    let sales=[];
    let total=[];
    let name=[" "];
    // let ID= [];
    let year=[];

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
                borderColor: 'red',
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
                text: 'Sales in Branch',
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
        // console.log('thirdinput', change)
        authAxios.post('http://192.168.1.208:2024/StockToSales/GetStockToSales',second.change1)
            .then((response) => {
                //  console.log(response.data)
             for(let i=0; i<response.data.lstResult.length;i++){
              sales.push(response.data.lstResult[i].sales)
              total.push(response.data.lstResult[i].Total)   
              name.push(response.data.lstResult[i].MonthName)
            //   ID.push(response.data.lstResult[i].BranchID)
              year.push(response.data.lstResult[i].YearNo)
             }
             setSales(sales)
             setTotal(total)
              setName(name)
            //  newSetID(ID)
              setYearArr(year)
            }).catch(err=>console.log(err))
            
    }
    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
  };

    function onClick(event) {
          
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
            var month = monthNames.indexOf(Name[getElementAtEvent(chartRef.current, event)[0].index]);
            var start = new Date(Number(YearArr[getElementAtEvent(chartRef.current, event)[0].index]), month, 1);
            var end = new Date(Number(YearArr[getElementAtEvent(chartRef.current, event)[0].index]),month+1,0);

           console.log(month)
           console.log("start",start)
           console.log("end",end)
          second.setchange1({...second.change1, ["FromDate"]:fromdate})
          second.setchange1({...second.change1,["ToDate"]:todate})

          setFromDate(convert(start))
          setToDate(convert(end))
          setSearchParams({
            FromDate:second.change1,
            ToDate:second.change1.ToDate,
        TotalRow:second.change1.TotalRow,
        strCompanyID:second.change1.strCompanyID,
        strBranchID:second.change1.strBranchID,
        strItemGroupID:second.change1.strItemGroupID,
        strItemID:second.change1.strItemID,
        Unit:second.change1.Unit,
          })
    }

 const chartRef = useRef();
    return (
        <div className='row' style={{ height: "90%", width: "100%" }}>
            <Bar 
                data={data}
                options={options}
                onClick={onClick}
                ref= {chartRef}
            />

        </div>
    )
}

export default Second;
/*
dataPointSelection: function (event, chartContext, config) {
                    //   console.log('event', event)
                    //   console.log('chartContext', chartContext)
                    //   console.log('config', config.selectedDataPoints[0])
                    //   console.log('1- config', config.selectedDataPoints[0])
                    //   console.log('2 - config', config.selectedDataPoints[1])
                    var monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];

                    if ((config.selectedDataPoints[0] === (undefined) || (0)) || (config.selectedDataPoints[1] === (undefined) || (0))) {
                        // console.log('configLabelID', YearArr[config.dataPointIndex])
                        // console.log('configLabel', MonthArr[config.dataPointIndex])

                        var month = monthNames.indexOf(MonthArr[config.dataPointIndex]);
                        var start = new Date(Number(YearArr[config.dataPointIndex]), month, 1);
                        var end = new Date(Number(YearArr[config.dataPointIndex]), month + 1, 0);
                        setFromDate(convert(start))
                        setToDate(convert(end))

                        // sestrItemID(ItemIDArr[ config.selectedDataPoints[1]])

                    }
                    else {
                        var month = monthNames.indexOf(MonthArr[config.selectedDataPoints[0]]);
                        var start = new Date(Number(YearArr[config.selectedDataPoints[0]]), month, 1);
                        var end = new Date(Number(YearArr[config.selectedDataPoints[0]]), month + 1, 0);

                        setFromDate(convert(start))
                        setToDate(convert(end))

                        // FilterContext.updatefilte({...APIInput,["strItemID"]:ItemArr[ config.selectedDataPoints[1]]})
                        // sestrItemID(ItemIDArr[ config.selectedDataPoints[0]])

                    }

                }





                function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    };



*/
