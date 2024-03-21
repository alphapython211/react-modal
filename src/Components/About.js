import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import NoteContext from "../Context/NoteContext";

function About(props) {
  const [input, setInput] = useState([]);
  const [records, setRecords] = useState([]);
  const [pjl,setPjl]= useState([]);
  const [modal,setModal]= useState(false);
  
  
  const [selectedCategories, setSelectedCategories] = useState({
    Itemname: [],
    Companyname: [],
    BranchName:[],
    
  });
  const [prevSelectedCategories, setPrevSelectedCategories] = useState({
    Itemname: [],
    Companyname: [],
    BranchName:[],
  });

  const search = useContext(NoteContext);
  const [page,setPage]= useState(0);  

  useEffect(() => {
    axios
      .post("http://192.168.1.208:7000/Filter/GetItemName", {
        search: search.search,
        strCompanyname: search.strCompanyname,
        strBranchname: search.strBranchname,
        strDepartmentname: search.strDepartmentname,
        strBrandname: search.strBrandname,
        strProductname: search.strProductname,
        strItemGroupname: search.strItemGroupname,
        PageSize: 0,
        PageNo: 0,
        strItemname: search.strItemname,
        strDesignname: search.strDesignname,
        SubCategoryNo: search.SubCategoryNo,
      })
      .then((res) => {
        setInput(res.data.lstResult);
        setRecords(res.data.lstResult);
      })
      .catch((err) => console.log(err));
  }, [search]);

//   useEffect(() => {
//     setPrevSelectedCategories({
//       ...prevSelectedCategories,
//       [props.newInput.name]: props.newInput.value,
//     });
//   }, [props.newInput.name, props.newInput.value]);

  function handleCheckboxChange(event) {
    const { value, name } = event.target;
    console.log(`${value} is ${event.target.checked}`);

    if (event.target.checked) {
      if (!selectedCategories[name].includes(value)) {
        setSelectedCategories({
          ...selectedCategories,
          [name]: [...selectedCategories[name], value],
        });
      }
    } else {
      setSelectedCategories({
        ...selectedCategories,
        [name]: selectedCategories[name].filter((e) => e != value),
      });
    }

    setPrevSelectedCategories({
      ...prevSelectedCategories,
      [name]: event.target.checked
        ? [...prevSelectedCategories[name], value]
        : prevSelectedCategories[name].filter((e) => e != value),
    });
  }
  const handleScroll1 = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
   
if(scrollRatio === 1){
  setTimeout(()=>{
    setPage(page+1)
    console.log(scrollRatio,"scrollRatio")
    axios.post('http://192.168.1.208:7000/Filter/GetItemName')
          .then((response) => {
            setInput([...input, ...response.data.lstResult])
           setRecords([...records, ...response.data.lstResult])
           
          }).catch(err=>console.log("Generate Error in 1nd Chart-- Error",err))
  },500)
        
}};


  const Filter = (event) => {
    const { value } = event.target;
    console.log(value);

    if (event.target.checked) {
      setRecords(
        input.filter((f) =>
          prevSelectedCategories[event.target.name].includes(value) ||
          selectedCategories[event.target.name].includes(value)
        )
      );
    } else {
      setRecords(input);
    }
  };
  const handleClick =()=>{
    search.setchange2({...search.change2, [props.newInput.name]:pjl})  
   console.log("data",pjl)
 }
 const handleClose= ()=>{
    search.setchange2(false)
    // navigate('/module')
  }

  return (
    <>  
    
      {modal &&  (
        <div className="modal">
          <div className="modal-content">
        <div>
      <div className='p-5 bg-light' >
       <div className='bg-white shadow border' style={{
        height: "300px",
        overflowY: "scroll",
        border: "1px solname #ccc",
        transition: "background-color 0.5s ease",
    }} onScroll={handleScroll1}>
       <br/><br/><br/><br></br>
       <button onClick={handleClick}>
       Save and Change
     </button>
     <button onClick={handleClose}>
     Close
     </button>
   
    
       <input type='text' className='form-control' onChange={Filter} placeholder='Search'/>
       
       <table >
       <thead > 
         <tr>
         <th>{props.newInput.name}</th><br/>
         <th>{props.newInput.name}</th><br/>
         </tr>    
         </thead>
         <tbody>

         {
        records.map((d,i)=>(
            <tr key={i}>
            <td>{d[props.newInput["name"]]}</td>
             <input type="checkbox" name = {d[props.newInput["name"]]}
             value = {d[props.newInput["name"]]}
             
              onChange={handleCheckboxChange}/>
             
             <td>{d[props.newInput["name"]]}</td><br/>
            </tr>
          ))
         }
         <p>IsLoading..</p>
         </tbody>
       </table>
      
       </div>
      </div>
    </div>
   
    </div>
    </div>

  )}
  
 
  </>
  )
}

export default About;
