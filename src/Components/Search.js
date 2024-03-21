import axios from 'axios';
import React,{ useContext, useEffect,useState,useRef} from 'react';
import { json, useNavigate } from 'react-router-dom';
import "./Style.css";
import NoteContext from '../Context/NoteContext';



function Search(props) {
  
  const [selectedCategories, setSelectedCategories] = useState({});
  const [prevSelectedCategories, setPrevSelectedCategories] = useState([]);
  const [pjl, setPjl] = useState([]);
   
 
    const [input,setinput]= useState([]);
    const [records,setRecords]= useState([]);
    const navigate = useNavigate();
    const [modal, setModal] = useState(true);
    const search = useContext(NoteContext);
    

  const [Data,setData]= useState({
    "search": "",
    "strCompanyID": "",
    "strBranchID": "",
    "strDepartmentID": "",
    "strBrandID": "",
    "strProductID": "",
    "strItemGroupID": "",
    "PageSize": 0,
    "PageNo": 0,
    "strItemID": "",
    "strDesignID": "",
    "ExtraVar":"",
    "strLotNo":"",
    "SubCategoryNo": 0
  })
 
   

   useEffect(() => {
    fetchData();
  }, []);


 
   
    function fetchData(){
        axios.post(props.newInput.api,Data)
        .then(res => {setinput(res.data.lstResult)
        console.log(res.data.lstResult)
    setRecords(res.data.lstResult)
})
      .catch(err=> console.log(err))
    }

    const [page,setPage]= useState(0);  
    const handleScroll1 = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);
       
    if(scrollRatio === 1){
      setTimeout(()=>{
        setPage(page+1)
        console.log(scrollRatio,"scrollRatio")
        axios.post('http://192.168.1.208:7000/Filter/GetItemName',Data)
              .then((response) => {
               setinput([...input, ...response.data.lstResult])
               setRecords([...records, ...response.data.lstResult])
               
              }).catch(err=>console.log("Generate Error in 1nd Chart-- Error",err))
      },500)
            
}};


  const handleClick =(event)=>{

  search.setchange2({...search.change2, [props.newInput.label]:pjl})  
  console.log("data",pjl)
  const {id,value}= event.target;
  const checkbox = document.getElementById(id);
  const prevPjlJson = JSON.stringify(pjl);
  console.log('previosData', prevPjlJson);
  
    // if(prevPjlJson === JSON.stringify({...pjl, [id]:value})){
    //     checkbox.indeterminate = true;
    //  }
    //  else if(prevPjlJson === JSON.stringify(pjl.filter((e)=> e!= value))){
    //    checkbox.indeterminate = false;
    //    checkbox.checked = false;
    //  }


//   // After second time visit filter previous tick data also show in checkbox
//   const prevSelectedCategoriesArray = prevSelectedCategories.map(([id, value]) => ({ id, value }));
// ;
//   // Add data in same checkbox
//   const updatedSelectedCategories = prevSelectedCategoriesArray.reduce((acc, { id, value }) => {
//     if (acc[id] === undefined) {
//       acc[id] = [value];
//     } else {
//       acc[id] = [...acc[id], value];
//     }
//     return acc;
//   }, {});

//   setSelectedCategories(updatedSelectedCategories)
  
  // search.setchecklst({...search.checklst,  [props.newInput.label]:pjl})
  // console.log("data2", records)
  }


    const Filter = (event) => {
      const { value } = event.target;
      console.log(value);
    
      if (event.target.checked) {
        setRecords(input.filter((f) => f.ItemName.toUpperCase().includes(value)));
      } else {
        setRecords(
          input.filter((f) => f.ItemName.toUpperCase().includes(value))
        );
      }
    };

  const handleClose= ()=>{
    search.setchange2(false)
    // navigate('/module')
  }
  // const handleCheckboxChange = (event) => {
  //   const { id,  value } = event.target;

  //   if (selectedCategories[id] === undefined) {
  //     setSelectedCategories({
  //       ...selectedCategories,
  //       [id]: [value],
  //     });
  //   } else {
  //     const isChecked = selectedCategories[id].includes(value);

  //     if (isChecked) {
  //       setSelectedCategories({
  //         ...selectedCategories,
  //         [id]: selectedCategories[id].filter((e) => e != value),
  //       });
  //     } else {
  //       setSelectedCategories({
  //         ...selectedCategories,
  //         [id]: [...selectedCategories[id], value],
  //       });
  //     }
  //   }

  //   setPrevSelectedCategories((prevSelectedCategories) => {
  //     if (event.target.checked) {
  //       return [...prevSelectedCategories, [id, value]];
  //     } else {
  //       return prevSelectedCategories.filter(([prevId, prevValue]) => prevId != id || prevValue != value);
  //     }
  //   });

  //   setPjl((prevPjl) => {
  //     if (event.target.checked) {
  //       return [...prevPjl, [id, value]];
  //     } else {
  //       return prevPjl.filter(([prevId, prevValue]) => prevId != id || prevValue != value);
  //     }
  //   });
  // };


  // const handleCheckboxChange = (event) => {
  //   const { id, name, value } = event.target;

  //   if (selectedCategories[id] === undefined) {
  //     setSelectedCategories({
  //       ...selectedCategories,
  //       [id]: [value],
  //     });
  //   } else {
  //     const isChecked = selectedCategories[id].includes(value);

  //     if (isChecked) {
  //       setSelectedCategories({
  //         ...selectedCategories,
  //         [id]: selectedCategories[id].filter((e) => e != value),
  //       });
  //     } else {
  //       setSelectedCategories({
  //         ...selectedCategories,
  //         [id]: [...selectedCategories[id], value],
  //       });
  //     }
  //   }

  //   setPrevSelectedCategories((prevSelectedCategories) => {
  //     if (event.target.checked) {
  //       return [...prevSelectedCategories, [id, value]];
  //     } else {
  //       return prevSelectedCategories.filter(([prevId, prevValue]) => prevId != id || prevValue != value);
  //     }
  //   });

  //   setPjl((prevPjl) => {
  //     if (event.target.checked) {
  //       return [...prevPjl, [id, value]];
  //     } else {
  //       return prevPjl.filter(([prevId, prevValue]) => prevId != id || prevValue != value);
  //     }
  //   });
  // };

  function handleCheckboxChange(event) {
    // let isChecked = event.target.checked;
    // console.log("isChecked",isChecked)
    const {id, value} = event.target;
    console.log(`${value} is ${event.target.checked}`);
    const checkbox = document.getElementById(id);
    console.log("checkbox", checkbox)
   

 

     if (event.target.checked) {
        if (!pjl.includes(value)) {
          setPjl([...pjl, value]);
        }
        
      }       
      else if (checkbox.value !==  checkbox.id) {
        console.log("checkbox-value-false", checkbox.value)
        setPjl({
          ...pjl,
          [id]: [],
          isChecked:true
        });
      }
       
       else if(checkbox.value == checkbox.id){
        console.log("checkbox-value-default", checkbox.value)
        setPjl({
          ...pjl,
          [id]: [checkbox.value],
        });
        setPjl(pjl.filter((e)=> e!= value))
      }
      else {
        console.log('else loop..')
        setPjl(pjl.filter((e)=> e!= value))
     }
    
      
    

    //  if (id === props.newInput.ItemID) {
    //   console.log('stritemid call:')
    //   setPjl((prevPjl) => ({
    //     ...prevPjl,
    //     CompanyID: [],
    //     BranchID: [],
    //   }));
    // } else if (id === props.newInput.CompanyID) {
    //   console.log('strcompanyid call:')
    //   setPjl((prevPjl) => ({
    //     ...prevPjl,
    //     ItemID: [],
    //     BranchID: [],
    //   }));
    // } else if (id === props.newInput.BranchID) {
    //   console.log("branchid call:")
    //   setPjl((prevPjl) => ({
    //     ...prevPjl,
    //     ItemID: [],
    //     CompanyID: [],
    //   }));
    // } 
    //  const filteredRecords = records.filter((record) => {
    //   if (selectedCategories.ItemID.length > 0) {
    //     return selectedCategories.ItemID.includes(record.ItemID);
    //   }
    //   if (selectedCategories.CompanyID.length > 0) {
    //     return selectedCategories.CompanyID.includes(record.CompanyID);
    //   }
    //   if (selectedCategories.BranchID.length > 0) {
    //     return selectedCategories.BranchID.includes(record.BranchID);
    //   }
    //   return true;
    // });
    //    setRecords(filteredRecords)



    }
  // const checkboxRefs = useRef({}); 
  // function handleCheckboxChange(event) {
  //   const { id, value } = event.target;
  //   const checkbox = document.getElementById[id]; 
  //   console.log(`${value} is ${event.target.checked}`);

  //   if (event.target.checked) {
  //     if (!selectedCategories[id].includes(value)) {
  //       setSelectedCategories({
  //         ...selectedCategories,
  //         [id]: [...selectedCategories[id], value],
  //       });
  //     }
  //   } else {
  //     setSelectedCategories({
  //       ...selectedCategories,
  //       [id]: selectedCategories[id].filter((e) => e != value),
  //     });
  //   }

  //   setPrevSelectedCategories({
  //     ...prevSelectedCategories,
  //     [id]: event.target.checked
  //       ? [...prevSelectedCategories[id], value]
  //       : prevSelectedCategories[id].filter((e) => e != value),
  //   });

  //   if (checkbox.value === -1) {
  //     setPjl({
  //       ...pjl,
  //       [id]: [],
  //     });
  //   } else if (checkbox.value === 0) {
  //     setPjl({
  //       ...pjl,
  //       [id]: [...pjl[id]],
  //     });
  //   } else {
  //     setPjl({
  //       ...pjl,
  //       [id]: [checkbox.value],
  //     });
  //   }
  // };

  // {...search.change2 == props.newInput.indexOf["id"] ==-1 ? 'is true'  : 'is false'}
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
        border: "1px solid #ccc",
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
         <th>{props.newInput.id}</th><br/>
         <th>{props.newInput.name}</th><br/>
         </tr>    
         </thead>
         <tbody>

         {
           records.map((d,i)=>(
            <tr key={i}>
            <td>{d[props.newInput["id"]]}</td>
        {}   
             <input type="checkbox" id = {d[props.newInput["id"]]}
             value = {d[props.newInput["id"]]}
              onChange={handleCheckboxChange}/>
             <td>{d[props.newInput["name"]]}</td><br/>
            </tr>
          ))
         }

         {
          records.map((d,i)=>(
           <tr key={i}>
           <td>{d[props.newInput["id"]]}</td>
            <input type="checkbox" id = {d[props.newInput["id"]]}
            value = {d[props.newInput["id"]]}
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

export default Search;
