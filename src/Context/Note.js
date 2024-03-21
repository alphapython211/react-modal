import React,{useState} from "react";
import NoteContext from "./NoteContext";
const Note = (props)=>{
  
    const [change1, setchange1] = useState({
        "FromDate": "",
        "ToDate": "",
        "TotalRow": "",
        "strCompanyID": "",
        "strBranchID": "",
        "strItemGroupID": "",
        "strItemID": "",
        "Unit": "KG",
        "PrintGroupBy": "" 
    });
    const [change2, setchange2]= useState({
      "search": "",
    "strCompanyID": "",
    "ExtraVar":"",
    "strLotNo":"",
    "strBranchID": "",
    "strDepartmentID": "",
    "strBrandID": "",
    "strProductID": "",
    "strItemGroupID": "",
    "PageSize": 0,
    "PageNo": 0,
    "strItemID": "",
    "strDesignID": "",
    "SubCategoryNo": 0
    })
    
//     const [pjl,setPjl]= useState([]);
// const handleClick =()=>{
//   setPjl([...pjl])
//   }
//   const str = pjl.toString();
//   console.log(str)

//   function handleCheckboxChange(event){
//     const {value, checked} =event.target;
//    console.log(`${value} is ${checked}`)
   
//    if(checked){
//      setPjl([...pjl, value])
//    }
//    else{
//      setPjl(pjl.filter((e)=> e!= value))
//    }
//    }
   const [checklst,setchecklst]=useState([]);
  //  setchecklst({...checklst, ['label']:pjl})

  return(
<NoteContext.Provider value ={{change1,change2,setchange1,setchange2,setchecklst,checklst}}>

  {props.children}
 
</NoteContext.Provider>
  )
}

export default Note;