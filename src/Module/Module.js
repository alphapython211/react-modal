import React from "react";
// import {Container,Col,Grid} from 'react-grid-system';
import {Grid} from "@mui/material";
import First from "../Components/First";
import Second from "../Components/Second";
import Third from "../Components/Third";
import Fourth from "../Components/Fourth";
import Fifth from "../Components/Fifth";
import { useState,useRef, useContext,useEffect } from "react";
import NoteContext from '../Context/NoteContext';
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "../Components/Search";
import About from "../Components/About";
export default function Module() {
  const navigate =useNavigate();
  const module = useContext(NoteContext);
  const [searchParams,setSearchParams]= useSearchParams();
  // const [pjl,setPjl]= useState(module.change2);
  const s= 
  {
    "FromDate": "",
    "ToDate": "",
    "TotalRow": "",
    "strCompanyID": "",
    "strBranchID": "",
    "strItemGroupID": "",
    "strItemID": "",
    "Unit": "",
    "PrintGroupBy": ""
  }

  
    const reset= {
      "FromDate": "",
      "ToDate": "",
      "TotalRow": "",
      "strCompanyID": "",
      "strBranchID": "",
      "strItemGroupID": "",
      "strItemID": "",
      "Unit": "",
      "PrintGroupBy": ""
    }
    function datan(){
      const f= 
      {
        "FromDate": "",
        "ToDate": "",
        "TotalRow": "",
        "strCompanyID": "",
        "strBranchID": "",
        "strItemGroupID": "",
        "strItemID": "",
        "Unit": "",
        "PrintGroupBy": ""
      }
      let hasData= {
            "FromData":searchParams.has("FromDate") ? searchParams.get("FromDate"):"FromDate",
            "ToDate": searchParams.has("ToDate") ? searchParams.get("ToDate"):"ToDate",
            "TotalRow": searchParams.has("TotalRow") ? searchParams.get("TotalRow"):"TotalRow",
            "strCompanyID": searchParams.has("strCompanyID") ? searchParams.get("strCompanyID"):"strCompanyID",
            "strBranchID": searchParams.has("strBranchID") ? searchParams.get("strBranchID"):"strBranchID",
            "strItemGroupID": searchParams.has("strItemGroupID") ? searchParams.get("strItemGroupID"):"strItemGroupID",
            "strItemID": searchParams.has("strItemID") ? searchParams.get("strItemID"):"strItemID",
            "Unit": searchParams.has("Unit") ? searchParams.get("Unit"):"Unit",
            "ToDaPrintGroupBy": searchParams.has("PrintGroupBy") ? searchParams.get("PrintGroupBy"):"PrintGroupBy",
      }
      if(JSON.stringify(hasData) !== JSON.stringify(f)){
        module.setchange1(hasData)
      }
    }
    useEffect(()=>{
   datan()
    },[])
   
   
   
    const ref = useRef();
    const [data,setdata]= useState(module.change1);
    // const [data2, setdata2] = useState(module.change2);
    const [modal, setModal] = useState(false);
    const [p1, setp1]= useState(false);

 
  const toggleModal = () => {
    setModal(!modal );
  };
 

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

      const handleChange = (e) => {
        setdata({...data, [e.target.name]: e.target.value})
      };
      // const handleChange5 = ()=>{
      //   module.setchange2({...module.change2})
      // }
      // function handleReset(ev){
      //   console.log('reset')
       
      //   ev.preventDefault();
      //   ref.current.reset();
      //   console.log("reset", setdata(modal))
      //   setdata(modal)
      // }
      
      function handleReset(){
          if(JSON.stringify(reset) !== JSON.stringify(module.change1)){
            
            setSearchParams(({}))
            // e.preventDefault();
             module.setchange1(reset)
             module.setchange2(reset)
            setModal(false)   
          }
          else{
            setSearchParams(({}))
            setdata(data)
            setModal(false)   
          }
          setSearchParams(({}))

      //   if(JSON.stringify(data) != JSON.stringify(data.strCompanyID)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //  else if(JSON.stringify(data) != JSON.stringify(data.strCompanyID)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.FromDate)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.ToDate)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.TotalRow)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.strBranchID)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.strItemGroupID)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else if(JSON.stringify(data) != JSON.stringify(data.Unit)){
      //     ev.preventDefault();
      //     ref.current.reset();
      //     setdata(modal)
      //   }
      //   else{
      //     console.log("null")
      //   }
      }
      
    const handleSubmit=(e)=>{
     if(JSON.stringify(data) === JSON.stringify(s)){
       e.preventDefault();
      console.log('past state cant be changed!!')
      setModal(false) 
     }
     else{
      setSearchParams({
        FromDate:module.change1.FromDate,
        ToDate:module.change1.ToDate,
        TotalRow:s.TotalRow,
        strCompanyID:module.change1.strCompanyID,
        strBranchID:module.change1.strBranchID,
        strItemGroupID:module.change1.strItemGroupID,
        strItemID:module.change1.strItemID,
        Unit:module.change1.Unit,
      });

      e.preventDefault();
      console.log('else condition !!')
      module.setchange1(data)
      // module.setchange2(data2)
     console.log(data, "data")
    // module.setchecklst(data)
    setModal(false)
    // setSelected(FromDate)
    // setSearchParams({FromDate})
     }
    }
    const toggleModal2 = ()=>{
      setModal(false)
    }

const url1 = "http://192.168.1.208:7000/Filter/GetItemName";
const url2 = "http://192.168.1.208:7000/Filter/GetCompany";
const url3 = "http://192.168.1.208:7000/Filter/GetBranch";

const [prevCheckValue, setPrevCheckValue] = useState(null);
function handleProps1(){
     module.setchange2(true)
     module.setchecklst(true)
  setp1({ "id":"ItemID", "name":"ItemName", "api":url1, "label":"strItemID"}) 
//  setModal(false)
}
function handleChange2(){
     module.setchange2(true)
     module.setchecklst(false)
  setp1({"id":"CompanyID", "name":"CompanyName", "api":url2,"label":"strCompanyID"})
  // setModal(p1)
}
function handleChange3(){
    module.setchange2(true)
    module.setchecklst(true)
  setp1({"id":"BranchID", "name":"Branchname", "api":url3,"label":"strBranchID"})
//  setPrevCheckValue(null)
}

  
  return (
<>

<button onClick={toggleModal} className="btn-modal">
Open
</button>
{module.change2 === true ? <Search newInput ={p1}/>:
     <div className="container">
    
     {modal && (
      <div className="modal">
      
        <div onClick={toggleModal} ></div>
        <div className="modal-content">
          
          <form ref={ref}>
          {" "}
          From Date:
          <input type="MyDate" asp-format="{0:yyyy-MM-dd}"
          placeholder="yyyy-MM-dd" onChange={handleChange}  value={module.change1.FromDate}/>
          <br/>

          {" "}
          To Date:
          <input type="MyDate" asp-format="{0:yyyy-MM-dd}"
          placeholder="yyyy-MM-dd" onChange={handleChange}  value={module.change1.ToDate}/>
          <br/>
  
      {" "}
      Total Row:
        <input type="text" id="TotalRow" name="TotalRow"    onChange={handleChange} >
        </input>
      <br/>
      
  
      {" "}
      strCompanyID:
        <input type="text"  onChange={handleChange}  onClick={handleChange2} value={module.change2.strCompanyID}></input>
      <br/>
      
  
      {" "}
      strBranchID:
        <input type="text"  onChange={handleChange} onClick={handleChange3} value={module.change2.strBranchID}></input>
      
     <br/>
  
      {" "}
      strItemGroupID:
        <input type="text" id="strItemGroupID" name="strItemGroupID"   onChange={handleChange}></input>
      
      <br/>
  
      {" "}
      strItemID:
        <input type="text" id="strItemID" name="strItemID"  onChange={handleChange}  onClick={handleProps1} value={module.change2.strItemID}>
        
        </input>
      
      <br/>
  
      {" "}
      Unit:
        <input type="text" id="Unit"  name="Unit"  onChange={handleChange}></input>
      
      
  <br/>
     
  <button id="Submit" name="Submit" onClick={handleSubmit}>Click To Save</button>
  <button onClick={handleReset}>Reset</button>
 
        </form>
          
          <button className="close-modal" onClick={toggleModal2}>
            CLOSE
          </button>
        </div>
      </div>

    )}
     
     </div>
    }
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

         <Grid container spacing={2}>
    
         <Grid item xs={6} md={5}>
      <h2>BranchName and BranchId</h2>
         <First /> 
         </Grid>
      
         <Grid item xs={6} md={5}>
      <h2>MonthName,YearNo</h2>
      <Second/>
      </Grid>
      <br/>
    
      <Grid item xs={6} md={4}>
      <h2>ProductName,D.ProductID</h2>
      <Third/>
      </Grid>
      <Grid item xs={6} md={4}>
      <h2>ItemName,a.ItemID</h2>
      <Fourth/>
      </Grid>
    
      <Grid item xs={6} md={4}>
      <h2>SubItemName,SubItemID</h2>
      <Fifth/>
      </Grid>
    
    
    </Grid>
    </>
  );
}
