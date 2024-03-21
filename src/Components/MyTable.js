import React from "react"; 
import { Table } from "react-bootstrap"; 
  
const MyTable = () => { 
  
  // Sample data 
  const rows = [ 
    { id: 1, name: "John", age: 30 }, 
    { id: 2, name: "Alice", age: 25 }, 
    { id: 3, name: "Bob", age: 35 }, 
    { id: 4, name: "Eve", age: 28 }, 
    { id: 5, name: "Grace", age: 32 }, 
    { id: 6, name: "Michael", age: 40 }, 
    { id: 7, name: "Olivia", age: 22 }, 
    { id: 8, name: "Michael", age: 40 }, 
    { id: 9, name: "Olivia", age: 22 }, 
    { id: 10, name: "Michael", age: 40 }, 
    { id: 1, name: "John", age: 30 }, 
    { id: 2, name: "Alice", age: 25 }, 
    { id: 3, name: "Bob", age: 35 }, 
    { id: 4, name: "Eve", age: 28 }, 
    { id: 5, name: "Grace", age: 32 }, 
    { id: 6, name: "Michael", age: 40 }, 
    { id: 7, name: "Olivia", age: 22 }, 
    { id: 8, name: "Michael", age: 40 }, 
    { id: 9, name: "Olivia", age: 22 }, 
    { id: 10, name: "Michael", age: 40 }, 
    { id: 1, name: "John", age: 30 }, 
    { id: 2, name: "Alice", age: 25 }, 
    { id: 3, name: "Bob", age: 35 }, 
    { id: 4, name: "Eve", age: 28 }, 
    { id: 5, name: "Grace", age: 32 }, 
    { id: 6, name: "Michael", age: 40 }, 
    { id: 7, name: "Olivia", age: 22 }, 
    { id: 8, name: "Michael", age: 40 }, 
    { id: 9, name: "Olivia", age: 22 }, 
    { id: 10, name: "Michael", age: 40 }, 
    { id: 1, name: "John", age: 30 }, 
    { id: 2, name: "Alice", age: 25 }, 
    { id: 3, name: "Bob", age: 35 }, 
    { id: 4, name: "Eve", age: 28 }, 
    { id: 5, name: "Grace", age: 32 }, 
    { id: 6, name: "Michael", age: 40 }, 
    { id: 7, name: "Olivia", age: 22 }, 
    { id: 8, name: "Michael", age: 40 }, 
    { id: 9, name: "Olivia", age: 22 }, 
    { id: 10, name: "Michael", age: 40 }, 
    { id: 1, name: "John", age: 30 }, 
    { id: 2, name: "Alice", age: 25 }, 
    { id: 3, name: "Bob", age: 35 }, 
    { id: 4, name: "Eve", age: 28 }, 
    { id: 5, name: "Grace", age: 32 }, 
    { id: 6, name: "Michael", age: 40 }, 
    { id: 7, name: "Olivia", age: 22 }, 
    { id: 8, name: "Michael", age: 40 }, 
    { id: 9, name: "Olivia", age: 22 }, 
    { id: 10, name: "Michael", age: 40 }, 
    
    { id: 11, name: "Olivia", age: 22 } 
  ]; 
  
  return ( 
    
    // Create a container div with a maximum 
    // height and vertical scrollbar 
    <div style={{ maxHeight: "300px", 
        overflowY: "auto" }}> 
          
      {/* Create a React Bootstrap Table with  
          striped, bordered, and hover styles */} 
      <Table striped bordered hover> 
        
        {/* Define the table header */} 
        <thead style={{ position: "sticky", 
            top: "0" }}> 
          <tr> 
            <th>#</th> 
            <th>Name</th> 
            <th>Age</th> 
          </tr> 
        </thead> 
  
        {/* Define the table body */} 
        <tbody> 
          
          {/* Map through the rows of data and   
              create a table row for each item */} 
          {rows.map((row) => ( 
            <tr key={row.id}> 
              <td>{row.id}</td> 
              <td>{row.name}</td> 
              <td>{row.age}</td> 
            </tr> 
          ))} 
        </tbody> 
      </Table> 
    </div> 
  ); 
}; 
  
export default MyTable;

// import React, { useState, useEffect } from 'react';
// function MyTable() {
//   const [todos, setTodos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   useEffect(() => {
//     // Fetch data from the to-do list API
//     fetch(`http://192.168.1.208:7000/Filter/GetItemName${itemsPerPage}`)
//       .then((response) => response.json())
//       .then(() => {
//         // Append new data to the existing todos
//         setTodos([...todos,]);
//       });
//   }, [currentPage]);
//   const handleScroll = () => {
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     if (scrollY + windowHeight >= documentHeight - 100) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [currentPage]);
//   return (
//     <div>
//       {/* Display to-do list items */}
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.ItemID}>{todo.ItemName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default MyTable;